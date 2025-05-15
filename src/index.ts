import { z, genkit } from 'genkit';
import { vertexAI, gemini } from '@genkit-ai/vertexai';
import { gemini20Flash001 } from '@genkit-ai/vertexai';
import { EmployerIDInvestigationResultDataSchema } from './schema.js'
import { EMPLOYER_DATA } from './data.js'

// const geminiPro = gemini('gemini-2.5-pro-preview-05-06'); // takes too much time to reason
// const geminiPro = gemini('gemini-2.0-flash-001'); // seems to hallucinate a lot more than 2.5 flash
const geminiPro = gemini('gemini-2.5-flash-preview-04-17');

const ai = genkit({
  plugins: [
    // vertexAI({ location: 'us-east1' }),
    // vertexAI({ location: 'global' }),
    vertexAI({ location: 'us-central1' }),
  ],
  model: geminiPro
});


export const getEmployerDetails = ai.defineTool(
    {
        name: 'getEmployerDetails',
        description: "Gets detailed information about the employers for each borrower. Any question related to employers and businesses should be answered using this tool.",
        inputSchema: z.object({}),
        outputSchema: z.object({
            employerData: z.array(EmployerIDInvestigationResultDataSchema)
                .describe('A list of all employers and detailed information about them.'),
        }),
    },
    async () => Promise.resolve({ employerData: EMPLOYER_DATA })
    );

let question = ""
question = "How many employers are listed for each borrower?"
// question = "What are the names of employers listed for each borrower?"
// question = "Does the verified employment information match the employer details submitted by the borrowers?"

const llmResponse = await ai.generate({
    prompt: `You are a helpful assistant for Pitchpoint solutions.
      Answer the user's questions and use tools to retrieve information when necessary.
      Question: ${question}
      Output your response in the following format:
      [borrower name: response]`,
    tools: [getEmployerDetails]
  });
// console.log(llmResponse)
console.log(llmResponse?.message?.content[0]?.text)

