const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       required:
 *         - title
 *         - ingredients
 *         - instructions
 *         - cuisineType
 *         - cookingTime
 *         - author
 *         - servings
 *         - difficultyLevel
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the recipe
 *         ingredients:
 *           type: array
 *           items:
 *             type: string
 *           description: List of ingredients
 *         instructions:
 *           type: string
 *           description: Cooking instructions
 *         cuisineType:
 *           type: string
 *           description: Type of cuisine
 *           default: 'Unknown'
 *         cookingTime:
 *           type: number
 *           description: Cooking time in minutes
 *         author:
 *           type: string
 *           description: Author of the recipe
 *         image:
 *           type: string
 *           description: URL of the recipe image
 *         servings:
 *           type: number
 *           description: Number of servings
 *         difficultyLevel:
 *           type: string
 *           enum: ['Easy', 'Medium', 'Hard']
 *           description: Difficulty level of the recipe
 *         dietaryRestrictions:
 *           type: array
 *           items:
 *             type: string
 *           description: List of dietary restrictions
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the recipe was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the recipe was last updated
 */

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  cuisineType: { type: String, required: true, default: 'Unknown' },
  cookingTime: { type: Number, required: true },
  author: { type: String, required: true },
  image: { type: String, required: false, default: null },
}, { timestamps: true });

RecipeSchema.index({ title: 'text', cuisineType: 1 });
module.exports = mongoose.model('Recipe', RecipeSchema);