// Описание типа для фильма
export interface Movie {
    id: number;
  name: string;
  description: string;
  year: number;
  rating: Rating;
  genres: Genre[];
  poster: Poster | undefined;
  }

  interface Rating {
    kp: number;
  }

  export interface Genre {
    name:string;
    slug:string;
  }

  interface Poster {
    previewUrl:string;
    url: string;
  }
  
  // Описание типа для параметров фильтрации
  export interface FilterParams {
    genre: string;
    rating: string;
    year: string;
  }
  
  // Описание типа для свойств компонента Filter
  export interface FilterProps {
    onFilter: (params: FilterParams) => void;
  }
  
  // Описание типа для свойств компонента FavoriteButton
  export interface FavoriteButtonProps {
    isFavorite: boolean;
    onToggleFavorite: () => void;
  }
  