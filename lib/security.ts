const buckets=new Map<string,{count:number;reset:number}>()

export function clientIp(req:Request){
  return (req.headers.get("x-forwarded-for")||"").split(",")[0].trim()||"unknown"
}

export function allowRequest(key:string,limit:number,windowMs:number){
  const now=Date.now()
  if(buckets.size>5000){for(const[k,v]of buckets){if(v.reset<=now)buckets.delete(k);if(buckets.size<=3000)break}}
  const current=buckets.get(key)
  if(!current||current.reset<=now){buckets.set(key,{count:1,reset:now+windowMs});return true}
  if(current.count>=limit)return false
  current.count+=1;return true
}

export function requestGuard(req:Request,maxBytes=64*1024){
  const site=req.headers.get("sec-fetch-site")
  if(site&&!['same-origin','same-site','none'].includes(site))return "Requête cross-site refusée."
  const origin=req.headers.get("origin")
  const host=req.headers.get("x-forwarded-host")||req.headers.get("host")
  if(origin&&host){try{if(new URL(origin).host!==host)return "Origine de requête refusée."}catch{return "Origine de requête invalide."}}
  const rawLength=req.headers.get("content-length")
  if(rawLength){const n=Number(rawLength);if(!Number.isFinite(n)||n<0||n>maxBytes)return "Requête trop volumineuse."}
  return null
}

export function cleanText(value:unknown,max=1000){
  if(typeof value!=="string")return ""
  return value.replace(/[\u0000-\u001F\u007F]/g," ").replace(/\s+/g," ").trim().slice(0,max)
}

export function safeProjectInput(body:any){
  const keys=["project","room","size","dimensions","household","uses","usage","keep","change","constraints","style","details","avoid","priority","budget","timing","postcode","firstname","lastname","email","phone","aiBrief","housing","level","floor","walls","utilities","globalWorks","access"]
  const long=new Set(["details","constraints","change","keep","usage","aiBrief","floor","walls","utilities","globalWorks","access"])
  const out:Record<string,string>={}
  for(const k of keys)out[k]=cleanText(body?.[k],long.has(k)?3000:300)
  return out
}
