'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import  {Header} from "./components/header"
import { HeroSection } from "./components/hero-section"
import { MovieCard } from "./components/MovieCard"
import { Modal } from "./components/modal"

interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  release_date: string
}

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

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getMovies().then(fetchedMovies => {
      setMovies(fetchedMovies);
      setSelectedMovie(fetchedMovies[0]);
    });
  }, []);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mx-auto px-6">
        {selectedMovie && <HeroSection movie={selectedMovie} />}
        <div className="px-8 py-12">
          <h2 className="mb-8 text-2xl font-bold">Recommendations</h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {movies.map((movie: Movie) => (
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
  );
}
