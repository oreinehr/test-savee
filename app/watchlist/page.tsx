"use client"

import React from "react"
import { useWatchlist } from "../components/WatchList"
import Image from "next/image"
import Link from "next/link"

export default function Watchlist() {
  const { watchlist, removeFromWatchlist } = useWatchlist()

  if (watchlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold">Your Watchlist is empty</h1>
        <p className="text-muted-foreground">Add some movies to get started!</p>
        <Link href="/movies" className="mt-4 text-primary hover:underline">
          Browse Movies
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Your Watchlist</h1>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {watchlist.map((movie) => (
          <div
            key={movie.id}
            className="group relative bg-card rounded-lg overflow-hidden shadow-md"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={200}
              height={300}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity">
              <h2 className="text-lg font-bold text-white">{movie.title}</h2>
              <button
                onClick={() => removeFromWatchlist(movie.id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
