import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";

const router = createRouter({
    routeTree,
    context: {
        queryClient: undefined!,
    }
});


declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const queryClient = new QueryClient;

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} context={{ queryClient }} />
        </QueryClientProvider>
    );
};