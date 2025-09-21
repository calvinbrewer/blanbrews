import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-muted py-12 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="mb-8">
          <h3 className="text-3xl font-bold text-primary font-serif mb-4">
            Tori & CJ
          </h3>
          <p className="text-muted-foreground text-lg">
            October 1-4, 2026 • Tuscany, Italy
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <span>Excited to celebrate with you all </span>
            <Heart className="h-4 w-4 text-accent fill-current" />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            © 2026 CJ & Tori Wedding
          </p>
        </div>
      </div>
    </footer>
  )
}
