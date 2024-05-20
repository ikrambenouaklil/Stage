const mongoose = require("mongoose");

const besoinSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  valorisation: {
    type: Number,
    minimum: 0,
    required: true,
  },
  quantité: {
    type: Number,
    minimum: 0,
    default: 1,
  },
  duréeContrat: {
    type: Number,
    minimum: 0,
    default: 1,
  },
  compteComptable: {
    type: Number,
    min: 61,
    max: 68,
  },
  compagne: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "lescompagnes",
    required: true, // Make compagne ID mandatory
  },
});

const besoinModel = mongoose.model("lesbesoins", besoinSchema);
module.exports = besoinModel;
