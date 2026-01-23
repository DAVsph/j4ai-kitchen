"use client"

import { CheckCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function ExpertValidationSection() {
  const { t } = useLanguage()

  const items = [
    {
      title: t.expert.item1Title,
      description: t.expert.item1Desc,
    },
    {
      title: t.expert.item2Title,
      description: t.expert.item2Desc,
    },
    {
      title: t.expert.item3Title,
      description: t.expert.item3Desc,
    },
  ]

  return (
    <section className="py-28 px-6 lg:px-8 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="/expert-kitchen-designer-reviewing-plans.jpg"
                alt="Expert interior designer reviewing plans"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-card p-8 shadow-lg max-w-xs hidden lg:block">
              <p className="font-serif text-xl text-foreground mb-2 italic">"{t.expert.quote}"</p>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{t.expert.quoteAuthor}</p>
            </div>
          </div>

          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">{t.expert.tagline}</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-6 leading-tight">{t.expert.title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">{t.expert.description}</p>

            <div className="space-y-6">
              {items.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <CheckCircle className="w-5 h-5 text-foreground mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-foreground font-medium mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
