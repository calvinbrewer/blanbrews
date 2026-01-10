import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/30 py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-8">
          {/* Names */}
          <div>
            <h3 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4 tracking-tight">
              Tori & CJ
            </h3>
            <div className="w-16 h-0.5 bg-accent/40 mx-auto mb-4" />
            <p className="text-muted-foreground text-base md:text-lg">
              October 1-4, 2026 • Borgo Siliano, Tuscany
            </p>
          </div>

          {/* Message */}
          <div className="py-6 border-t border-b border-border/20">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Heart className="h-4 w-4 text-accent fill-current" />
              <span className="text-sm md:text-base">We can&apos;t wait to celebrate with you</span>
              <Heart className="h-4 w-4 text-accent fill-current" />
            </div>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground/70">
            © 2026 CJ & Tori Wedding
          </p>
        </div>
      </div>
    </footer>
  )
}
