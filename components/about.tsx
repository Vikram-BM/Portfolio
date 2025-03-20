"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Image from "next/image"

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  // Timeline data
  const timelineEvents = [
    {
      year: "2024",
      title: "Founding Engineer",
      company: "Sinatra",
      description: "Building multimodal AI agents and scalable vector search pipelines.",
    },
    {
      year: "2024",
      title: "AI Full Stack Developer",
      company: "AI Acceleration Lab",
      description: "Engineering AI-powered web applications with real-time search capabilities.",
    },
    {
      year: "2022-2023",
      title: "Software Engineer",
      company: "BIK/Bikayi",
      description: "Developed rule-based chatbots and integrated Meta APIs.",
    },
    {
      year: "2022",
      title: "Software Developer",
      company: "IBM",
      description: "Specialized in Salesforce, Apex, and Lightning expertise.",
    },
  ]

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

  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.6,
      },
    },
  }

  const timelineItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <section className="relative py-20 overflow-y-auto">
      <div className="container mx-auto px-4">
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              About Me
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-5 gap-8 items-center mb-16">
            <div className="md:col-span-3 space-y-4 text-lg">
              <p>
                Hello, I'm Vikram Bangalore Manjunath. I was born and raised in Bangalore, India, and my programming
                journey began in the 8th grade, with Java being my first language.
              </p>
              <p>
                I earned my Bachelor's degree in Computer Science from Vellore Institute of Technology, where I actively
                participated in hackathons, including the Smart India Hackathon 2020, where my team emerged as
                runner-up.
              </p>
              <p>
                Currently, I am pursuing my Master's in Computer Science at Arizona State University, maintaining a 4.0
                GPA. I work as an AI Full Stack Developer in ASU's AI Lab, focusing on building multimodal AI agents
                using Microsoft's open-source Autogen framework.
              </p>
              <p>
                Additionally, I am interning at Sinatra, a Scottsdale-based tech startup, where I am integrating RNN
                models into video surveillance systems to optimize restaurant operations with AI-driven insights,
                building the underwriter AI for the insurance company.
              </p>
            </div>
            <div className="md:col-span-2 flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary/20"
              >
                <Image
                  src="/images/vikram-profile.png"
                  alt="Vikram Bangalore Manjunath"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={timelineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative mb-20"
          >
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-blue-500 to-primary/30 rounded-full"></div>

            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                variants={timelineItemVariants}
                className={`relative flex items-center mb-20 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Desktop layout */}
                <div className={`hidden md:block md:w-5/12 ${index % 2 === 0 ? "pr-16 text-right" : "pl-16"}`}>
                  <h3 className="text-xl font-bold text-primary">{event.title}</h3>
                  <h4 className="text-lg font-medium">{event.company}</h4>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-blue-500 flex items-center justify-center text-white font-bold shadow-lg"
                  >
                    {index + 1}
                  </motion.div>
                </div>

                {/* Mobile layout */}
                <div className="md:hidden w-full pl-16">
                  <h3 className="text-xl font-bold text-primary">{event.title}</h3>
                  <h4 className="text-lg font-medium">{event.company}</h4>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 mt-16">
                  <div className="bg-background px-4 py-1 rounded-full border border-primary/20 text-sm font-medium text-primary">
                    {event.year}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-bold text-center mb-6">My Journey</h3>
            <div className="space-y-4 text-lg">
              <p>
                During my time at VIT, I interned at IBM, collaborating with a team of over 50 on an onshore project for
                an Australian client, United Energy. My role involved building electricity contract application forms
                using Vlocity, contributing significantly to the client's business.
              </p>
              <p>
                After graduation, I joined BIK, a Y Combinator-backed startup in Bangalore, as the only hire across all
                VIT campuses. There, I worked closely with the CTO, Ashutosh Singla, as an individual contributor on
                full-stack projects, covering everything from proof of concept to deployment.
              </p>
              <p>
                Later, I transitioned to the Chatbot and Automations team, where I helped build a rule-based chatbot
                platform with analytics that secured the company's first major client and boosted revenue by 60%.
              </p>
              <p>
                I am driven by the challenge of solving complex problems through technology and continuously expanding
                my knowledge in the rapidly evolving field of artificial intelligence and software development.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

