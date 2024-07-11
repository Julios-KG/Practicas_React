import React, { useEffect, useState, useCallback } from 'react';
import { Container, Grid, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  width: 100,
  height: 140,
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
}));



type CardType = number | null;

const generateCards = (): CardType[] => {
  const numbers = [1, 2, 3, 4, 5];
  return [...numbers, ...numbers].sort(() => Math.random() - 0.5);
};

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    setCards(generateCards());
  }, []);

  const handleCardClick = useCallback(
    (index: number) => {
      if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) {
        return;
      }

      const newFlippedCards = [...flippedCards, index];
      setFlippedCards(newFlippedCards);

      if (newFlippedCards.length === 2) {
        setMoves((prevMoves) => prevMoves + 1);
        const [firstIndex, secondIndex] = newFlippedCards;
        if (cards[firstIndex] === cards[secondIndex]) {
          setMatchedCards((prevMatchedCards) => [...prevMatchedCards, firstIndex, secondIndex]);
        }
        setTimeout(() => setFlippedCards([]), 1000);
      }
    },
    [flippedCards, matchedCards, cards]
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Juego de Memoria
      </Typography>
      <Typography variant="h6" gutterBottom>
        Movimientos: {moves}
      </Typography>
      <Grid container spacing={2}>
        {cards.map((card, index) => (
          <Grid item key={index}>
            <StyledCard
              onClick={() => handleCardClick(index)}
              sx={{ backgroundColor: flippedCards.includes(index) || matchedCards.includes(index) ? 'white' : 'grey' }}
            >
              <CardActionArea>
                <CardContentStyled>
                  <Typography variant="h5">
                    {flippedCards.includes(index) || matchedCards.includes(index) ? card : '?'}
                  </Typography>
                </CardContentStyled>
              </CardActionArea>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MemoryGame;
