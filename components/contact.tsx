"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, ExternalLink, Send, CheckCircle, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Get form data
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    // Basic validation
    if (!name || !email || !message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // In a real application, you would send the form data to a server here
    // For example using a service like EmailJS, Formspree, or a custom API endpoint

    // Simulate API call
    setTimeout(() => {
      // Show success message
      setFormSubmitted(true)
      setIsSubmitting(false)

      // Log the form data (for demonstration purposes)
      console.log("Form submitted:", { name, email, message })

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      })
    }, 1500)
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
    hidden: { opacity: 0, y: 50 },
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
        staggerChildren: 0.1,
        delayChildren: 0.6,
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

  return (
    <section className="relative min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              Get In Touch
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
              <Card className="border-none shadow-lg h-full">
                <div className="bg-gradient-to-r from-primary to-blue-500 h-2 w-full"></div>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Feel free to reach out through any of these channels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <a
                      href="mailto:bvnolast@asu.edu"
                      className="flex items-center gap-3 p-4 rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors"
                    >
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">bvnolast@asu.edu</p>
                      </div>
                    </a>

                    <a
                      href="tel:+16023496670"
                      className="flex items-center gap-3 p-4 rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors"
                    >
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">(602) 349-6670</p>
                      </div>
                    </a>
                  </div>

                  <motion.div variants={socialVariants} className="flex justify-center gap-6 pt-4">
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
                      href="https://sites.google.com/view/vikrambm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-background shadow-lg p-3 rounded-full hover:shadow-primary/20 transition-shadow duration-300"
                    >
                      <ExternalLink className="h-6 w-6 text-primary" />
                      <span className="sr-only">Website</span>
                    </motion.a>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-none shadow-lg h-full">
                <div className="bg-gradient-to-r from-primary to-blue-500 h-2 w-full"></div>
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>
                    This form will send an email directly to my inbox. I'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!formSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input id="name" name="name" placeholder="Your name" required />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input id="email" name="email" type="email" placeholder="Your email" required />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <Textarea id="message" name="message" placeholder="Your message" rows={4} required />
                      </div>
                      <Button type="submit" className="w-full group" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </Button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="flex flex-col items-center justify-center py-8 text-center"
                    >
                      <div className="mb-4 text-primary">
                        <CheckCircle className="h-16 w-16" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for reaching out. I'll get back to you soon.
                      </p>
                      <Button onClick={() => setFormSubmitted(false)} variant="outline">
                        Send Another Message
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

