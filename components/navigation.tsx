"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

interface NavigationProps {
  sections: { id: string; label: string }[]
  activeSection: string
  onSectionChange: (sectionId: string) => void
}

export default function Navigation({ sections, activeSection, onSectionChange }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const isMobile = useMobile()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleSectionClick = (sectionId: string) => {
    // Find the element by ID
    const element = document.getElementById(sectionId)

    if (element) {
      // Update URL without page reload
      window.history.pushState(null, "", `#${sectionId}`)

      // Update active section
      onSectionChange(sectionId)

      // Close mobile menu if open
      if (isMobile) setIsOpen(false)

      // Smooth scroll to element
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  }

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        opacity: { duration: 0.2 },
        height: { duration: 0.3 },
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        opacity: { duration: 0.3 },
        height: { duration: 0.4 },
      },
    },
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-primary/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="font-bold text-xl"
        >
          <span
            className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 cursor-pointer"
            onClick={() => handleSectionClick("hero")}
          >
            Vikram BM
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center gap-1"
          >
            {sections.map((section) => (
              <motion.div key={section.id} variants={itemVariants}>
                <Button
                  variant={activeSection === section.id ? "default" : "ghost"}
                  onClick={() => handleSectionClick(section.id)}
                  className={`relative px-3 py-1.5 transition-all duration-300 ${
                    activeSection === section.id ? "text-primary-foreground" : "hover:text-primary"
                  }`}
                >
                  {activeSection === section.id && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute inset-0 bg-primary rounded-md"
                      initial={{ borderRadius: 8 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{section.label}</span>
                </Button>
              </motion.div>
            ))}

            <motion.div variants={itemVariants} className="ml-2">
              <Button
                variant="outline"
                size="icon"
                aria-label="Toggle theme"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative overflow-hidden"
              >
                {mounted && (
                  <>
                    <motion.div
                      initial={false}
                      animate={{ rotate: theme === "dark" ? 0 : 180 }}
                      transition={{ duration: 0.5, type: "spring" }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </motion.div>
                  </>
                )}
              </Button>
            </motion.div>
          </motion.nav>
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button variant="ghost" size="icon" aria-label="Toggle menu" onClick={toggleMenu}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-md border-b border-primary/20"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "ghost"}
                  onClick={() => handleSectionClick(section.id)}
                  className="justify-start"
                >
                  {section.label}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

