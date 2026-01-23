"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function LeadCaptureSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  const benefits = [t.lead.benefit1, t.lead.benefit2, t.lead.benefit3, t.lead.benefit4]

  return (
    <section id="contact" className="py-28 px-6 lg:px-8 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">{t.lead.tagline}</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-6 leading-tight">{t.lead.title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-10">{t.lead.description}</p>

            <div className="space-y-6 mb-12">
              {benefits.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-8 h-px bg-foreground" />
                  <span className="text-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="p-8 bg-secondary">
              <p className="text-muted-foreground text-sm mb-4 italic">"{t.lead.testimonial}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src="/testimonial-client-portrait.jpg"
                    alt="Client portrait"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-foreground text-sm font-medium">{t.lead.testimonialAuthor}</p>
                  <p className="text-xs text-muted-foreground">{t.lead.testimonialLocation}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background border border-border p-10">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12 text-foreground" />
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-3">{t.lead.thankYou}</h3>
                <p className="text-muted-foreground text-sm">{t.lead.thankYouDesc}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                      {t.lead.firstName}
                    </Label>
                    <Input
                      id="firstName"
                      required
                      className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                      {t.lead.lastName}
                    </Label>
                    <Input
                      id="lastName"
                      required
                      className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                    {t.lead.email}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                    {t.lead.phone}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="spaceType" className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                    {t.lead.spaceType}
                  </Label>
                  <Select required>
                    <SelectTrigger className="bg-transparent border-0 border-b border-border rounded-none px-0 focus:ring-0">
                      <SelectValue placeholder={t.lead.spaceTypePlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kitchen">{t.lead.spaceTypes.kitchen}</SelectItem>
                      <SelectItem value="living">{t.lead.spaceTypes.living}</SelectItem>
                      <SelectItem value="bedroom">{t.lead.spaceTypes.bedroom}</SelectItem>
                      <SelectItem value="dining">{t.lead.spaceTypes.dining}</SelectItem>
                      <SelectItem value="furniture">{t.lead.spaceTypes.furniture}</SelectItem>
                      <SelectItem value="multiple">{t.lead.spaceTypes.multiple}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size" className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                    {t.lead.size}
                  </Label>
                  <Select required>
                    <SelectTrigger className="bg-transparent border-0 border-b border-border rounded-none px-0 focus:ring-0">
                      <SelectValue placeholder={t.lead.sizePlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">{t.lead.sizes.small}</SelectItem>
                      <SelectItem value="medium">{t.lead.sizes.medium}</SelectItem>
                      <SelectItem value="large">{t.lead.sizes.large}</SelectItem>
                      <SelectItem value="xlarge">{t.lead.sizes.xlarge}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="style" className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                    {t.lead.style}
                  </Label>
                  <Select required>
                    <SelectTrigger className="bg-transparent border-0 border-b border-border rounded-none px-0 focus:ring-0">
                      <SelectValue placeholder={t.lead.stylePlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">{t.lead.styles.modern}</SelectItem>
                      <SelectItem value="traditional">{t.lead.styles.traditional}</SelectItem>
                      <SelectItem value="scandinavian">{t.lead.styles.scandinavian}</SelectItem>
                      <SelectItem value="industrial">{t.lead.styles.industrial}</SelectItem>
                      <SelectItem value="transitional">{t.lead.styles.transitional}</SelectItem>
                      <SelectItem value="unsure">{t.lead.styles.unsure}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                    {t.lead.budget}
                  </Label>
                  <Select required>
                    <SelectTrigger className="bg-transparent border-0 border-b border-border rounded-none px-0 focus:ring-0">
                      <SelectValue placeholder={t.lead.budgetPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5-15k">{t.lead.budgets["5-15k"]}</SelectItem>
                      <SelectItem value="15-30k">{t.lead.budgets["15-30k"]}</SelectItem>
                      <SelectItem value="30-60k">{t.lead.budgets["30-60k"]}</SelectItem>
                      <SelectItem value="60k+">{t.lead.budgets["60k+"]}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-none h-14 text-xs tracking-[0.2em] uppercase mt-4"
                  disabled={isLoading}
                >
                  {isLoading ? t.lead.submitting : t.lead.submit}
                  <ArrowRight className="ml-3 w-4 h-4" />
                </Button>

                <p className="text-xs text-center text-muted-foreground">{t.lead.privacyNote}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
