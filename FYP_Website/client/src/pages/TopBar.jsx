import React, { useState, useRef} from 'react';
import { Link} from 'react-router-dom'
import { Box, Grid, Paper, Typography, AppBar, Toolbar, IconButton, Badge } from '@mui/material';
import { Notifications, AccountCircle } from '@mui/icons-material';



function TopBar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);


    //logout
    function refreshPage() {
       // window.location.reload(false)
      }
    const logout = () => {
        localStorage.clear()
        sessionStorage.clear()
        refreshPage();
      }
    

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeDropdown = (e) => {
        if (dropdownRef.current && !dropdownRef.current?.contains(e.target)) {
            setDropdownOpen(false);
        }
    };

    document.addEventListener('mousedown', closeDropdown);

    const handleLogout = async () => {
        try {
          // Send a request to your server to logout
          const response = await fetch('http://localhost:3001/logout', {
            method: 'POST',
            credentials: 'include', // Include cookies in the request
          });
    
          if (response.ok) {
            // Successfully logged out
            // You may want to redirect the user or perform any other action here
            //sessionStorage.clear();
            console.log('Logged out successfully');
          } else {
            // Handle error response from server
            console.error('Logout failed');
          }
        } catch (error) {
          // Handle network errors
          console.error('Network error:', error);
        }
      };



    return (
      <div className="top-ba2r">
        <Box sx={{ flexGrow: 1 }}>
          {/* App Bar */}
          <AppBar position="static" sx={{ backgroundColor: "#252936" }}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1, backgroundColor: "#252936", margin:0 }}>
                Pedal SCM
              </Typography>
                {/* <IconButton color="inherit">
                  <Badge badgeContent={4} color="error">
                    <Notifications />
                  </Badge>
                </IconButton> */}
                <IconButton >
                  <Link  onClick={logout} to='/login'>
                    <button className='profilebutton2' >
                      Logout
                    </button>
                  </Link>          
                </IconButton>
              </Toolbar>
            </AppBar>
          </Box>
              {/* <div className="User">
                  <h2 id="welcomeMessage" style={{ color: 'white' }}>Pedal SCM </h2>
              </div>
              <div className='User'>
                  
              </div>

              <div className="top-bar-buttons">
                              <Link className='nav__listitem' onClick={logout} to='/login'>
                              <button className='profilebutton2'>
                                  Logout
                                  
                                  </button>
                              </Link>
                  <div className="profile-dropdown" ref={dropdownRef}> 
                  <button className="profilebutton" onClick={toggleDropdown}><FontAwesomeIcon icon={faUser} /></button>
                  </div>
              </div> */}
      </div>
    );
}

export default TopBar;
