const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const playerCharacterSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  race: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('PlayerCharacter', playerCharacterSchema);
