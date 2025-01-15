import { AppBar, Toolbar, Typography, Tabs, Tab, Container } from '@mui/material';
import { Link, useLocation } from '@tanstack/react-router';
import { useEffect, useState } from "react";

export const Header = () => {
    const location = useLocation();
    const [value, setValue] = useState(0);

    const tabPaths = ['/', '/category', '/creator', '/orders'];

    useEffect(() => {
        const currentTab = tabPaths.indexOf(location.pathname);
        if (currentTab !== -1) {
            setValue(currentTab);
        }
    }, [location.pathname]);

    return (
        <AppBar
            position="static"
            sx={{
                backgroundImage: 'linear-gradient(to right, #3f51b5, #5c6bc0)',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            }}
        >
            <Container maxWidth="lg">
                <Toolbar sx={{ minHeight: 64, maxHeight: 64 }}>
                    <Typography
                        variant="h6"
                        sx={{ flexGrow: 1, cursor: 'pointer' }}
                        component={Link}
                        to="/"
                    >
                        Car Shop
                    </Typography>
                    <Tabs
                        value={value}
                        onChange={(_, newValue) => setValue(newValue)}
                        textColor="inherit"
                        indicatorColor="secondary"
                    >
                        <Tab label="Home" component={Link} to="/" />
                        <Tab label="Categories" component={Link} to="/category" />
                        <Tab label="Creator" component={Link} to="/creator" />
                        <Tab label="Orders" component={Link} to="/orders" />
                    </Tabs>
                </Toolbar>
            </Container>
        </AppBar>
    );
};