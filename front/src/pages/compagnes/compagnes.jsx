import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const Compagnes = () => {
  const [compagnes, setCompagnes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompagnes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3010/compagnes");
        const data = await response.json();
        setCompagnes(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompagnes();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 33,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Année",
      headerName: "Année",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
  ];

  return (
    <section
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
        Les Compagnes Budgetaires
      </p>
      <Box>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <DataGrid
            slots={{ toolbar: GridToolbar }}
            rows={compagnes}
            columns={columns}
          />
        )}
      </Box>
    </section>
  );
};

export default Compagnes;
