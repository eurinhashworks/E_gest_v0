"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

/**
 * @interface User
 * @description Represents a user object with basic profile information and permissions.
 * @property {string} id - The unique identifier for the user.
 * @property {string} email - The user's email address.
 * @property {string} name - The user's name.
 * @property {"admin" | "manager" | "employee"} role - The role of the user within the system.
 * @property {string[]} permissions - A list of permissions assigned to the user.
 */
interface User {
  id: string
  email: string
  name: string
  role: "admin" | "manager" | "employee"
  permissions: string[]
}

/**
 * @interface AuthContextType
 * @description Defines the shape of the authentication context, including the user state and auth functions.
 * @property {User | null} user - The currently authenticated user object, or null if not authenticated.
 * @property {(email: string, password: string) => Promise<boolean>} login - Function to authenticate a user.
 * @property {() => void} logout - Function to log out the current user.
 * @property {boolean} isAuthenticated - A boolean indicating if the user is currently authenticated.
 */
interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * @component AuthProvider
 * @description Provides authentication context to its children components.
 * It manages user state, login, and logout functionality.
 * @param {{ children: ReactNode }} props - The props for the component.
 * @param {ReactNode} props.children - The child components that will have access to the auth context.
 * @returns {JSX.Element} The provider component.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  /**
   * @function login
   * @description Authenticates a user with the given email and password.
   * This is a mock implementation and should be replaced with a real API call in production.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<boolean>} A promise that resolves to true if authentication is successful, false otherwise.
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in production, this would call an API
    if (email && password) {
      const mockUser: User = {
        id: "1",
        email,
        name: "Administrateur",
        role: "admin",
        permissions: ["all"],
      }
      setUser(mockUser)
      setIsAuthenticated(true)
      localStorage.setItem("user", JSON.stringify(mockUser))
      return true
    }
    return false
  }

  /**
   * @function logout
   * @description Logs out the currently authenticated user by clearing the user state and removing the user data from local storage.
   */
  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>{children}</AuthContext.Provider>
}

/**
 * @function useAuth
 * @description A custom hook to access the authentication context.
 * It must be used within a component that is a descendant of `AuthProvider`.
 * @throws {Error} If used outside of an `AuthProvider`.
 * @returns {AuthContextType} The authentication context.
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
