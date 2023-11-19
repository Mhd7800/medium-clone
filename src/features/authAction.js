import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
import axios from 'axios'


const backendUrl = 'http://localhost:8080/api/v1'

export const registerUser = createAsyncThunk(
    'auth/register',
    async({name, username, email, password},{rejectWithValue})=>{
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        
        await axios.post(
            `${backendUrl}/auth/register`,
            {name,username, email, password},
            config
        )
    } catch(error)
    {
    if(error.response && error.reponse.data.message)
    {
        return rejectWithValue(error.response.data.message)
    }
    else {
        return rejectWithValue(error.message)
      }
    }
}
)


export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
      try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const { data } = await axios.post(
          `${backendUrl}/auth/login`,
          { email, password },
          config
        )
        // store user's token in local storage
        localStorage.setItem('userToken', data.userToken)
        return data
      } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )