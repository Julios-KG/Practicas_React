import React, { useState, useCallback, useMemo } from 'react';
import {
  Container, Paper, Typography, TextField, Button,
  IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface User {
  id: number;
  name: string;
  address: string;
  email: string;
  position: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState<number | null>(null);

  const handleAddUser = useCallback(() => {
    if (isEditMode && editUserId !== null) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editUserId
            ? { ...user, name, address, email, position }
            : user
        )
      );
      setIsEditMode(false);
      setEditUserId(null);
    } else {
      const newUser: User = {
        id: Date.now(),
        name,
        address,
        email,
        position,
      };
      setUsers((prevUsers) => [...prevUsers, newUser]);
    }

    setName('');
    setAddress('');
    setEmail('');
    setPosition('');
  }, [name, address, email, position, isEditMode, editUserId]);

  const handleDeleteUser = useCallback((id: number) => {
    setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
  }, []);

  const handleEditUser = useCallback((user: User) => {
    setName(user.name);
    setAddress(user.address);
    setEmail(user.email);
    setPosition(user.position);
    setIsEditMode(true);
    setEditUserId(user.id);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setName('');
    setAddress('');
    setEmail('');
    setPosition('');
    setIsEditMode(false);
    setEditUserId(null);
  }, []);

  const isAddButtonDisabled = useMemo(() => {
    return !(name && address && email && position);
  }, [name, address, email, position]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Alta de Usuario
        </Typography>
        <TextField
          label="Nombre"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Dirección"
          fullWidth
          margin="normal"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          label="Correo Electrónico"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Puesto"
          fullWidth
          margin="normal"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddUser}
          disabled={isAddButtonDisabled}
          style={{ marginTop: '1rem' }}
        >
          {isEditMode ? 'Guardar Cambios' : 'Agregar Usuario'}
        </Button>
        {isEditMode && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCancelEdit}
            style={{ marginTop: '1rem', marginLeft: '1rem' }}
          >
            Cancelar
          </Button>
        )}
        <div style={{ marginTop: '2rem' }}>
          <Typography variant="h5" gutterBottom>
            Lista de Usuarios
          </Typography>
          <List>
            {users.map((user) => (
              <ListItem key={user.id}>
                <ListItemText
                  primary={user.name}
                  secondary={`${user.address} | ${user.email} | ${user.position}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleEditUser(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleDeleteUser(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      </Paper>
    </Container>
  );
};

export default App;
