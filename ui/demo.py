import gradio as gr
import requests

import gradio as gr
import requests

def ask_llm(message, history):
    resp = requests.post("http://localhost:3000/ask", json={"question": message})
    resp.raise_for_status()
    answer = resp.json().get("llmResponse", "")
    yield answer

demo = gr.ChatInterface(
    fn=ask_llm,              # your generator-based handler
    title="QA Chatbot",
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