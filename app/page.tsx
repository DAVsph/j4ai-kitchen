import Link from "next/link"
import { ArrowRight, Check, ShieldCheck, Sparkles, Store } from "lucide-react"

const steps = [
  ["1", "Décrivez votre projet", "Pièce, dimensions, style, budget et calendrier : quelques minutes suffisent."],
  ["2", "Visualisez votre intérieur", "SpaceHome transforme votre brief en premières pistes visuelles pour vous aider à vous projeter."],
  ["3", "Rencontrez les bons professionnels", "Nous sélectionnons jusqu’à trois boutiques adaptées à votre projet et à votre localisation."],
  ["4", "Réalisez votre projet en confiance", "Devis, paiement sécurisé, jalons et suivi de réalisation sont regroupés dans un même parcours."],
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="font-serif text-2xl">SpaceHome</Link>
          <nav className="hidden items-center gap-8 md:flex text-sm text-muted-foreground">
            <a href="#comment-ca-marche" className="hover:text-foreground">Comment ça marche</a>
            <a href="#inspiration" className="hover:text-foreground">Inspirations</a>
            <Link href="/partenaires" className="hover:text-foreground">Espace partenaires</Link>
          </nav>
          <Link href="/decouverte" className="bg-foreground px-5 py-3 text-xs uppercase tracking-[.16em] text-background">Commencer mon projet</Link>
        </div>
      </header>

      <section className="px-6 pb-20 pt-16 lg:px-8 lg:pt-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[.3em] text-muted-foreground">Votre projet, de l’idée à la réalisation</p>
            <h1 className="font-serif text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">Imaginez votre intérieur.<br/>Nous vous aidons à le réaliser.</h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">Créez votre projet gratuitement, visualisez vos idées et avancez avec des boutiques partenaires adaptées à votre budget, votre style et votre localisation.</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/decouverte" className="inline-flex items-center gap-2 bg-foreground px-7 py-4 text-sm text-background">Commencer mon projet <ArrowRight className="h-4 w-4"/></Link>
              <a href="#comment-ca-marche" className="px-4 py-4 text-sm underline underline-offset-4">Voir comment ça marche</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Check className="h-4 w-4"/>Gratuit pour le particulier</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4"/>3 boutiques maximum</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4"/>Vous gardez le contrôle de vos données</span>
            </div>
          </div>
          <div className="overflow-hidden bg-secondary">
            <img src="/luxurious-modern-kitchen-interior-with-marble-coun.jpg" alt="Cuisine contemporaine haut de gamme" className="h-full min-h-[480px] w-full object-cover"/>
          </div>
        </div>
      </section>

      <section id="comment-ca-marche" className="border-y border-border bg-secondary/35 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl"><p className="mb-3 text-xs uppercase tracking-[.3em] text-muted-foreground">Simple et guidé</p><h2 className="font-serif text-4xl sm:text-5xl">Un seul parcours pour votre projet.</h2></div>
          <div className="grid gap-px bg-border md:grid-cols-4">{steps.map(([n,t,d])=><div key={n} className="bg-background p-7"><div className="mb-8 text-xs text-muted-foreground">0{n}</div><h3 className="font-serif text-2xl">{t}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p></div>)}</div>
        </div>
      </section>

      <section id="inspiration" className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-3 text-xs uppercase tracking-[.3em] text-muted-foreground">Se projeter</p><h2 className="font-serif text-4xl sm:text-5xl">Quelques inspirations.</h2></div><p className="max-w-lg text-sm leading-relaxed text-muted-foreground">Votre projet ne part pas d’un catalogue figé. Nous partons de vos goûts, de votre pièce et de vos contraintes.</p></div>
          <div className="grid gap-5 md:grid-cols-3">
            <img src="/luxurious-modern-kitchen-interior-with-marble-coun.jpg" alt="Cuisine contemporaine" className="aspect-[4/5] w-full object-cover"/>
            <img src="/elegant-modern-living-room-with-neutral-tones-and-.jpg" alt="Salon contemporain" className="aspect-[4/5] w-full object-cover"/>
            <img src="/luxurious-serene-bedroom-with-soft-neutral-colors-.jpg" alt="Chambre contemporaine" className="aspect-[4/5] w-full object-cover"/>
          </div>
        </div>
      </section>

      <section className="bg-foreground px-6 py-20 text-background lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div><p className="mb-3 text-xs uppercase tracking-[.3em] text-background/55">Avancer sereinement</p><h2 className="font-serif text-4xl sm:text-5xl">Vous restez accompagné jusqu’à la réalisation.</h2></div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="border border-background/20 p-6"><Store className="mb-5 h-5 w-5"/><h3 className="font-medium">Professionnels adaptés</h3><p className="mt-2 text-sm leading-relaxed text-background/65">Jusqu’à trois boutiques maximum, sélectionnées selon votre projet.</p></div>
            <div className="border border-background/20 p-6"><ShieldCheck className="mb-5 h-5 w-5"/><h3 className="font-medium">Parcours sécurisé</h3><p className="mt-2 text-sm leading-relaxed text-background/65">Consentement, paiement et suivi de réalisation sont intégrés au même dossier.</p></div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 text-center lg:px-8">
        <div className="mx-auto max-w-3xl"><Sparkles className="mx-auto mb-6 h-6 w-6"/><h2 className="font-serif text-4xl sm:text-5xl">Vous avez un projet en tête ?</h2><p className="mx-auto mt-5 max-w-xl text-muted-foreground">Commencez par nous expliquer ce que vous voulez créer. Cela prend quelques minutes et ne vous engage à rien.</p><Link href="/decouverte" className="mt-8 inline-flex items-center gap-2 bg-foreground px-7 py-4 text-sm text-background">Démarrer gratuitement <ArrowRight className="h-4 w-4"/></Link></div>
      </section>

      <footer className="border-t border-border px-6 py-8"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground"><span>© 2026 SpaceHome</span><div className="flex gap-5"><Link href="/partenaires">Professionnels</Link><span>Confidentialité</span><span>Mentions légales</span></div></div></footer>
    </main>
  )
}
