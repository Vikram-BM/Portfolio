import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vikram Bangalore Manjunath | Founding Engineer & AI Full Stack Developer",
  description:
    "Personal portfolio of Vikram Bangalore Manjunath, specializing in AI-driven web applications, cloud-native infrastructure, and scalable backend development.",
  keywords:
    "Vikram Bangalore Manjunath, AI Developer, Full Stack Developer, Machine Learning, Cloud Infrastructure, Portfolio",
  authors: [{ name: "Vikram Bangalore Manjunath" }],
  creator: "Vikram Bangalore Manjunath",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vikrambm.com",
    title: "Vikram Bangalore Manjunath | Founding Engineer & AI Full Stack Developer",
    description:
      "Personal portfolio of Vikram Bangalore Manjunath, specializing in AI-driven web applications, cloud-native infrastructure, and scalable backend development.",
    siteName: "Vikram Bangalore Manjunath Portfolio",
    images: [{ url: "/images/vikram-profile.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vikram Bangalore Manjunath | Founding Engineer & AI Full Stack Developer",
    description:
      "Personal portfolio of Vikram Bangalore Manjunath, specializing in AI-driven web applications, cloud-native infrastructure, and scalable backend development.",
    creator: "@vikrambm",
    images: [{ url: "/images/vikram-profile.png" }],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'