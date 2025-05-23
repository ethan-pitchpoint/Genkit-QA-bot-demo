import { z, genkit } from 'genkit';
import { vertexAI, gemini } from '@genkit-ai/vertexai';
import { gemini20Flash001 } from '@genkit-ai/vertexai';
import { EmployerIDInvestigationResultDataSchema } from './employer_investigation_schema.js'
import { EMPLOYER_DATA } from './employer_investigation_data.js'
import { IDInvestigationResultDataSchema } from './ID_investigation_schema.js'
import { ID_DATA } from './ID_investigation_data.js'
import type { MessageData } from '@genkit-ai/ai/model';

// const geminiPro = gemini('gemini-2.5-pro-preview-05-06'); // takes more time to reason
// const geminiPro = gemini('gemini-2.0-flash-001'); // seems to hallucinate a lot more than 2.5 flash
const geminiPro = gemini('gemini-2.5-flash-preview-04-17');

const ai = genkit({
  plugins: [
    // vertexAI({ location: 'us-east1' }),
    vertexAI({ location: 'us-central1' }),
  ],
  model: geminiPro,
});


const getEmployerDetails = ai.defineTool({
        name: 'getEmployerDetails',
        // description: "Gets detailed information about the employers and the verification results of each employer for each borrower. Any question related to employers, businesses, and companies should be answered using this tool.",
        description: "Gets the employer verification data for all borrowers. Use this tool when the user asks a question relating to employers.",
        inputSchema: z.object({}),
        outputSchema: z.object({
            employerData: z.array(EmployerIDInvestigationResultDataSchema)
                .describe('A list of all employer verification results and their corresponding borrowers.'),
        }),
    },
    async () => Promise.resolve({ employerData: EMPLOYER_DATA })
    );

  const getIDDetails = ai.defineTool({
    name: 'getIDDetails',
    description: "Gets the ID verification data for all borrowers. Use this tool when the user asks a question relating to borrowers",
    inputSchema: z.object({}),
    outputSchema: z.object({
      IDData: z.array(IDInvestigationResultDataSchema)
        .describe('A list of ID verification results for all borrowers')
    }),
  },
  async () => Promise.resolve({ IDData: ID_DATA })
)

const chatHistory: MessageData[] = [
      {
        role: 'system',
        // content: [{ text: "You are a helpful assistant for Pitchpoint solutions.\nAnswer the user's questions and use tools to retrieve information when necessary.\nOutput your response in the following format:\n**borrower name**:\nresponse\n" }], // Include the large text as context
        content: [{ text: "You are Steve, a helpful assistant for Pitchpoint solutions.\nAnswer the user's questions and use tools to retrieve information when necessary.\n \
          The employer verification data contains information about Employers of each borrower - both the details submitted by the borrower and the details verified by the system - including detailed Company and Business information, reverse lookup information, and distance between Employer and Borrower.\n \
          The ID verification data contains detailed personal information about each borrower such as number of children, residence, SSN, etc. Both details submitted by the borrower and the details verified by the system are included. It also contains a validation score and results of all verifications performed on each bororower. The ID verification also contains information about the borrower's appearance on various watch lists / files.\n \
          Output your response in the following format:\n\n \
          **borrower name**:\nresponse" }], // Include the large text as context
      },
    ]

export const test_gemini_knowledge = async (question: string) => {
  const llmResponse= await ai.generate({
    prompt: question,
    tools: [getEmployerDetails, getIDDetails]
  })
  return llmResponse?.message?.content[0]?.text
}

export const ask_gemini = async (question: string) => {
  const llmResponse = await ai.generate({
      messages: chatHistory,
      tools: [getEmployerDetails, getIDDetails],
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
      tools: [getEmployerDetails, getIDDetails],
      prompt: question,
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
    tools: [getEmployerDetails, getIDDetails],
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
