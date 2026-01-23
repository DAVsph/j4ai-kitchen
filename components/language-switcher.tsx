"use client"

import { useLanguage } from "@/lib/language-context"
import type { Language } from "@/lib/translations"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "EN" },
  { code: "fr", label: "Français", flag: "FR" },
  { code: "es", label: "Español", flag: "ES" },
]

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const currentLang = languages.find((l) => l.code === language)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-xs tracking-wide text-muted-foreground hover:text-foreground"
        >
          <Globe className="w-4 h-4" />
          <span>{currentLang?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer ${language === lang.code ? "bg-secondary" : ""}`}
          >
            <span className="mr-2 text-xs font-medium">{lang.flag}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
