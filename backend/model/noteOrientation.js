const mongoose = require("mongoose");

const noteOrientationschema = new mongoose.Schema({
  noteOrientation: {
    type: string,
    required: true,
  },
  compagne: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "lescompagnes",
    required: true, // Make compagne ID mandatory
  },
});

const besoinModel = mongoose.model("noteOrientation", noteOrientationschema);
module.exports = besoinModel;
