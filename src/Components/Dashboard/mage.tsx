import React, { useRef, useState } from "react";
import { Button, Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";

const StyledInput = styled("input")({
  display: "none",
});

const PrevImagen = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12}>
        <Typography variant="h3" align="center" gutterBottom>
          Carga de Imagen
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <StyledInput
          type="file"
          accept="image/*"
          ref={fileInput}
          onChange={handleImageChange}
        />
      </Grid>
      <Grid item xs={12} style={{ marginTop: 16 }}>
        <Button variant="contained" onClick={handleClick}>
          Seleccionar Imagen
        </Button>
      </Grid>
      {imageSrc && (
        <Grid item xs={12} style={{ marginTop: 20 }}>
          <div style={{ textAlign: "center" }}>
            <img
              src={imageSrc}
              alt="Previsualización"
              style={{ maxWidth: "100%", borderRadius: 8 }}
            />
          </div>
        </Grid>
      )}
    </Grid>
  );
};

export default PrevImagen;

