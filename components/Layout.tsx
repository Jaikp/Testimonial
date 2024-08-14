"use client";

import { useRouter } from 'next/router';
import Navbar from "@/components/Navbar/Navbar";
import Footer from './Navbar/Footer';


const ConditionalLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const noLayoutRoutes = ['/login', '/signup', '/another-route'];
  const shouldRenderLayout = !noLayoutRoutes.includes(router.pathname);

  return (
    <>
      {shouldRenderLayout && <Navbar />}
      {children}
      {shouldRenderLayout && <Footer/>}
    </>
  );
};

export default ConditionalLayout;
