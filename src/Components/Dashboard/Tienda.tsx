import React, { useState, useCallback } from 'react';
import {
  Container, Paper, Typography, TextField, Button,
  Card, CardContent, CardActions, IconButton, Dialog,
  DialogActions, DialogContent, DialogTitle, Grid, List,
  ListItem, ListItemText, ListItemSecondaryAction, RadioGroup,
  FormControlLabel, Radio
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const initialProducts: Product[] = [
  { id: 1, name: 'Producto 1', description: 'Descripción del Producto 1', price: 10 },
  { id: 2, name: 'Producto 2', description: 'Descripción del Producto 2', price: 20 },
  { id: 3, name: 'Producto 3', description: 'Descripción del Producto 3', price: 30 }
];

const UtShop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<Product[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const handleAddToCart = useCallback((product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  }, []);

  const handleDeleteFromCart = useCallback((id: number) => {
    setCart((prevCart) => prevCart.filter(product => product.id !== id));
  }, []);

  const handleEditProduct = useCallback((product: Product) => {
    setIsEditMode(true);
    setEditProductId(product.id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
  }, []);

  const handleSaveProduct = useCallback(() => {
    if (editProductId !== null) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editProductId
            ? { ...product, name, description, price: Number(price) }
            : product
        )
      );
    } else {
      const newProduct: Product = {
        id: Date.now(),
        name,
        description,
        price: Number(price),
      };
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    }
    setIsEditMode(false);
    setEditProductId(null);
    setName('');
    setDescription('');
    setPrice('');
  }, [editProductId, name, description, price]);

  const handleDeleteProduct = useCallback((id: number) => {
    setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
  }, []);

  const handleOpenPaymentDialog = useCallback(() => {
    setIsPaymentDialogOpen(true);
  }, []);

  const handleClosePaymentDialog = useCallback(() => {
    setIsPaymentDialogOpen(false);
  }, []);

  const handleConfirmPayment = useCallback(() => {
    setIsPaymentDialogOpen(false);
    setCart([]);
    alert(`Pago realizado con ${paymentMethod === 'cash' ? 'Efectivo' : 'Tarjeta'}`);
  }, [paymentMethod]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Tienda
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '1rem' }}>
            <Typography variant="h5" gutterBottom>
              Productos
            </Typography>
            {products.map((product) => (
              <Card key={product.id} style={{ marginBottom: '1rem' }}>
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2">{product.description}</Typography>
                  <Typography variant="body2">Precio: ${product.price}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleEditProduct(product)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteProduct(product.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => handleAddToCart(product)}
                  >
                    Agregar al Carrito
                  </Button>
                </CardActions>
              </Card>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditMode(true)}
            >
              Agregar Nuevo Producto
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '1rem' }}>
            <Typography variant="h5" gutterBottom>
              Carrito de Compras
            </Typography>
            <List>
              {cart.map((product) => (
                <ListItem key={product.id}>
                  <ListItemText
                    primary={product.name}
                    secondary={`Precio: $${product.price}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleDeleteFromCart(product.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Typography variant="h6">
              Total: ${cart.reduce((total, product) => total + product.price, 0)}
            </Typography>
            <Button variant="contained" color="secondary" onClick={handleOpenPaymentDialog}>
              Pagar
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={isEditMode} onClose={() => setIsEditMode(false)}>
        <DialogTitle>{editProductId ? 'Editar Producto' : 'Agregar Producto'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Descripción"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Precio"
            type="number"
            fullWidth
            margin="normal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditMode(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSaveProduct} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isPaymentDialogOpen} onClose={handleClosePaymentDialog}>
        <DialogTitle>Método de Pago</DialogTitle>
        <DialogContent>
          <RadioGroup
            aria-label="payment-method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel value="cash" control={<Radio />} label="Efectivo" />
            <FormControlLabel value="card" control={<Radio />} label="Tarjeta" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePaymentDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmPayment} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UtShop;
