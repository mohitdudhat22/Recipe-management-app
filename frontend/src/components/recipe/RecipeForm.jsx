import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import { createRecipe, updateRecipe, getRecipe } from '../../services/api';

const RecipeForm = () => {
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    cuisineType: '',
    cookingTime: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) { 
      fetchRecipe();
    }
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const data = await getRecipe(id);
      setRecipe({
        ...data,
        ingredients: data.ingredients.join(', '),
      });
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const recipeData = {
        ...recipe,
        ingredients: recipe.ingredients.split(',').map(item => item.trim()),
        cookingTime: parseInt(recipe.cookingTime),
      };
      if (id) {
        await updateRecipe(id, recipeData);
      } else {
        console.log(recipeData);
        await createRecipe(recipeData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  return (
    <Container component="main" maxWidth={false} sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
      backgroundColor: '#f5f5f5',
    }}>
      <Paper
        elevation={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 4,
          maxWidth: '600px',
          width: '100%',
          border: '2px solid #e0e0e0',
          borderRadius: 2,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          {id ? 'Edit Recipe' : 'Add New Recipe'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Recipe Title"
            name="title"
            value={recipe.title}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="ingredients"
            label="Ingredients (comma separated)"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            multiline
            rows={4}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="instructions"
            label="Instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            multiline
            rows={4}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="cuisineType"
            label="Cuisine Type"
            name="cuisineType"
            value={recipe.cuisineType}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="cookingTime"
            label="Cooking Time (minutes)"
            name="cookingTime"
            type="number"
            value={recipe.cookingTime}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {id ? 'Update Recipe' : 'Add Recipe'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RecipeForm;