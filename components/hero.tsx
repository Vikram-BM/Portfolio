"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import TypewriterComponent from "typewriter-effect"
import { navigateToSection } from "@/utils/navigation-service"

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Function to handle smooth scrolling to sections
  const handleNavigation = (sectionId: string) => {
    // Use the navigation service to navigate to the section
    navigateToSection(sectionId)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const socialVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 1.2,
      },
    },
  }

  const socialItemVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  }

  // Floating animation for background elements
  const floatingAnimation = {
    y: ["-10px", "10px"],
    transition: {
      y: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  }

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen py-20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={floatingAnimation}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 0.5 },
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"
        />
      </div>

      {mounted && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-8 max-w-4xl px-4"
        >
          <motion.div variants={itemVariants} className="space-y-2">
            <h2 className="text-lg md:text-xl font-medium text-primary">Hello, I'm</h2>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight md:leading-snug bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary pb-1">
              Vikram Bangalore Manjunath
            </h1>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-semibold">
            Founding Engineer & AI Full Stack Developer
          </motion.h2>

          <motion.div variants={itemVariants} className="text-lg md:text-xl text-muted-foreground">
            <TypewriterComponent
              options={{
                strings: [
                  "Specializing in AI-driven web applications",
                  "Building cloud-native infrastructure",
                  "Developing scalable backend solutions",
                  "Creating multimodal AI agents",
                ],
                autoStart: true,
                loop: true,
                delay: 40,
                deleteSpeed: 20,
              }}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 pt-6">
            <Button size="lg" className="group relative overflow-hidden" onClick={() => handleNavigation("contact")}>
              <span className="relative z-10 flex items-center">
                Contact Me
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="group relative overflow-hidden"
              onClick={() => handleNavigation("experience")}
            >
              <span className="relative z-10">View Experience</span>
              <span className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
          </motion.div>

          <motion.div variants={socialVariants} className="flex justify-center gap-6 pt-8">
            <motion.a
              variants={socialItemVariants}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.linkedin.com/in/vikrambm/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-background shadow-lg p-3 rounded-full hover:shadow-primary/20 transition-shadow duration-300"
            >
              <Linkedin className="h-6 w-6 text-primary" />
              <span className="sr-only">LinkedIn</span>
            </motion.a>
            <motion.a
              variants={socialItemVariants}
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/Vikram-BM"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-background shadow-lg p-3 rounded-full hover:shadow-primary/20 transition-shadow duration-300"
            >
              <Github className="h-6 w-6 text-primary" />
              <span className="sr-only">GitHub</span>
            </motion.a>
            <motion.a
              variants={socialItemVariants}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:bvnolast@asu.edu"
              className="bg-background shadow-lg p-3 rounded-full hover:shadow-primary/20 transition-shadow duration-300"
            >
              <Mail className="h-6 w-6 text-primary" />
              <span className="sr-only">Email</span>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="text-muted-foreground cursor-pointer"
              onClick={() => handleNavigation("about")}
            >
              <ArrowRight className="h-6 w-6 rotate-90" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

