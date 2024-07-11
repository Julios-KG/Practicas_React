import React, { useReducer, useMemo, useCallback, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Typography,
  Container,
  Box,
  Paper,
  ThemeProvider,
  createTheme,
} from '@mui/material';


// Aqui we defines tu tipo de tarea cabron en la interface y la llamas con un array
interface Task {
  text: string;
  completed: boolean;
}

// Este es tu type de acciones de useReducer, no te equivoques o vales madres
type Action =
  | { type: 'New-Task'; payload: string }
  | { type: 'Check_Task'; payload: number }
  | { type: 'Delete_Task'; payload: number };

// Esto es como tu save data we, aqui empieza todo men
const initialState: Task[] = [];

// Aqui va lo chido de reducer por que eres dilexcio escribe y ve despacio
// No se te olvide lo que escribas baboso
const reducer = (state: Task[], action: Action): Task[] => {
  switch (action.type) {
    case 'New-Task':
      return [...state, { text: action.payload, completed: false }];
    case 'Check_Task':
      return state.map((task, index) =>
        index === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    case 'Delete_Task':
      return state.filter((_, index) => index !== action.payload);
    default:
      return state;
  }
};
// cuando no hay nada escrito es false, pero cuando agregas es true we
// luego en el check se utiliza para alternar el estado de completado de tareas, es decir cuando le doy click we
// de ultimo el delete filtra la posicion de la tarea eliminada y lo reduce en el contador de tareas


// Aqui empieza la funcion React.FC es pra declarar la funcion que le estamos dando
const ListaTask: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [taskText, setTaskText] = useState('');
  
// INVESTIGA WE, pero aun asi, declarar tus variable aqui
  const addTask = useCallback((text: string) => {
    dispatch({ type: 'New-Task', payload: text });
  }, []);

  const toggleTask = useCallback((index: number) => {
    dispatch({ type: 'Check_Task', payload: index });
  }, []);

  const deleteTask = useCallback((index: number) => {
    dispatch({ type: 'Delete_Task', payload: index });
  }, []);

  
  // Define la funcion paps
  const handleAddTask = () => {
    if (taskText.trim() !== '') {
      addTask(taskText);
      setTaskText('');
    }
  };

  // Aqui la funcion de useMemo nueva papa para rendizar las tareas al momento
  const completedTaskCount = useMemo(
    () => state.filter(task => task.completed).length,
    [state]
  );

  // Profa le di como 4 veces enter y no se agregaba asi que puse esto de la pratica anterior
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

// Colores de los inconos y botones
  const theme = createTheme({
    palette: {
      primary: {
        main: '#004d40',
      },
      secondary: {
        main: '#b2102f',
      },
      success: {
        main: '#d500f9',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" style={{ marginTop: '2rem', backgroundColor: '#f5f5f5', padding: '2rem', borderRadius: '8px' }}>
        <Typography variant="h4" gutterBottom align="center">
          Lista de Tareas
        </Typography>
        <Box display="flex" alignItems="center" marginBottom="1rem">
          <TextField
            label="Nueva Tarea"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="outlined"
            margin="normal"
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTask}
            style={{ marginLeft: '1rem', height: '56px' }}
            startIcon={<SendIcon />}
          >
            Enviar
          </Button>

        </Box>
        <Typography variant="subtitle1" style={{ marginTop: '20px' }} align="center">
          Tareas Completadas: {completedTaskCount}/{state.length}
        </Typography>
 
        <Paper elevation={3}>
          <List>
            {state.map((task, index) => (
              <ListItem key={index} dense style={{ borderBottom: '1px solid #e0e0e0' }}>
                <Checkbox
                  checked={task.completed}
                  onChange={() => toggleTask(index)}
                  color='success'
                  icon={<TaskAltIcon />}
                  checkedIcon={<TaskAltIcon />}
                />

                <ListItemText primary={task.text} />
                <IconButton edge="end" color="secondary" onClick={() => deleteTask(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default ListaTask;
