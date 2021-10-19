import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { Favorite } from '@mui/icons-material';

export default function Header() {
    return (
        <AppBar position="sticky">
            <div className="container-fluid">
                <Toolbar>
                <Typography variant="h6" className="text-link"  component={Link} to="/" sx={{ flexGrow: 1 }}>
                    Movies Stop
                </Typography>
                <Link to="/liked" className="text-link">
                    <Tooltip title="Liked movies">
                        <IconButton color="inherit">
                            <Favorite />
                        </IconButton>
                    </Tooltip>
                </Link>
                </Toolbar>
            </div>
        </AppBar>
    )
}
