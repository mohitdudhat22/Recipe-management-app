import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, TextField, Paper, Box } from '@mui/material';
import { getRecipes } from '../../services/api';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchRecipes();
  }, [page]);

  const fetchRecipes = async () => {
    try {
      const data = await getRecipes(page, 10, { search });
      setRecipes(data.recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <Container component="main" maxWidth={false} sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: { xs: 2, sm: 4 },
      backgroundColor: '#f5f5f5',
    }}>
      <Paper
        elevation={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: { xs: 2, sm: 4 },
          maxWidth: '1200px',
          width: '100%',
          border: '2px solid #e0e0e0',
          borderRadius: 2,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3 }}>
          Recipe List
        </Typography>
        <TextField
          fullWidth
          label="Search recipes"
          variant="outlined"
          value={search}
          onChange={handleSearch}
          margin="normal"
          sx={{ mb: 4 }}
        />
        <Grid container spacing={4}>
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe._id}>
              <Card 
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={recipe.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                  alt={recipe.title}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>{recipe.title}</Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Cuisine: {recipe.cuisineType}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Prep Time: {recipe.prepTime} mins
                  </Typography>
                </CardContent>
                <Box sx={{ p: 3, pt: 0 }}>
                  <Button 
                    component={Link} 
                    to={`/recipe/${recipe._id}`}
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button onClick={() => setPage(page - 1)} disabled={page === 1} variant="outlined">
            Previous Page
          </Button>
          <Button onClick={() => setPage(page + 1)} variant="outlined">
            Next Page
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RecipeList;