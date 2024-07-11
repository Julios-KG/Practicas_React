import React, { useState, useCallback, useMemo } from 'react';
import { Container, TextField, Button, Typography, Grid, Box, Paper } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: 400,
}));

const ContadorEx: React.FC = () => {
  const [count, setCount] = useState(0);
  const [incrementValue, setIncrementValue] = useState(1);

  const handleIncrementChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setIncrementValue(parseInt(event.target.value, 10) || 0);
  }, []);

  const incrementCount = useCallback(() => {
    setCount(prevCount => prevCount + incrementValue);
  }, [incrementValue]);

  const nextValue = useMemo(() => count + incrementValue, [count, incrementValue]);

  return (
    <StyledContainer>
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom>
          Contador Personalizado
        </Typography>
        <Box mb={2}>
          <TextField
            label="Valor de Incremento"
            type="number"
            value={incrementValue}
            onChange={handleIncrementChange}
            fullWidth
          />
        </Box>
        <Button variant="contained" color="primary" onClick={incrementCount} fullWidth>
          Incrementar
        </Button>
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            Valor Actual: {count}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Valor Siguiente: {nextValue}
          </Typography>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default ContadorEx;
