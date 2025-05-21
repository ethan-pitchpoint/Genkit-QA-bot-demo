import express, { Request, Response, RequestHandler } from 'express'
import { ask_gemini, ask_gemini_stream, ask_gemini_full, ask_gemini_score } from './ask_gemini.js'

const app = express()
app.use(express.json())

// app.post('/ask', async (req: Request, res: Response) => {
//   const { question } = req.body as {
//     question: string
//   }

//   if (!question) {
//     res.status(400).json({ error: 'Missing "question" in request body' })
//     return
//   }

//   try {
//     const llmResponse = await ask_gemini(question);
//     console.log('LLM answer:', llmResponse)

//     res.json({ 'data': llmResponse })
    
//   } catch (err: any) {
//     console.error('Generation error:', err)
//     res.status(500).json({ error: err.message || 'Generation failed' })
    
//   }
// })

app.post('/ask_full', async (req: Request, res: Response) => {
  const { question } = req.body as {
    question: string
  }

  if (!question) {
    res.status(400).json({ error: 'Missing "question" in request body' })
    return
  }

  try {
    const llmResponse = await ask_gemini_full(question);

    res.json({ 'data': llmResponse })
    
  } catch (err: any) {
    console.error('Generation error:', err)
    res.status(500).json({ error: err.message || 'Generation failed' })
    
  }
})

app.post('/score', async (req: Request, res: Response) => {
  const { gt, pred } = req.body as {
    gt: string,
    pred: string
  }

  if (!gt || !pred) {
    res.status(400).json({ error: 'Missing "gt" or "pred" in request body' })
    return
  }

  try {
    const llmResponse = await ask_gemini_score(gt, pred);

    res.json({ 'data': llmResponse })
    
  } catch (err: any) {
    console.error('Generation error:', err)
    res.status(500).json({ error: err.message || 'Generation failed' })
    
  }
})

app.post('/ask', async (req: Request, res: Response) => {
  const { question } = req.body as { question: string }
  if (!question) {
    res.status(400).json({ error: 'Missing "question"' })
    return
  }

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  })

  try {
    const llmResponse = await ask_gemini_stream(question, (token: string) => {
      res.write(JSON.stringify({data: token}) + '\n')
    })

    res.write(JSON.stringify({event: 'done', data: llmResponse}) + '\n')
    res.end()

  } catch (err: any) {
    res.write(JSON.stringify({event: 'error', data: 'Generation failed'}) + '\n')
    res.end()
  }
})

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
