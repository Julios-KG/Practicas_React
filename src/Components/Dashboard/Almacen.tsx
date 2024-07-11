import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, FormControlLabel, Checkbox, Card, CardContent, CardMedia, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

interface InventoryItem {
  id: number;
  image: string;
  description: string;
  available: boolean;
}

const Bodega: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [description, setDescription] = useState('');
  const [available, setAvailable] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [editDescription, setEditDescription] = useState('');
  const [editAvailable, setEditAvailable] = useState(false);

  const handleAddItem = useCallback(() => {
    if (image && description) {
      const newItem: InventoryItem = {
        id: Date.now(),
        image: URL.createObjectURL(image),
        description,
        available,
      };
      setItems((prevItems) => [...prevItems, newItem]);
      setDescription('');
      setAvailable(false);
      setImage(null);
    }
  }, [image, description, available]);

  const handleDeleteItem = useCallback((id: number) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  }, []);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  }, []);

  const handleEditItem = useCallback((item: InventoryItem) => {
    setEditItemId(item.id);
    setEditDescription(item.description);
    setEditAvailable(item.available);
  }, []);

  const handleSaveEdit = useCallback(() => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === editItemId
          ? { ...item, description: editDescription, available: editAvailable }
          : item
      )
    );
    setEditItemId(null);
    setEditDescription('');
    setEditAvailable(false);
  }, [editItemId, editDescription, editAvailable]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Registro de Almacén
        </Typography>
        <TextField
          label="Descripción"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox checked={available} onChange={(e) => setAvailable(e.target.checked)} />}
          label="Disponible"
        />
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span">
            Subir Foto
          </Button>
        </label>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddItem}
          style={{ marginTop: '1rem' }}
        >
          Agregar
        </Button>
        <div style={{ marginTop: '2rem' }}>
          {items.map((item) => (
            <Card key={item.id} style={{ marginBottom: '1rem' }}>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.description}
              />
              <CardContent>
                {editItemId === item.id ? (
                  <div>
                    <TextField
                      label="Descripción"
                      fullWidth
                      margin="normal"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                    <FormControlLabel
                      control={<Checkbox checked={editAvailable} onChange={(e) => setEditAvailable(e.target.checked)} />}
                      label="Disponible"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                      onClick={handleSaveEdit}
                    >
                      Guardar
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Typography variant="h6">{item.description}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.available ? 'Disponible' : 'No Disponible'}
                    </Typography>
                    <Grid container justifyContent="space-between">
                      <Grid item>
                        <IconButton onClick={() => handleEditItem(item)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteItem(item.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </Paper>
    </Container>
  );
};

export default Bodega;
