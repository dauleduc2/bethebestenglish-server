module.exports = function (app) {
  if (process.env.jwtSecretKey) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
};
