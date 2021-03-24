declare module namespace {
  export interface Item {
    id: string;
    title: string;
    genres: string[];
    type: string;
    averageRating: string;
    votes: string;
    startYear: number;
    endYear: number;
  }

  export interface Genres {
    comedy: number;
    drama: number;
    action: number;
    adventure: number;
    sciFi: number;
  }

  export interface Aggregations {
    genres: Genres;
  }

  export interface Types {
    movie: number;
    short: number;
    tvSeries: number;
  }

  export interface Languages {
    english: number;
    spanish: number;
  }

  export interface Search {
    id: string;
    items: Item[];
    aggregations: Aggregations;
    types: Types;
    languages: Languages;
  }

  export interface Movie {
    id: string;
    title: string;
    genres: string[];
    type: string;
    averageRating: string;
    votes: string;
    startYear: number;
    endYear: number;
  }

  export interface MoviesInterface {
    search: Search[];
    movies: Movie[];
  }
}
