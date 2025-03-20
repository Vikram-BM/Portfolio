"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Education from "@/components/education"
import Contact from "@/components/contact"
import Navigation from "@/components/navigation"
import ParticleBackground from "@/components/particle-background"
import ScrollIndicator from "@/components/scroll-indicator"
import ScrollToTop from "@/components/scroll-to-top"
import PageLoader from "@/components/page-loader"
import { useMobile } from "@/hooks/use-mobile"
import Footer from "@/components/footer"

// Define the sections for navigation
const sections = [
  { id: "hero", component: Hero, label: "Home" },
  { id: "about", component: About, label: "About" },
  { id: "experience", component: Experience, label: "Experience" },
  { id: "projects", component: Projects, label: "Projects" },
  { id: "skills", component: Skills, label: "Skills" },
  { id: "education", component: Education, label: "Education" },
  { id: "contact", component: Contact, label: "Contact" },
]

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")
  const [direction, setDirection] = useState(0)
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const isMobile = useMobile()
  const scrollingRef = useRef(false)

  // Handle section change for desktop and mobile view
  const handleSectionChange = (sectionId: string) => {
    const currentIndex = sections.findIndex((s) => s.id === activeSection)
    const newIndex = sections.findIndex((s) => s.id === sectionId)

    setActiveSection(sectionId)
    setDirection(newIndex > currentIndex ? 1 : -1)
  }

  // Handle hash change for direct links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash && sections.some((s) => s.id === hash)) {
        handleSectionChange(hash)
      }
    }

    // Check hash on initial load
    handleHashChange()

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange)

    // Listen for custom section change events
    const handleSectionChangeEvent = (e: CustomEvent) => {
      handleSectionChange(e.detail.sectionId)
    }

    window.addEventListener("sectionChange", handleSectionChangeEvent as EventListener)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
      window.removeEventListener("sectionChange", handleSectionChangeEvent as EventListener)
    }
  }, [])

  // Set up intersection observer for scrolling detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Skip if we're programmatically scrolling
        if (scrollingRef.current) return

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const sectionId = entry.target.id
            if (activeSection !== sectionId) {
              setActiveSection(sectionId)
              // Update URL without causing a page reload
              window.history.replaceState(null, "", `#${sectionId}`)
            }
          }
        })
      },
      { threshold: 0.5 },
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [activeSection])

  // Animation variants for page transitions
  const pageVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  }

  return (
    <>
      <PageLoader />
      <main className="relative min-h-screen">
        <ParticleBackground />
        <ScrollIndicator />
        <ScrollToTop />

        {/* Navigation */}
        <Navigation sections={sections} activeSection={activeSection} onSectionChange={handleSectionChange} />

        {/* Desktop view with animated transitions */}
        {!isMobile && (
          <div className="h-screen overflow-hidden">
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              {sections.map(({ id, component: Component }) => {
                if (id === activeSection) {
                  return (
                    <motion.div
                      key={id}
                      id={id}
                      ref={(el) => (sectionRefs.current[id] = el as HTMLDivElement)}
                      custom={direction}
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="absolute inset-0 pt-16 overflow-y-auto"
                    >
                      <Component />
                      {id === "contact" && <Footer />}
                    </motion.div>
                  )
                }
                return null
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Mobile view with standard scrolling */}
        {isMobile && (
          <div className="pt-16">
            {sections.map(({ id, component: Component }) => (
              <div key={id} id={id} ref={(el) => (sectionRefs.current[id] = el)} className="min-h-screen">
                <Component />
                {id === "contact" && <Footer />}
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}

