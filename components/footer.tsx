"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer id="contact" className="py-16 px-6 lg:px-8 bg-foreground text-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <Link href="/" className="font-serif text-2xl">SpaceHome</Link>
            <p className="text-background/70 text-sm leading-relaxed mt-5 max-w-sm">{t.footer.description}</p>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-background/60 mb-5">Navigation</h4>
            <div className="space-y-3 text-sm">
              <p><Link href="/decouverte" className="text-background/80 hover:text-background">Créer mon projet</Link></p>
              <p><Link href="/partenaires" className="text-background/80 hover:text-background">Professionnels</Link></p>
              <p><Link href="/cgu" className="text-background/80 hover:text-background">CGU</Link></p>
              <p><Link href="/cgv" className="text-background/80 hover:text-background">CGV</Link></p>
            </div>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-background/60 mb-5">Contact</h4>
            <a href="mailto:contact@spacehome.ai" className="text-sm text-background/90 hover:text-background">contact@spacehome.ai</a>
            <p className="text-xs text-background/60 mt-3">Questions sur votre projet, votre dossier ou un partenariat professionnel.</p>
          </div>
        </div>
        <div className="pt-6 border-t border-background/20 flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-xs text-background/60">© SpaceHome. Tous droits réservés.</p>
          <p className="text-xs text-background/60">Les visuels IA sont fournis à titre d’inspiration et ne remplacent pas l’expertise technique d’un professionnel.</p>
        </div>
      </div>
    </footer>
  )
}
