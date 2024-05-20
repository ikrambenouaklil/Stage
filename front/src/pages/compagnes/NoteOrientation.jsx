import { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";

function NoteOrientation() {
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
const [previewSource, setPreviewSource] = useState("");
  const handleInput = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileInputState(e.target.value);
    previewFile(file); 
  };
const previewFile=(file)=>{
  const reader = new FileReader(); 
  reader.readAsDataURL(file); 
  reader.onloadend=()=>{
    setPreviewSource(reader.result)
  }
}
  return (
    <Box
      sx={{
        display: "flex",
        // flexDirection: "",
        gap: "4px",
        width: "100%",
        // backgroundColor: "background.default",
      }}
    >
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          width: "50%",
          backgroundColor: "white",
          padding: 10,
          height: "100%",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          color="orange"
          gutterBottom
          sx={{ fontWeight: 500 }}
        >
          Note D'orientation
        </Typography>
        <TextField
          type="file"
          name="noteOrientation"
          onChange={handleInput}
          value={fileInputState}
          variant="outlined"
          fullWidth
        />
        <Button
          variant="contained"
          type="button"
          sx={{ backgroundColor: "orange" }}
        >
          Ajouter
        </Button>
      </Box>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          width: "50%",
          backgroundColor: "white",
          padding: 10,
          height: "100%",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          color="orange"
          gutterBottom
          sx={{ fontWeight: 500 , 
            
           }}
        >
         La Lettre D'acompagnement
        </Typography>
        <TextField
          type="file"
          name="noteOrientation"
          onChange={handleInput}
          value={fileInputState}
          variant="outlined"
          fullWidth
        />
        <Button
          variant="contained"
          type="button"
          sx={{ backgroundColor: "orange" }}
        >
          Ajouter
        </Button>
      </Box>
    </Box>
  );
}

export default NoteOrientation;
