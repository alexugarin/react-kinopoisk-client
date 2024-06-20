// Favorite.tsx
import React, { useState, useEffect } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import { Movie } from '../../service/types/types';
import '../MovieList/MovieList.css'


const Favorite: React.FC = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  // Загрузка избранных фильмов из localStorage при монтировании компонента
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <div>
      <h2>Избранные Фильмы</h2>
      <div className='container'>
        {favorites.length > 0 ? (
          favorites.map((movie: Movie) => (
            <MovieCard key={movie.id}
            poster={movie.poster}
            name={movie.name}
            year={movie.year}
            rating={movie.rating}
            id={movie.id}
            description={""}
            genres={[]} />
          ))
        ) : (
          <p>Список избранных фильмов пуст.</p>
        )}
      </div>
    </div>
  );
};

export default Favorite;
