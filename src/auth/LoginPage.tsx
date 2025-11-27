import React from 'react';
import { Navbar } from '@/shared/Navbar';
import { Footer } from '@/shared/Footer';

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      Login
      <Footer />
    </div>
  );
};

export default LoginPage;