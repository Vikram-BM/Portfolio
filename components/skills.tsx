"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const skillCategories = [
  {
    id: "ai-ml",
    category: "AI/ML",
    icon: "🧠",
    skills: [
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Keras",
      "NLP (Transformers, SpaCy)",
      "Autogen (Microsoft)",
      "LangChain",
      "GANs",
      "Random Forest",
      "LSTM",
      "AutoML",
      "Reinforcement Learning",
      "LLMs",
      "RAGs",
      "Neo4j",
      "TorchServe",
    ],
  },
  {
    id: "programming",
    category: "Programming & APIs",
    icon: "💻",
    skills: ["Python", "Java", "C++", "C", "JavaScript", "TypeScript", "RESTful APIs", "WebSocket", "Git", "Jenkins"],
  },
  {
    id: "web",
    category: "Web Development",
    icon: "🌐",
    skills: ["React.js", "React Native", "Express.js", "Next.js", "Node.js", "Spring Boot", "FastAPI", "Storybook"],
  },
  {
    id: "database",
    category: "Database Systems",
    icon: "🗄️",
    skills: ["SQL", "PostgreSQL", "MongoDB", "Redis", "Cloud Firestore", "Firebase", "ElasticSearch", "BigQuery"],
  },
  {
    id: "cloud",
    category: "Cloud & DevOps",
    icon: "☁️",
    skills: [
      "Amazon Web Services (AWS)",
      "Google Cloud Platform (GCP)",
      "Microsoft Azure",
      "Terraform",
      "Docker",
      "Kubernetes",
      "Google Kubernetes Engine (GKE)",
      "MLflow",
      "Pandas",
      "NumPy",
      "Dask",
      "Apache Spark",
      "Hadoop",
      "ETL",
      "Data Pipelines",
      "Apache Airflow",
      "Snowflake",
      "AWS Glue",
      "Redshift",
      "Delta Lake",
      "Data Warehousing",
      "DBT",
      "Kafka",
    ],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const [activeTab, setActiveTab] = useState("ai-ml")

  useEffect(() => {
    // Update the active tab when the component comes into view
    if (isInView && !activeTab) {
      setActiveTab("ai-ml")
    }
  }, [isInView, activeTab])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
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
              Technical Skills
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Tabs defaultValue="ai-ml" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
                {skillCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <span className="mr-2">{category.icon}</span>
                    <span className="hidden md:inline">{category.category}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {skillCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-0">
                  <Card className="border-none shadow-lg">
                    <div className="bg-gradient-to-r from-primary to-blue-500 h-2 w-full"></div>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <span className="mr-2 text-2xl">{category.icon}</span>
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        {category.skills.map((skill, idx) => (
                          <motion.div
                            key={idx}
                            custom={idx}
                            variants={skillVariants}
                            whileHover={{
                              scale: 1.05,
                              backgroundColor: "var(--primary)",
                              color: "var(--primary-foreground)",
                              transition: { duration: 0.2 },
                            }}
                            className="bg-primary/10 px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors"
                          >
                            {skill}
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

          {/* Skill Visualization */}
          <motion.div variants={itemVariants} className="mt-12 flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>

              {skillCategories.map((category, categoryIndex) => {
                const isActive = category.id === activeTab
                const totalSkills = category.skills.length
                const angleStep = (2 * Math.PI) / totalSkills

                return category.skills.map((skill, skillIndex) => {
                  const angle = skillIndex * angleStep
                  const radius = isActive ? 42 : 30
                  const x = 50 + radius * Math.cos(angle)
                  const y = 50 + radius * Math.sin(angle)

                  return (
                    <motion.div
                      key={`${category.id}-${skillIndex}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: isActive ? 1 : 0.3,
                        scale: isActive ? 1 : 0.6,
                        x: `${x}%`,
                        y: `${y}%`,
                        transition: {
                          type: "spring",
                          stiffness: 100,
                          damping: 10,
                          delay: isActive ? skillIndex * 0.03 : 0,
                        },
                      }}
                      className={`absolute w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2 ${
                        isActive ? "bg-primary" : "bg-primary/30"
                      }`}
                    />
                  )
                })
              })}

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    transition: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                  }}
                  className="text-4xl mb-2"
                >
                  {skillCategories.find((c) => c.id === activeTab)?.icon}
                </motion.div>
                <p className="text-sm font-medium text-primary">
                  {skillCategories.find((c) => c.id === activeTab)?.skills.length} Skills
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

