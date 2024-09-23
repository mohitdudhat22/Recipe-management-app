import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Button, TextField } from '@mui/material';
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
    <Container>
      <TextField
        fullWidth
        label="Search recipes"
        variant="outlined"
        value={search}
        onChange={handleSearch}
        margin="normal"
      />
      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{recipe.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Cuisine: {recipe.cuisineType}
                </Typography>
                <Button component={Link} to={`/recipe/${recipe._id}`}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous Page
      </Button>
      <Button onClick={() => setPage(page + 1)}>Next Page</Button>
    </Container>
  );
};

export default RecipeList;