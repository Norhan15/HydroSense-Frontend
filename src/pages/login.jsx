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
import Hydrosense from '../img/Hydrosense.png';
import Grow from '@mui/material/Grow';

const defaultTheme = createTheme({
  typography: {
    h4: {
      fontFamily: 'Suez One, serif',
      fontSize: '3.2rem',
      fontWeight: 900, // Peso normal para un estilo lleno
      color: '#0B2023',
    },
    h6: {
      fontFamily: 'Suez One, serif',
      fontSize: '1.8rem',
      fontWeight: 900, // Peso normal para un estilo lleno
      color: '#0B2023',
    },
  },
});


export default function SignInSide() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checked] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      console.log('Usuario:', user);
      console.log('Contraseña:', password);
      navigate('/menu');
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
        background: 'radial-gradient(circle at top left, #6BE5F2, #049DD9, #6BE5F2, #03588C)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
          <Grow in={checked} timeout={2000}>
            <Typography variant="h4" component="div" sx={{ color: '#0B2023', mb: 2 }}>
              Bienvenido a Hydrosense
            </Typography>
          </Grow>
          <Grow in={checked} timeout={3000}>
            <Box
              component="img"
              src={Hydrosense}
              alt="Hydrosense Logo"
              sx={{
                width: '50%',
                height: 'auto',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </Grow>
          <Grow in={checked} timeout={5000}>
            <Typography variant="h6" component="div" sx={{ color: '#0B2023', mt: 2 }}>
              Tu solución en sistemas de gestión de bombas de agua
            </Typography>
          </Grow>
        </Grid>
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
            <Avatar sx={{ m: 1, bgcolor: '#049DD9' }}>
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
                label="Usuario"
                name="user"
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
                sx={{ mt: 3, mb: 2, bgcolor: '#049DD9' }}
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
