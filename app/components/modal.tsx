import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { Star, Clock } from 'lucide-react'
import Image from "next/image"

interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  release_date: string
}

interface ModalProps {
  movie: Movie | null
  isOpen: boolean
  onClose: () => void
}

export function Modal({ movie, isOpen, onClose }: ModalProps) {
  if (!movie) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{movie.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
            <span>{new Date(movie.release_date).getFullYear()}</span>
          </div>
          <p className="text-sm text-muted-foreground">{movie.overview}</p>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="gap-2">
            <Clock className="w-4 h-4" />
            Add to Watchlist
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

