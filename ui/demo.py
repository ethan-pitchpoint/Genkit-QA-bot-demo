import gradio as gr
import requests

def ask_llm(history, message):
    history = history or []
    # POST the question to the Express endpoint
    response = requests.post(
        "http://localhost:3000/ask",
        json={"question": message}
    )
    response.raise_for_status()
    answer = response.json().get("llmResponse", "")
    history.append((message, answer))
    return history, ""

with gr.Blocks() as demo:
    gr.Markdown("QA Chatbot")
    chatbot = gr.Chatbot(label="Chat")
    msg = gr.Textbox(placeholder="Type your question here...", show_label=False)
    send = gr.Button("Send")

    send.click(ask_llm, inputs=[chatbot, msg], outputs=[chatbot, msg])
    msg.submit(ask_llm, inputs=[chatbot, msg], outputs=[chatbot, msg])

demo.launch(share=True)
