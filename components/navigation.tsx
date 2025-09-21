'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              type="button"
              onClick={() => scrollToSection('events')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Events
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('accommodation')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Accommodation
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('rsvp')}
              className="text-foreground hover:text-primary transition-colors"
            >
              RSVP
            </button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              <button
                type="button"
                onClick={() => scrollToSection('events')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Events
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('accommodation')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Accommodation
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('rsvp')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                RSVP
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
