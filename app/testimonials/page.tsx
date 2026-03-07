'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TestimonialsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard since this page doesn't have specific content
    router.push('/dashboard');
  }, [router]);

  return null;
}