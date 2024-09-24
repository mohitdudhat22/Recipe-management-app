import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, List, ListItem, ListItemText, Paper, Box, Divider } from '@mui/material';
import { getRecipe, deleteRecipe } from '../../services/api';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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

  if (!recipe) return (
    <Container sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h5">Loading...</Typography>
    </Container>
  );

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
          maxWidth: '800px',
          width: '100%',
          border: '2px solid #e0e0e0',
          borderRadius: 2,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ 
          textAlign: 'center', 
          fontWeight: 'bold',
          color: '#1976d2',
          mb: 3,
        }}>
          {recipe.title}
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <RestaurantIcon sx={{ mr: 1, color: '#1976d2' }} />
            <Typography variant="subtitle1">Cuisine: {recipe.cuisineType}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon sx={{ mr: 1, color: '#1976d2' }} />
            <Typography variant="subtitle1">Cooking Time: {recipe.cookingTime} minutes</Typography>
          </Box>
        </Box>
        
        <Typography variant="h6" sx={{ mt: 3, mb: 2, fontWeight: 'bold', color: '#1976d2' }}>Ingredients:</Typography>
        <List sx={{ 
          bgcolor: '#f9f9f9', 
          borderRadius: 2, 
          mb: 3, 
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
        }}>
          {recipe.ingredients.map((ingredient, index) => (
            <ListItem key={index} divider={index !== recipe.ingredients.length - 1}>
              <ListItemText primary={ingredient} sx={{ '& .MuiListItemText-primary': { fontWeight: 500 } }} />
            </ListItem>
          ))}
        </List>

        <Typography variant="h6" sx={{ mt: 3, mb: 2, fontWeight: 'bold', color: '#1976d2' }}>Instructions:</Typography>
        <Typography variant="body1" sx={{ 
          mb: 3, 
          whiteSpace: 'pre-line', 
          backgroundColor: '#f9f9f9',
          padding: 2,
          borderRadius: 2,
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
        }}>
          {recipe.instructions}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate(`/edit/${id}`)}
            sx={{ 
              fontWeight: 'bold', 
              px: 4, 
              py: 1,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              '&:hover': {
                boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
              }
            }}
          >
            Edit Recipe
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleDelete}
            sx={{ 
              fontWeight: 'bold', 
              px: 4, 
              py: 1,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              '&:hover': {
                boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
              }
            }}
          >
            Delete Recipe
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RecipeDetail;