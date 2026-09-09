import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: "OPENAI_API_KEY non configurée" }, { status: 503 })
    const { prompt } = await req.json()
    if (!prompt) return NextResponse.json({ error: "Brief vide" }, { status: 400 })

    const r = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-image-2",
        prompt: `Projection visuelle photoréaliste haut de gamme d'un projet d'architecture intérieure, destinée à aider un particulier à explorer une intention esthétique. ${prompt}. Respecter autant que possible les informations fournies, proposer des proportions visuellement plausibles, une lumière naturelle et un rendu réaliste, sans texte ni logo. Ne pas présenter le rendu comme un plan technique, une validation de faisabilité, un relevé de dimensions, un devis ou une garantie de résultat. La faisabilité, les dimensions, normes, matériaux et solutions techniques devront être validés par un professionnel métier.`,
        size: "1024x1024",
        quality: "medium",
        n: 1,
      }),
    })
    const d = await r.json()
    if (!r.ok) return NextResponse.json({ error: d?.error?.message || "Erreur OpenAI" }, { status: r.status })
    const x = d?.data?.[0]
    const image = x?.b64_json ? `data:image/png;base64,${x.b64_json}` : x?.url
    return NextResponse.json({ image })
  } catch {
    return NextResponse.json({ error: "Génération impossible" }, { status: 500 })
  }
}
