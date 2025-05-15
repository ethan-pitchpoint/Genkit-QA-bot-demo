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
        description: "Gets detailed information about the employers and their verification results for each borrower. Any question related to employers and businesses should be answered using this tool.",
        inputSchema: z.object({}),
        outputSchema: z.object({
            employerData: z.array(EmployerIDInvestigationResultDataSchema)
                .describe('A list of all employers and detailed information about them.'),
        }),
    },
    async () => Promise.resolve({ employerData: EMPLOYER_DATA })
    );

const chatHistory: MessageData[] = [
      {
        role: 'system',
        content: [{ text: "You are a helpful assistant for Pitchpoint solutions.\nAnswer the user's questions and use tools to retrieve information when necessary.\nOutput your response in the following format:\n[borrower name: response]\n" }], // Include the large text as context
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
  await chatHistory.push({role: "model", content: [{text: responseText ?? ""}]})

  chatHistory.forEach(chat => {
    console.log(chat.role + ": " + chat.content[0]?.text)
  })
  
  return responseText
}
