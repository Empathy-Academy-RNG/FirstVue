export interface MovieDetailsInterface {
  id: string;
  title: string;
  genres: string[];
  type: string;
  average_rating: number;
  num_votes: string | number;
  start_year: number;
  end_year?: number;
  is_adult: boolean;
  original_title: string;
  runtime_minutes?: number;
}
