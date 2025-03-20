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
import { initNavigationService, registerUpdateCallback, getActiveSection } from "@/utils/navigation-service"

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
  const [activeSection, setActiveSection] = useState(getActiveSection())
  const [direction, setDirection] = useState(0)
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const isMobile = useMobile()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const isScrollingRef = useRef(false)

  // Update active section and direction
  const handleSectionChange = (sectionId: string) => {
    const currentIndex = sections.findIndex((s) => s.id === activeSection)
    const newIndex = sections.findIndex((s) => s.id === sectionId)

    setActiveSection(sectionId)
    setDirection(newIndex > currentIndex ? 1 : -1)
  }

  // Initialize navigation service
  useEffect(() => {
    // Register the update callback
    registerUpdateCallback(handleSectionChange)

    // Initialize the navigation service
    const cleanup = initNavigationService()

    return cleanup
  }, [])

  // Set up intersection observer for scrolling detection
  useEffect(() => {
    // Disconnect previous observer if exists
    if (observerRef.current) {
      observerRef.current.disconnect()
    }
    
    // Variable to track if a URL update is allowed
    let allowUrlUpdate = true;
    
    // Create a new observer with a lower threshold to improve detection
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Ignore if we're in the middle of a programmatic scroll
        if (isScrollingRef.current) return;
        
        // Ignore observer updates during page load when a hash is present
        if (window.location.hash && !allowUrlUpdate) return;

        // Find the most visible section
        let bestEntry = null;
        let maxRatio = 0;
        
        entries.forEach((entry) => {
          // Get the highest intersection ratio
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            bestEntry = entry;
          }
        });
        
        // Only update if we found a visible section with significant visibility
        if (bestEntry && maxRatio >= 0.3) {
          const sectionId = bestEntry.target.id;
          
          // Only update if this is a different section
          if (activeSection !== sectionId) {
            setActiveSection(sectionId);
            
            // Only silently update URL if this is from natural scrolling
            // and not immediately after page load with a hash URL
            if (allowUrlUpdate && window.location.hash !== `#${sectionId}`) {
              // Use replaceState to avoid creating history entries
              window.history.replaceState(null, "", `#${sectionId}`);
            }
          }
        }
      },
      { threshold: [0.1, 0.3, 0.5, 0.7, 0.9] }, // Multiple thresholds for better detection
    );

    // If there's a hash in the URL at initial load, disable URL updates temporarily
    if (window.location.hash) {
      allowUrlUpdate = false;
      // Re-enable URL updates after initial navigation is complete
      setTimeout(() => {
        allowUrlUpdate = true;
      }, 2000);
    }

    // Observe all section elements
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observerRef.current?.observe(ref);
    });

    return () => {
      observerRef.current?.disconnect();
    };
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
        <Navigation sections={sections} activeSection={activeSection} />

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
                      className="absolute inset-0 pt-16 overflow-y-auto no-scrollbar"
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

