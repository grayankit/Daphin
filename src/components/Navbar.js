import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useAuthState } from "react-firebase-hooks/auth";
import MenuIcon from '@mui/icons-material/Menu';
import {auth} from '../firebase'
export default function ButtonAppBar() {
  const [user] = useAuthState(auth);
  const handleSignout = () => {
    auth.signOut()
}
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Daphin
          </Typography>

          {user ? <Button variant="contained" color="error" onClick={handleSignout} >Logout</Button>:<div></div>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}