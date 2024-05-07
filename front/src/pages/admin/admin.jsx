import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography, IconButton, Modal, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { AdminPanelSettingsOutlined, LockOpenOutlined, SecurityOutlined, DeleteOutlined, EditOutlined, AddCircleOutline } from "@mui/icons-material";
import { rows } from "./data";

function Admin() {
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
    access: "User",
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
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleNewUserSubmit = () => {
    if (editingUser) {
      setData(data.map((user) => (user.id === editingUser.id ? newUser : user)));
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
      departement: "",
      access: "User",
    });
  };

  const handleAccessChange = (event) => {
    setNewUser({ ...newUser, access: event.target.value });
  };

  const handleDeleteUser = (userId) => {
    setData(data.filter((user) => user.id !== userId));
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser(user);
    setShowAddUserForm(true);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 33, align: "center", headerAlign: "center", flex: 1 },
    { field: "NomUtilisateur", headerName: "Nom D'utilisateur", align: "center", flex: 1, headerAlign: "center" },
    { field: "Nom", headerName: "Nom", align: "center", flex: 1, headerAlign: "center" },
    { field: "prenom", headerName: "Prénom", align: "center", flex: 1, headerAlign: "center" },
    { field: "email", headerName: "Email", flex: 1, align: "center", headerAlign: "center" },
    { field: "departement", headerName: "Departement", align: "center", headerAlign: "center", flex: 1 },
    {
      field: "access",
      headerName: "Accès",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { access } }) => (
        <Box sx={{ height: "100%", textAlign: "center", display: "flex", justifyContent: "space-evenly", alignItems: "center", backgroundColor: access === "Admin" ? "#1976d2" : access === "Manager" ? "#388e3c" : "#f57c00" }}>
          {access === "Admin" && <AdminPanelSettingsOutlined sx={{ color: "#fff" }} fontSize="small" />}
          {access === "Manager" && <SecurityOutlined sx={{ color: "#fff" }} fontSize="small" />}
          {access === "User" && <LockOpenOutlined sx={{ color: "#fff" }} fontSize="small" />}
          <Typography sx={{ fontSize: "13px", color: "#fff" }}>{access}</Typography>
        </Box>
      )},
   
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box>
          <IconButton color="primary" onClick={() => handleEditUser(params.row)}>
            <EditOutlined />
          </IconButton>
          <IconButton color="error" onClick={() => handleDeleteUser(params.row.id)}>
            <DeleteOutlined />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100vh", backgroundColor: "white" }}>
      <p style={{ color: "orange", fontSize: "30px", margin: 15, fontWeight: 500 }}>Les utilisateurs</p>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid slots={{ toolbar: GridToolbar }} rows={data} columns={columns} />
      </Box>
      <Button variant="contained" color="primary" startIcon={<AddCircleOutline />} onClick={handleAddUser} style={{ alignSelf: "flex-end", margin: "16px" }}>
        Ajouter un utilisateur
      </Button>
      <Modal open={showAddUserForm} onClose={handleCloseAddUserForm} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", border: "2px solid #000", boxShadow: 24, p: 4 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {editingUser ? "Modifier un utilisateur" : "Ajouter un nouvel utilisateur"}
          </Typography>
          <TextField label="Nom d'utilisateur" variant="outlined" name="NomUtilisateur" value={newUser.NomUtilisateur} onChange={handleNewUserChange} style={{ marginTop: 16 }} />
          <TextField label="Nom" variant="outlined" name="Nom" value={newUser.Nom} onChange={handleNewUserChange} style={{ marginTop: 16 }} />
          <TextField label="Prénom" variant="outlined" name="prenom" value={newUser.prenom} onChange={handleNewUserChange} style={{ marginTop: 16 }} />
          <TextField label="Email" variant="outlined" name="email" value={newUser.email} onChange={handleNewUserChange} style={{ marginTop: 16 }} />
         <TextField label="Département" variant="outlined" name="departement" value={newUser.departement} onChange={handleNewUserChange} style={{ marginTop: 16 }} />
          <FormControl variant="outlined" style={{ marginTop: 16 }}>
            <InputLabel id="access-label">Accès</InputLabel>
            <Select labelId="access-label" id="access-select" value={newUser.access} onChange={handleAccessChange} label="Accès">
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
            <Button variant="contained" color="primary" onClick={handleNewUserSubmit}>
              {editingUser ? "Enregistrer" : "Ajouter"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default Admin;