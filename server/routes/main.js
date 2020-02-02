const express = require('express');

// Require controllers
const playerCharacterController = require('../controllers/player_controller');
const userController = require('../controllers/user');

// Require middleware
const verifyToken = require('../middleware/verify_token');

const router = express.Router();

// Player Character Routes
router.post('/playercharacters', verifyToken, playerCharacterController.createPlayerCharacter);
router.get('/playercharacters', verifyToken, playerCharacterController.getAllPlayerCharacter);
router.get('/playercharacters/:playerCharacterId', verifyToken, playerCharacterController.getSinglePlayerCharacter);
router.patch('/playercharacters/:playerCharacterId', verifyToken, playerCharacterController.updatePlayerCharacter);
router.delete('/playercharacters/:playerCharacterId', verifyToken, playerCharacterController.deletePlayerCharacter);

// User Routes
router.post('/users/signup', userController.createUser);
router.post('/users/login', userController.loginUser);

module.exports = router;
