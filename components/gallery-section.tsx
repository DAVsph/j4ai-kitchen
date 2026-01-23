"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"

type Category = "all" | "kitchen" | "living" | "bedroom" | "dining" | "furniture"

const spaces = [
  {
    id: 1,
    title: "Modern Minimalist Kitchen",
    category: "kitchen" as Category,
    image: "/gallery-kitchen-modern-minimalist.jpg",
  },
  {
    id: 2,
    title: "Elegant Living Room",
    category: "living" as Category,
    image: "/elegant-modern-living-room-with-neutral-tones-and-.jpg",
  },
  {
    id: 3,
    title: "Serene Master Bedroom",
    category: "bedroom" as Category,
    image: "/luxurious-serene-bedroom-with-soft-neutral-colors-.jpg",
  },
  {
    id: 4,
    title: "Sophisticated Dining Room",
    category: "dining" as Category,
    image: "/sophisticated-modern-dining-room-with-elegant-tabl.jpg",
  },
  {
    id: 5,
    title: "Custom Built-In Shelving",
    category: "furniture" as Category,
    image: "/custom-built-in-bookshelves-in-modern-home-office.jpg",
  },
  {
    id: 6,
    title: "Classic Elegance Kitchen",
    category: "kitchen" as Category,
    image: "/gallery-kitchen-classic-elegance.jpg",
  },
  {
    id: 7,
    title: "Contemporary Living Space",
    category: "living" as Category,
    image: "/contemporary-open-plan-living-room-with-statement-.jpg",
  },
  {
    id: 8,
    title: "Cozy Guest Bedroom",
    category: "bedroom" as Category,
    image: "/cozy-guest-bedroom-with-warm-neutral-tones-and-ele.jpg",
  },
  {
    id: 9,
    title: "Bespoke Wardrobe Design",
    category: "furniture" as Category,
    image: "/luxury-custom-walk-in-wardrobe-with-premium-finish.jpg",
  },
]

export function GallerySection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<Category>("all")
  const { t } = useLanguage()

  const categories: { key: Category; label: string }[] = [
    { key: "all", label: t.gallery.categories.all },
    { key: "kitchen", label: t.gallery.categories.kitchen },
    { key: "living", label: t.gallery.categories.living },
    { key: "bedroom", label: t.gallery.categories.bedroom },
    { key: "dining", label: t.gallery.categories.dining },
    { key: "furniture", label: t.gallery.categories.furniture },
  ]

  const filteredSpaces = activeCategory === "all" ? spaces : spaces.filter((space) => space.category === activeCategory)

  return (
    <section id="gallery" className="py-28 px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">{t.gallery.tagline}</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-6">{t.gallery.title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">{t.gallery.description}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`px-5 py-2 text-xs tracking-[0.15em] uppercase transition-colors ${
                activeCategory === category.key
                  ? "bg-foreground text-background"
                  : "bg-transparent text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSpaces.map((space) => (
            <div
              key={space.id}
              className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredId(space.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={space.image || "/placeholder.svg"}
                alt={space.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className={`absolute inset-0 bg-foreground/60 flex flex-col items-center justify-center transition-opacity duration-300 ${
                  hoveredId === space.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="text-xs tracking-[0.3em] uppercase text-background/70 mb-2">
                  {categories.find((c) => c.key === space.category)?.label}
                </p>
                <h3 className="font-serif text-2xl text-background text-center px-4">{space.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
