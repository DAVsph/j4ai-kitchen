import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: "OPENAI_API_KEY non configurée" }, { status: 503 })
    const project = await req.json()
    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-5-mini",
        input: [
          { role: "system", content: "Tu es l'assistant de découverte SpaceHome. Reformule le projet d'aménagement intérieur en un brief professionnel, fidèle et prudent. N'invente aucune mesure ni contrainte. Distingue souhaits, contraintes et informations manquantes. Réponds en français, 120 mots maximum, texte simple." },
          { role: "user", content: JSON.stringify(project) }
        ]
      })
    })
    const d = await r.json()
    if (!r.ok) return NextResponse.json({ error: d?.error?.message || "Erreur OpenAI" }, { status: r.status })
    const brief = d.output_text || d?.output?.flatMap((o:any)=>o.content||[]).map((c:any)=>c.text||"").join("\n")
    return NextResponse.json({ brief })
  } catch (e) {
    console.error("brief_error", e)
    return NextResponse.json({ error: "Analyse du projet impossible" }, { status: 500 })
  }
}
