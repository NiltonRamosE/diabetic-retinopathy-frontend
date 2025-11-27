import React from 'react';
import { Award, Heart, Eye, Zap, Users, ShieldCheck } from 'lucide-react';

export const MessageSection = () => {
  const values = [
    {
      icon: Award,
      title: 'Experiencia Comprobada',
      description: 'Más de dos décadas liderando la oftalmología con resultados excepcionales y reconocimiento internacional.',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    },
    {
      icon: Heart,
      title: 'Atención Personalizada',
      description: 'Cada paciente es único. Diseñamos planes de tratamiento adaptados a tus necesidades específicas.',
      color: 'text-rose-600 dark:text-rose-400',
      bgColor: 'bg-rose-50 dark:bg-rose-950/30',
    },
    {
      icon: Eye,
      title: 'Tecnología Avanzada',
      description: 'Equipamiento de última generación para diagnósticos precisos y tratamientos mínimamente invasivos.',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950/30',
    },
    {
      icon: Zap,
      title: 'Tratamientos Rápidos',
      description: 'Procedimientos eficientes que respetan tu tiempo con recuperación acelerada y resultados inmediatos.',
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/30',
    },
    {
      icon: Users,
      title: 'Equipo Especializado',
      description: 'Oftalmólogos certificados y personal capacitado comprometidos con tu salud visual.',
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    },
    {
      icon: ShieldCheck,
      title: 'Garantía de Calidad',
      description: 'Certificaciones internacionales y protocolos de seguridad que garantizan tu tranquilidad.',
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/30',
    },
  ];

  return (
    <section id="nosotros" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background/50 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium">Excelencia en Oftalmología</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            ¿Por qué{' '}
            <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              elegirnos?
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Combinamos experiencia médica, tecnología de vanguardia y un enfoque 
            centrado en el paciente para ofrecer la mejor atención oftalmológica.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl border bg-background hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative space-y-4">
                <div className={`inline-flex p-4 rounded-xl ${value.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className={`h-8 w-8 ${value.color}`} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>

                <div className="absolute top-4 right-4 w-20 h-20 bg-linear-to-br from-primary/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 rounded-2xl border bg-linear-to-br from-primary/5 to-transparent">
            <div className="flex-1 text-left">
              <h3 className="text-2xl font-bold mb-2">
                ¿Listo para cuidar tu salud visual?
              </h3>
              <p className="text-muted-foreground">
                Agenda una consulta y descubre cómo podemos ayudarte.
              </p>
            </div>
            <a
              href="#contacto"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/25 whitespace-nowrap"
            >
              Solicitar Información
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};