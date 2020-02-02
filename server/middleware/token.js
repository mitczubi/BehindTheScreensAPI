const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const key = process.env.KEY;

const Token = ({ id }) => jwt.sign(
  { id },
  key,
  { expiresIn: '2h'},
);

module.exports = Token;
