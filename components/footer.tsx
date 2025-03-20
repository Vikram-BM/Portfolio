"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-6 md:py-8 bg-background/80 backdrop-blur-sm">
      <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center gap-2 text-center text-sm leading-loose text-muted-foreground"
        >
          <div className="flex items-center">© {currentYear} Vikram Bangalore Manjunath. All rights reserved.</div>
          <div className="hidden md:block">•</div>
          <div className="flex items-center gap-1">
            Made with
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                duration: 0.8,
              }}
            >
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            </motion.div>
            using Next.js & Tailwind CSS
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

