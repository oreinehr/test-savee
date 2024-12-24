import React from "react";
import { Play, Star } from 'lucide-react';
import { Button } from "./ui/button";
import Image from "next/image";

interface HeroSectionProps {
  movie: {
    title: string;
    overview: string;
    backdrop_path: string;
    vote_average: number;
  };
}

export function HeroSection({ movie }: HeroSectionProps) {
  return (
    <div className="w-full h-screen">
      <div className="absolute inset-0 ">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 flex h-full items-center px-6 sm:px-12 md:px-24 text-center sm:text-left">
        <div className="w-full sm:max-w-2xl">
          <h1 className="mb-4 text-3xl sm:text-4xl md:text-7xl font-extrabold text-white opacity-800">{movie.title}</h1>
          <div className="mb-6 flex justify-center sm:justify-start items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span className="text-lg font-medium text-white">{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
          <p className="mb-8 text-sm sm:text-base md:text-lg text-muted-foreground text-gray-400">{movie.overview}</p>
          <div className="flex justify-center sm:justify-start">
            <a href="https://www.youtube.com/watch?v=ipukN6qOg00">
              <Button size="lg" className="gap-2">
                <Play className="h-5 w-5 fill-primary-foreground" />
                Assistir Trailer
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
