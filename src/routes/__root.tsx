import * as React from 'react';
import { Outlet, createRootRouteWithContext, Link } from '@tanstack/react-router';
import { QueryClient } from "@tanstack/react-query";


const RootComponent = () => {
    return (
        <React.Fragment>
            <h1>Car Shop</h1>
            <nav>
                <ul>
                    <li><Link to="/category">Categories</Link></li>
                    <li><Link>Creator</Link></li>
                </ul>
            </nav>
            <Outlet />
        </React.Fragment>
    );
};


type RootContext = {
    queryClient: QueryClient,
}

export const Route = createRootRouteWithContext<RootContext>()({
    component: RootComponent,
});


