export const jwtConstants = {
  secret: process.env.JWT_SECRET, // Replace with your actual secret key
  expiresIn: process.env.JWT_EXPIRATION, // Token expiration time
  refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRATION, // Refresh token expiration time
};
export const roles = {
  ADMIN: 'ADMIN',
  LEARNER: 'LEARNER',
};
