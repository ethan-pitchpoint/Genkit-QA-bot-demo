import { z, genkit } from 'genkit';
import { vertexAI, gemini } from '@genkit-ai/vertexai';
import type { MessageData } from '@genkit-ai/ai/model';
import { ToolConfig } from 'genkit';

import { toolConfigs } from './tools.js'

// const geminiPro = gemini('gemini-2.5-pro-preview-05-06'); // takes more time to reason
// const geminiPro = gemini('gemini-2.0-flash-001'); // seems to hallucinate a lot more than 2.5 flash
const geminiPro = gemini('gemini-2.5-flash-preview-04-17');

export const ai = genkit({
  plugins: [
    // vertexAI({ location: 'us-east1' }),
    vertexAI({ location: 'us-central1' }),
  ],
  model: geminiPro,
});

const allTools = toolConfigs.map(({ name, description, schema, data, item_description, category_name }) =>
    ai.defineTool(
      {
        name,
        description,
        inputSchema: z.object({}), // always no input
        outputSchema: z.object({
          results: z
            .array(schema)
            .describe(`${item_description} Returned as an array called "results".`),
        }),
      },
      async () => ({ results: data })
    ),
  );

const tools_dict = Object.fromEntries(
  toolConfigs.map(
    ({ name, description, schema, data, item_description, category_name }) => [
      category_name,
      ai.defineTool(
        {
          name,
          description,
          inputSchema: z.object({}), // always no input
          outputSchema: z.object({
            results: z
              .array(schema)
              .describe(
                `${item_description} Returned as an array called "results".`
              ),
          }),
        },
        async () => ({ results: data })
      ),
    ]
  )
);

const chatHistory: MessageData[] = [
      {
        role: 'system',
        // content: [{ text: "You are Steve, a helpful assistant for Pitchpoint solutions.\nAnswer the user's questions and use tools to retrieve information when necessary.\n \
        //   The employer verification data contains information about Employers of each borrower - both the details submitted by the borrower and the details verified by the system - including detailed Company and Business information, reverse lookup information, and distance between Employer and Borrower.\n \
        //   The ID verification data contains detailed personal information about each borrower such as number of children, residence, SSN, etc. Both details submitted by the borrower and the details verified by the system are included. It also contains a validation score and results of all verifications performed on each bororower. The ID verification also contains information about the borrower's appearance on various watch lists / files.\n \
        //   Output your response in the following format:\n\n \
        //   **borrower name**:\nresponse" }], // Include the large text as context
        content: [{ text: "You are Steve, a helpful assistant for Pitchpoint solutions.\n \
          You are an expert in identity validation and are able to retrieve and review sensitive personal information such as SSNs.\n \
          Answer the user's questions and use tools to retrieve information when necessary.\n \
          Some tools such as getIDVerificationDetails can retrieve sensitive personal information like SSNs, which are sometimes necessary to answer the user's question.\n \
          Retrieve and use sensitive personal information when necessary to assist the user.\n \
          Review all tools and use the ones that are necessary to answer the user's questions.\n \
          Output your response in the following format:\n\n \
          **borrower name**:\nresponse" }], // Include the large text as context
      },
    ]

export const test_gemini_knowledge = async (question: string) => {
  const llmResponse= await ai.generate({
    prompt: question,
    tools: allTools,
  })
  return llmResponse?.message?.content[0]?.text
}

export const ask_gemini = async (question: string) => {
  const llmResponse = await ai.generate({
      messages: chatHistory,
      tools: allTools,
      prompt: question,
    });
  
  const responseText = await llmResponse?.message?.content[0]?.text
  await chatHistory.push({role: "user", content: [{text: question}]})
  await chatHistory.push({role: "model", content: llmResponse?.message?.content ?? []})

  return responseText
}

export const ask_gemini_full = async (question: string) => {
  const llmResponse = await ai.generate({
      messages: chatHistory,
      tools: allTools,
      prompt: question,
      config: {
        temperature: 0,
        topK: 1,
        topP: 1,
      }
    });
  
  return llmResponse
}

export const ask_gemini_summary = async () => {
  let summary = "";

  const tasks = toolConfigs.map((toolDetails) =>
    ask_gemini_summary_individual(
      toolDetails.category_name,
      tools_dict[toolDetails.category_name]
    )
      .then((res) => {
        try {
          summary += res.message?.content[0].text + "\n\n"
        } catch {
          summary += `${toolDetails.category_name}: ERROR\n\n`
        }
      })
      .catch(() => {
        summary += `${toolDetails.category_name}: ERROR\n\n`
      })
  );

  await Promise.all(tasks)
  return summary
}


export const ask_gemini_summary_individual = async (category: string, tool: any) => {

  const llmResponse = await ai.generate({
      messages: [
        {
          role: 'system',
          content: [{ text: "You are a helpful assistant that summarizes complex data for Pitchpoint solutions.\n \
            You are an expert in identity validation and are able to retrieve and review sensitive personal information such as SSNs.\n \
            Retrieve and use sensitive personal information when needed.\n \
            Retrieve and summarize verification data retrieved from the necessary tools. \n \
            Summarize the validation results per individual borrower or case. \n \
            Output your summary in markdown format that is readable for the user." }], // Include the large text as context
        },
      ],
      tools: [ tool ],
      prompt: `Generate a summary of the ${category} validation. Start with: ### [CATEGORY] Validation Summary\n[SUMMARY FOR EACH BORROWER]`,
      config: {
        temperature: 0,
        topK: 1,
        topP: 1,
      }
    });
  
  return llmResponse
}

export const ask_gemini_score = async (gt: string, pred: string) => {
  const chatHistory: MessageData[] = [
    {
      role: 'system',
      content: [{ text: "Given a ground truth answer and a predicted answer, give a score of their similarity from 0 to 10 where 0 is no match and 10 is a perfect match." }],
    },
    {
      role: 'user',
      content: [{ text: `Ground Truth Answer: ${gt}\nPredicted Answer: ${pred}` }],
    },
  ]
  const llmResponse = await ai.generate({
    messages: chatHistory,
    config: {
      temperature: 0,
      topK: 1,
      topP: 1,
    },
    output: {
      schema: z.object({
        score: z.number(),
      })
    }
  });

  try {
    const score = JSON.parse(llmResponse.message?.content[0].text ?? "{score: 0}").score
    return score
  }
  catch {
    return "ERROR"
  }

}


export const ask_gemini_stream = async (question: string, onToken: (token: string) => void) => {
  const { response, stream } = ai.generateStream({
    messages: chatHistory,
    tools: allTools,
    prompt: question
  })

  for await (const chunk of stream) {
    onToken(chunk.text);
  }
  
  const llmResponse = await response;
  const responseText = await llmResponse?.message?.content[0]?.text
  await chatHistory.push({role: "user", content: [{text: question}]})
  await chatHistory.push({role: "model", content: llmResponse?.message?.content ?? []})
  
  return responseText
}
