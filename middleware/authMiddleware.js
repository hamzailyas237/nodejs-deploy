const jwt = require("jsonwebtoken");

const middlewares = {
  authMiddleware: (req, res, next) => {

    try {
      const token = req.headers.authorization.split(" ")[1];
      console.log(token);
      const isValid = jwt.verify(token, process.env.JWT_KEY)
      console.log(isValid);

      if (isValid) {
        next()
      }
      else {
        res.status(400).json({
          message: 'Invalid user'
        })
      }
    }
    catch (err) {
      res.status(400).json({
        message: 'Invalid user'
      })
    }
  },
};

module.exports = middlewares; 