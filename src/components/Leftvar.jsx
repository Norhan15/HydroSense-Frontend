import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LocalDrinkOutlinedIcon from '@mui/icons-material/LocalDrinkOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { blue } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
import { Link, useNavigate } from 'react-router-dom';

// Definir colores
const iconColor = blue[500];
const selectedBgColor = blue[100];
const toolbarBgColor = 'radial-gradient(circle at top left, #6BE5F2, #049DD9, #6BE5F2, #03588C)';

const drawerWidth = 240;

export default function ClippedDrawer() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');
  const navigate = useNavigate(); // Hook de navegación para redirigir

  const handleClickOpen = (value) => {
    setSelectedValue(value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    // Aquí puedes agregar lógica de cierre de sesión si es necesario
    navigate('/'); // Redirigir al login
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ background: toolbarBgColor }}>
          <Typography variant="h6" noWrap component="div">
            Hydrosense
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleClickOpen('perfil')}
                sx={{
                  '&:hover': { backgroundColor: selectedBgColor },
                  '&.Mui-selected': { backgroundColor: selectedBgColor, '&:hover': { backgroundColor: selectedBgColor } }
                }}>
                <ListItemIcon>
                  <AccountCircleRoundedIcon sx={{ color: iconColor }} />
                </ListItemIcon>
                <ListItemText primary="Perfil" />
              </ListItemButton>
            </ListItem>
            {[
              { text: 'Inicio', icon: <HomeOutlinedIcon sx={{ color: iconColor }} />, path: '/menu' },
              { text: 'Usuarios', icon: <PeopleOutlineIcon sx={{ color: iconColor }} />, path: '/usuarios' },
              { text: 'Gráficas', icon: <LeaderboardOutlinedIcon sx={{ color: iconColor }} />, path: '/graficas' },
              { text: 'Alertas', icon: <WarningAmberOutlinedIcon sx={{ color: iconColor }} />, path: '/alertas' }
            ].map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    '&:hover': { backgroundColor: selectedBgColor },
                    '&.Mui-selected': { backgroundColor: selectedBgColor, '&:hover': { backgroundColor: selectedBgColor } }
                  }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
            {[
              { text: 'Reportes', icon: <ArticleOutlinedIcon sx={{ color: iconColor }} />, path: '/reportes' },
              { text: 'Información de Bombas', icon: <LocalDrinkOutlinedIcon sx={{ color: iconColor }} />, path: '/agregar-bomba' }
            ].map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    '&:hover': { backgroundColor: selectedBgColor },
                    '&.Mui-selected': { backgroundColor: selectedBgColor, '&:hover': { backgroundColor: selectedBgColor } }
                  }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{ flexGrow: 1 }} />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}
                sx={{
                  '&:hover': { backgroundColor: selectedBgColor },
                  '&.Mui-selected': { backgroundColor: selectedBgColor, '&:hover': { backgroundColor: selectedBgColor } }
                }}>
                <ListItemIcon>
                  <ExitToAppIcon sx={{ color: iconColor }} />
                </ListItemIcon>
                <ListItemText primary="Salir" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, mt: 8 }}
      >
        <Toolbar />
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedValue}</DialogTitle>
        <Avatar sx={{ bgcolor: iconColor, m: 2 }}>
          <PersonIcon />
        </Avatar>
      </Dialog>
    </Box>
  );
}
