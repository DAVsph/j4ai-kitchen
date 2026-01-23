"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function PricingSection() {
  const { t } = useLanguage()

  const plans = [
    {
      ...t.pricing.essential,
      price: "149",
      highlighted: false,
    },
    {
      ...t.pricing.premium,
      price: "349",
      highlighted: true,
    },
    {
      ...t.pricing.bespoke,
      price: "749",
      highlighted: false,
    },
  ]

  return (
    <section id="pricing" className="py-28 px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">{t.pricing.tagline}</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-6">{t.pricing.title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">{t.pricing.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-10 flex flex-col ${plan.highlighted ? "bg-foreground text-background" : "bg-card"}`}
            >
              <div className="mb-8">
                <h3 className={`font-serif text-2xl mb-2 ${plan.highlighted ? "text-background" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${plan.highlighted ? "text-background/70" : "text-muted-foreground"}`}
                >
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <span className={`font-serif text-5xl ${plan.highlighted ? "text-background" : "text-foreground"}`}>
                  ${plan.price}
                </span>
                <span className={`text-sm ml-2 ${plan.highlighted ? "text-background/70" : "text-muted-foreground"}`}>
                  {t.pricing.perProject}
                </span>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check
                      className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlighted ? "text-background" : "text-foreground"}`}
                    />
                    <span className={`text-sm ${plan.highlighted ? "text-background/90" : "text-foreground"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full rounded-none h-12 text-xs tracking-[0.2em] uppercase ${
                  plan.highlighted
                    ? "bg-background text-foreground hover:bg-background/90"
                    : "bg-foreground text-background hover:bg-foreground/90"
                }`}
              >
                {t.pricing.getStarted}
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          {t.pricing.taxNote}{" "}
          <a href="#contact" className="underline hover:text-foreground transition-colors">
            {t.pricing.contactUs}
          </a>
        </p>
      </div>
    </section>
  )
}
