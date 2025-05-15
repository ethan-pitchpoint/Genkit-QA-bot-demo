import express, { Request, Response, RequestHandler } from 'express'
import { ask_gemini } from './ask_gemini.js'

const app = express()
app.use(express.json())

app.post('/ask', async (req: Request, res: Response) => {
  const { question } = req.body as {
    question: string
  }

  if (!question) {
    res.status(400).json({ error: 'Missing "question" in request body' })
  }

  try {
    const llmResponse = await ask_gemini(question);
    console.log('LLM answer:', llmResponse)

    res.json({ llmResponse })
    
  } catch (err: any) {
    console.error('Generation error:', err)
    res.status(500).json({ error: err.message || 'Generation failed' })
  }
})

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})


// let question = ""
// question = "How many employers are listed for each borrower?"
// question = "What are the names of employers listed for each borrower?"
// question = "Does the verified employment information match the employer details submitted by the borrowers?"
// question = "can you explain in more detail"

// curl -X POST http://localhost:3000/ask \
//   -H "Content-Type: application/json" \
//   -d '{"question":"Does the verified employment information match the employer details submitted by the borrowers?"}'