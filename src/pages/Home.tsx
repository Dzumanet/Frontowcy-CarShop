import { Box, Button, Typography } from "@mui/material";
import background from '/src/assets/img.png';
import { Link } from "@tanstack/react-router";


export const Home = () => {
    return (
        <Box
            sx={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: 'calc(100vh - 64px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
            }}
        >
            <Typography variant="h2" align="center" sx={{ mb: 4 }}>
                Welcome to Car Shop
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" color="secondary" size="large" component={Link} to="/category">
                    Explore Categories
                </Button>
                <Button variant="contained" color="primary" size="large" component={Link} to="/creator">
                    Start Configuration
                </Button>
                <Button variant="contained" color="secondary" size="large" component={Link} to="/orders">
                    Show Orders
                </Button>
            </Box>
        </Box>
    );
};