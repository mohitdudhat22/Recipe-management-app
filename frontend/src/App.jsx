import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import RecipeList from './components/recipe/RecipeList';
import RecipeDetail from './components/recipe/RecipeDetail';
import RecipeForm from './components/recipe/RecipeForm';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/common/ProtectedRoute';
import NotFound from './components/common/NotFound';
import ErrorBoundary from './components/common/ErrorBoundary';

const theme = createTheme();

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <div className="app">
              <Header />
              <div className="content">
                <Sidebar />
                <main>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<RecipeList />} />
                    <Route element={<ProtectedRoute />}>
                      <Route path="/recipe/:id" element={<RecipeDetail />} />
                      <Route path="/add" element={<RecipeForm />} />
                      <Route path="/edit/:id" element={<RecipeForm />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;