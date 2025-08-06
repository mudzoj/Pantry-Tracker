// app/layout.js
"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./context/AuthContext";
import LoadingScreen from "./components/loadingScreen";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import ClientLayout from "./ClientLayout";
import { Suspense } from "react";

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
            <Suspense fallback={<LoadingScreen />}>
              <ClientLayout>
                <LayoutContent>{children}</LayoutContent>
              </ClientLayout>
            </Suspense>
          </LoadingProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}