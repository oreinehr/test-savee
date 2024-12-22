import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "./components/ThemeProvider"
import { WatchlistProvider } from "./components/WatchList"
import { ThemeToggle } from "./components/ThemeToggle"
import Image from "next/image"
import Img from "../public/logo.png"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Savee Movies",
  description: "Your favorite movies in one place",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <WatchlistProvider>
            <div className="min-h-screen bg-background text-foreground">
          
              {children}
            </div>
          </WatchlistProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

