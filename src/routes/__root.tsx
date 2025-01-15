import * as React from 'react';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { QueryClient } from "@tanstack/react-query";
import { Box } from "@mui/material";
import { Header } from "../components/Header/Header.tsx";


const RootComponent = () => {

    return (
        <React.Fragment>
            <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Header />
                <Box sx={{ flex: 1 }}>
                    <Outlet />
                </Box>
            </Box>
        </React.Fragment>
    );
};

type RootContext = {
    queryClient: QueryClient,
}

export const Route = createRootRouteWithContext<RootContext>()({
    component: RootComponent,
});


