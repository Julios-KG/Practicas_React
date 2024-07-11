import { useState, useEffect } from 'react';
import { Box, TextField, Button, Paper, Typography, IconButton, Fab, Tooltip, Zoom } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MenuIcon from '@mui/icons-material/Menu';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ChatIcon from '@mui/icons-material/Chat';

type Message = {
  text: string;
  fromUser: boolean;
  icon?: React.ReactNode;
};

const Chats = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [nameAsked, setNameAsked] = useState(false);
  const [openChat, setOpenChat] = useState(false);

  useEffect(() => {
    setMessages([{ text: '¡Hola!, ¿Con quién tengo el gusto?', fromUser: false }]);
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, fromUser: true }]);
      handleBotResponse(input);
      setInput('');
    }
  };

  const handleBotResponse = (message: string) => {
    if (!nameAsked) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `¡Hola, ${message}, a continuación las opciones disponibles!`, fromUser: false },
        { text: 'Opciones: 1. Mostrar Menú', fromUser: false },
        { text: 'Opciones: 2. Contactar Administrador', fromUser: false },
        { text: 'Opciones: 3. Salir', fromUser: false },
      ]);
      setNameAsked(true);
      setShowMenu(true);
    } else if (message.toLowerCase().includes('menu')) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Aquí tienes el Menú: [Enlace del Menu]', fromUser: false },
      ]);
      setShowMenu(false);
    } else if (message.toLowerCase().includes('administrador')) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Claro, en un momento lo contacto.', fromUser: false },
      ]);
      setShowMenu(false);
    } else if (message.toLowerCase().includes('salir')) {
      setMessages([]);
      setMessages([{ text: '¡Hola!, ¿Con quién tengo el gusto?', fromUser: false }]);
      setNameAsked(false);
      setShowMenu(false);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'No entiendo esa opción.', fromUser: false },
      ]);
    }
  };

  const toggleChat = () => {
    setOpenChat(!openChat);
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <Tooltip title="Chat" arrow>
        <Fab color="primary" onClick={toggleChat}>
          <ChatIcon />
        </Fab>
      </Tooltip>
      {openChat && (
        <Zoom in={openChat}>
          <Paper elevation={3} sx={{ width: 320, padding: 2, borderRadius: 3, marginTop: 2 }}>
            <Box sx={{ height: 300, overflow: 'auto', marginBottom: 2 }}>
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: msg.fromUser ? 'flex-end' : 'flex-start',
                    padding: '5px 0',
                  }}
                >
                  <Paper sx={{ padding: 1, maxWidth: '70%', bgcolor: msg.fromUser ? '#e0f7fa' : '#ffffff' }}>
                    <Typography variant="body1">{msg.text}</Typography>
                    {msg.icon}
                  </Paper>
                </Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                variant="outlined"
                size="small"
                sx={{ flexGrow: 1, marginRight: 1 }}
                placeholder="Escribe tu mensaje..."
              />
              <IconButton color="inherit" onClick={handleSend}>
                <SendIcon />
              </IconButton>
            </Box>
            {showMenu && (
              <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<MenuIcon />}
                  onClick={() => handleBotResponse('menu')}
                  sx={{ margin: '5px 0' }}
                  
                >
                  Mostrar Menú
                </Button>
                <Button
                  variant="contained"
                  startIcon={<ContactMailIcon />}
                  onClick={() => handleBotResponse('administrador')}
                  sx={{ margin: '5px 0' }}
                >
                  Contactar
                </Button>
                <Button
                  variant="contained"
                  startIcon={<ExitToAppIcon />}
                  onClick={() => handleBotResponse('salir')}
                  sx={{ margin: '5px 0' }}
                >
                  Salir
                </Button>
              </Box>
            )}
          </Paper>
        </Zoom>
      )}
    </Box>
  );
};

export default Chats;
