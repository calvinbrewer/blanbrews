'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import {
  defaultSiteSettings,
  getNavigationItems,
  type SiteSettings,
} from '@/lib/site-settings'

export function Navigation({
  settings = defaultSiteSettings,
}: {
  settings?: SiteSettings
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const items = getNavigationItems(settings)
  const solid = isScrolled || settings.mode === 'weekend'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${solid ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-6">
          <div className="hidden md:flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {items.map((item, index) => (
              <div key={item.id} className="contents">
                {index === Math.ceil(items.length / 2) && (
                  <button
                    type="button"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                    aria-label="Back to top"
                    className={`font-serif text-xl font-light cursor-pointer ${solid ? 'text-foreground' : 'text-white'}`}
                  >
                    T & C
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors cursor-pointer ${solid ? 'text-foreground hover:text-accent' : 'text-white/90 hover:text-white'}`}
                >
                  {item.label}
                </button>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${solid ? 'text-foreground' : 'text-white'}`}
            type="button"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
        {isOpen && (
          <div
            id="mobile-navigation"
            className="md:hidden max-h-[75vh] overflow-y-auto mt-4 pb-4 border-t border-border/30 pt-4 bg-background/95 backdrop-blur-md rounded-b-2xl -mx-4 px-4"
          >
            <div className="flex flex-col gap-1">
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-foreground hover:text-accent transition-colors py-3 font-medium cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
