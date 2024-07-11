import { useState, useMemo, useCallback } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

export default function CalculadoraIMC() {
  const [peso, setPeso] = useState<number | undefined>(undefined);
  const [altura, setAltura] = useState<number | undefined>(undefined);
  const [show, setShow] = useState(false);

  const calcularIMC = useCallback(() => {
    if (peso && altura) {
      const imc = peso / (altura * altura);
      console.log(imc);
      if (imc < 18.5) {
        return "Bajo peso";
      } else if (imc >= 18.5 && imc < 24.9) {
        return "Peso normal";
      } else if (imc >= 25 && imc < 29.9) {
        return "Sobrepeso";
      } else if (imc >= 30 && imc < 34.9) {
        return "Obesidad";
      } else if (imc >= 35 && imc < 39.9) {
        return "Obesidad";
      } else {
        return "Obesidad";
      }
    }
    return "Valores no válidos";
  }, [peso, altura]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShow(true);
  }, []);

  const imcResult = useMemo(() => {
    if (show) {
      return calcularIMC();
    }
    return "";
  }, [show, calcularIMC]);

  if (show) {
    alert(`Tu IMC es: ${imcResult}`);
    setShow(false); 
  }

  return (
    <Container
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "background.paper",
        padding: 3,
        borderRadius: 2,
        background: "#f5f5f5",
        width: "30%"
      }}
    >
      <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
        Calculadora IMC
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h6" variant="h5">
          Peso
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          name="peso"
          type="number"
          id="peso"
          value={peso || ""}
          onChange={(e) => setPeso(Number(e.target.value))}
        />
        <Typography component="h6" variant="h5">
          Altura
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          name="altura"
          type="number"
          id="altura"
          value={altura || ""}
          onChange={(e) => setAltura(Number(e.target.value))}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Calcular
        </Button>
      </Box>
    </Container>
  );
}
