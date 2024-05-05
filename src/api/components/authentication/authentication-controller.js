const { errorResponder, errorTypes } = require('../../../core/errors');
const authenticationServices = require('./authentication-service');
const loginAttempts = new Map();
const LOGIN_ATTEMPTS_LIMIT = 5;
const LOGIN_WINDOW_MILLISECONDS = 30 * 60 * 1000;

async function login(request, response, next) {
  const { email, password } = request.body;

  try {
    const attemptData = loginAttempts.get(email);
    if (attemptData && attemptData.attempts >= LOGIN_ATTEMPTS_LIMIT) {
      const now = Date.now();
      if (now - attemptData.firstAttemptTime < LOGIN_WINDOW_MILLISECONDS) {
        throw errorResponder(
          errorTypes.FORBIDDEN,
          'Too many failed login attempts.'
        );
      } else {
        loginAttempts.delete(email);
      }
    }

    // Check login credentials
    const loginSuccess = await authenticationServices.checkLoginCredentials(
      email,
      password
    );

    if (!loginSuccess) {
      const currentAttempts = (attemptData && attemptData.attempts + 1) || 1;
      const firstAttemptTime = attemptData ? attemptData.firstAttemptTime : Date.now();
      loginAttempts.set(email, {
        attempts: currentAttempts,
        firstAttemptTime,
      });
      const errorMessage = `Wrong email or password. Attempt = ${currentAttempts}`;
      
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        errorMessage
      );
    } else {
      loginAttempts.delete(email);
      return response.status(200).json(loginSuccess);
    }
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  login,
};
