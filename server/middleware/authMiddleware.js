const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      console.log("=================================");
      console.log("TOKEN:", token);
      console.log("JWT_SECRET:", process.env.JWT_SECRET);

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("DECODED TOKEN:", decoded);

      // Store user id in request
      req.user = decoded.id;

      return next();
    } catch (error) {
      console.log("========== JWT ERROR ==========");
      console.log(error);
      console.log("===============================");

      return res.status(401).json({
        message: "Not Authorized, Token Failed",
      });
    }
  }

  return res.status(401).json({
    message: "No Token, Authorization Denied",
  });
};

module.exports = protect;