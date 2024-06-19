import React, { useState, useEffect } from "react";
import { fetchWithApiKey } from "../../service/api"; // Импортируем функцию для запросов
import { Movie } from "../../service/types/types";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";

// Определение интерфейса для пропсов
interface MovieDetailsProps {
  [key: string]: string | undefined;
}

const MovieDetails: React.FC = () => {
  let { id } = useParams<MovieDetailsProps>(); // Определение идентификатора
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await fetchWithApiKey({
          endpoint: `https://api.kinopoisk.dev/v1.4/movie/${id}`,
        });
        setMovie(data); // Обновление фильма
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails(); // Запрос к серверу
  }, [id]);

  if (!movie) {
    return <div className="loader"></div>;
  }

  return (
    <div className="movie-container">
      <h2>{movie.name}</h2>
      {movie.poster?.url && (
        <img
          src={movie.poster.url}
          alt={`Постер фильма ${movie.name}`}
          className="movie-poster"
        />
      )}
      <div className="movie-details">
        <h3>Описание:</h3>
        <p>{movie.description}</p>
      </div>
      <div className="movie-details">
        <h3>Рейтинг КП:</h3>
        <p>{movie.rating.kp}</p>
      </div>
      <div className="movie-details">
        <h3>Год:</h3>
        <p>{movie.year}</p>
      </div>
      <ul className="movie-genres">
        {movie.genres.map((genre, index) => (
          <li key={index}>{genre.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDetails;
