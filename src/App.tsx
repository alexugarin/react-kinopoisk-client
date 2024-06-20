import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieDetails from './components/MovieDetails/MovieDetails';
import MovieList from './components/MovieList/MovieList';
import Favorite from './components/Favorite/Favorite';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorite />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
