const buckets=new Map<string,{count:number;reset:number}>()

export function clientIp(req:Request){
  return (req.headers.get("x-forwarded-for")||"").split(",")[0].trim()||"unknown"
}

export function allowRequest(key:string,limit:number,windowMs:number){
  const now=Date.now();const current=buckets.get(key)
  if(!current||current.reset<=now){buckets.set(key,{count:1,reset:now+windowMs});return true}
  if(current.count>=limit)return false
  current.count+=1;return true
}

export function cleanText(value:unknown,max=1000){
  if(typeof value!=="string")return ""
  return value.replace(/[\u0000-\u001F\u007F]/g," ").replace(/\s+/g," ").trim().slice(0,max)
}

export function safeProjectInput(body:any){
  const keys=["project","room","size","dimensions","household","uses","keep","change","constraints","style","details","avoid","priority","budget","timing","postcode","firstname","lastname","email","phone"]
  const out:Record<string,string>={}
  for(const k of keys)out[k]=cleanText(body?.[k],k==="details"||k==="constraints"||k==="change"||k==="keep"?1200:300)
  return out
}
