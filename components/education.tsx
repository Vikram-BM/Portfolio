"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, BookOpen } from "lucide-react"

const education = [
  {
    institution: "Arizona State University",
    location: "Tempe, Arizona",
    degree: "Master of Science in Computer Science",
    gpa: "4.0/4.0",
    courses: ["Artificial Intelligence", "Foundations of Algorithms", "Data Processing at Scale", "Data Visualization"],
  },
  {
    institution: "Vellore Institute of Technology (VIT)",
    location: "",
    degree: "Bachelor of Technology, Computer Science and Engineering",
    gpa: "8.8/10",
    courses: [
      "Data Structures and Algorithms",
      "Operating Systems",
      "Computer Networks",
      "DBMS",
      "Advanced Data Analytics",
    ],
  },
]

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

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

  const courseVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    }),
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
              Education
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="space-y-12">
            {education.map((edu, index) => (
              <motion.div key={index} variants={itemVariants} className="perspective-1000">
                <Card className="border-none shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-primary to-blue-500 h-2 w-full"></div>
                  <CardHeader className="flex flex-row items-start space-x-4 pb-2">
                    <div className="bg-gradient-to-br from-primary/20 to-blue-500/20 p-3 rounded-full">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-xl">{edu.institution}</CardTitle>
                      {edu.location && <p className="text-sm text-muted-foreground">{edu.location}</p>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium text-lg">{edu.degree}</p>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: "100%" } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-1 bg-gradient-to-r from-primary/50 to-blue-500/50 rounded-full mt-1"
                        />
                        <div className="flex items-center mt-2">
                          <div className="text-sm font-medium bg-primary/10 px-3 py-1 rounded-full">GPA: {edu.gpa}</div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center mb-3">
                          <BookOpen className="h-5 w-5 text-primary mr-2" />
                          <p className="font-medium">Key Courses</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {edu.courses.map((course, idx) => (
                            <motion.span
                              key={idx}
                              custom={idx}
                              variants={courseVariants}
                              whileHover={{
                                scale: 1.05,
                                backgroundColor: "var(--primary)",
                                color: "var(--primary-foreground)",
                                transition: { duration: 0.2 },
                              }}
                              className="bg-primary/10 px-3 py-1 rounded-full text-sm transition-colors"
                            >
                              {course}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

