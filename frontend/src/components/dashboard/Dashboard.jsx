import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Grid, Paper } from '@mui/material';

function Dashboard() {
  return (
    <div style={{ padding: '20px', width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Your Recipe Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Your Recipes
            </Typography>
            <Button component={Link} to="/recipes" variant="contained" color="primary">
              View Recipes
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Add New Recipe
            </Typography>
            <Button component={Link} to="/add" variant="contained" color="secondary">
              Create Recipe
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              More Features
            </Typography>
            <Button component={Link} to="/more" variant="contained" color="info">
              Explore More
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
