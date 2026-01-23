"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="pt-32 pb-24 px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">{t.hero.tagline}</p>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[1.1] text-balance mb-8">
            {t.hero.title}
            <br />
            {t.hero.titleLine2}
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">{t.hero.description}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 rounded-none px-10 h-14 text-xs tracking-[0.2em] uppercase"
            >
              {t.hero.cta}
              <ArrowRight className="ml-3 w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-muted-foreground hover:text-foreground rounded-none h-14 text-xs tracking-[0.2em] uppercase"
            >
              {t.hero.viewGallery}
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
            <img
              src="/luxurious-modern-kitchen-interior-with-marble-coun.jpg"
              alt="Luxurious modern interior space"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent h-32" />

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-12 md:gap-16">
            <div className="text-center">
              <p className="font-serif text-3xl md:text-4xl text-foreground">5,000+</p>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">{t.hero.spacesDesigned}</p>
            </div>
            <div className="w-px h-12 bg-foreground/20" />
            <div className="text-center">
              <p className="font-serif text-3xl md:text-4xl text-foreground">4.9</p>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">{t.hero.clientRating}</p>
            </div>
            <div className="w-px h-12 bg-foreground/20 hidden md:block" />
            <div className="text-center hidden md:block">
              <p className="font-serif text-3xl md:text-4xl text-foreground">48h</p>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">{t.hero.expertReview}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
