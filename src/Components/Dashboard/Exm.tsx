import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Box,
  IconButton,
  Grid,
} from '@mui/material';
import { AddComment as AddCommentIcon, PostAdd as PostAddIcon } from '@mui/icons-material';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [text, setText] = useState('');
  const [commentingPostId, setCommentingPostId] = useState(null);

  useEffect(() => {
    setPosts([
    ]);
  }, []);

  const addPost = useCallback(() => {
    if (newPost.title.trim() && newPost.content.trim()) {
      const post = {
        id: Date.now(),
        title: newPost.title,
        content: newPost.content,
      };
      setPosts([...posts, post]);
      setNewPost({ title: '', content: '' });
    }
  }, [newPost, posts]);

  const addComment = useCallback((comment) => {
    setComments([...comments, comment]);
    setCommentingPostId(null);
  }, [comments]);

  const handleCommentClick = useCallback((postId) => {
    setCommentingPostId(postId);
  }, []);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handlePostChange = (event) => {
    const { name, value } = event.target;
    setNewPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (text.trim()) {
        addComment({ id: Date.now(), postId: commentingPostId, text });
        setText('');
      }
    },
    [text, commentingPostId, addComment]
  );

  const handlePostSubmit = useCallback(
    (event) => {
      event.preventDefault();
      addPost();
    },
    [addPost]
  );

  const renderedPosts = useMemo(() => {
    return posts.map((post) => (
      <Paper key={post.id} elevation={3} style={{ padding: '1em', marginBottom: '1em' }}>
        <Typography variant="h4" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {post.content}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle2" sx={{ marginRight: 'auto' }}>
            Comentarios
          </Typography>
          <IconButton onClick={() => handleCommentClick(post.id)}>
            <AddCommentIcon />
          </IconButton>
        </Box>
        {comments.filter((comment) => comment.postId === post.id).length > 0 && (
          <List>
            {comments
              .filter((comment) => comment.postId === post.id)
              .map((comment) => (
                <ListItem key={comment.id}>
                  <ListItemText primary={comment.text} />
                </ListItem>
              ))}
          </List>
        )}
        {commentingPostId === post.id && (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
        )}
      </Paper>
    ));
  }, [posts, comments, text, handleSubmit, handleChange, handleCommentClick, commentingPostId]);

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Mi Blog
      </Typography>
      <Paper elevation={3} style={{ padding: '1em', marginBottom: '1em' }}>
        <Typography variant="h4" gutterBottom>
          Nueva Publicación
        </Typography>
        <form onSubmit={handlePostSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="title"
                label="Título"
                variant="outlined"
                fullWidth
                value={newPost.title}
                onChange={handlePostChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="content"
                label="Contenido"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={newPost.content}
                onChange={handlePostChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                <PostAddIcon sx={{ marginRight: '0.5em' }} />
                Publicar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      {renderedPosts}
    </Container>
  );
};

export default Blog;
