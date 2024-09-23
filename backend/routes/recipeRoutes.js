const express = require('express');
const Recipe = require('../models/Recipe');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');
const logger = require('../utils/logger');
const router = express.Router();

// Create Recipe
router.post('/', async (req, res) => {
  try {
    const newRecipe = new Recipe({...req.body, image: req.file ? req.file.path : null});
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
});

// Read Recipes with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, cuisineType, ingredients } = req.query;
    const query = {};

    if (cuisineType) {
      query.cuisineType = cuisineType;
    }

    if (ingredients) {
      query.ingredients = { $in: ingredients.split(',') };
    }

    const recipes = await Recipe.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Recipe.countDocuments(query);

    res.status(200).json({
      recipes,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
});

// Read Recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(200).json(recipe);
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
});

// Update Recipe
router.put('/:id', async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedRecipe);
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
});

// Delete Recipe
router.delete('/:id', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json('Recipe deleted');
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
