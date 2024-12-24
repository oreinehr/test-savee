import React from 'react';
import { render, screen } from '@testing-library/react';
import { MovieCard } from "../app/components/MovieCard";
import { WatchlistProvider } from "../app/components/WatchList";

test('renders movie card', () => {
  const mockMovie = {
    id: 1,
    title: 'Inception',
    overview: 'A mind-bending thriller',
    poster_path: '/path/to/poster.jpg',
    backdrop_path: '/path/to/backdrop.jpg',
    vote_average: 8.8,
    release_date: '2010-07-16',
  };

  // Envolva o MovieCard com o WatchlistProvider
  render(
    <WatchlistProvider>
      <MovieCard movie={mockMovie} onMovieClick={() => {}} />
    </WatchlistProvider>
  );

  const titleElement = screen.getByText(/Inception/i);
  expect(titleElement).toBeInTheDocument();
});
