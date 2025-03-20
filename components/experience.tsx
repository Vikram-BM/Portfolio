"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Briefcase } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

const experiences = [
  {
    company: "Sinatra",
    position: "Founding Engineer",
    location: "Scottsdale, Arizona",
    period: "June 2024 - Present",
    responsibilities: [
      "Built multi-model, multimodal AI agents using Autogen, Cohere embeddings, and RAG pipelines, reducing fraud incidents by 40% and increasing customer retention by 25% through AI-driven personalized recommendations",
      "Developed scalable vector search pipelines using FAISS & DataStax VectorDB, improving retrieval speeds 5x and search accuracy 35%, enabling real-time AI-powered responses",
      "Architected and deployed cloud-native backend services with CI/CD (Terraform, Jenkins, Docker), reducing deployment times by 60% and cutting operational costs by 30% through serverless optimizations on AWS S3 Glacier & Kubernetes while enhancing API performance with FastAPI & GraphQL",
    ],
    technologies: [
      "Autogen",
      "Cohere",
      "RAG",
      "FAISS",
      "DataStax VectorDB",
      "Terraform",
      "Jenkins",
      "Docker",
      "Kubernetes",
      "AWS",
      "FastAPI",
      "GraphQL",
    ],
    color: "from-cyan-500 to-blue-500",
  },
  {
    company: "AI Acceleration Lab at Arizona State University",
    position: "AI Full Stack Developer",
    location: "Tempe, Arizona",
    period: "January 2024 - Present",
    responsibilities: [
      "Engineered scalable AI-powered web applications, integrating vector databases (FAISS, DataStax VectorDB), multimodal AI agents (Raga LLM, Autogen), and embeddings (Cohere, OpenAI) to enable real-time search with 50% faster query responses",
      "Designed and optimized ETL pipelines for structured and unstructured data processing, implementing Apache Airflow, Snowflake, and Xano, reducing data ingestion latency by 40% and automating 95% of data transformation processes",
      "Enhanced cloud infrastructure and DevOps automation, deploying workloads via Terraform, Docker, and Kubernetes (GKE, AWS, GCP), cutting downtime by 80% and improving reliability through real-time observability & monitoring frameworks",
    ],
    technologies: [
      "FAISS",
      "DataStax VectorDB",
      "Raga LLM",
      "Autogen",
      "Cohere",
      "OpenAI",
      "Apache Airflow",
      "Snowflake",
      "Xano",
      "Terraform",
      "Docker",
      "Kubernetes",
      "GKE",
      "AWS",
      "GCP",
    ],
    color: "from-blue-500 to-indigo-500",
  },
  {
    company: "BIK/Bikayi",
    position: "Software Engineer",
    location: "Bangalore, India",
    period: "June 2022 - August 2023",
    responsibilities: [
      "Developed and deployed a rule-based chatbot builder with analytics using React, Node.js, TypeScript, and FastAPI, increasing customer engagement by 70% and boosting company revenue by 60% after securing the first enterprise client",
      "Integrated Messenger & Instagram into the BIK Dashboard via Meta APIs, expanding chatbot adoption by 50% and increasing automated response efficiency by 45%",
      "Built and optimized full-stack web pages (Careers, Digital Marketing, Pricing) with React, PostgreSQL, and Firebase, reducing load times by 35% and improving mobile responsiveness by 50%",
    ],
    technologies: ["React", "Node.js", "TypeScript", "FastAPI", "Meta APIs", "PostgreSQL", "Firebase"],
    color: "from-indigo-500 to-purple-500",
  },
  {
    company: "IBM",
    position: "Software Developer",
    location: "Bangalore, India",
    period: "January 2022 - June 2022",
    responsibilities: [
      "Scored distinction (95%) in the IBM Internal Salesforce Examination for System Administration, Apex, and Lightning expertise",
      "Developed electricity contract application forms for the United Energy project, contributing to 80% of the client's total revenue by automating contract management workflows",
      "Performed functional testing and API validation, reducing defect rates by 30% and improving system reliability",
    ],
    technologies: ["Salesforce", "Apex", "Lightning", "API Validation"],
    color: "from-purple-500 to-pink-500",
  },
]

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const isMobile = useMobile()

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
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
              Work Experience
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: expandedIndex === index ? 1 : 1.02 }}
                className="perspective-1000"
              >
                <Card className="overflow-hidden border-none shadow-lg">
                  <div className={`bg-gradient-to-r ${exp.color} h-2 w-full`}></div>
                  <CardHeader className="relative">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                      <div className="flex items-start gap-3">
                        <div className="bg-gradient-to-br from-primary/20 to-blue-500/20 p-2 rounded-full">
                          <Briefcase className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold">{exp.position}</CardTitle>
                          <CardDescription className="text-lg font-medium text-primary">{exp.company}</CardDescription>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>{exp.location}</p>
                        <p>{exp.period}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpand(index)}
                      className="absolute top-4 right-4 md:hidden"
                    >
                      {expandedIndex === index ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                  </CardHeader>

                  <AnimatePresence initial={false}>
                    {(expandedIndex === index || !isInView || isMobile) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <CardContent>
                          <ul className="list-disc pl-5 space-y-2 mb-4">
                            {exp.responsibilities.map((resp, idx) => (
                              <li key={idx}>{resp}</li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {exp.technologies.map((tech, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="bg-primary/10 hover:bg-primary/20 transition-colors"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <CardFooter className="pt-0 pb-4 px-6 hidden md:flex">
                    <Button variant="ghost" size="sm" onClick={() => toggleExpand(index)} className="ml-auto">
                      {expandedIndex === index ? (
                        <>
                          <ChevronUp className="mr-2 h-4 w-4" /> Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="mr-2 h-4 w-4" /> Show More
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

