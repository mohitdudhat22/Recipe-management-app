import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeList from './components/RecipeList.jsx';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/add" element={<RecipeForm />} />
          <Route path="/edit/:id" element={<RecipeForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
