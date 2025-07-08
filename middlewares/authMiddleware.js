const jwt = require("jsonwebtoken"); 
const User = require("../modules/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    if (!token) {
      return res.status(401).send({ error: "Authentication token is required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId, token:token });

    if (!user) {
      return res.status(401).send({ error: "Invalid authentication token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).send({ error: "Failed to authenticate user" });
  }
};

module.exports = authMiddleware;


// middleware = async (req, res, next) => [bearer, token] =>