const express = require('express');
const playerCharacterController = require('../controllers/player_controller');

const router = express.Router();

router.post('/playercharacters', playerCharacterController.createPlayerCharacter);
router.get('/playercharacters', playerCharacterController.getAllPlayerCharacter);
router.get('/playercharacters/:playerCharacterId', playerCharacterController.getSinglePlayerCharacter);
router.patch('/playercharacters/:playerCharacterId', playerCharacterController.updatePlayerCharacter);
router.delete('/playercharacters/:playerCharacterId', playerCharacterController.deletePlayerCharacter);

module.exports = router;
