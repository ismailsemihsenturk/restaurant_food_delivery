"use client"
import React from 'react'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient();

type Props = {
    children: React.ReactNode;
};

//If you wanna pass queryClient to another components then you have to set this component as client otherway you cant pass funcs.

//That way you can use the children in use client even if the component is a server component but if you import the server component in a client component than server component will turn into a client comp too.
const QueryProvider = ({ children }: Props) => {
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </div>
    )
}

export default QueryProvider