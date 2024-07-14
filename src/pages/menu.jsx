import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
    const iconColor = '#049DD9';
    const selectedBgColor = '#E0F7FA'; 
    const toolbarBgColor = '#f0f0f0'; 
    const borderColor = '#049DD9';
  
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: toolbarBgColor }}
        >
          <Toolbar
            sx={{
              borderBottom: `4px solid ${borderColor}`, // Agrega un borde en la parte inferior
              boxShadow: 'none' // Quita la sombra
            }}
          >
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                flexGrow: 1, 
                textAlign: 'center', 
                fontFamily: 'serif', 
                fontWeight: 'bold' 
              }}
            >
              Hydrosense
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  '&:hover': { backgroundColor: selectedBgColor },
                  '&.Mui-selected': { backgroundColor: selectedBgColor, '&:hover': { backgroundColor: selectedBgColor } }
                }}
              >
                <ListItemIcon>
                  <AccountCircleRoundedIcon sx={{ color: iconColor }} />
                </ListItemIcon>
                <ListItemText primary="Perfil" />
              </ListItemButton>
            </ListItem>
            <Divider />
            {['Home', 'Usuarios', 'Graficas', 'Alertas'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  sx={{
                    '&:hover': { backgroundColor: selectedBgColor },
                    '&.Mui-selected': { backgroundColor: selectedBgColor, '&:hover': { backgroundColor: selectedBgColor } }
                  }}
                >
                  <ListItemIcon>
                    {index === 0 ? <HomeOutlinedIcon sx={{ color: iconColor }} /> 
                     : index === 1 ? <PeopleOutlineIcon sx={{ color: iconColor }} />
                     : index === 2 ? <LeaderboardOutlinedIcon sx={{ color: iconColor }} />
                     : <WarningAmberOutlinedIcon sx={{ color: iconColor }} />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Reportes', 'Agregar Bomba'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  sx={{
                    '&:hover': { backgroundColor: selectedBgColor },
                    '&.Mui-selected': { backgroundColor: selectedBgColor, '&:hover': { backgroundColor: selectedBgColor } }
                  }}
                >
                  <ListItemIcon>
                    {index === 0 ? <ArticleOutlinedIcon sx={{ color: iconColor }} /> 
                     : <AddCircleOutlineOutlinedIcon sx={{ color: iconColor }} />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}
