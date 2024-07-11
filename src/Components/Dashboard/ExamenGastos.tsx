import { useState, useMemo } from 'react';
import { FormControl, Button, TextField, Select, MenuItem, InputLabel, Box, Typography } from '@mui/material';

const Exam = () => {
    const [gasto, setGasto] = useState(0);
    const [ingreso, setIngreso] = useState(0);
    const [registros, setRegistros] = useState([]);
    const [cantidad, setCantidad] = useState('');
    const [tipo, setTipo] = useState('');

    const total = useMemo(() => ingreso - gasto, [ingreso, gasto]);

    const calculate = () => {
        const cantidadInt = parseInt(cantidad);

        if (isNaN(cantidadInt)) {
            return;
        }

        if (tipo === 'ingreso') {
            setIngreso(prevIngreso => prevIngreso + cantidadInt);
        } else if (tipo === 'gasto') {
            setGasto(prevGasto => prevGasto + cantidadInt);
        }

        setRegistros(prevRegistros => {
            return [...prevRegistros, { tipo, cantidad: cantidadInt }];
        });
        setCantidad('');
        setTipo('');
    };

    return (
        <Box>
            <Box className="card">
                <Typography variant="h5" className="card-header">Calculadora de gastos</Typography>
                <Box className="card-body">
                    <Typography variant="h5" className="card-title">Total: {total}</Typography>
                    <Typography variant="h6">Registros</Typography>
                    <Box id="registros-div">
                        {registros.map((registro, index) => (
                            <Typography key={index}>{`${registro.tipo}: ${registro.cantidad}`}</Typography>
                        ))}
                    </Box>
                </Box>
            </Box>
            <form>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Registro"
                        type="number"
                        id="cantidad"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        min="0"
                        variant="outlined"
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="tipo">Tipo</InputLabel>
                    <Select
                        id="tipo"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                    >
                        <MenuItem value="ingreso">Ingreso</MenuItem>
                        <MenuItem value="gasto">Gasto</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <Button type="button" variant="contained" onClick={calculate}>Agregar</Button>
                </FormControl>
            </form>
        </Box>
    );
};

export default Exam;
