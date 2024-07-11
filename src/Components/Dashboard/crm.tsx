import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface Task {
  id: number;
  description: string;
  completed: boolean;
  assignedTo: string;
}

const initialTasks: Task[] = [
  { id: 1, description: 'Task 1', completed: false, assignedTo: 'John Doe' },
  { id: 2, description: 'Task 2', completed: true, assignedTo: 'Jane Smith' },
];

const CRM: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [completedCount, setCompletedCount] = useState<number>(initialTasks.filter(task => task.completed).length);

  useEffect(() => {
    // Update completed count whenever tasks change
    const completedTasks = tasks.filter(task => task.completed);
    setCompletedCount(completedTasks.length);
  }, [tasks]);

  const handleNewTaskDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskDescription(event.target.value);
  };

  const handleAssignedToChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAssignedTo(event.target.value as string);
  };

  const handleAddTask = () => {
    if (newTaskDescription.trim() !== '') {
      const newTask: Task = {
        id: tasks.length + 1,
        description: newTaskDescription,
        completed: false,
        assignedTo: assignedTo,
      };
      setTasks([...tasks, newTask]);
      setNewTaskDescription('');
      setAssignedTo('');
    }
  };

  const handleDeleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleToggleTaskCompletion = (taskId: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
              Task List
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Completed Tasks: {completedCount}
            </Typography>
            <List>
              {tasks.map(task => (
                <ListItem key={task.id} disableGutters>
                  <Checkbox
                    edge="start"
                    checked={task.completed}
                    tabIndex={-1}
                    disableRipple
                    onChange={() => handleToggleTaskCompletion(task.id)}
                  />
                  <ListItemText primary={task.description} secondary={`Assigned to: ${task.assignedTo}`} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
              Add Task
            </Typography>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              value={newTaskDescription}
              onChange={handleNewTaskDescriptionChange}
              style={{ marginBottom: '10px' }}
            />
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Assigned To</InputLabel>
              <Select
                value={assignedTo}
                onChange={handleAssignedToChange}
                label="Assigned To"
                style={{ marginBottom: '10px' }}
              >
                <MenuItem value="John Doe">John Doe</MenuItem>
                <MenuItem value="Jane Smith">Jane Smith</MenuItem>
                <MenuItem value="Alice Johnson">Alice Johnson</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddTask}
              disabled={newTaskDescription.trim() === '' || assignedTo === ''}
            >
              Add Task
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CRM;
