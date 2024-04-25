const express = require('express');
const router = express.Router()
const Besoin = require( "../model/besoin")

router.get("/besoin",async (req, res)=>{
try{ 
    //get toutes les besoins 
  //  const besoins = await Besoin.find().populate('compteComptable');
  //  res.status(200).send(besoins.item)
  res.status(200).send("hello");
}catch(err){
  res.status(500).json({ error: err.message });
}
} )


router.post('/besoin', async (req, res) => {
  try {
    const besoin = new Besoin(req.body);
  // save in the db 
    await besoin.save()
     res
       .status(200)
       .json({ message: 'Le besoin a été ajouté avec succès.', besoin });
  } catch (err){
     res.status(400).json({ error: err.message });
  }
});


router.put('/besoin/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const dataToUpdate = req.body
    // new : send the object after the update 
    const besoin = await Besoin.findByIdAndUpdate(id, dataToUpdate,{new :true});
    res
      .status(204)
      .json({
        message: 'La modification du besoin a été réalisée avec succès. ',
        besoin,
      });
    
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete('/besoin/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await  Besoin.findByIdAndDelete(id)
   
    res
      .status(204)
      .json({
        message: 'La suppression du besoin a été effectuée avec succès ',
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router