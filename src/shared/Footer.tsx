// src/shared/Footer.tsx
import React from 'react';
import { Eye, Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Cpu, FileText, User, MessageCircle } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Servicios',
      links: [
        { label: 'Cirugía de Cataratas', href: '#', icon: Eye },
        { label: 'Tratamiento de Glaucoma', href: '#', icon: Cpu },
        { label: 'Enfermedades de Retina', href: '#', icon: Eye },
        { label: 'Cirugía Refractiva', href: '#', icon: Eye },
        { label: 'Consulta General', href: '#', icon: User },
      ],
    },
    {
      title: 'Información',
      links: [
        { label: 'Sobre Nosotros', href: '#nosotros', icon: FileText },
        { label: 'Equipo Médico', href: '#', icon: User },
        { label: 'Tecnología', href: '#', icon: Cpu },
        { label: 'Blog', href: '#', icon: FileText },
        { label: 'Testimonios', href: '#', icon: MessageCircle },
      ],
    },
    {
      title: 'Contacto',
      links: [
        { label: '+51 043 123 456', href: 'tel:+51043123456', icon: Phone },
        { label: 'contacto@clinicagismondi.com', href: 'mailto:contacto@clinicagismondi.com', icon: Mail },
        { label: 'Av. Principal 123, Chimbote', href: '#', icon: MapPin },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <a href="#home" className="flex items-center space-x-3 group mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-all" />
                <Eye className="h-10 w-10 text-primary relative z-10" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">Clínica Gismondi</span>
                <span className="text-xs text-muted-foreground">
                  Salud Visual Integral
                </span>
              </div>
            </a>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Más de 20 años brindando atención oftalmológica de excelencia con tecnología de última generación.
            </p>
            
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2.5 rounded-lg bg-background hover:bg-primary hover:text-primary-foreground transition-all duration-300 border"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-lg mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                    >
                      {link.icon && (
                        <link.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                      )}
                      <span className="group-hover:translate-x-0.5 transition-transform">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} Clínica Oftalmológica Gismondi. Todos los derechos reservados.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Términos y Condiciones
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Libro de Reclamaciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};