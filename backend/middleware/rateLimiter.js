const rateLimit = require('express-rate-limit');
/**
 * @swagger
 * components:
 *   schemas:
 *     RateLimitError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Rate limit exceeded message
 */

/**
 * @swagger
 * /api/*:
 *   get:
 *     responses:
 *       429:
 *         description: Too Many Requests
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RateLimitError'
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

module.exports = limiter;