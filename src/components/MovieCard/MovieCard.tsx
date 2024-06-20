// MovieCard.tsx
import React, { useEffect, useState } from "react";
import { Movie } from "../../service/types/types";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

const MovieCard: React.FC<Movie> = ({ id, poster, name, year, rating }) => {
  // Состояние для отслеживания, является ли фильм избранным
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const movie: Movie = {
    id: id,
    poster: poster,
    name: name,
    year: year,
    rating: rating,
    description: "",
    genres: [],
  };
  // Проверка, находится ли фильм в избранном при монтировании компонента
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.some((fav: Movie) => fav.id === movie.id));
  }, [movie]);

  // Функция для добавления/удаления фильма из избранного
  const toggleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (isFavorite) {
      // Удаление фильма из избранного
      const updatedFavorites = favorites.filter(
        (fav: Movie) => fav.id !== movie.id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      // Добавление фильма в избранное
      const updatedFavorites = [...favorites, movie];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(true);
    }
  };

  const navigate = useNavigate();
  // Заглушка для постера, если он не доступен
  const defaultPoster = "https://wcinema.ru/upload/000/u18/e/4/e4b92ecd.jpg";

  // Функция для перехода к MovieDetails
  const navigateToMovieDetails = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div
      className="card"
      onClick={navigateToMovieDetails}
      style={{ cursor: "pointer" }}
    >
      <img
        src={poster?.previewUrl || defaultPoster}
        alt={`Постер фильма ${name}`}
      />
      <div>
        <h3>{name}</h3>
        <p>Год: {year}</p>
        <p>Рейтинг: {rating.kp}</p>
        <button onClick={toggleFavorite}>
          {isFavorite ? "Удалить из Избранного" : "Добавить в Избранное"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
