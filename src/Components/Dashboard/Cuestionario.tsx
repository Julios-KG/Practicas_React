import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Container, Paper, Typography, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const questions: Question[] = [
  {
    question: '¿Cuál es el capital de Francia?',
    options: ['Madrid', 'París', 'Berlín'],
    correctAnswer: 'París',
  },
  {
    question: '¿Qué lenguaje se usa para el desarrollo de React?',
    options: ['Python', 'JavaScript', 'Java'],
    correctAnswer: 'JavaScript',
  },
  {
    question: '¿Cuál es el planeta más grande del sistema solar?',
    options: ['Tierra', 'Marte', 'Júpiter'],
    correctAnswer: 'Júpiter',
  },
  {
    question: '¿Quién escribió "Cien años de soledad"?',
    options: ['Gabriel García Márquez', 'Mario Vargas Llosa', 'Julio Cortázar'],
    correctAnswer: 'Gabriel García Márquez',
  },
  {
    question: '¿Cuál es la fórmula química del agua?',
    options: ['H2O', 'CO2', 'O2'],
    correctAnswer: 'H2O',
  },
];

const Cuest: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [score, setScore] = useState<number | null>(null);

  const handleAnswerChange = useCallback((index: number, answer: string) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = answer;
      return newAnswers;
    });
  }, []);

  const calculateScore = useCallback(() => {
    let newScore = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        newScore += 2;
      }
    });
    setScore(newScore);
  }, [userAnswers]);

  const isAllAnswered = useMemo(() => {
    return userAnswers.every((answer) => answer !== '');
  }, [userAnswers]);

  useEffect(() => {
    if (score !== null) {
      alert(`Tu puntuación es: ${score}`);
    }
  }, [score]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Examen
        </Typography>
        {questions.map((question, index) => (
          <div key={index}>
            <Typography variant="h6" gutterBottom>
              {question.question}
            </Typography>
            <RadioGroup
              name={`question-${index}`}
              value={userAnswers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            >
              {question.options.map((option, idx) => (
                <FormControlLabel
                  key={idx}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </div>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={calculateScore}
          disabled={!isAllAnswered}
        >
          Enviar
        </Button>
      </Paper>
    </Container>
  );
};

export default Cuest;
