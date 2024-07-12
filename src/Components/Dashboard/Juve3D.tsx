// src/App.tsx
import React, { useState, useCallback, useEffect } from 'react';
import {
  Container, TextField, Button, Card, CardContent, Typography, Grid, Alert,
  Select, MenuItem, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';

interface Product {
  id: number;
  title: string;
  description: string;
  photo: string;
  price: number;
}

interface Purchase {
  id: number;
  productId: number;
  name: string;
  email: string;
  address: string;
  paymentMethod: 'card' | 'cash';
  cardNumber?: string;
}

const Amazon: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  const [purchases, setPurchases] = useState<Purchase[]>(() => {
    const savedPurchases = localStorage.getItem('purchases');
    return savedPurchases ? JSON.parse(savedPurchases) : [];
  });
  const [productTitle, setProductTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPhoto, setProductPhoto] = useState('');
  const [productPrice, setProductPrice] = useState<number | string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [purchaseName, setPurchaseName] = useState('');
  const [purchaseEmail, setPurchaseEmail] = useState('');
  const [purchaseAddress, setPurchaseAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleAddProduct = useCallback(() => {
    if (!productTitle || !productDescription || !productPhoto || !productPrice) {
      setAlertMessage('Por favor, complete todos los campos del producto.');
      return;
    }

    const price = typeof productPrice === 'number' ? productPrice : parseFloat(productPrice);
    if (isNaN(price) || price <= 0) {
      setAlertMessage('Por favor, ingrese un precio válido.');
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      title: productTitle,
      description: productDescription,
      photo: productPhoto,
      price: price
    };

    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts, newProduct];
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      return updatedProducts;
    });

    setProductTitle('');
    setProductDescription('');
    setProductPhoto('');
    setProductPrice('');
  }, [productTitle, productDescription, productPhoto, productPrice]);

  const handlePurchase = useCallback(() => {
    if (!selectedProduct || !purchaseName || !purchaseEmail || !purchaseAddress) {
      setAlertMessage('Por favor, complete todos los campos de la compra.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(purchaseEmail)) {
      setAlertMessage('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    if (paymentMethod === 'card' && (!cardNumber || cardNumber.length !== 16)) {
      setAlertMessage('Por favor, ingrese un número de tarjeta válido de 16 dígitos.');
      return;
    }

    const newPurchase: Purchase = {
      id: Date.now(),
      productId: selectedProduct.id,
      name: purchaseName,
      email: purchaseEmail,
      address: purchaseAddress,
      paymentMethod: paymentMethod,
      cardNumber: paymentMethod === 'card' ? cardNumber : undefined
    };

    setPurchases((prevPurchases) => {
      const updatedPurchases = [...prevPurchases, newPurchase];
      localStorage.setItem('purchases', JSON.stringify(updatedPurchases));
      return updatedPurchases;
    });

    setSelectedProduct(null);
    setPurchaseName('');
    setPurchaseEmail('');
    setPurchaseAddress('');
    setPaymentMethod('card');
    setCardNumber('');
    setAlertMessage('Pago exitoso');
  }, [selectedProduct, purchaseName, purchaseEmail, purchaseAddress, paymentMethod, cardNumber]);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Subir Producto</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Título"
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Descripción"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Foto (URL)"
            value={productPhoto}
            onChange={(e) => setProductPhoto(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Precio"
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleAddProduct}>Agregar Producto</Button>
        </Grid>
      </Grid>
      {alertMessage && <Alert severity="info" onClose={() => setAlertMessage(null)}>{alertMessage}</Alert>}
      
      <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>Productos Disponibles</Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <img src={product.photo} alt={product.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                <Typography variant="h6">{product.title}</Typography>
                <Typography>{product.description}</Typography>
                <Typography>${product.price.toFixed(2)}</Typography>
                <Button variant="contained" color="secondary" onClick={() => { setSelectedProduct(product); setOpenDialog(true); }}>Comprar</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Completar Compra</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre"
            value={purchaseName}
            onChange={(e) => setPurchaseName(e.target.value)}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Correo"
            value={purchaseEmail}
            onChange={(e) => setPurchaseEmail(e.target.value)}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Dirección"
            value={purchaseAddress}
            onChange={(e) => setPurchaseAddress(e.target.value)}
            margin="dense"
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Método de Pago</InputLabel>
            <Select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'cash')}
            >
              <MenuItem value="card">Tarjeta</MenuItem>
              <MenuItem value="cash">Efectivo</MenuItem>
            </Select>
          </FormControl>
          {paymentMethod === 'card' && (
            <TextField
              fullWidth
              label="Número de Tarjeta"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              margin="dense"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancelar</Button>
          <Button onClick={handlePurchase} color="primary">Pagar</Button>
        </DialogActions>
      </Dialog>

      <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>Compras Realizadas</Typography>
      <Grid container spacing={2}>
        {purchases.map((purchase) => {
          const product = products.find((p) => p.id === purchase.productId);
          return (
            <Grid item xs={12} sm={6} md={4} key={purchase.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{product?.title}</Typography>
                  <Typography>Comprador: {purchase.name}</Typography>
                  <Typography>Email: {purchase.email}</Typography>
                  <Typography>Dirección: {purchase.address}</Typography>
                  <Typography>Método de Pago: {purchase.paymentMethod === 'card' ? 'Tarjeta' : 'Efectivo'}</Typography>
                  {purchase.paymentMethod === 'card' && <Typography>Número de Tarjeta: **** **** **** {purchase.cardNumber?.slice(-4)}</Typography>}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Amazon;
