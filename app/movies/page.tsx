'use client'

import { useState, useEffect } from 'react'
import { Header } from "../components/header"
import { MovieCard } from "../components/MovieCard"
import { Modal } from "../components/modal"
import { Movie } from "../types"

async function getMovies() {
  const apiKey = '3849a025073f1aa51260f2ae63857fb8'
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch movies')
  }

  const data = await res.json()
  return data.results
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    getMovies().then(fetchedMovies => {
      setMovies(fetchedMovies)
    })
  }, [])

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pl-16">
        <div className="px-8 py-20">
          <h1 className="mb-4 text-2xl font-bold">Movies</h1>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={handleMovieClick}
              />
            ))}
          </div>
        </div>
      </main>
      <Modal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
