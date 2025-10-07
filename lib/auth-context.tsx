"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  role: "admin" | "manager" | "employee"
  permissions: string[]
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

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

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
