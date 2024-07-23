import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const defaultTheme = createTheme({
  typography: {
    h4: {
      fontFamily: 'Suez One, serif',
      fontSize: '3.2rem',
      fontWeight: 900,
      color: '#0B2023',
    },
    h6: {
      fontFamily: 'Suez One, serif',
      fontSize: '1.8rem',
      fontWeight: 900,
      color: '#0B2023',
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#E9F1F2',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: '#049DD9',
          color: '#FFFFFF',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '16px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#049DD9',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#03588C',
          },
        },
        outlined: {
          '&:hover': {
            borderColor: '#049DD9',
            color: '#049DD9',
          },
        },
      },
    },
  },
});

export default function SignInSide({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checked] = useState(true);
  const [socket, setSocket] = useState(null);

  // Estados para el registro
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const socket = io('http://localhost:4000');

    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setLoginError('');

    if (!email || !password) {
      setLoginError('Por favor, llena todos los campos');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://hydrosense-autentificador.integrador.xyz:3000/app/auth/login', {
        email,
        password,
      });
      console.log('Respuesta del servidor:', response.data);

      if (response.data && response.data.token) {
        socket.emit('login', { email, password });
        onLogin(response.data.token);
        navigate('/menu');
      } else {
        setLoginError('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      if (error.response && error.response.status === 401) {
        setLoginError('Credenciales incorrectas');
      } else {
        setLoginError('Error al conectar con el servidor. Inténtalo de nuevo más tarde');
      }
    }
    setLoading(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewName('');
    setNewEmail('');
    setNewPassword('');
    setRegisterError('');
    setNameError('');
    setEmailError('');
    setPasswordError('');
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setRegisterError('');
    setNameError('');
    setEmailError('');
    setPasswordError('');

    let hasError = false;

    if (!newName) {
      setNameError('El nombre es requerido');
      hasError = true;
    }
    if (!newEmail) {
      setEmailError('El email es requerido');
      hasError = true;
    }
    if (!newPassword) {
      setPasswordError('La contraseña es requerida');
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://hydrosense-autentificador.integrador.xyz:3000/app/company/', {
        name: newName,
        email: newEmail,
        password: newPassword,
      });
      console.log('Respuesta del servidor:', response.data);

      if (response.data && response.data.token) {
        socket.emit('register', { name: newName, email: newEmail, password: newPassword });
        onLogin(response.data.token);
        navigate('/menu');
      } else {
        setRegisterError('Error al registrar la cuenta');
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      if (error.response && error.response.status === 400) {
        setRegisterError('Error en el registro');
      } else {
        setRegisterError('Error al conectar con el servidor. Inténtalo de nuevo más tarde');
      }
    }
    setLoading(false);
    handleClose();
  };

  const handleChange = (setter, errorSetter) => (event) => {
    setter(event.target.value);
    if (errorSetter) {
      errorSetter('');
    }
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleChange(setEmail, setLoginError)}
                error={!!loginError}
                helperText={loginError}
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
                onChange={handleChange(setPassword, setLoginError)}
                error={!!loginError}
                helperText={loginError}
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
              <Grid item>
                <Button variant="outlined" fullWidth onClick={handleClickOpen}>
                  {"¿No tienes una cuenta? Crear una cuenta de empresa"}
                </Button>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Crear cuenta de empresa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para crear una cuenta de empresa, por favor ingresa tu nombre, correo electrónico y una contraseña.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="newName"
            label="Nombre"
            type="text"
            fullWidth
            variant="standard"
            value={newName}
            onChange={handleChange(setNewName, setNameError)}
            error={!!nameError}
            helperText={nameError}
          />
          <TextField
            required
            margin="dense"
            id="newEmail"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={newEmail}
            onChange={handleChange(setNewEmail, setEmailError)}
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            required
            margin="dense"
            id="newPassword"
            label="Contraseña"
            type="password"
            fullWidth
            variant="standard"
            value={newPassword}
            onChange={handleChange(setNewPassword, setPasswordError)}
            error={!!passwordError}
            helperText={passwordError}
          />
          {registerError && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              {registerError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancelar
          </Button>
          <Button onClick={handleRegisterSubmit} variant="contained">
            Registrar
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
