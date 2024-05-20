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
  cloturer: {
    type: Boolean,
    default: false,
  },
});

const compagneBudg = mongoose.model(
  'lescompagnes',
  compagneBudgSchema,
);
module.exports = compagneBudg;
