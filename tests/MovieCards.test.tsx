import { render, screen } from '@testing-library/react';
import MovieCard from '../components/MovieCard';


describe('MovieCard Component', () => {
  it('renders movie details correctly', () => {
    render(
      <MovieCard
        title="Test Movie"
        releaseDate="2024-01-01"
        poster="/path/to/poster.jpg"
        overview="This is a test movie."
      />
    );
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('This is a test movie.')).toBeInTheDocument();
  });
});
