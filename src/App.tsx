import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieDetails from './components/MovieDetails/MovieDetails';
import MovieList from './components/MovieList/MovieList';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
