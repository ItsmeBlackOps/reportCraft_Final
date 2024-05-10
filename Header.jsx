import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useAuth } from '../utils/AuthContent';

const Header = () => {
    const navigate = useNavigate();
    const { user, logoutUser } = useAuth();

    const logoutClick = () => {
        navigate('/login');
    };
    
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, alignContent: 'left' }}>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none'}}>
                        Welcome Name
                    </Link>
                </Typography>
                <div>
                    {user ? (
                        <>
                            <Button component={Link} to="/" color="inherit" variant="text">
                                Home
                            </Button>
                            {user.labels[0] === 'admin' && (
                                <Button component={Link} to="/demo" color="inherit" variant="text">
                                    Demo
                                </Button>
                            
                            )}
                            
                            
                            <Button component={Link} to="/form" color="inherit" variant="text">
                                Form
                            </Button>
                            <Button component={Link} to="/tasks" color="inherit" variant="text">
                                Submissions
                            </Button>
                            <Button onClick={logoutUser} color="inherit" variant="outlined">
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Button component={Link} to="/login" color="inherit" variant="outlined">
                            Login
                        </Button>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
