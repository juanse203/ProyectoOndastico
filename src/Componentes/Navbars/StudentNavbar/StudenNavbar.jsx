import React from 'react'
import { useNavigate } from "react-router-dom"
import { useAuth } from '../../../Contexto/TelaComeSinPretexto'

import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';

const StudenNavbar = ({ open, onClose }) => {// Recibe 'open' y 'onClose' como props
 const navigate = useNavigate();
 const { logout } = useAuth();

  const navItems = [
    { text: 'Home', path: '/Home' },
    { text: 'Perfil', path: '/Perfil' },
    { text: 'Proyectos', path: '/Proyectos' },
    { text: 'Cerrar sesión', path: 'logout' }, // redireccionar al login
  ];

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 300 }} role="presentation" onClick={onClose}>
        <List>
          {navItems.map(({ text, path }, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => {
                if (path === 'logout') {
                  logout();
                } else {
                  navigate(path);
                }
              }}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

export default StudenNavbar