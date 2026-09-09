import Link from "next/link"
import { ArrowRight, Check, ShieldCheck, Sparkles, Store, ScanSearch, WalletCards } from "lucide-react"

const steps = [
  ["1", "Décrivez votre projet", "Quelques questions nous permettent de comprendre votre pièce, vos usages, votre style, votre budget et votre calendrier."],
  ["2", "Recevez vos visuels IA", "Après le formulaire, SpaceHome utilise votre brief pour créer une première projection visuelle de votre futur intérieur."],
  ["3", "Validation par un professionnel", "Si votre projet peut être réalisé, nous pouvons le transmettre, avec votre accord, à une boutique partenaire adaptée."],
  ["4", "Passez à la réalisation", "Le professionnel confirme la faisabilité technique, établit sa proposition et vous décidez librement de poursuivre ou non."],
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="font-serif text-2xl">SpaceHome</Link>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#comment-ca-marche">Comment ça marche</a>
            <a href="#inspiration">Exemples</a>
            <Link href="/partenaires">Professionnels</Link>
          </nav>
          <Link href="/decouverte" className="bg-foreground px-5 py-3 text-xs uppercase tracking-[.16em] text-background">Créer mon projet</Link>
        </div>
      </header>

      <section className="px-6 pb-16 pt-14 lg:px-8 lg:pt-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 border border-border px-3 py-2 text-xs uppercase tracking-[.18em]"><Check className="h-4 w-4"/> Gratuit pour le particulier</div>
            <h1 className="font-serif text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">Imaginez votre intérieur.<br/>L’IA vous aide à le visualiser.</h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">Répondez à quelques questions sur votre projet. Une fois le formulaire terminé, SpaceHome transforme votre brief en premiers visuels IA pour vous aider à vous projeter, puis vous accompagne vers un professionnel si le projet est réalisable.</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/decouverte" className="inline-flex items-center gap-2 bg-foreground px-7 py-4 text-sm text-background">Commencer gratuitement <ArrowRight className="h-4 w-4"/></Link>
              <a href="#comment-ca-marche" className="px-4 py-4 text-sm underline underline-offset-4">Voir le parcours</a>
            </div>
            <div className="mt-7 grid max-w-xl gap-3 text-sm text-muted-foreground sm:grid-cols-3">
              <span className="flex items-center gap-2"><ScanSearch className="h-4 w-4"/>Découverte guidée</span>
              <span className="flex items-center gap-2"><Sparkles className="h-4 w-4"/>Visuels générés par IA</span>
              <span className="flex items-center gap-2"><Store className="h-4 w-4"/>Professionnel si réalisable</span>
            </div>
            <p className="mt-6 max-w-xl text-xs leading-relaxed text-muted-foreground">* L’utilisation de SpaceHome et la génération des premiers visuels sont gratuites. Aucun paiement de réalisation n’est demandé tant qu’une boutique partenaire n’a pas confirmé la faisabilité du projet et présenté une proposition ou un devis que vous êtes libre d’accepter ou de refuser.</p>
          </div>

          <div className="relative overflow-hidden bg-secondary">
            <img src="/luxurious-modern-kitchen-interior-with-marble-coun.jpg" alt="Exemple de projection d’intérieur" className="h-full min-h-[500px] w-full object-cover"/>
            <div className="absolute bottom-5 left-5 right-5 bg-background/95 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[.2em] text-muted-foreground">Après votre formulaire</p>
              <p className="mt-2 font-serif text-xl">Votre brief devient une première projection visuelle grâce à l’IA.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="comment-ca-marche" className="border-y border-border bg-secondary/35 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs uppercase tracking-[.3em] text-muted-foreground">Simple et sans engagement</p>
            <h2 className="font-serif text-4xl sm:text-5xl">De l’idée au professionnel, en quatre étapes.</h2>
          </div>
          <div className="grid gap-px bg-border md:grid-cols-4">{steps.map(([n,t,d])=><div key={n} className="bg-background p-7"><div className="mb-8 text-xs text-muted-foreground">0{n}</div><h3 className="font-serif text-2xl">{t}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p></div>)}</div>
        </div>
      </section>

      <section id="inspiration" className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs uppercase tracking-[.3em] text-muted-foreground">Exemples de projections</p>
            <h2 className="font-serif text-4xl sm:text-5xl">Des visuels pour vous aider à décider.</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">Les images servent à explorer une ambiance, une implantation et des idées avant le rendez-vous avec un professionnel.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <img src="/luxurious-modern-kitchen-interior-with-marble-coun.jpg" alt="Cuisine" className="aspect-[4/5] w-full object-cover"/>
            <img src="/elegant-modern-living-room-with-neutral-tones-and-.jpg" alt="Salon" className="aspect-[4/5] w-full object-cover"/>
            <img src="/luxurious-serene-bedroom-with-soft-neutral-colors-.jpg" alt="Chambre" className="aspect-[4/5] w-full object-cover"/>
          </div>
          <div className="mt-6 border border-border bg-secondary/30 p-5 text-xs leading-relaxed text-muted-foreground"><strong className="text-foreground">Important :</strong> les visuels générés par IA sont fournis à titre illustratif et ne sont pas contractuels. Ils ne constituent ni un plan technique, ni une validation de faisabilité, ni un chiffrage définitif. Dimensions, implantation, matériaux, contraintes techniques, normes, prix et conditions de réalisation doivent être contrôlés et validés par un professionnel qualifié avant toute commande ou exécution.</div>
        </div>
      </section>

      <section className="bg-foreground px-6 py-20 text-background lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl"><p className="mb-3 text-xs uppercase tracking-[.3em] text-background/55">Si vous décidez d’aller plus loin</p><h2 className="font-serif text-4xl sm:text-5xl">Un professionnel valide ce que l’IA a imaginé.</h2><p className="mt-5 text-background/70">SpaceHome vous aide à passer de l’inspiration à un projet réellement réalisable, avec votre accord à chaque étape.</p></div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="border border-background/20 p-6"><Store className="mb-5 h-5 w-5"/><h3 className="font-medium">Boutique partenaire</h3><p className="mt-2 text-sm leading-relaxed text-background/65">Votre projet n’est transmis qu’avec votre autorisation à un maximum de trois boutiques adaptées.</p></div>
            <div className="border border-background/20 p-6"><ShieldCheck className="mb-5 h-5 w-5"/><h3 className="font-medium">Validation métier</h3><p className="mt-2 text-sm leading-relaxed text-background/65">Le professionnel reste responsable de la validation technique de sa proposition avant toute réalisation.</p></div>
            <div className="border border-background/20 p-6"><WalletCards className="mb-5 h-5 w-5"/><h3 className="font-medium">Paiement encadré</h3><p className="mt-2 text-sm leading-relaxed text-background/65">Pour les projets éligibles, le parcours de paiement pourra être sécurisé et suivi par étapes via un prestataire spécialisé.</p></div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 text-center lg:px-8">
        <div className="mx-auto max-w-3xl"><Sparkles className="mx-auto mb-6 h-6 w-6"/><h2 className="font-serif text-4xl sm:text-5xl">Votre première projection commence ici.</h2><p className="mx-auto mt-5 max-w-xl text-muted-foreground">Décrivez votre projet gratuitement. Vos réponses serviront à générer vos premiers visuels et à déterminer la suite la plus adaptée.</p><Link href="/decouverte" className="mt-8 inline-flex items-center gap-2 bg-foreground px-7 py-4 text-sm text-background">Créer mon projet gratuitement <ArrowRight className="h-4 w-4"/></Link></div>
      </section>

      <footer className="border-t border-border px-6 py-8"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground"><span>© 2026 SpaceHome</span><div className="flex gap-5"><Link href="/partenaires">Professionnels</Link><span>Confidentialité</span><span>Mentions légales</span></div></div></footer>
    </main>
  )
}
