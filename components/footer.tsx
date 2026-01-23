"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="py-20 px-6 lg:px-8 bg-foreground text-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-2xl tracking-tight text-background">SpaceHome</span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed max-w-sm mb-6">{t.footer.description}</p>
            <div className="flex gap-6">
              {["Instagram", "Pinterest", "LinkedIn"].map((social) => (
                <Link
                  key={social}
                  href="#"
                  className="text-xs tracking-[0.15em] uppercase text-background/60 hover:text-background transition-colors"
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-background/60 mb-6">{t.footer.navigation}</h4>
            <ul className="space-y-4">
              {[
                { label: t.nav.howItWorks, href: "#how-it-works" },
                { label: t.nav.gallery, href: "#gallery" },
                { label: t.nav.pricing, href: "#pricing" },
                { label: t.nav.contact, href: "#contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-background/80 hover:text-background transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-background/60 mb-6">{t.footer.contact}</h4>
            <ul className="space-y-4">
              <li className="text-sm text-background/80">hello@spacehome.com</li>
              <li className="text-sm text-background/80">+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-background/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/60">{t.footer.copyright}</p>
          <div className="flex items-center gap-8">
            {[t.footer.privacy, t.footer.terms].map((item) => (
              <Link key={item} href="#" className="text-xs text-background/60 hover:text-background transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
