import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { message } = req.body as { message?: string }

    if (!message) {
      return res.status(400).json({ error: "Message is required" })
    }

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are Holly, a fun, energetic, emoji-loving young woman. Keep answers short, enthusiastic and friendly.",
          },
          { role: "user", content: message },
        ],
        max_tokens: 120,
        temperature: 0.9,
      }),
    })

    if (!openaiRes.ok) {
      const errTxt = await openaiRes.text()
      console.error("OpenAI error:", errTxt)
      return res.status(502).json({ error: "OpenAI request failed" })
    }

    const data = await openaiRes.json()
    const hollyReply = data.choices?.[0]?.message?.content ?? "Sorry, I didn't get that! Could you rephrase? 😊"

    return res.status(200).json({ response: hollyReply })
  } catch (err) {
    console.error("API route error:", err)
    return res.status(500).json({ error: "Internal error" })
  }
}
