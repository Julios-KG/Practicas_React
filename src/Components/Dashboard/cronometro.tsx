import React, { useRef, useState } from "react";
import { Container, Button, Typography, Box } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReplayIcon from '@mui/icons-material/Replay';

function Stopwatch() {
    const [startTime, setStartTime] = useState(0);
    const [now, setNow] = useState(0);
    const intervalRef = useRef(null);

    function handleStart() {
        const currentTime = Date.now();
        setStartTime(currentTime);
        setNow(currentTime);

        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setNow(Date.now());
        }, 10);
    }

    function handleStop() {
        clearInterval(intervalRef.current);
    }

    function handleReset() {
        clearInterval(intervalRef.current);
        setStartTime(0);
        setNow(0);
    }

    let secondsPassed = (now - startTime) / 1000;

    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Cronómetro
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
                Segundos pasados: {secondsPassed.toFixed(2)}
            </Typography>
            <Box>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PlayArrowIcon />}
                    onClick={handleStart}
                    style={{ margin: '5px' }}
                >
                    Iniciar
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<PauseIcon />}
                    onClick={handleStop}
                    style={{ margin: '5px' }}
                >
                    Detener
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<ReplayIcon />}
                    onClick={handleReset}
                    style={{ margin: '5px' }}
                >
                    Reiniciar
                </Button>
            </Box>
        </Container>
    );
}

export default Stopwatch;
