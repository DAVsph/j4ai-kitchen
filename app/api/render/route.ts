import{NextResponse}from"next/server"
import{allowRequest,clientIp,cleanText}from"@/lib/security"
export const runtime="nodejs"
async function render(prompt:string){const r=await fetch("https://api.openai.com/v1/images/generations",{method:"POST",headers:{Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({model:"gpt-image-2",prompt,size:"1024x1024",quality:"medium",n:1})});const d=await r.json();if(!r.ok)throw new Error(d?.error?.message||"Erreur OpenAI");const x=d?.data?.[0];return x?.b64_json?`data:image/png;base64,${x.b64_json}`:x?.url}
export async function POST(req:Request){try{
 if(!process.env.OPENAI_API_KEY)return NextResponse.json({error:"OPENAI_API_KEY non configurée"},{status:503})
 const ip=clientIp(req);if(!allowRequest(`render:${ip}`,3,30*60*1000))return NextResponse.json({error:"Limite de génération atteinte pour le moment."},{status:429})
 const body=await req.json();const brief=cleanText(body?.brief,3000);if(brief.length<20)return NextResponse.json({error:"Brief incomplet"},{status:400})
 const common=`Photographie d'architecture intérieure réaliste et haut de gamme. Brief client: ${brief}. Le rendu est uniquement illustratif. Ne jamais affirmer une faisabilité technique, une conformité aux normes, des dimensions exactes, un prix, une marque ou un matériau non fourni. Conserver des proportions visuellement plausibles. Sans texte ni logo.`
 const[a,b]=await Promise.all([render(`${common} PROPOSITION A: interprétation la plus fidèle possible au brief, sobre et cohérente.`),render(`${common} PROPOSITION B: alternative SpaceHome distincte mais compatible avec les contraintes essentielles; explorer une autre palette, matières ou ambiance sans contredire les exigences impératives.`)])
 return NextResponse.json({images:[a,b]},{headers:{"Cache-Control":"no-store"}})
}catch(e){console.error("render_error",e);return NextResponse.json({error:e instanceof Error?e.message:"Génération impossible"},{status:500})}}
