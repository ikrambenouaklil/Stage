
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// ajouter un utilisateur
const createUser = async (req, res) => {
  
    const {
      NomUtilisateur,
      MotDePasse,
      Email,
      Nom,
      Accès,
      Prénom,
      Departement,
    } = req.body;
    if (
      !NomUtilisateur ||
      !MotDePasse ||
      !Email ||
      !Nom ||
      !Accès ||
      !Prénom ||
      !Departement
    ) {
      return res.status(400).json({ message: 'Remplir les champs vides' });
    }

    const foundUser = await User.findOne({
      $or: [{ NomUtilisateur: NomUtilisateur }, { Email: Email }],
    }).exec();

    if (foundUser) {
      return res.status(401).json({
        message:
          foundUser.NomUtilisateur && foundUser.Email
            ? "Le nom d'utilisateur ou l'adresse e-mail sont déjà utilisés."
            : foundUser.NomUtilisateur
            ? "Le nom d'utilisateur saisi est déjà utilisé."
            : "L'adresse e-mail saisie est déjà utilisée.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(MotDePasse, salt);

    const newUser = await User.create({
      NomUtilisateur,
      Email,
      MotDePasse: encryptedPassword,
      Nom,
      Accès,
      Prénom,
      Departement,
    });

  //   const token = jwt.sign(data = {
  //     id: newUser._id,
  //   },process.env.ACCESS_TOKEN_SECRECT, {
  //     expiresIn: '15m',
  //   });

  //   const refreshToken = jwt.sign(
  //     data = {
  //       id: newUser._id,
  //     },
  //     process.env.REFRESH_TOKEN_SECRECT,
  //     {
  //       expiresIn: '7d',
  //     },
  //   );

  //   const createdUser = {
  //     ...newUser.toObject(),
  //     MotDePasse: MotDePasse,
  //   };

  //   res
  //     .status(200)
  //     .cookie('jwt', refreshToken, {
  //       secure: true, //https
  //       httpOnly: true,
  //       sameSite: 'None',
  //       maxAge: 1000 * 60 * 60 * 24 * 7,
  //     })
  //     .json({
  //       success: 'true',
  //       token,
  //       createdUser,
  //       message: "L'utilisateur a été ajouté avec succès",
  //     });
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({
  //     success: false,
  //     message: "Erreur lors de la création de l'utilisateur",
  //   });
  
}
const getUsers = async (req,res)=>{
    const users = await User.find().select("-MotDePasse").lean(); 
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

   

    const token = jwt.sign( data = {
      id: user._id,
    }, process.env.ACCESS_TOKEN_SECRECT, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign(data = {
      id: user._id,
    }, process.env.REFRESH_TOKEN_SECRECT, {
      expiresIn: '7d',
    });

    user.MotDePasse = undefined;

    res
      .status(200)
      .cookie('jwt', refreshToken, {
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





module.exports = { getUsers, createUser, updateUser, getUser, supprimerUser };