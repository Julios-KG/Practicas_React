import React, { useState, useEffect, useCallback } from 'react';
import { Container, Button, Typography, Select, MenuItem, Snackbar, List, ListItem, ListItemText, Box } from '@mui/material';

type Currency = 'MXN' | 'USD' | 'EUR';

interface ChangeRecord {
  from: Currency;
  to: Currency;
  amount: number;
  convertedAmount: number;
}

const currencyOptions: Currency[] = ['MXN', 'USD', 'EUR'];

// Simulación de tipos de cambio
const exchangeRates: Record<Currency, Record<Currency, number>> = {
  MXN: { USD: 0.05, EUR: 0.045 },
  USD: { MXN: 20, EUR: 0.9 },
  EUR: { MXN: 22, USD: 1.1 },
};

const Cambios: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<Currency>('MXN');
  const [toCurrency, setToCurrency] = useState<Currency>('USD');
  const [amount, setAmount] = useState<number>(1);
  const [changeCount, setChangeCount] = useState<number>(0);
  const [changeRecords, setChangeRecords] = useState<ChangeRecord[]>([]);
  const [maxCurrency, setMaxCurrency] = useState<Currency | null>(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  const handleChangeCurrency = useCallback(() => {
    if (changeCount < 12) {
      const rate = exchangeRates[fromCurrency][toCurrency];
      const result = amount * rate;
      const newRecord: ChangeRecord = { from: fromCurrency, to: toCurrency, amount, convertedAmount: result };

      setChangeRecords((prev) => [...prev, newRecord]);
      setConvertedAmount(result);
      setChangeCount((prev) => prev + 1);
      
      const newMaxCurrency = prevMaxCurrency(newRecord);
      setMaxCurrency(newMaxCurrency);
      setSnackOpen(true);
    }
  }, [fromCurrency, toCurrency, amount, changeCount]);

  const prevMaxCurrency = (record: ChangeRecord): Currency => {
    const counts = changeRecords.reduce((acc, rec) => {
      acc[rec.from] = (acc[rec.from] || 0) + 1;
      return acc;
    }, {} as Record<Currency, number>);

    counts[record.from] = (counts[record.from] || 0) + 1;

    return (Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b)) as Currency);
  };

  const handleSnackbarClose = () => {
    setSnackOpen(false);
  };

  useEffect(() => {
    if (changeCount >= 12) {
      alert("Has alcanzado el límite de 12 cambios al día.");
    }
  }, [changeCount]);

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Tienda de Cambio de Divisas
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value as Currency)} sx={{ mr: 2 }}>
          {currencyOptions.map((currency) => (
            <MenuItem key={currency} value={currency}>{currency}</MenuItem>
          ))}
        </Select>
        <Select value={toCurrency} onChange={(e) => setToCurrency(e.target.value as Currency)} sx={{ mr: 2 }}>
          {currencyOptions.map((currency) => (
            <MenuItem key={currency} value={currency}>{currency}</MenuItem>
          ))}
        </Select>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(Number(e.target.value))} 
          min="1" 
          style={{ width: '80px', marginRight: '10px' }}
        />
        <Button onClick={handleChangeCurrency} variant="contained" color="primary">
          Cambiar Divisa
        </Button>
      </Box>
      <Typography variant="h6">
        Cambios realizados: {changeCount} / 12
      </Typography>
      {convertedAmount !== null && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {amount} {fromCurrency} son {convertedAmount.toFixed(2)} {toCurrency}
        </Typography>
      )}
      {maxCurrency && <Typography variant="body1">Divisa más cambiada: {maxCurrency}</Typography>}
      
      <List sx={{ mt: 3, maxHeight: '200px', overflow: 'auto' }}>
        {changeRecords.map((record, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${record.amount} ${record.from} → ${record.convertedAmount.toFixed(2)} ${record.to}`} />
          </ListItem>
        ))}
      </List>

      <Snackbar 
        open={snackOpen} 
        autoHideDuration={3000} 
        onClose={handleSnackbarClose} 
        message="Cambio realizado exitosamente!"
      />
    </Container>
  );
};

export default Cambios;
