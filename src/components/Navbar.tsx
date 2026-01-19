import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, Sparkles } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link, useLocation } from "react-router-dom"
import { ModeToggle } from "@/components/mode-toggle"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'

  useEffect(() => {
    const handleScroll = () => {
      // Change navbar style when scrolled past hero section (approximately 500px)
      setIsScrolled(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Helper to determine text color class
  const getTextColorClass = () => {
    if (isScrolled) return 'text-blue-900 dark:text-white'
    if (isAuthPage) return 'text-foreground'
    return 'text-white' // Landing page hero is dark
  }

  const getLinkColorClass = () => {
    if (isScrolled) return 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
    if (isAuthPage) return 'text-muted-foreground hover:text-primary'
    return 'text-gray-300 hover:text-blue-400'
  }

  const getIconColorClass = () => {
    if (isScrolled) return 'text-blue-600 dark:text-blue-400'
    if (isAuthPage) return 'text-primary'
    return 'text-blue-500'
  }

  const getMenuIconColorClass = () => {
    if (isScrolled) return 'text-gray-700'
    if (isAuthPage) return 'text-foreground'
    return 'text-white'
  }

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled
      ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-blue-200/50 dark:border-blue-900/50 shadow-sm'
      : 'bg-transparent backdrop-blur-sm'
      }`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Sparkles className={`h-6 w-6 transition-colors ${getIconColorClass()}`} />
          <Link to="/" className={`text-xl font-bold transition-colors ${getTextColorClass()}`}>
            StrollUP
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="/#features" className={`text-sm font-medium transition-colors ${getLinkColorClass()}`}>
            Features
          </a>
          <a href="/#pricing" className={`text-sm font-medium transition-colors ${getLinkColorClass()}`}>
            Pricing
          </a>
          <a href="/#about" className={`text-sm font-medium transition-colors ${getLinkColorClass()}`}>
            About
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 md:gap-6 mr-8">
          <div className={`hidden md:flex items-center gap-8 text-base font-medium transition-colors ${isScrolled || isAuthPage ? 'text-gray-700 dark:text-gray-300' : 'text-gray-200'}`}>
            <Link to="/login" className="hover:text-blue-500 transition-colors">
              Login
            </Link>
          </div>

          <Link to="/signup">
            <Button className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 px-6">
              Sign Up
            </Button>
          </Link>

          <ModeToggle />

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className={getMenuIconColorClass()}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white">
              <div className="flex flex-col gap-6 pt-6">
                <a href="#features" className="text-base font-medium text-gray-700 hover:text-blue-600">
                  Features
                </a>
                <a href="#pricing" className="text-base font-medium text-gray-700 hover:text-blue-600">
                  Pricing
                </a>
                <a href="#about" className="text-base font-medium text-gray-700 hover:text-blue-600">
                  About
                </a>
                <hr className="border-gray-100" />
                <Link to="/login" className="text-base font-medium text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link to="/signup" className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
