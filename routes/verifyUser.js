const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  async auth(req, res, next) {
    const token = req.cookies.auth;
    if (!token) {
      return false;
    } else {
      try {
        const verify = jwt.verify(token, process.env.SECRET);
        req.user = verify;
      } catch (error) {
        console.log(error);
      }
    }
    next();
  },
};
