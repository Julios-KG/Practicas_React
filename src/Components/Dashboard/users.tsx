import React, { useState, useCallback, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface User {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isLoginMode, setIsLoginMode] = useState<boolean>(false);

  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const validateEmail = useCallback((email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }, []);

  const handleRegister = useCallback(() => {
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    if (editingUser) {
      const updatedUsers = users.map(user => 
        user.email === editingUser.email ? { name, email, password } : user
      );
      setUsers(updatedUsers);
      setEditingUser(null);
    } else {
      setUsers([...users, { name, email, password }]);
    }

    setName('');
    setEmail('');
    setPassword('');
    setError('');
  }, [name, email, password, users, validateEmail, editingUser]);

  const handleLogin = useCallback(() => {
    if (!email || !password) {
      setError('Both fields are required');
      return;
    }

    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      alert(`Welcome back, ${user.name}!`);
      setEditingUser(user);
      setIsLoginMode(false);
    } else {
      setError('Invalid email or password');
    }
  }, [email, password, users]);

  const handleEdit = useCallback((user: User) => {
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
    setShowPassword(false);
    setEditingUser(user);
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  }, []);

  const switchToLoginMode = useCallback(() => {
    setIsLoginMode(true);
    setName('');
    setPassword('');
    setError('');
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
        <Typography variant="h4">{isLoginMode ? 'Login' : editingUser ? 'Edit User' : 'User Registration'}</Typography>
        <Box component="form" sx={{ mt: 3, width: '100%' }}>
          {!isLoginMode && (
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
            />
          )}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {error && <Typography color="error">{error}</Typography>}
          {!isLoginMode && (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleRegister}
              sx={{ mt: 2 }}
            >
              {editingUser ? 'Save Changes' : 'Register'}
            </Button>
          )}
          {isLoginMode && (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          )}
          {!isLoginMode && (
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={switchToLoginMode}
              sx={{ mt: 2 }}
            >
              Switch to Login
            </Button>
          )}
        </Box>
        {!isLoginMode && (
          <Box sx={{ mt: 4, width: '100%' }}>
            {users.map((user) => (
              <Box key={user.email} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>{user.name}</Typography>
                <Button variant="text" color="primary" onClick={() => handleEdit(user)}>
                  Edit
                </Button>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Register;
