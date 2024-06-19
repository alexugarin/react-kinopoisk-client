import React, { useEffect, useState } from "react";
import { FilterParams, Genre } from "../../service/types/types";
import { fetchWithApiKey } from "../../service/api";
import "./Filter.css";
import { Range, getTrackBackground } from "react-range";

// Определение типов для пропсов компонента Filter
interface FilterProps {
  filters: FilterParams;
  updateFilters: (newFilters: FilterParams) => void;
}

const Filter: React.FC<FilterProps> = ({ filters, updateFilters }) => {
  // Состояние для диапазонов года и рейтинга
  const [yearRange, setYearRange] = React.useState([1990, 2024]);
  const [ratingRange, setRatingRange] = React.useState([0, 10]);

  const [genres, setGenres] = useState<Genre[]>([]); //Состояние для жанра

  useEffect(() => {
    // Функция для загрузки жанров
    const loadGenres = async () => {
      try {
        const data = await fetchWithApiKey({
          endpoint: 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field',
          
          params: { field: "genres.name" },
        });
        setGenres(data); // Обновление состояния жанров
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
        setGenres([]); // В случае ошибки устанавливаем пустой массив
      }
    };

    loadGenres(); // Вызов функции при монтировании компонента
  }, []);
  // Обработчик изменения жанра
  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters({ ...filters, genre: event.target.value });
  };
  // Обработчики изменения диапазонов
  const handleYearRangeChange = (values: number[]) => {
    setYearRange(values);
    updateFilters({ ...filters, year: `${values[0]}-${values[1]}` });
  };
  const handleRatingRangeChange = (values: number[]) => {
    setRatingRange(values);
    updateFilters({ ...filters, rating: `${values[0]}-${values[1]}` });
  };

  return (
    <div className="filter">
      <p>Жанр: </p>
      <select value={filters.genre} onChange={handleGenreChange}>
        {/* Отображение жанров в виде опций */}
        {genres.map((genre, index) => (
          <option key={index} value={genre.name}>
            {genre.name}
          </option>
        ))}
      </select>
      <p>Год выпуска (диапазон):</p>
      <Range
        values={yearRange}
        step={1}
        min={1990}
        max={2024}
        onChange={handleYearRangeChange}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values: yearRange,
                  colors: ["#ccc", "#548BF4", "#ccc"],
                  min: 1990,
                  max: 2024,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "20px",
              width: "20px",
              borderRadius: "21px",
              backgroundColor: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-28px",
                color: "#FFF",
                fontWeight: "bold",
                fontSize: "14px",
                fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
                padding: "4px",
                borderRadius: "4px",
                backgroundColor: "#548BF4",
              }}
            >
              {yearRange[index]}
            </div>
          </div>
        )}
      />
      <p>Рейтинг Кинопоиск (диапазон):</p>
      <Range
        values={ratingRange}
        step={0.1}
        min={0}
        max={10}
        onChange={handleRatingRangeChange}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values: ratingRange,
                  colors: ["#ccc", "#548BF4", "#ccc"],
                  min: 0,
                  max: 10,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "20px",
              width: "20px",
              borderRadius: "21px",
              backgroundColor: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-28px",
                color: "#FFF",
                fontWeight: "bold",
                fontSize: "14px",
                fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
                padding: "4px",
                borderRadius: "4px",
                backgroundColor: "#548BF4",
              }}
            >
              {ratingRange[index]}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default Filter;
