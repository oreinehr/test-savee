import React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "./components/ThemeProvider"
import { WatchlistProvider } from "./components/WatchList"



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
      <body >
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

