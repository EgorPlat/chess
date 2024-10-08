import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const mainApi = createApi({
    reducerPath: "mainApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://jsonplaceholder.typicode.com/"
    }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: ({ userId }) => `users/${userId}`
        }),
        addUser: builder.mutation({
            query: (newUser) => ({
                url: 'users',
                method: 'POST',
                body: newUser
            }) 
        })
    })
});

export const { useGetUsersQuery, useAddUserMutation } = mainApi;