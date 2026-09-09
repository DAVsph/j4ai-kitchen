import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { GallerySection } from "@/components/gallery-section"
import { ExpertValidationSection } from "@/components/expert-validation-section"
import { LeadCaptureSection } from "@/components/lead-capture-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <GallerySection />
      <ExpertValidationSection />
      <LeadCaptureSection />
      <Footer />
    </main>
  )
}
