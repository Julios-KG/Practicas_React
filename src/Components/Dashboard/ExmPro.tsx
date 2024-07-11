import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText, TextField, Button, Box } from '@mui/material';

const Comida = () => {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [currentPostId, setCurrentPostId] = useState(1);
  const [commentCount, setCommentCount] = useState(0); // Nuevo estado para contar comentarios

  useEffect(() => {
    setPosts([]);
  }, []);

  const addPost = () => {
    if (postTitle.trim()) {
      const newPost = { id: currentPostId, title: postTitle, comments: [] };
      setPosts(prevPosts => [...prevPosts, newPost]);
      setCurrentPostId(prevId => prevId + 1);
      setPostTitle('');
    }
  };

  const addComment = useCallback((postId, commentText) => {
    if (commentText.trim()) {
      const newComment = { id: Date.now(), text: commentText };
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
        )
      );
      setCommentCount(prevCount => prevCount + 1); // Incrementa el contador de comentarios
    }
  }, []);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handlePostTitleChange = (event) => {
    setPostTitle(event.target.value);
  };

  const handleSubmit = useCallback((event, postId) => {
    event.preventDefault();
    if (text.trim()) {
      addComment(postId, text);
      setText('');
    }
  }, [text, addComment]);

  const renderedPosts = useMemo(() => {
    return posts.map(post => (
      <Paper key={post.id} elevation={3} style={{ padding: '1em', marginBottom: '1em' }}>
        <Typography variant="h4" gutterBottom>{post.title}</Typography>
        {post.comments.length > 0 && (
          <List>
            {post.comments.map(comment => (
              <ListItem key={comment.id}>
                <ListItemText primary={comment.text} />
              </ListItem>
            ))}
          </List>
        )}
        <Box component="form" onSubmit={(event) => handleSubmit(event, post.id)} sx={{ mt: 2 }}>
          <TextField
            label="Escribe tu comentario"
            variant="outlined"
            fullWidth
            value={text}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
            Enviar
          </Button>
        </Box>
      </Paper>
    ));
  }, [posts, text, handleSubmit, handleChange]);

  return (
    <Container>
      <Typography variant="h2" gutterBottom>CHISMOGRAFO UT</Typography>
      <Typography variant="subtitle1" gutterBottom>Total de comentarios: {commentCount}</Typography>
      <TextField
        label="Título de la publicación"
        variant="outlined"
        fullWidth
        value={postTitle}
        onChange={handlePostTitleChange}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={addPost} sx={{ mb: 2 }}>
        Agregar nueva publicación
      </Button>
      {renderedPosts}
    </Container>
  );
};

export default Comida;
