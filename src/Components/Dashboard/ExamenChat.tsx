import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container, TextField, Button, List, ListItem, ListItemText, Typography, Box, CssBaseline, Link } from '@mui/material';

const App: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isChatActive, setIsChatActive] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isChatActive) {
        const newMessage = `Mensaje de simulación ${messages.length + 1}`;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [messages.length, isChatActive]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages]);

  const sendMessage = useCallback(() => {
    if (inputValue.trim() === '') return;

    if (inputValue.toLowerCase() === 'menu') {
      setMessages((prevMessages) => {
          return [
              ...prevMessages,
              'Opciones: Menú, Salir',
              <Link href="https://www.facebook.com/profile.php?id=100064004102050&locale=es_LA" target="_blank">Visitar Perfil</Link>,
          ];
      });
    } else if (inputValue.toLowerCase() === 'salir') {
      setMessages((prevMessages) => [...prevMessages, 'Gracias por usar el chat. ¡Hasta luego!']);
      setIsChatActive(false);
    } else {
      setMessages((prevMessages) => [...prevMessages, inputValue]);
    }

    setInputValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputValue]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        sendMessage();
      }
    },
    [sendMessage]
  );

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Chat en Tiempo Real
        </Typography>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              <ListItemText primary={msg} />
            </ListItem>
          ))}
        </List>
        {isChatActive && (
          <Box display="flex" mt={2}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Escribe un mensaje..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              inputRef={inputRef}
            />
            <Button variant="contained" color="primary" onClick={sendMessage} sx={{ ml: 2 }}>
              Enviar
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
};

export default App;
