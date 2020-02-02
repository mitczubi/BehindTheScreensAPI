const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const Token = require('../middleware/token');

exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 15, (err, hash) => {
    const password = hash;
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username: req.body.username,
      email: req.body.email,
      password,
    });

    if (!user.username || !user.email || !user.password) {
      return res.status(400).json({
        message: 'Please ensure you fill the username, email, and password',
      });
    }

    return User.count({
      $or: [
        { username: req.body.username },
        { email: req.body.email},
      ],
    })
    .then((count) => {
      if (count > 0) {
        res.status(401).json({
          message: 'This user exists',
        });
      }

      return user
        .save()
        .then((newUser) => {
          const token = Token(newUser);
          res.status(201).json({
            message: 'User signup successful',
            newUser: {
              username: newUser.username,
              email: newUser.email,
            },
            token,
          });
        })
        .catch(() => {
          res.status(500).json({
            message: 'Server error. Please try again.'
          });
        });
    });
  });
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then((existingUser) => {
      bcrypt.compare(password, existingUser.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Not authorized',
          });
        }
        if (result) {
          const token = Token(existingUser);
          return res.status(200).json({
            message: 'User authorized successfully',
            existingUser: {
              username: existingUser.username,
              email: existingUser.email,
              _id: existingUser.id,
            },
            token,
          });
        }
        return res.status(401).json({
          message: 'Invalid details',
        });
      });
    })
    .catch(() => res.status(401).json({ message: 'Server error. Please try again.' }))
}
