import { Link } from 'react-router-dom'

import { AppBar, Box, Button, Typography } from '@mui/material'

const NavMenu = ({ name, handleLogOut }) => {
  return (
    <Box>
      <AppBar position="static">
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }} >blooger</Link>
          </Typography>
          <Button><Link to="/" style={{ textDecoration: 'none', color: 'white' }} >blogs</Link></Button>
          <Button><Link to="/users" style={{ textDecoration: 'none', color: 'white' }} >users</Link></Button>
          <Typography variant="h6">{name} is logged in<span><Button color="warning" variant="text" id="logout-btn" onClick={handleLogOut}>logout</Button></span></Typography>
        </Box>
      </AppBar>
    </Box>
  )
}

export default NavMenu