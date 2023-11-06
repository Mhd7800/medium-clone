import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

import React from 'react'

export const MyApiSlice = createApi  ({
  
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080'}),
    endpoints: (builder) => ({
        getStories : builder.query({
            query: () => 'v1/posts',
    }),

    //user
    getUserId: builder.query({
        query: (user) => `users/${user.id}`
    }),

    updateUser : builder.mutation({
        query : (story)=> ({
            url : `/users/${story.id}`,
            method: 'PATCH',
            body : story
        })
    }),

    addStorie: builder.mutation({
        query: (story) => ({
            url : '/v1/posts/',
            method : 'POST',
            body : story
        })
    }),

    updateStory : builder.mutation({
        query : (story)=> ({
            url : `/v1/posts/${story.id}`,
            method: 'PATCH',
            body : story
        })
    }),

    deleteStory: builder.mutation({
        query : ({id})=> ({
            url : `/posts/${id}`,
            method: 'DELETE',
            body : id
        })
    }),

})
    


})

export const {
    useGetStoriesQuery,
    useGetUserIdQuery,
    useAddStorieMutation,
    useUpdateUserMutation,
    useUpdateStoryMutation,
    useDeleteStoryMutation
} = MyApiSlice