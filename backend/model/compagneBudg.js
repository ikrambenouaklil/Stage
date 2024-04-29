const mongoose = require('mongoose');
const lesbesoins = require('./besoin');
const elaborations = require('./elaboration');

const compagneBudgSchema = new mongoose.Schema({
  Année: {
    type: Number,
    required: true,
    min: 2024,
    max: 9999,
    unique: true,
  },
  NoteOrientation: {
    type: String, // to be edit it after
  },
  besoins: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'lesbesoins',
    required: true,
  },
  elaboration: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'elaborations',
    required: true,
  },
  cloturer: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const compagneBudg = mongoose.model(
  'lescompagnes',
  compagneBudgSchema,
);
module.exports = compagneBudg;
