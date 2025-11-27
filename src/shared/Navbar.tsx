import React, { useState, useEffect } from 'react';
import { Eye, Menu, X } from 'lucide-react';
import { ModeToggle } from '@/shared/ModeToggle';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/#home', label: 'Inicio' },
    { href: '/#servicios', label: 'Servicios' },
    { href: '/#nosotros', label: 'Nosotros' },
    { href: '/#faqs', label: 'FAQs' },
    { href: '/#contacto', label: 'Contacto' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg border-b shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="/#home" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-all" />
              <Eye className="h-9 w-9 text-primary relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight">
                Clínica Gismondi
              </span>
              <span className="text-xs text-muted-foreground">
                Salud Visual Integral
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <ModeToggle />
            <a
              href="/login"
              className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-semibold text-sm rounded-lg group"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary rounded-full group-hover:w-56 group-hover:h-56"></span>
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-linear-to-b from-transparent via-transparent to-primary"></span>
              <span className="relative text-primary-foreground bg-primary px-6 py-2.5 rounded-lg group-hover:bg-transparent transition-colors">
                Iniciar Sesión
              </span>
            </a>
          </div>

          <div className="flex lg:hidden items-center space-x-3">
            <ModeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t py-4 space-y-2 animate-in fade-in slide-in-from-top-5 duration-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full mt-4 px-4 py-3 bg-primary text-primary-foreground text-center rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Iniciar Sesión
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};