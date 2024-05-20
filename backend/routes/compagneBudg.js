const express = require("express");
const router = express.Router();
const compagneBudg = require("../model/compagneBudg");
const verifyJWT = require("../middleware/verifyJWT");

// router.use(verifyJWT);

router.get("/compagnes", async (req, res) => {
  try {
    // Get all compagnes
    const compagnes = await compagneBudg
      .find()
    res.status(200).send(compagnes);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/compagnes", async (req, res) => {
  try {
    // Create a new compagne
    const { Année } = req.body;
    const newCompagne = new compagneBudg({ Année });
    await newCompagne.save();
    res.status(200).send(newCompagne);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/compagnes/:id", async (req, res) => {
  try {
    // Get a specific compagne
    const { id } = req.params;
    const compagne = await compagneBudg
      .findById(id)
     
    if (!compagne) {
      return res.status(404).send({ error: "Compagne not found" });
    }
    res.status(200).send(compagne);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.put("/compagnes/:id", async (req, res) => {
  try {
    // Update a compagne
    const { id } = req.params;
    const dataToUpdate = req.body;
    const updatedCompagne = await compagneBudg.findByIdAndUpdate(
      id,
      dataToUpdate,
      {
        new: true,
      }
    );
    if (!updatedCompagne) {
      return res.status(404).send({ error: "Compagne not found" });
    }
    res.status(200).send(updatedCompagne);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete("/compagnes/:id", async (req, res) => {
  try {
    // Delete a compagne
    const { id } = req.params;
    const deletedCompagne = await compagneBudg.findByIdAndDelete(id);
    if (!deletedCompagne) {
      return res.status(404).send({ error: "Compagne not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
