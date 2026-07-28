import { verifyAccessToken } from '../utils/jwt.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { prisma } from '../config/db.js';

export const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(401, 'Authorization token missing');
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyAccessToken(token);

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      email: true,
      role: true,
      isActive: true,
      isVerified: true,
    },
  });

  if (!user) throw new ApiError(401, 'User not found');
  if (!user.isActive) throw new ApiError(403, 'Account is deactivated');

  req.user = user;
  next();
});