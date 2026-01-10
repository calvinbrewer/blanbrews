'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <button
              type="button"
              onClick={() => scrollToSection('events')}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                isScrolled
                  ? 'text-foreground'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Events
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('accommodation')}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                isScrolled
                  ? 'text-foreground'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Accommodation
            </button>

            {/* Center Logo/Names */}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`font-serif text-xl font-light transition-colors ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              T & C
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('rsvp')}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                isScrolled
                  ? 'text-foreground'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              RSVP
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('faq')}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                isScrolled
                  ? 'text-foreground'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              FAQ
            </button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${isScrolled ? 'text-foreground' : 'text-white'}`}
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-6 pb-6 border-t border-border/30 pt-6 bg-background/95 backdrop-blur-md rounded-b-2xl -mx-4 px-4">
            <div className="flex flex-col space-y-4">
              <button
                type="button"
                onClick={() => scrollToSection('events')}
                className="text-left text-foreground hover:text-accent transition-colors py-2 font-medium"
              >
                Events
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('accommodation')}
                className="text-left text-foreground hover:text-accent transition-colors py-2 font-medium"
              >
                Accommodation
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('rsvp')}
                className="text-left text-foreground hover:text-accent transition-colors py-2 font-medium"
              >
                RSVP
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('faq')}
                className="text-left text-foreground hover:text-accent transition-colors py-2 font-medium"
              >
                FAQ
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
