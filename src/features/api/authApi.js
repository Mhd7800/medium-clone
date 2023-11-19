import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({

    baseUrl: 'http://localhost:8080/',

    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.userToken
        if (token) {
         // include token in req header
          headers.set('authorization', `Bearer ${token}`)  
          return headers
        }
      },
    }),
    
    endpoints: (builder) => ({

        /*getUserDetails: builder.query({
          query: () => ({
            url: 'api/v1/user/?username={}',
            method: 'GET',
          }),
        }),*/
      }),
    })

    //export const { useGetUserDetailsQuery } = authApi