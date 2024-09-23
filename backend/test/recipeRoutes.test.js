const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Assuming you export your Express app from server.js
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs'); // Added for file existence check
const { sendEmail, sendVerificationEmail } = require('../services/emailService'); 
jest.mock('../services/emailService', () => ({
  sendEmail: jest.fn().mockResolvedValue({ success: true }),
  sendVerificationEmail: jest.fn().mockResolvedValue({ success: true }),
}));

describe('Recipe Routes', () => {
  let token;
  let userId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Close the server if it's already running
    if (app.listening) {
      await new Promise(resolve => app.close(resolve));
    }
  });

  beforeEach(async () => {
       jest.clearAllMocks(); 
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    if (app.listening) {
      await new Promise(resolve => app.close(resolve));
    }
  });

  afterEach(async () => {
    await Recipe.deleteMany({});
    await User.deleteMany({});
  });

  
  const testUser = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'TestPassword123!'
  };

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
    
    // Check if the email services were called
    expect(sendEmail).toHaveBeenCalledWith(
      testUser.email,
      'Welcome to Recipe Management',
      'Thank you for registering!'
    );
    expect(sendVerificationEmail).toHaveBeenCalledWith(testUser.email);
  });

  it('should login an existing user', async () => {
    // First, register a user
    await request(app)
      .post('/api/auth/register')
      .send(testUser);

    // Then, attempt to login
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
    userId = res.body.userId;
  });
  it('should create a new recipe with image', async () => {
    const testImagePath = path.join(__dirname, 'test-assets', 'test-recipe-image.jpg');
    console.log(testImagePath);
    // Check if the file exists
    if (!fs.existsSync(testImagePath)) {
      console.error(`Test image not found at ${testImagePath}`);
      throw new Error('Test image file is missing');
    }

    const res = await request(app)
      .post('/api/recipes')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send({
        title: 'Test Recipe',
        ingredients: ['ingredient1', 'ingredient2'],
        instructions: 'Test instructions',
        cuisineType: 'Test cuisine',
        cookingTime: 30,
        author: testUser.username
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('image');
  })
  it('should get all recipes with pagination and filtering', async () => {
    // Create test recipes
    await Recipe.create([
      { 
        title: 'Recipe 1', 
        cuisineType: 'Italian', 
        ingredients: ['pasta', 'tomato'],
        author: 'Test Author',
        cookingTime: 30,
        instructions: 'Cook pasta, add tomato sauce.'
      },
      { 
        title: 'Recipe 2', 
        cuisineType: 'Mexican', 
        ingredients: ['beans', 'rice'],
        author: 'Test Author',
        cookingTime: 45,
        instructions: 'Cook beans and rice separately, then combine.'
      },
      { 
        title: 'Recipe 3', 
        cuisineType: 'Italian', 
        ingredients: ['pizza', 'cheese'],
        author: 'Test Author',
        cookingTime: 20,
        instructions: 'Prepare pizza dough, add toppings, bake.'
      },
    ]);

    const res = await request(app)
      .get('/api/recipes?page=1&limit=2&cuisineType=Italian&ingredients=pasta,pizza')
      .set('Authorization', `Bearer ${token}`);

    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('recipes');
    expect(res.body.recipes).toHaveLength(2);
    expect(res.body).toHaveProperty('totalPages');
    expect(res.body).toHaveProperty('currentPage');
  });
  it('should create a new recipe', async () => {
    const res = await request(app)
      .post('/api/recipes')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send({
        title: 'Test Recipe',
        ingredients: ['ingredient1', 'ingredient2'],
        instructions: 'Test instructions',
        cuisineType: 'Test cuisine',
        cookingTime: 30,
        author: testUser.username,
      });
    console.log(res.body);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should get all recipes', async () => {
    const recipe = new Recipe({
      title: 'Test Recipe',
      ingredients: ['ingredient1', 'ingredient2'],
      instructions: 'Test instructions',
      cuisineType: 'Test cuisine',
      cookingTime: 30,
      author: 'Test author',
    });
    await recipe.save();

    const res = await request(app)
      .get('/api/recipes')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.recipes).toHaveLength(1);
  });

  it('should get a recipe by ID', async () => {
    const recipe = new Recipe({
      title: 'Test Recipe',
      ingredients: ['ingredient1', 'ingredient2'],
      instructions: 'Test instructions',
      cuisineType: 'Test cuisine',
      cookingTime: 30,
      author: 'Test author',
    });
    await recipe.save();

    const res = await request(app)
      .get(`/api/recipes/${recipe._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', recipe._id.toString());
  });

  it('should update a recipe', async () => {
    const recipe = new Recipe({
      title: 'Test Recipe',
      ingredients: ['ingredient1', 'ingredient2'],
      instructions: 'Test instructions',
      cuisineType: 'Test cuisine',
      cookingTime: 30,
      author: 'Test author',
    });
    await recipe.save();

    const res = await request(app)
      .put(`/api/recipes/${recipe._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Recipe',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Recipe');
  });

  it('should delete a recipe', async () => {
    const recipe = new Recipe({
      title: 'Test Recipe',
      ingredients: ['ingredient1', 'ingredient2'],
      instructions: 'Test instructions',
      cuisineType: 'Test cuisine',
      cookingTime: 30,
      author: 'Test author',
    });
    await recipe.save();

    const res = await request(app)
      .delete(`/api/recipes/${recipe._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual('Recipe deleted');
  });

  it('should send a welcome email after user registration', async () => {
    
    // Perform user registration
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'NewUserPassword123!'
      });

    expect(registerResponse.statusCode).toEqual(201);
    expect(sendEmail).toHaveBeenCalledWith('newuser@example.com', 'Welcome to Recipe Management', 'Thank you for registering!');
  });
});