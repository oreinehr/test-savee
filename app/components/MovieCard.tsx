import Image from "next/image"
import { Star, Clock, Check } from 'lucide-react'
import { useWatchlist } from "../components/WatchList"

interface Movie {
  id: number
  title: string
  poster_path: string
  vote_average: number
  release_date: string
}

interface MovieCardProps {
  movie: Movie
  onMovieClick: (movie: Movie) => void
}

export function MovieCard({ movie, onMovieClick }: MovieCardProps) {
  const { title, poster_path, vote_average, release_date, id } = movie
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()
  const inWatchlist = isInWatchlist(id)

  const handleWatchlistClick = () => {
    if (inWatchlist) {
      removeFromWatchlist(id)
    } else {
      addToWatchlist(movie)
    }
  }

  return (
    <div 
      className="group relative transition duration-300 ease-in-out hover:scale-105 cursor-pointer"
      onClick={() => onMovieClick(movie)}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
        <Image
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium">{vote_average.toFixed(1)}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation() // Impede que o clique no botão abra o modal
                handleWatchlistClick()
              }}
              className={`p-2 rounded-full ${
                inWatchlist ? "bg-green-500 text-white" : "bg-primary text-white"
              } hover:opacity-80 transition`}
            >
              {inWatchlist ? <Check className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <h3 className="font-medium line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground">
          {new Date(release_date).getFullYear()}
        </p>
      </div>
    </div>
  )
}
