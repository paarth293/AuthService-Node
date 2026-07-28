import crypto from 'crypto';

// Generates a cryptographically secure random token
export const generateSecureToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Returns token expiry date
export const getTokenExpiry = (minutes) => {
  return new Date(Date.now() + minutes * 60 * 1000);
};