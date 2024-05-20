import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Compagnes = () => {
  const [compagnes, setCompagnes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddCompagneDialog, setShowAddCompagneDialog] = useState(false);
  const [newCompagneYear, setNewCompagneYear] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompagnes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3010/compagnes");
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        setCompagnes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompagnes();
  }, []);

  const isDuplicateYear = (year) => {
    return compagnes.some((compagne) => compagne.Année === year);
  };

  const handleYearChange = (event) => {
    const enteredYear = parseInt(event.target.value);
    if (enteredYear >= 2024 && enteredYear <= 9999) {
      setNewCompagneYear(enteredYear);
      setError(
        isDuplicateYear(enteredYear)
          ? "L'année de la campagne doit être unique"
          : null
      );
    } else {
      setError("Veuillez saisir une année entre 2024 et 9999");
    }
  };

  const handleAddCompagne = async () => {
    try {
      if (isDuplicateYear(newCompagneYear)) {
        setError("L'année de la campagne doit être unique");
        return;
      }

      const response = await fetch("http://localhost:3010/compagnes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Année: newCompagneYear }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const newCompagne = await response.json();
      setCompagnes([...compagnes, newCompagne]);
        
      setShowAddCompagneDialog(false);
      setSnackbarOpen(true);
      navigate(`/compagnes/${newCompagne._id}`);
    } catch (error) {
      setError(error.message);
    }
  };
const handleClotureCompagne = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3010/compagnes/${id}/cloturer`,
      {
        method: "PUT",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const updatedCompagne = await response.json();
    setCompagnes((prevCompagnes) =>
      prevCompagnes.map((compagne) =>
        compagne._id === updatedCompagne._id ? updatedCompagne : compagne
      )
    );
  } catch (error) {
    setError(error.message);
  }
};

  const handleViewCompagne = (id) => {
    navigate(`/compagnes/${id}`);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const columns = [

    {
      field: "Année",
      headerName: "Année",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 500,
      getActions: (params) => [
        <GridActionsCellItem
          icon={params.value ? <Visibility /> : <VisibilityOff />}
          label="View"
          onClick={() => handleViewCompagne(params.row._id)}
        />,
      ],
    },
    
  ];

  return (
    <section
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: "30px 20px 0px 20px ",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            color: "orange",
            fontWeight: "500",
            fontSize: 20,
          }}
        >
          Les Compagnes Budgetaires
        </p>
        <div>
          {/* <Button
             variant="contained"
            color="primary"
            onClick={() => setShowAddCompagneDialog(true)}
          >
            Ajouter
          </Button>  */}
        </div>
      </div>
      <Box sx={{ height: 400, width: "100%" }}>
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">Error: {error}</Alert>
        ) : (
          <DataGrid
            slots={{ toolbar: GridToolbar }}
             slotProps={{
        toolbar: {
            printOptions: { disableToolbarButton: true },
            csvOptions: { disableToolbarButton: true },
    }}}
            rows={compagnes.map((compagne) => ({
              ...compagne,
              id: compagne._id,
            }))}
            columns={columns}
       
          />
        )}
      </Box>
      <Dialog
        open={showAddCompagneDialog}
        onClose={() => setShowAddCompagneDialog(false)}
      >
        <DialogTitle>Ajouter Une Compagne</DialogTitle>
        <DialogContent>
          <TextField
            label="Year"
            type="number"
            value={newCompagneYear}
            onChange={handleYearChange}
            inputProps={{ min: 2024 }}
            error={error !== null}
            helperText={error !== null ? error : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddCompagneDialog(false)}>
            Annuler
          </Button>
          <Button
            onClick={handleAddCompagne}
            variant="contained"
            color="primary"
            disabled={error !== null || newCompagneYear === ""}
          >
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Compagne added successfully"
      />
    </section>
  );
};

export default Compagnes;
