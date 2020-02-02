const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: 'Authorization failed',
        });
      } else {
        req.decoded = decoded;
        next()
      }
    });
  } else {
    return res.status(401).json({
      message: 'Authorization failed',
    });
  }
}
