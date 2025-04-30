'use client';
import { AuthContextProvider } from './context/AuthContext';

export function ClientAuthWrapper({ children }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
