import React from 'react';
import { Navbar } from '@/shared/Navbar';
import { Footer } from '@/shared/Footer';

export const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      Register
      <Footer />
    </div>
  );
};

export default RegisterPage;