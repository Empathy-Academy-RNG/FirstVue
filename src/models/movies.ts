export interface MoviesInterface {
  id: string;
  title: string;
  genres: string[];
  type: string;
  average_rating: number;
  num_votes: string | number;
  start_year: number;
  end_year?: number;
}
