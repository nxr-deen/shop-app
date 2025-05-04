import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Create axios instance
export const api = axios.create({
  baseURL: "https://api.example.com", // Replace with your API URL
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    // Get token from storage
    const token = await AsyncStorage.getItem("authToken")

    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // If error is 401 and not already retrying
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Try to refresh token
        const refreshToken = await AsyncStorage.getItem("refreshToken")

        if (refreshToken) {
          const response = await axios.post("https://api.example.com/auth/refresh", {
            refreshToken,
          })

          const { token } = response.data

          // Save new token
          await AsyncStorage.setItem("authToken", token)

          // Update authorization header
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`
          originalRequest.headers["Authorization"] = `Bearer ${token}`

          // Retry original request
          return api(originalRequest)
        }
      } catch (refreshError) {
        // If refresh fails, redirect to login
        await AsyncStorage.removeItem("authToken")
        await AsyncStorage.removeItem("refreshToken")

        // Handle redirect to login in your app
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)
