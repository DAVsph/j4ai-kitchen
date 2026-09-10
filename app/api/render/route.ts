import{NextRequest,NextResponse}from"next/server"
import{createClient}from"@supabase/supabase-js"
import{allowRequest,clientIp,cleanText}from"@/lib/security"

export const runtime="nodejs"
export const maxDuration=120

async function callImage(model:string,prompt:string){
  const r=await fetch("https://api.openai.com/v1/images/generations",{
    method:"POST",
    headers:{Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,"Content-Type":"application/json"},
    body:JSON.stringify({model,prompt,size:"1024x1024",quality:"medium",n:1})
  })
  const d=await r.json().catch(()=>({}))
  if(!r.ok){
    const message=d?.error?.message||`Erreur OpenAI (${r.status})`
    throw new Error(`${model}: ${message}`)
  }
  const x=d?.data?.[0]
  const image=x?.b64_json?`data:image/png;base64,${x.b64_json}`:x?.url
  if(!image)throw new Error(`${model}: aucune image retournée`)
  return image
}

async function render(prompt:string){
  try{return await callImage("gpt-image-2",prompt)}
  catch(primary){
    console.error("gpt_image_2_error",primary)
    return await callImage("gpt-image-2.5-flare",prompt)
  }
}


export async function GET(){
 try{
  if(!process.env.OPENAI_API_KEY)return NextResponse.json({ok:false,stage:"config",error:"OPENAI_API_KEY absente"},{status:503})
  const r=await fetch("https://api.openai.com/v1/models/gpt-image-1",{headers:{Authorization:`Bearer ${process.env.OPENAI_API_KEY}`},cache:"no-store"})
  const d=await r.json().catch(()=>({}))
  if(!r.ok)return NextResponse.json({ok:false,stage:"openai",status:r.status,error:d?.error?.message||"Clé ou accès modèle refusé"},{status:503})
  return NextResponse.json({ok:true,stage:"openai",model:d?.id||"gpt-image-1"})
 }catch(e){
  return NextResponse.json({ok:false,stage:"network",error:e instanceof Error?e.message:"Erreur réseau"},{status:503})
 }
}

export async function POST(req:NextRequest){try{
 if(!process.env.OPENAI_API_KEY)return NextResponse.json({error:"Service image indisponible : clé OpenAI absente."},{status:503})
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;if(!url||!key)return NextResponse.json({error:"Service projet indisponible."},{status:503})
 const ip=clientIp(req);if(!allowRequest(`render:${ip}`,10,30*60*1000))return NextResponse.json({error:"Limite de génération atteinte pour le moment. Réessayez dans quelques minutes."},{status:429})
 const auth=req.headers.get("authorization")||"",token=auth.startsWith("Bearer ")?auth.slice(7):"";const projectId=cleanText(req.headers.get("x-spacehome-project"),100)
 if(!token||!projectId)return NextResponse.json({error:"Session projet requise."},{status:401})
 const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false},global:{headers:{Authorization:`Bearer ${token}`}}});const{data:u,error:ue}=await db.auth.getUser();if(ue||!u.user)return NextResponse.json({error:"Session projet invalide."},{status:401})
 const{data:p,error:pe}=await db.from("projects").select("id,customer_id").eq("id",projectId).eq("customer_id",u.user.id).maybeSingle();if(pe||!p)return NextResponse.json({error:"Projet inaccessible."},{status:403})
 const{data:consent,error:ce}=await db.from("consents").select("id,granted,granted_at").eq("project_id",projectId).eq("customer_id",u.user.id).eq("purpose","partner_introduction").eq("granted",true).order("granted_at",{ascending:false}).limit(1).maybeSingle();if(ce||!consent)return NextResponse.json({error:"Votre accord explicite de mise en relation doit être enregistré avant la création des visuels."},{status:403})
 const body=await req.json();const brief=cleanText(body?.brief,3000);if(brief.length<20)return NextResponse.json({error:"Brief incomplet"},{status:400})
 const variant=body?.variant==="B"?"B":"A"
 const common=`Photographie d'architecture intérieure réaliste et haut de gamme. Brief client: ${brief}. Le rendu est uniquement illustratif. Ne jamais affirmer une faisabilité technique, une conformité aux normes, des dimensions exactes, un prix, une marque ou un matériau non fourni. Conserver des proportions visuellement plausibles. Sans texte ni logo.`
 const prompt=variant==="A"
   ?`${common} PROPOSITION A: interprétation la plus fidèle possible au brief, sobre et cohérente.`
   :`${common} PROPOSITION B: alternative SpaceHome distincte mais compatible avec les contraintes essentielles; explorer une autre palette, matières ou ambiance sans contredire les exigences impératives.`
 const image=await render(prompt)
 return NextResponse.json({image,variant},{headers:{"Cache-Control":"no-store, private","Pragma":"no-cache"}})
}catch(e){
 console.error("render_error",e)
 const message=e instanceof Error?e.message:"Erreur inconnue"
 return NextResponse.json({error:message.slice(0,500)},{status:500})
}}