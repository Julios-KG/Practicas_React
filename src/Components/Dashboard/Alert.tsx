import React, { useState, Suspense } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// Definición de las props para CustomCard
interface CustomCardProps {
  imageUrl: string;
  title: string;
  description: string;
  onClick: () => void;
}

// Componente CustomCard
const CustomCard: React.FC<CustomCardProps> = ({ imageUrl, title, description, onClick }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

// Componente LazyComponent
const LazyComponent: React.FC = () => {
  const [selectedCardTitle, setSelectedCardTitle] = useState<string | null>(null);

  const handleCardClick = (title: string) => {
    setSelectedCardTitle(title);
  };

  const closeModal = () => {
    setSelectedCardTitle(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
        flexWrap: 'wrap',
        mt: 4,
      }}
    >
      <CustomCard
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGi6TGWzfOI6-U3_2qmY3A1lvEvmqwgN7p1A&s"
        title="Lago de Chetumal"
        description="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
        onClick={() => handleCardClick('Lago de Chetumal')}
      />

      <CustomCard
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUmWNX9Pkp2xBxgHI25zjU-SeJsAe14szUew&s"
        title="Cascada de Chiapas"
        description="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
        onClick={() => handleCardClick('Cascada de Chiapas')}
      />

      <CustomCard
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt6gZwPOGW_pj31U1by8DbNHuQDMHZq7Tftw&s"
        title="Montañas de Oaxaca"
        description="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
        onClick={() => handleCardClick('Montañas de Oaxaca')}
      />

      <Modal
        open={selectedCardTitle !== null}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={selectedCardTitle !== null}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 200,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" component="h2">
              {selectedCardTitle}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

// Componente principal Alerta que carga LazyComponent perezosamente
const Alerta: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <h1>Mi Aplicación</h1>
      <Suspense fallback={
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      }>
        <LazyComponent />
      </Suspense>
    </Box>
  );
}
