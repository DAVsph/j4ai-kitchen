import{NextRequest,NextResponse}from"next/server";
import{createClient}from"@supabase/supabase-js";
import{requestGuard,cleanText}from"@/lib/security";
export async function POST(req:NextRequest){try{
 const guard=requestGuard(req,16*1024);if(guard)return NextResponse.json({error:guard},{status:403});
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
 if(!url||!key)return NextResponse.json({error:"Service indisponible."},{status:503});
 const auth=req.headers.get("authorization")||"",token=auth.startsWith("Bearer ")?auth.slice(7):"";
 const body=await req.json(),projectId=cleanText(body?.projectId,100);
 if(!token||!projectId||body?.granted!==true)return NextResponse.json({error:"Votre accord explicite est requis avant la création des visuels."},{status:400});
 const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false},global:{headers:{Authorization:`Bearer ${token}`}}});
 const{data:u,error:ue}=await db.auth.getUser();if(ue||!u.user)return NextResponse.json({error:"Session projet invalide."},{status:401});
 const{data:p}=await db.from("projects").select("id,customer_id").eq("id",projectId).eq("customer_id",u.user.id).maybeSingle();if(!p)return NextResponse.json({error:"Projet inaccessible."},{status:403});
 const consentText="J’accepte que SpaceHome transmette les informations nécessaires de mon projet et mes coordonnées à un partenaire sélectionné afin qu’il puisse me contacter au sujet de ce projet. La mise en relation intervient ultérieurement et aucune transmission automatique n’est effectuée à cette étape.";
 const{error}=await db.from("consents").insert({project_id:projectId,customer_id:u.user.id,purpose:"partner_introduction",granted:true,policy_version:"v1",consent_text:consentText});
 if(error)return NextResponse.json({error:"Impossible d’enregistrer votre choix."},{status:400});
 return NextResponse.json({ok:true,transmitted:false});
}catch(e){console.error("partner_consent_error",e);return NextResponse.json({error:"Impossible d’enregistrer votre choix."},{status:500})}}
