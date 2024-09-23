/**
 * @swagger
 * components:
 *   schemas:
 *     AccessDeniedError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Access denied message
 */

/**
 * @swagger
 * /api/admin:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       403:
 *         description: Access denied
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccessDeniedError'
 */

const roleMiddleware = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
  
  module.exports = roleMiddleware;