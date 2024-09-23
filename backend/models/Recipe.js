
const mongoose = require('mongoose');

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