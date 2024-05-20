import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  InputAdornment,
  Box,
  Typography,
  IconButton,
  Modal,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
  DeleteOutlined,
  EditOutlined,
  AddCircleOutline,
} from "@mui/icons-material";
import { rows } from "./data";

function Admin() {
  const departements = [
    "Maintenance",
    "Finance",
    "Planning et production",
    "Approvisionnement",
    "Moyenne generaux",
    "Ressources Humaines",
    "Technique",
  ];
const isDuplicateUser = (username, email) => {
  return data.some(
    (user) => user.NomUtilisateur === username || user.email === email
  );
};
const generateNewUserId = () => {
  const existingIds = data.map((user) => user.id);
  const maxId = Math.max(...existingIds);
  return maxId + 1;
};
  const [data, setData] = useState(rows);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    id: data.length > 0 ? data[data.length - 1].id + 1 : 1,
    NomUtilisateur: "",
    Nom: "",
    prenom: "",
    email: "",
    departement: "",
    access: "Utilisateur",
    error: {
      NomUtilisateur: false,
      Nom: false,
      prenom: false,
      email: false,
      departement: false,
    },
    errorMessage: "",
  });

  const handleAddUser = () => {
    setEditingUser(null);
    setShowAddUserForm(true);
  };
  

  const handleCloseAddUserForm = () => {
    setShowAddUserForm(false);
    setEditingUser(null);
  };

const handleNewUserChange = (e) => {
  if (e.target.name === "password") {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  } else {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }
};

const handleValidation = () => {
  let error = {
    NomUtilisateur: newUser.NomUtilisateur === "",
    Nom: newUser.Nom === "",
    prenom: newUser.prenom === "",
    email: newUser.email === "",
    password: newUser.password === "",
    departement: newUser.departement === "",
  };

  if (isDuplicateUser(newUser.NomUtilisateur, newUser.email)) {
    error.NomUtilisateur = true;
    error.email = true;
    setNewUser({
      ...newUser,
      errorMessage: "Le nom d'utilisateur ou l'e-mail est déjà utilisé",
    });
  } else {
    setNewUser({ ...newUser, errorMessage: "" });
  }

  let isValid = Object.values(error).every((x) => x === false);

  if (!isValid) {
    setNewUser({
      ...newUser,
      error: {
        ...error,
      },
    });
  }

  return isValid;
};
const handleNewUserSubmit = () => {
  if (handleValidation()) {
    if (editingUser) {
      setData(
        data.map((user) =>
          user.id === editingUser.id ? { ...newUser, id: editingUser.id } : user
        )
      );
      setEditingUser(null);
    } else {
      setData([...data, newUser]);
    }
    setShowAddUserForm(false);
    setNewUser({
      id: data.length > 0 ? data[data.length - 1].id + 1 : 1,
      NomUtilisateur: "",
      Nom: "",
      prenom: "",
      email: "",
      password: "",
      departement: "",
      access: "Utilisateur",
      error: {
        NomUtilisateur: false,
        Nom: false,
        prenom: false,
        email: false,
        password: false,
        departement: false,
      },
      errorMessage: "",
    });
  }
};

  const handleAccessChange = (event) => {
    setNewUser({ ...newUser, access: event.target.value });
  };

  const handleDeleteUser = (userId) => {
    setData(data.filter((user) => user.id !== userId));
  };

 const handleEditUser = (user) => {
   setEditingUser(user);
   setNewUser({
     ...user,
     password: user.password || "",
     error: {
       NomUtilisateur: false,
       Nom: false,
       prenom: false,
       email: false,
       password: false,
       departement: false,
     },
   });
   setShowAddUserForm(true);
 };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 33,
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "NomUtilisateur",
      headerName: "Nom D'utilisateur",
      align: "center",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "Nom",
      headerName: "Nom",
      align: "center",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "prenom",
      headerName: "Prénom",
      align: "center",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "departement",
      headerName: "Departement",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "access",
      headerName: "Accès",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { access } }) => (
        <Box
          sx={{
            height: "100%",
            textAlign: "center",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            backgroundColor:
              access === "Admin"
                ? "#1976d2"
                : access === "Manager"
                ? "#388e3c"
                : "#f57c00",
          }}
        >
          {access === "Admin" && (
            <AdminPanelSettingsOutlined
              sx={{ color: "#fff" }}
              fontSize="small"
            />
          )}
          {access === "Manager" && (
            <SecurityOutlined sx={{ color: "#fff" }} fontSize="small" />
          )}
          {access === "Utilisateur" && (
            <LockOpenOutlined sx={{ color: "#fff" }} fontSize="small" />
          )}
          <Typography sx={{ fontSize: "13px", color: "#fff" }}>
            {" "}
            {access}{" "}
          </Typography>
        </Box>
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box>
          <IconButton
            color="primary"
            onClick={() => handleEditUser(params.row)}
          >
            <EditOutlined />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDeleteUser(params.row.id)}
          >
            <DeleteOutlined />
          </IconButton>
        </Box>
      ),
    },
  ];
