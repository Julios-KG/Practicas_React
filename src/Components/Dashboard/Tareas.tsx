// App.tsx
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Container, Typography, Box, TextField, Button, List, ListItem, ListItemText, IconButton, Checkbox, Divider, Pagination, Snackbar, MenuItem, Select } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface Task {
  id: number;
  text: string;
  assignedTo: string;
  completed: boolean;
  priority: 'alta' | 'media' | 'baja';
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Tarea: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'alta' | 'media' | 'baja'>('media');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const tasksPerPage = 5;

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = useCallback(() => {
    if (newTaskText.trim() && newTaskAssignee.trim()) {
      if (tasks.some((task) => task.text.toLowerCase() === newTaskText.toLowerCase())) {
        setError('Ya existe una tarea con el mismo nombre.');
        return;
      }

      const newTask: Task = {
        id: Date.now(),
        text: newTaskText,
        assignedTo: newTaskAssignee,
        completed: false,
        priority: newTaskPriority,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskText('');
      setNewTaskAssignee('');
      setNewTaskPriority('media');
      setError('');
      setSnackbarMessage('Tarea agregada exitosamente');
      setOpenSnackbar(true);
    }
  }, [newTaskText, newTaskAssignee, newTaskPriority, tasks]);

  const handleEditTask = useCallback(() => {
    if (editingTask && newTaskText.trim() && newTaskAssignee.trim()) {
      if (tasks.some((task) => task.text.toLowerCase() === newTaskText.toLowerCase() && task.id !== editingTask.id)) {
        setError('Ya existe una tarea con el mismo nombre.');
        return;
      }

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTask.id ? { ...task, text: newTaskText, assignedTo: newTaskAssignee, priority: newTaskPriority } : task
        )
      );
      setEditingTask(null);
      setNewTaskText('');
      setNewTaskAssignee('');
      setNewTaskPriority('media');
      setError('');
      setSnackbarMessage('Tarea editada exitosamente');
      setOpenSnackbar(true);
    }
  }, [editingTask, newTaskText, newTaskAssignee, newTaskPriority, tasks]);

  const handleDeleteTask = useCallback((id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    setSnackbarMessage('Tarea eliminada exitosamente');
    setOpenSnackbar(true);
  }, []);

  const handleToggleCompleteTask = useCallback((id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const completedTasksCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  );

  const uncompletedTasksCount = useMemo(
    () => tasks.filter((task) => !task.completed).length,
    [tasks]
  );

  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.text.toLowerCase().includes(searchQuery.toLowerCase())),
    [tasks, searchQuery]
  );

  const sortedTasks = useMemo(() => {
    return filteredTasks.sort((a, b) => {
      const priorityOrder = { 'alta': 3, 'media': 2, 'baja': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }, [filteredTasks]);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    document.title = `Completed: ${completedTasksCount} / Uncompleted: ${uncompletedTasksCount}`;
  }, [completedTasksCount, uncompletedTasksCount]);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Lista de Tareas
      </Typography>
      <Box display="flex" mb={2}>
        <TextField
          label="Nueva Tarea"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          fullWidth
          margin="normal"
          error={!!error}
          helperText={error}
        />
        <TextField
          label="Asignado a"
          value={newTaskAssignee}
          onChange={(e) => setNewTaskAssignee(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ ml: 2 }}
        />
        <Select
          label="Prioridad"
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(e.target.value as 'alta' | 'media' | 'baja')}
          fullWidth
          margin="none"
          sx={{ ml: 2 }}
        >
          <MenuItem value="alta">Alta</MenuItem>
          <MenuItem value="media">Media</MenuItem>
          <MenuItem value="baja">Baja</MenuItem>
        </Select>
        <Button
          onClick={editingTask ? handleEditTask : handleAddTask}
          variant="contained"
          color="primary"
          sx={{ ml: 2, mt: 'auto', mb: 'auto' }}
        >
          {editingTask ? 'Guardar' : 'Agregar'}
        </Button>
      </Box>
      <Box mb={2}>
        <TextField
          label="Buscar Tareas"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          margin="normal"
        />
      </Box>
      <Divider />
      <Typography variant="h6" component="h2" gutterBottom mt={2}>
        Tareas ({completedTasksCount} completadas / {uncompletedTasksCount} no completadas)
      </Typography>
      <List>
        {currentTasks.map((task) => (
          <ListItem key={task.id} divider>
            <Checkbox
              checked={task.completed}
              onChange={() => handleToggleCompleteTask(task.id)}
            />
            <ListItemText
              primary={task.text}
              secondary={`Asignado a: ${task.assignedTo} | Prioridad: ${task.priority}`}
              sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            />
            <IconButton
              onClick={() => {
                setEditingTask(task);
                setNewTaskText(task.text);
                setNewTaskAssignee(task.assignedTo);
                setNewTaskPriority(task.priority);
              }}
              color="primary"
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={() => handleDeleteTask(task.id)}
              color="secondary"
            >
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Pagination
        count={Math.ceil(sortedTasks.length / tasksPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ mt: 2 }}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Tarea;
