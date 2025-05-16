import { z, genkit } from 'genkit';
import { vertexAI, gemini } from '@genkit-ai/vertexai';
import { gemini20Flash001 } from '@genkit-ai/vertexai';
import { EmployerIDInvestigationResultDataSchema } from './schema.js'
import { EMPLOYER_DATA } from './data.js'
import type { MessageData } from '@genkit-ai/ai/model';

// const geminiPro = gemini('gemini-2.5-pro-preview-05-06'); // takes too much time to reason
// const geminiPro = gemini('gemini-2.0-flash-001'); // seems to hallucinate a lot more than 2.5 flash
const geminiPro = gemini('gemini-2.5-flash-preview-04-17');

const ai = genkit({
  plugins: [
    // vertexAI({ location: 'us-east1' }),
    vertexAI({ location: 'us-central1' }),
  ],
  model: geminiPro
});


const getEmployerDetails = ai.defineTool(
    {
        name: 'getEmployerDetails',
        // description: "Gets detailed information about the employers and the verification results of each employer for each borrower. Any question related to employers, businesses, and companies should be answered using this tool.",
        description: "Gets the employer verification results for all borrowers",
        inputSchema: z.object({}),
        outputSchema: z.object({
            employerData: z.array(EmployerIDInvestigationResultDataSchema)
                .describe('A list of all employer verification results and their corresponding borrowers.'),
        }),
    },
    async () => Promise.resolve({ employerData: EMPLOYER_DATA })
    );

const chatHistory: MessageData[] = [
      {
        role: 'system',
        // content: [{ text: "You are a helpful assistant for Pitchpoint solutions.\nAnswer the user's questions and use tools to retrieve information when necessary.\nOutput your response in the following format:\n**borrower name**:\nresponse\n" }], // Include the large text as context
        content: [{ text: "You are Steve, a helpful assistant for Pitchpoint solutions.\nAnswer the user's questions and use tools to retrieve information when necessary.\n \
          The employer verification results contain information about Employers submitted by each borrower, and the verified details for each Employer, including Company & Business information. \
          \nOutput your response in the following format:\n**borrower name**:\nresponse\n" }], // Include the large text as context
      },
    ]

export const ask_gemini = async (question: string) => {
  const llmResponse = await ai.generate({
      messages: chatHistory,
      tools: [getEmployerDetails],
      prompt: question,
    });
  
  const responseText = await llmResponse?.message?.content[0]?.text
  await chatHistory.push({role: "user", content: [{text: question}]})
  // await chatHistory.push({role: "model", content: [{text: responseText ?? ""}]})
  await chatHistory.push({role: "model", content: llmResponse?.message?.content ?? []})


  chatHistory.forEach(chat => {
    console.log(chat.role + ": " + chat.content[0]?.text)
  })
  
  return responseText
}
