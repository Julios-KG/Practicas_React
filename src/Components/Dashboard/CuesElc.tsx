import React, { useState, useCallback, useEffect } from 'react';
import { Container, TextField, Button, Typography, Snackbar, List, ListItem, ListItemText, Box, Pagination } from '@mui/material';

interface SurveyResponse {
  name: string;
  email: string;
  date: string;
  store: string;
  answers: string[];
}

const questions = [
  "¿Cómo calificarías la calidad de los productos?",
  "¿Cómo calificarías la atención al cliente?",
  "¿Recomendarías nuestra tienda a un amigo?",
  "¿Qué tan fácil fue navegar por nuestra tienda?",
  "¿Cómo calificarías la variedad de productos?",
  "¿Cómo calificarías la relación calidad-precio?"
];

const Electronica: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [store, setStore] = useState<string>('');
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [surveyCount, setSurveyCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 5; // Número de respuestas por página

  const handleAnswerChange = useCallback((index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  }, [answers]);

  const handleSubmit = useCallback(() => {
    if (name && email && store && answers.every(answer => answer)) {
      const newResponse: SurveyResponse = { name, email, date, store, answers };
      setResponses((prev) => [...prev, newResponse]);
      setSurveyCount((prev) => prev + 1);
      setSnackOpen(true);

      // Reset form
      setName('');
      setEmail('');
      setStore('');
      setAnswers(Array(questions.length).fill(''));
    } else {
      alert("Por favor, completa todos los campos.");
    }
  }, [name, email, date, store, answers]);

  const handleSnackbarClose = () => {
    setSnackOpen(false);
  };

  const handleChangePage = (event: unknown, value: number) => {
    setPage(value);
  };

  const totalPages = Math.ceil(responses.length / itemsPerPage);
  const currentResponses = responses.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  useEffect(() => {
    // Aquí podrías manejar la persistencia de las respuestas, por ejemplo, enviándolas a un backend
  }, [responses]);

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Cuestionario de Satisfacción
      </Typography>
      <TextField 
        label="Nombre" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        fullWidth 
        margin="normal"
      />
      <TextField 
        label="Correo Electrónico" 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        fullWidth 
        margin="normal"
      />
      <TextField 
        label="Fecha" 
        type="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
        fullWidth 
        margin="normal"
      />
      <TextField 
        label="Tienda" 
        value={store} 
        onChange={(e) => setStore(e.target.value)} 
        fullWidth 
        margin="normal"
      />
      {questions.map((question, index) => (
        <TextField 
          key={index}
          label={question} 
          value={answers[index]} 
          onChange={(e) => handleAnswerChange(index, e.target.value)} 
          fullWidth 
          margin="normal"
        />
      ))}
      <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ mt: 2 }}>
        Enviar Cuestionario
      </Button>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Cuestionarios completados: {surveyCount}
      </Typography>
      
      <List sx={{ mt: 3, maxHeight: '200px', overflow: 'auto' }}>
        {currentResponses.map((response, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${response.name} - ${response.store}`} />
          </ListItem>
        ))}
      </List>

      <Pagination 
        count={totalPages} 
        page={page} 
        onChange={handleChangePage} 
        sx={{ mt: 2 }} 
      />

      <Snackbar 
        open={snackOpen} 
        autoHideDuration={3000} 
        onClose={handleSnackbarClose} 
        message="Cuestionario enviado exitosamente!"
      />
    </Container>
  );
};

export default Electronica;
