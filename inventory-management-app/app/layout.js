// app/layout.js
'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./context/AuthContext";
import LoadingScreen from "./components/loadingScreen";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import ClientLayout from './ClientLayout';

const inter = Inter({ subsets: ["latin"] });

function LayoutContent({ children }) {
  const { loading } = useLoading();
  return loading ? <LoadingScreen /> : children;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <LoadingProvider>
            <ClientLayout>
              <LayoutContent>{children}</LayoutContent>
            </ClientLayout>
          </LoadingProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}