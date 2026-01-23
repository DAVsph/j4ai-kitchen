"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"
import { useLanguage } from "@/lib/language-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <span className="font-serif text-2xl tracking-tight text-foreground">SpaceHome</span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            <Link
              href="#how-it-works"
              className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.howItWorks}
            </Link>
            <Link
              href="#gallery"
              className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.gallery}
            </Link>
            <Link
              href="#pricing"
              className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.pricing}
            </Link>
            <Link
              href="#contact"
              className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.contact}
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Button
              size="sm"
              className="bg-foreground text-background hover:bg-foreground/90 rounded-none px-6 text-xs tracking-widest uppercase"
            >
              {t.nav.startDesign}
            </Button>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link
                href="#how-it-works"
                className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.howItWorks}
              </Link>
              <Link
                href="#gallery"
                className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.gallery}
              </Link>
              <Link
                href="#pricing"
                className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.pricing}
              </Link>
              <Link
                href="#contact"
                className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.contact}
              </Link>
              <div className="pt-4 flex items-center gap-4">
                <LanguageSwitcher />
                <Button
                  size="sm"
                  className="flex-1 bg-foreground text-background hover:bg-foreground/90 rounded-none px-6 text-xs tracking-widest uppercase"
                >
                  {t.nav.startDesign}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
