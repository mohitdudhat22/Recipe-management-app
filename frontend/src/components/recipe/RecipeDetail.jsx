import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, List, ListItem, ListItemText, Paper } from '@mui/material';
import { getRecipe, deleteRecipe } from '../../services/api';

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const data = await getRecipe(id);
      setRecipe(data);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRecipe(id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  if (!recipe) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4">{recipe.title}</Typography>
        <Typography variant="subtitle1">Cuisine: {recipe.cuisineType}</Typography>
        <Typography variant="subtitle1">Cooking Time: {recipe.cookingTime} minutes</Typography>
        
        <Typography variant="h6" style={{ marginTop: '20px' }}>Ingredients:</Typography>
        <List>
          {recipe.ingredients.map((ingredient, index) => (
            <ListItem key={index}>
              <ListItemText primary={ingredient} />
            </ListItem>
          ))}
        </List>

        <Typography variant="h6" style={{ marginTop: '20px' }}>Instructions:</Typography>
        <Typography variant="body1">{recipe.instructions}</Typography>

        <Button 
          variant="contained" 
          color="primary" 
          style={{ marginTop: '20px', marginRight: '10px' }}
          onClick={() => navigate(`/edit/${id}`)}
        >
          Edit Recipe
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          style={{ marginTop: '20px' }}
          onClick={handleDelete}
        >
          Delete Recipe
        </Button>
      </Paper>
    </Container>
  );
};

export default RecipeDetail;