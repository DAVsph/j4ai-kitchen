import { Zap, Shield, BarChart3, Palette, Globe, Headphones } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Instant Generation",
    description: "Generate complete kitchen designs in under 30 seconds. No more waiting days for design teams.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type II certified. Your client data and proprietary catalogs are always protected.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track conversion rates, popular configurations, and revenue per design with detailed analytics.",
  },
  {
    icon: Palette,
    title: "Custom Branding",
    description: "White-label the platform with your brand. Presentations look like they came from your team.",
  },
  {
    icon: Globe,
    title: "Multi-Location",
    description: "Manage multiple showrooms from one dashboard. Consistent experience across all locations.",
  },
  {
    icon: Headphones,
    title: "Priority Support",
    description: "Dedicated account manager and 24/7 technical support for enterprise customers.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            Built for Kitchen Retail Professionals
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to modernize your sales process and delight clients.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 sm:p-12 rounded-2xl bg-primary text-primary-foreground">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold mb-4">Trusted by leading kitchen retailers</h3>
              <p className="text-primary-foreground/80 mb-6">
                Join 500+ retailers who have transformed their sales process with KitchenAI Pro.
              </p>
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-3xl font-bold">$2.4M+</p>
                  <p className="text-sm text-primary-foreground/70">Revenue Generated</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">45,000+</p>
                  <p className="text-sm text-primary-foreground/70">Designs Created</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 justify-center lg:justify-end opacity-70">
              {["Premium Kitchens Co", "Modern Living", "Home Designs Ltd", "Kitchen Studio"].map((brand, index) => (
                <div key={index} className="px-4 py-2 bg-primary-foreground/10 rounded-lg">
                  <span className="text-sm font-medium">{brand}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
