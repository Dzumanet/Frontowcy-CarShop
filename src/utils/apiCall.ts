type ApiConfig <P = {}> = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: P
}

export const apiCall = async<R, P = {}>(url: string, config?: ApiConfig<P>) => {
    const baseUrl = 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/${url}`, {
        method: config?.method || 'GET',
        body: config?.body ? JSON.stringify(config?.body) : undefined,
    });
    return response.json() as Promise<R>;
};