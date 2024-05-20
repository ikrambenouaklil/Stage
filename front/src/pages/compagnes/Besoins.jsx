import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { exportToExcel } from "./utils";

import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  CircularProgress,
  Alert,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
} from "@mui/material";
import { useParams } from "react-router-dom";

const Besoins = ({ role }) => {
  const { compagneId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [besoins, setBesoins] = useState([]);
  const [newBesoin, setNewBesoin] = useState({
    item: "",
    valorisation: "",
    quantité: "",
    duréeContrat: "",
    compteComptable: "",
    compagne: compagneId,
  });
const [managerBlocked, setManagerBlocked] = useState(false);
  useEffect(() => {
    const fetchBesoins = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:3010/besoin/${compagneId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        setBesoins(data.map((besoin) => ({ ...besoin, id: besoin._id })));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBesoins();
  }, [compagneId]);

  const handleBlockManager = () => {
    setManagerBlocked(true);
  };

  const handleUnblockManager = () => {
    setManagerBlocked(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
const columns = [
  {
    field: "item",
    headerName: "Item",
    align: "center",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "valorisation",
    headerName: "Valorisation",
    align: "center",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "quantité",
    headerName: "Quantité",
    align: "center",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "duréeContrat",
    headerName: "Durée de contrat",
    align: "center",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "compteComptable",
    headerName: "Compte Comptable",
    align: "center",
    headerAlign: "center",
    flex: 1,
    renderCell: (params) =>
      role === "Admin" ? (
        <TextField
          select
          value={params.row.compteComptable}
          onChange={(e) =>
            handleCompteComptableChange(e.target.value, params.row.id)
          }
        >
          {Array.from({ length: 8 }, (_, i) => i + 61).map((num) => (
            <MenuItem key={num} value={num}>
              {num}
            </MenuItem>
          ))}
        </TextField>
      ) : (
        <div>{params.row.compteComptable}</div>
      ),
    columnVisibilityModel: {
      compteComptable: role === "Admin",
    },
  },
  {
    field: "actions",
    headerName: "Actions",
    align: "center",
    headerAlign: "center",
    flex: 1,
    renderCell: (params) => (
      <>
        {role === "Manager" && !managerBlocked && (
          <>
            <IconButton
              color="primary"
              onClick={() => handleEditDialog(params.row)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </>
    ),
    hide: managerBlocked || role !== "Admin", // Cacher la colonne si les managers sont bloqués ou si l'utilisateur n'est pas un administrateur
  },
];

  const handleExportToExcel = () => {
    exportToExcel(besoins, "besoins_data");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3010/besoin/${compagneId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBesoin),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const newBesoinData = await response.json();
      setBesoins((prevBesoins) => [
        ...prevBesoins,
        { ...newBesoinData, id: newBesoinData._id },
      ]);

      setNewBesoin({
        item: "",
        valorisation: "",
        quantité: "",
        duréeContrat: "",
        compteComptable: "",
        compagne: compagneId,
      });

      setOpen(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:3010/besoin/${newBesoin.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBesoin),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const updatedBesoinData = await response.json();
      setBesoins((prevBesoins) =>
        prevBesoins.map((besoin) =>
          besoin.id === updatedBesoinData.id
            ? { ...updatedBesoinData, id: besoin.id }
            : besoin
        )
      );

      setNewBesoin({
        item: "",
        valorisation: "",
        quantité: "",
        duréeContrat: "",
        compteComptable: "",
        compagne: compagneId,
      });

      setOpen(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3010/besoin/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      setBesoins((prevBesoins) =>
        prevBesoins.filter((besoin) => besoin.id !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditDialog = (besoin) => {
    setNewBesoin(besoin);
    setOpen(true);
  };

  const handleCompteComptableChange = async (compteComptable, id) => {
    try {
      const response = await fetch(`http://localhost:3010/besoin/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ compteComptable }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const updatedBesoinData = await response.json();
      setBesoins((prevBesoins) =>
        prevBesoins.map((besoin) =>
          besoin.id === id ? { ...besoin, compteComptable } : besoin
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: "50px 20px 0px 20px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ color: "orange", fontWeight: "500", fontSize: 20 }}>
          Les Besoins
        </p>
        <div></div>
      </div>
      <div>
        {role === "Admin" && (
          <>
            {managerBlocked ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleUnblockManager}
              >
                Débloquer Managers
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleBlockManager}
              >
                Bloquer Managers
              </Button>
            )}
          </>
        )}
      </div>

      <Box sx={{ height: 400, width: "100%" }}>
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">Error: {error}</Alert>
        ) : (
          <DataGrid
            slots={{ toolbar: GridToolbar }}
            rows={besoins}
            columns={columns.map((column) => ({
              ...column,
              editable: role === "Manager" && !managerBlocked ? true : false,
            }))}
          />
        )}
      </Box>

      <React.Fragment>
        <div>
          {role === "Admin" && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleExportToExcel}
              fullWidth
            >
              Export as Excel
            </Button>
          )}
        </div>

        <div>
          {role === "Manager" && (
            <Button
              variant="outlined"
              onClick={handleClickOpen}
              color="primary"
              fullWidth
            >
              Ajouter
            </Button>
          )}
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {newBesoin.id ? "Modifier Un besoin" : "Ajouter Un besoin"}
          </DialogTitle>
          <DialogContent>
            <form
              onSubmit={newBesoin.id ? handleUpdate : handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              <TextField
                autoFocus
                required
                margin="dense"
                name="item"
                label="Item"
                type="text"
                fullWidth
                variant="standard"
                value={newBesoin.item}
                onChange={(e) =>
                  setNewBesoin({ ...newBesoin, item: e.target.value })
                }
              />
              <TextField
                autoFocus
                required
                margin="dense"
                name="valorisation"
                label="Valorisation"
                type="number"
                fullWidth
                variant="standard"
                value={newBesoin.valorisation}
                onChange={(e) =>
                  setNewBesoin({ ...newBesoin, valorisation: e.target.value })
                }
              />
              <TextField
                autoFocus
                margin="dense"
                name="quantité"
                label="Quantité"
                type="number"
                fullWidth
                variant="standard"
                value={newBesoin.quantité}
                onChange={(e) =>
                  setNewBesoin({ ...newBesoin, quantité: e.target.value })
                }
              />
              <TextField
                autoFocus
                margin="dense"
                name="duréeContrat"
                label="Durée de contrat"
                type="number"
                fullWidth
                variant="standard"
                value={newBesoin.duréeContrat}
                onChange={(e) =>
                  setNewBesoin({ ...newBesoin, duréeContrat: e.target.value })
                }
              />
              {role === "Admin" && (
                <TextField
                  autoFocus
                  margin="dense"
                  name="compteComptable"
                  label="Compte Comptable"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={newBesoin.compteComptable}
                  onChange={(e) =>
                    setNewBesoin({
                      ...newBesoin,
                      compteComptable: e.target.value,
                    })
                  }
                >
                  {Array.from({ length: 8 }, (_, i) => i + 61).map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              <DialogActions>
                <Button onClick={handleClose}>Annuler</Button>
                <Button type="submit">
                  {newBesoin.id ? "Mettre à jour" : "Enregistrer"}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </section>
  );
};

export default Besoins;
