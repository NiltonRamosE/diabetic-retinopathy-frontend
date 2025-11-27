import React from 'react';
import { Eye, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export const HeroSection = () => {
  const features = [
    'Tecnología de última generación',
    'Equipo médico especializado',
    'Atención personalizada 24/7',
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background/50 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">
                Más de 20 años de excelencia oftalmológica
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                Cuidamos tu{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    salud visual
                  </span>
                  <span className="absolute -bottom-2 left-0 w-full h-3 bg-primary/20 -skew-y-1 -z-10" />
                </span>{' '}
                con tecnología de vanguardia
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Expertos en oftalmología comprometidos con tu bienestar visual. 
                Diagnóstico preciso, tratamientos avanzados y atención personalizada.
              </p>
            </div>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 animate-in fade-in slide-in-from-left duration-700"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#contacto"
                className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-semibold rounded-lg bg-primary text-primary-foreground hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/25"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Agendar Cita Ahora
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              
              <a
                href="#servicios"
                className="inline-flex items-center justify-center px-8 py-4 font-semibold rounded-lg border-2 hover:bg-accent transition-all duration-300"
              >
                Ver Servicios
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t">
              <div>
                <div className="text-3xl font-bold text-primary">20+</div>
                <div className="text-sm text-muted-foreground">Años de experiencia</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">15K+</div>
                <div className="text-sm text-muted-foreground">Pacientes atendidos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Satisfacción</div>
              </div>
            </div>
          </div>

          <div className="relative animate-in fade-in slide-in-from-right duration-700 delay-300">
            <div className="relative aspect-square">
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-spin-slow" />
              <div className="absolute inset-8 rounded-full border-2 border-primary/30 animate-spin-slow-reverse" />
              <div className="absolute inset-16 rounded-full border-2 border-primary/40 animate-spin-slow" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-linear-to-br from-primary to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse" />
                  <div className="relative bg-linear-to-br from-primary to-purple-600 rounded-full p-16 shadow-2xl">
                    <Eye className="h-32 w-32 text-primary-foreground" />
                  </div>
                </div>
              </div>

              <div className="absolute top-1/4 -right-4 bg-background border rounded-xl p-4 shadow-xl animate-float">
                <div className="text-2xl font-bold text-primary">4.9⭐</div>
                <div className="text-xs text-muted-foreground">Calificación</div>
              </div>
              
              <div className="absolute bottom-1/4 -left-4 bg-background border rounded-xl p-4 shadow-xl animate-float delay-1000">
                <div className="text-2xl font-bold text-primary">ISO</div>
                <div className="text-xs text-muted-foreground">Certificado</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/30" />
        </div>
      </div>
    </section>
  );
};