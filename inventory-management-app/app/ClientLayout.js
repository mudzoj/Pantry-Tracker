// app/ClientLayout.js
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLoading } from './context/LoadingContext';

export default function ClientLayout({ children }) {
  const { setLoading } = useLoading();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
  
    setLoading(false);
  }, [pathname, searchParams, setLoading]);

  return children;
}