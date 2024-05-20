const express = require("express");
const router = express.Router();
const Elaboration = require("../model/elaboration");

// Créer une nouvelle élaboration
router.post("/elaborations", async (req, res) => {
  try {
    const elaboration = new Elaboration(req.body);
    const savedElaboration = await elaboration.save();
    res.status(201).send(savedElaboration);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Obtenir toutes les élaborations
router.get("/elaborations", async (req, res) => {
  try {
    const elaborations = await Elaboration.find().populate(
      "compteComptable compagne"
    );
    res.status(200).send(elaborations);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Obtenir une élaboration par ID
router.get("/elaborations/:id", async (req, res) => {
  try {
    const elaboration = await Elaboration.findById(req.params.id).populate(
      "compteComptable compagne"
    );
    if (!elaboration) {
      return res.status(404).send({ error: "Elaboration non trouvée" });
    }
    res.status(200).send(elaboration);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Mettre à jour une élaboration par ID
router.put("/elaborations/:id", async (req, res) => {
  try {
    const elaboration = await Elaboration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!elaboration) {
      return res.status(404).send({ error: "Elaboration non trouvée" });
    }
    res.status(200).send(elaboration);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Supprimer une élaboration par ID
router.delete("/elaborations/:id", async (req, res) => {
  try {
    const elaboration = await Elaboration.findByIdAndDelete(req.params.id);
    if (!elaboration) {
      return res.status(404).send({ error: "Elaboration non trouvée" });
    }
    res.status(200).send({ message: "Elaboration supprimée avec succès" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
