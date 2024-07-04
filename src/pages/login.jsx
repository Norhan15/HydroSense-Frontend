import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ElectritrackImage from '../img/logo.svg';

const defaultTheme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      console.log(user, password);
      const response = await fetch('http://54.145.186.137:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, password }),
      });
      console.log('Response:', response);
      const data = await response.json();
      console.log('Data:', data);
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/menu');
      } else {
        setError(data.message || 'Error al iniciar sesión. Inténtalo de nuevo más tarde');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión. Inténtalo de nuevo más tarde');
    }
    setLoading(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundColor: 'DFE1E2',
            backgroundImage: `url(${ElectritrackImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ backgroundColor: '#E9F1F2' }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#6BE5F2' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Inicio de sesión
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="user"
                label="Correo"
                name="email"
                autoComplete="Usuario"
                autoFocus
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Iniciar sesión'}
              </Button>
              {error && (
                <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
