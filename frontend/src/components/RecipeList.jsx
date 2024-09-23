import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('/recipes');
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Recipes</h1>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe._id}>{recipe.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;