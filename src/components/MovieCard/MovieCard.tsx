// MovieCard.tsx
import React from "react";
import { Movie } from "../../service/types/types";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

const MovieCard: React.FC<Movie> = ({ id, poster, name, year, rating }) => {
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
      <h3>{name}</h3>
      <p>Год: {year}</p>
      <p>Рейтинг: {rating.kp}</p>
    </div>
  );
};

export default MovieCard;
