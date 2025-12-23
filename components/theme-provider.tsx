'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

/**
 * @component ThemeProvider
 * @description A wrapper around `next-themes`'s `ThemeProvider` to provide theme management (e.g., light/dark mode) to the application.
 * It passes all its props to the underlying provider.
 * @param {ThemeProviderProps} props - The props for the theme provider, including `children` and other `next-themes` options.
 * @param {React.ReactNode} props.children - The child components that will have access to the theme context.
 * @returns {JSX.Element} The NextThemesProvider component.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
