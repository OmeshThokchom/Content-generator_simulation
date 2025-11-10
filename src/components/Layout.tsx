import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI Video Generator
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Generator
          </Button>
          <Button color="inherit" component={Link} to="/analytics">
            Analytics
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </Box>
  );
};

export default Layout;
