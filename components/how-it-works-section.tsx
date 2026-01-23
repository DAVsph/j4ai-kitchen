"use client"

import { useLanguage } from "@/lib/language-context"

export function HowItWorksSection() {
  const { t } = useLanguage()

  const steps = [
    {
      number: "1",
      title: t.howItWorks.step1Title,
      description: t.howItWorks.step1Desc,
    },
    {
      number: "2",
      title: t.howItWorks.step2Title,
      description: t.howItWorks.step2Desc,
    },
    {
      number: "3",
      title: t.howItWorks.step3Title,
      description: t.howItWorks.step3Desc,
    },
  ]

  const features = [t.howItWorks.feature1, t.howItWorks.feature2, t.howItWorks.feature3, t.howItWorks.feature4]

  return (
    <section id="how-it-works" className="py-28 px-6 lg:px-8 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">{t.howItWorks.tagline}</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-6">{t.howItWorks.title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">{t.howItWorks.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border">
          {steps.map((step, index) => (
            <div key={index} className="bg-card p-10 md:p-12 text-center group">
              <span className="font-serif text-6xl text-border group-hover:text-muted-foreground/30 transition-colors">
                {step.number}
              </span>
              <h3 className="font-serif text-2xl text-foreground mt-6 mb-4">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">{t.howItWorks.techTagline}</p>
            <h3 className="font-serif text-3xl sm:text-4xl text-foreground mb-6 leading-tight">
              {t.howItWorks.techTitle}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">{t.howItWorks.techDesc}</p>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-8 h-px bg-foreground" />
                  <span className="text-foreground text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="/modern-kitchen-design-blueprint-with-ai-elements.jpg"
                alt="AI-powered interior design visualization"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