const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      <p
        style={{
          color: "orange",
          fontSize: "30px",
          margin: 15,
          fontWeight: 500,
        }}
      >
        Les utilisateurs
      </p>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          slots={{ toolbar: GridToolbar }}
          rows={data}
          columns={columns}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutline />}
        onClick={handleAddUser}
        style={{ alignSelf: "flex-end", margin: "16px" }}
      >
        Ajouter un utilisateur
      </Button>
      <Modal
        open={showAddUserForm}
        onClose={handleCloseAddUserForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            display: "flex",
            flexDirection: "column",

            alignItems: "center",
            bgcolor: "background.paper",
            gap: 3,
            boxShadow: 24,
            pt: 3,
            pr: 8,
            pl: 8,
            pb: 3,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {editingUser
              ? "Modifier un utilisateur"
              : "Ajouter un nouvel utilisateur"}
          </Typography>
          <TextField
            label="Nom d'utilisateur"
            variant="outlined"
            name="NomUtilisateur"
            value={newUser.NomUtilisateur}
            onChange={handleNewUserChange}
            style={{ width: "80%" }}
            required
            error={newUser.error.NomUtilisateur}
            helperText={
              newUser.error.NomUtilisateur
                ? "Ce champ est obligatoire"
                : isDuplicateUser(newUser.NomUtilisateur, newUser.email)
                ? "Nom d'utilisateur déjà utilisé"
                : ""
            }
          />
          <TextField
            label="Mot de passe"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            name="password"
            value={newUser.password}
            onChange={handleNewUserChange}
            style={{ width: "80%" }}
            required
            error={newUser.error.password}
            helperText={
              newUser.error.password ? "Ce champ est obligatoire" : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: "flex", width: "80%", gap: 2 }}>
            <TextField
              label="Nom"
              variant="outlined"
              name="Nom"
              sx={{ width: "50%" }}
              value={newUser.Nom}
              onChange={handleNewUserChange}
              required
              error={newUser.error.Nom}
              helperText={newUser.error.Nom ? "Ce champ est obligatoire" : ""}
            />
            <TextField
              label="Prénom"
              variant="outlined"
              name="prenom"
              sx={{ width: "50%" }}
              value={newUser.prenom}
              onChange={handleNewUserChange}
              required
              error={newUser.error.Nom}
              helperText={
                newUser.error.prenom ? "Ce champ est obligatoire" : ""
              }
            />
          </Box>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={newUser.email}
            onChange={handleNewUserChange}
            style={{ width: "80%" }}
            required
            error={newUser.error.email}
            helperText={
              newUser.error.email
                ? "Ce champ est obligatoire"
                : isDuplicateUser(newUser.NomUtilisateur, newUser.email)
                ? "E-mail déjà utilisé"
                : ""
            }
          />
          <FormControl variant="outlined" style={{ width: "80%" }}>
            <InputLabel id="departement-label">Département</InputLabel>
            <Select
              labelId="departement-label"
              id="departement-select"
              value={newUser.departement}
              onChange={handleNewUserChange}
              name="departement"
              label="Département"
              required
              helperText={
                newUser.error.departement ? "Ce champ est obligatoire" : ""
              }
            >
              {departements.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            style={{ marginTop: 16, width: "80%" }}
          >
            <InputLabel id="access-label">Accès</InputLabel>
            <Select
              labelId="access-label"
              id="access-select"
              value={newUser.access}
              onChange={handleAccessChange}
              label="Accès"
              required
              helperText={
                newUser.error.access ? "Ce champ est obligatoire" : ""
              }
            >
              <MenuItem value="Utilisateur">User</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>
          {newUser.errorMessage && (
            <Typography variant="caption" color="error">
              {newUser.errorMessage}
            </Typography>
          )}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleNewUserSubmit}
            >
              {editingUser ? "Enregistrer" : "Ajouter"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default Admin;
