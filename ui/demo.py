import gradio as gr
import requests
import json

# def ask_llm(message, history):
#     resp = requests.post("http://localhost:3000/ask", json={"question": message})
#     resp.raise_for_status()
#     answer = resp.json().get("llmResponse", "")
#     yield answer

def ask_llm_stream(message, history):
    # initialize history
    history = history or []
    # push the user message with an empty placeholder for the bot
    history.append((message, ""))
    
    # fire off a streaming POST
    resp = requests.post(
        "http://localhost:3000/ask",
        json={"question": message},
        stream=True
    )
    resp.raise_for_status()
    
    full_response = ""
    for raw in resp.iter_lines(decode_unicode=True):
        if not raw:
            continue

        res = json.loads(raw)
        print(res)
        if ("event" in res.keys()):
            yield full_response
        else:
            full_response += res["data"]
            if (len(full_response) == 0):
                yield "Thinking..."
            else:
                yield full_response

demo = gr.ChatInterface(
    # fn=ask_llm,
    fn=ask_llm_stream,
    title="PPS Helper",
    examples=[
        "How many employers are listed for each borrower?",
        "What are the names of employers listed for each borrower?",
        "Does the verified employment information match the employer details submitted by the borrowers?"
    ],
    theme=gr.themes.Ocean()
).queue().launch()

# question = "How many employers are listed for each borrower?"
# question = "What are the names of employers listed for each borrower?"
# question = "Does the verified employment information match the employer details submitted by the borrowers?"
# question = "can you explain in more detail"

# curl -X POST http://localhost:3000/ask2 \
#   -H "Content-Type: application/json" \
#   -d '{"question":"Does the verified employment information match the employer details submitted by the borrowers?"}'

# curl -X POST http://localhost:3000/score \
#   -H "Content-Type: application/json" \
#   -d '{"gt":"Does the verified employment information match the employer details submitted by the borrowers?", "pred":"Yes"}'


# curl -X POST http://localhost:3000/ask_summary