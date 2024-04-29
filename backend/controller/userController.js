
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const getUsers = async (req,res)=>{
    const users = await user.find().select("-MotDePasse").lean(); 
    if(!users.length){
        return res.status(400).json({message:"il n y a pas des utilisateurs "})
    }
res.json(users)
}
// update user details
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming the user ID is passed as a parameter
    const { MotDePasse, ...updatedDetails } = req.body;

    if (MotDePasse) {
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(MotDePasse, salt);
      updatedDetails.MotDePasse = encryptedPassword;
    }

    const user = await User.findByIdAndUpdate(userId, updatedDetails, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const data = {
      id: user._id,
    };

    const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRECT, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRECT, {
      expiresIn: '7d',
    });

    user.MotDePasse = undefined;

    res
      .status(200)
      .cookie('token', refreshToken, {
        secure: true, //https
        httpOnly: true,
        sameSite: 'None',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .json({
        success: true,
        token,
        user,
        message: "Détails de l'utilisateur mis à jour avec succès",
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};




 // supprimer un utilisateur
const supprimerUser = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming the user ID is passed as a parameter

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res
      .status(200)
      .json({ success: true, message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression de l'utilisateur",
    });
  }
};

// // get user details
const getUser = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming the user ID is passed as a parameter

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const userDetails = {
      ...user.toObject()
    };

    res.status(200).json({ success: true, user: userDetails });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des détails de l'utilisateur",
    });
  }
};



module.exports = { getUsers, updateUser, getUser, supprimerUser };