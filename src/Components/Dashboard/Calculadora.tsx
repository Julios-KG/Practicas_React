// src/components/Calculator.tsx

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Container, Grid, Button, Typography, List, ListItem } from '@mui/material';

// Función para evaluar la expresión de manera segura
const evaluateExpression = (expression: string): number => {
  // Implementar un evaluador básico de expresiones
  const operands: string[] = [];
  const operators: string[] = [];
  let number = '';

  for (const char of expression) {
    if ('0123456789.'.includes(char)) {
      number += char;
    } else if ('+-*/'.includes(char)) {
      operands.push(number);
      operators.push(char);
      number = '';
    }
  }
  operands.push(number);

  if (operands.length - 1 !== operators.length) {
    throw new Error('Invalid expression');
  }

  const performOperation = (a: number, b: number, operator: string): number => {
    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return a / b;
      default:
        throw new Error('Unknown operator');
    }
  };

  let result = parseFloat(operands[0]);
  for (let i = 0; i < operators.length; i++) {
    result = performOperation(result, parseFloat(operands[i + 1]), operators[i]);
  }
  return result;
};

const Calculadora: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handleButtonClick = useCallback((value: string) => {
    setInput(prev => prev + value);
  }, []);

  const handleClear = useCallback(() => {
    setInput('');
    setResult(null);
  }, []);

  const handleCalculate = useCallback(() => {
    try {
      const calculatedResult = evaluateExpression(input);
      setResult(calculatedResult);
      setHistory(prev => [...prev, `${input} = ${calculatedResult}`]);
      setInput('');
    } catch {
      setResult(null);
      alert('Expresión inválida');
    }
  }, [input]);

  const memoizedResult = useMemo(() => result, [result]);

  useEffect(() => {
    // Save history to localStorage or perform other side effects if needed
  }, [history]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Calculadora
      </Typography>
      <Typography variant="h6" gutterBottom>
        {input || "0"}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Resultado: {memoizedResult !== null ? memoizedResult : "N/A"}
      </Typography>
      <Grid container spacing={1}>
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((value) => (
          <Grid item xs={3} key={value}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => value === '=' ? handleCalculate() : handleButtonClick(value)}
            >
              {value}
            </Button>
          </Grid>
        ))}
        <Grid item xs={6}>
          <Button variant="contained" color="secondary" fullWidth onClick={handleClear}>
            C
          </Button>
        </Grid>
      </Grid>
      <Typography variant="h6" gutterBottom>
        Historial
      </Typography>
      <List>
        {history.map((entry, index) => (
          <ListItem key={index}>
            {entry}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Calculadora;
