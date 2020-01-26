const mongoose = require('mongoose');
const PlayerCharacter = require('../models/player_controller');

exports.createPlayerCharacter = (req, res) => {
  const player_character = new PlayerCharacter({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    race: req.body.race,
    class: req.body.class,
  })

  return player_character
    .save()
    .then((newPlayerCharacter) => {
      return res.status(201).json({
        success: true,
        message: 'New Player Character created!',
        PlayerCharacter: player_character,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
    });
};

exports.getAllPlayerCharacter = (req, res) => {
  PlayerCharacter.find()
    .select('_id name race class')
    .then((allPlayerCharacter) => {
      return res.status(200).json({
        success: true,
        message: 'A list of all player characters',
        PlayerCharacter: allPlayerCharacter
      })
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });
    });
};

exports.getSinglePlayerCharacter = (req, res) => {
  const id = req.params.playerCharacterId;
  PlayerCharacter.findById(id)
    .then((singlePlayerCharacter) => {
      res.status(200).json({
        success: true,
        message: `More on ${singlePlayerCharacter.name}`,
        PlayerCharacter: singlePlayerCharacter,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'This player character does not exist',
        error: err.message,
      });
    });
};

exports.updatePlayerCharacter = (req, res) => {
  const id = req.params.playerCharacterId;
  const updatePlayerCharacter = req.body;
  PlayerCharacter.update({ _id:id }, { $set:updatePlayerCharacter })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Player Character updated',
        updatePlayerCharacter: updatePlayerCharacter,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again'
      });
    });
}

exports.deletePlayerCharacter = (req, res) => {
  const id = req.params.playerCharacterId;
  PlayerCharacter.findByIdAndRemove(id)
    .exec()
    .then(() => res.status(204).json({
      success: true,
    }))
    .catch((err) => res.status(500).json({
      success: false,
    }));
};
