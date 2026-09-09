import { NextResponse } from "next/server"

export const runtime = "nodejs"

async function render(prompt:string){
  const r=await fetch("https://api.openai.com/v1/images/generations",{method:"POST",headers:{Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({model:"gpt-image-2",prompt,size:"1024x1024",quality:"medium",n:1})})
  const d=await r.json(); if(!r.ok) throw new Error(d?.error?.message||"Erreur OpenAI"); const x=d?.data?.[0]; return x?.b64_json?`data:image/png;base64,${x.b64_json}`:x?.url
}
export async function POST(req:Request){
  try{
    if(!process.env.OPENAI_API_KEY)return NextResponse.json({error:"OPENAI_API_KEY non configurée"},{status:503})
    const{brief}=await req.json();if(!brief)return NextResponse.json({error:"Brief vide"},{status:400})
    const common=`Photographie d'architecture intérieure réaliste et haut de gamme. Brief client: ${brief}. Ne jamais inventer de validation technique. Conserver des proportions plausibles. Sans texte ni logo.`
    const [a,b]=await Promise.all([
      render(`${common} PROPOSITION A: interprétation la plus fidèle possible au brief, sobre, cohérente, directement exploitable comme inspiration.`),
      render(`${common} PROPOSITION B: alternative SpaceHome distincte mais compatible avec les contraintes et priorités du brief; explorer intelligemment une autre palette, matières ou ambiance sans changer les exigences essentielles.`)
    ])
    return NextResponse.json({images:[a,b]})
  }catch(e){console.error("render_error",e);return NextResponse.json({error:e instanceof Error?e.message:"Génération impossible"},{status:500})}
}
