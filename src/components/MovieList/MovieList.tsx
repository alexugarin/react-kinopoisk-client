import React, { useState, useEffect } from "react";
import { fetchWithApiKey } from "../../service/api";
import { Movie, FilterParams } from "../../service/types/types";
import Filter from "../Filter/Filter";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css";

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string>("");
  const [filters, setFilters] = useState<FilterParams>({
    genre: "комедия",
    year: "2010",
    rating: "7-10",
  });
  const [currentPage, setCurrentPage] = useState(1); // состояние для текущей страницы
  const [totalPages, setTotalPages] = useState(0); // состояние для общего количества страниц

  const updateFilters = (newFilters: FilterParams) => {
    setFilters(newFilters); // Обновление фильтров
    setCurrentPage(1); // Сброс текущей страницы при изменении фильтров
  };

  const fetchMovies = async () => {
    try {
      const response = await fetchWithApiKey({
        endpoint: 'https://api.kinopoisk.dev/v1.4/movie?limit=50&selectFields=name&selectFields=year&selectFields=rating&selectFields=poster&selectFields=id',
        params: {
          "genres.name": filters.genre,
          year: filters.year,
          "rating.kp": filters.rating,
          page: currentPage
        },
      });
      console.log(response);
      setMovies(response.docs); // Обновление списка фильмов
      setTotalPages(response.pages); // Обновление общего количества страниц
    } catch (error) {
      setError("Произошла ошибка при загрузке фильмов: " + error);
    }
  };

  useEffect(() => {
    fetchMovies(); //Запрос после монтирования компонента
  }, [filters, currentPage]);

  // Функции для изменения страниц
  const goToNextPage = () =>
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  const goToPreviousPage = () =>
    setCurrentPage((page) => Math.max(page - 1, 1));

  return (
    <div>
      {/* Фильтр */}
      <Filter filters={filters} updateFilters={updateFilters} />
      {error && <p>{error}</p>}

      {/* Кнопки пагинации */}
      <div className="control-page">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Назад
        </button>
        <span>
          Страница {currentPage} из {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Вперед
        </button>
      </div>
      {/* Контейнер с карточками фильмов */}
      <div className="container">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            poster={movie.poster}
            name={movie.name}
            year={movie.year}
            rating={movie.rating}
            id={movie.id}
            description={""}
            genres={[]}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;