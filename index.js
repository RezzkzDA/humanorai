import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.prompt;

  const response = await fetch("https://api.gemini.google.com/v1/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`
    },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: userMessage }]}]
    })
  });

  const data = await response.json();
  res.json({ reply: data.candidates[0].content.parts[0].text });
});

export default app;
