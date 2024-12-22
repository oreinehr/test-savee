'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface Movie {
  id: number
  title: string
  poster_path: string
}

interface WatchlistContextType {
  watchlist: Movie[]
  addToWatchlist: (movie: Movie) => void
  removeFromWatchlist: (movieId: number) => void
  isInWatchlist: (movieId: number) => boolean
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined)

export const useWatchlist = () => {
  const context = useContext(WatchlistContext)
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider')
  }
  return context
}

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([])

  useEffect(() => {
    const storedWatchlist = localStorage.getItem('watchlist')
    if (storedWatchlist) {
      setWatchlist(JSON.parse(storedWatchlist))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
  }, [watchlist])

  const addToWatchlist = (movie: Movie) => {
    setWatchlist((prev) => [...prev, movie])
  }

  const removeFromWatchlist = (movieId: number) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== movieId))
  }

  const isInWatchlist = (movieId: number) => {
    return watchlist.some((m) => m.id === movieId)
  }

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  )
}

