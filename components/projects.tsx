"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, X, Github } from "lucide-react"

const projects = [
  {
    title: "Early Prediction of Sepsis",
    description:
      "Created Machine Learning model based on Random Forest algorithm, Pandas dataset for pre-processing and RESTful API to predict early onset of Sepsis in patients based on physiological data - a problem statement proposed by GE HealthCare.",
    period: "June 2019 - February 2020",
    achievement: "Smart India Hackathon 2020 (Runner-up)",
    link: "https://github.com/Vikram-BM/Early-Prediction-of-Sepsis-Pandas",
    technologies: ["Machine Learning", "Random Forest", "Pandas", "RESTful API"],
    details:
      "This project focused on early detection of sepsis, a life-threatening condition. We developed a machine learning model that could predict sepsis onset hours before clinical recognition, potentially saving lives through early intervention. The solution used patient vital signs and laboratory values to calculate risk scores and alert medical staff when a patient's condition was deteriorating.",
  },
  {
    title: "Fully Automated Aquaponics System",
    description:
      "Developed an AI-based automation system leveraging AutoML, LSTM, and Django to monitor and control pH, water level, and humidity, preventing toxic conditions for aquaponics through sensors and cloud integration.",
    period: "July 2020 - May 2021",
    achievement: "Capstone Project",
    link: "https://github.com/Arunesh-Gour/Aquaponics_System",
    technologies: ["AutoML", "LSTM", "Django", "IoT", "Cloud Integration"],
    details:
      "This capstone project created a sustainable food production system combining aquaculture and hydroponics. The system used IoT sensors to monitor water quality, temperature, and plant health, with LSTM neural networks predicting optimal conditions. A Django-based dashboard allowed remote monitoring and control, while automated systems maintained ideal growing conditions without human intervention.",
  },
  {
    title: "Audio Feedback Device for The Visually Impaired",
    description:
      "Innovated an accessible mobile application using RetinaNet and PYTTSX for object detection and audio generation, assisting visually impaired individuals in daily tasks.",
    period: "January 2020 - June 2020",
    achievement: "",
    link: "https://drive.google.com/file/d/1fmnlI-O4hgZYU8eoRlCbn7UKQFLKbKn7/view?pli=1",
    technologies: ["RetinaNet", "PYTTSX", "Tkinter", "Cv2", "ImageAI", "PIL"],
    details:
      "This assistive technology project aimed to help visually impaired individuals navigate their environment. The application used computer vision to identify objects, people, and text in the user's surroundings, then provided real-time audio descriptions. The system was optimized to run efficiently on mobile devices, with customizable voice feedback and detection sensitivity to suit individual user preferences.",
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

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

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <section className="relative min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              Projects
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                className="h-full"
              >
                <Card
                  className="h-full flex flex-col overflow-hidden cursor-pointer border-none shadow-lg"
                  onClick={() => setSelectedProject(index)}
                >
                  <div className="bg-gradient-to-r from-primary to-blue-500 h-2 w-full"></div>
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between">
                      <span>{project.title}</span>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="h-5 w-5" />
                          <span className="sr-only">Project Link</span>
                        </a>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {project.achievement && (
                        <Badge className="mb-2 bg-primary/20 text-primary-foreground dark:bg-primary/30 dark:text-primary hover:bg-primary/30 dark:hover:bg-primary/40 transition-colors font-medium">
                          {project.achievement}
                        </Badge>
                      )}
                      <div className="text-sm text-muted-foreground">{project.period}</div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p>{project.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <Badge key={idx} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline">+{project.technologies.length - 3}</Badge>
                      )}
                    </div>
                    <Button size="sm" variant="ghost">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Project Details Modal */}
          <AnimatePresence>
            {selectedProject !== null && (
              <>
                <motion.div
                  variants={overlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
                  onClick={() => setSelectedProject(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setSelectedProject(null)
                  }}
                  tabIndex={-1}
                />
                <motion.div
                  variants={modalVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-auto z-50 p-4"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={`project-title-${selectedProject}`}
                >
                  <Card className="border-none shadow-xl">
                    <div className="bg-gradient-to-r from-primary to-blue-500 h-2 w-full"></div>
                    <CardHeader className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => setSelectedProject(null)}
                        aria-label="Close modal"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                      <CardTitle id={`project-title-${selectedProject}`} className="pr-8">
                        {projects[selectedProject].title}
                      </CardTitle>
                      <CardDescription>
                        {projects[selectedProject].achievement && (
                          <Badge className="mr-2 bg-primary/20 text-primary-foreground dark:bg-primary/30 dark:text-primary font-medium">{projects[selectedProject].achievement}</Badge>
                        )}
                        <span className="text-sm text-muted-foreground">{projects[selectedProject].period}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Overview</h3>
                        <p>{projects[selectedProject].description}</p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Details</h3>
                        <p>{projects[selectedProject].details}</p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                          {projects[selectedProject].technologies.map((tech, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-primary/10">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      {projects[selectedProject].link && (
                        <Button asChild>
                          <a
                            href={projects[selectedProject].link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            Visit Project{" "}
                            <Github className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

