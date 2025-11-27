import React from 'react';
import { 
  Eye, 
  Scan, 
  Sparkles, 
  Glasses, 
  Activity, 
  Stethoscope,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export const ProposalSection = () => {
  const services = [
    {
      icon: Eye,
      title: 'Cirugía de Cataratas',
      description: 'Recupera tu visión con la técnica de facoemulsificación, procedimiento mínimamente invasivo con recuperación rápida.',
      features: ['Ambulatorio', 'Sin dolor', 'Resultados inmediatos'],
      color: 'from-blue-500 to-cyan-500',
      image: '👁️',
    },
    {
      icon: Activity,
      title: 'Tratamiento de Glaucoma',
      description: 'Diagnóstico precoz mediante tonometría y campimetría computarizada para preservar tu visión de manera efectiva.',
      features: ['Detección temprana', 'Control continuo', 'Prevención'],
      color: 'from-purple-500 to-pink-500',
      image: '🔬',
    },
    {
      icon: Scan,
      title: 'Enfermedades de la Retina',
      description: 'Tratamiento especializado para desprendimiento de retina, retinopatía diabética y degeneración macular.',
      features: ['OCT avanzado', 'Láser especializado', 'Expertos certificados'],
      color: 'from-emerald-500 to-teal-500',
      image: '🎯',
    },
    {
      icon: Glasses,
      title: 'Cirugía Refractiva',
      description: 'Corrección láser de miopía, hipermetropía y astigmatismo con tecnología LASIK de última generación.',
      features: ['Sin anteojos', 'Procedimiento rápido', 'Alta precisión'],
      color: 'from-amber-500 to-orange-500',
      image: '✨',
    },
    {
      icon: Sparkles,
      title: 'Estética Ocular',
      description: 'Tratamientos especializados para blefaroplastia, ptosis palpebral y rejuvenecimiento de la zona periocular.',
      features: ['Resultados naturales', 'Mínima invasión', 'Expertos en estética'],
      color: 'from-rose-500 to-red-500',
      image: '💫',
    },
    {
      icon: Stethoscope,
      title: 'Consulta General',
      description: 'Evaluación completa de tu salud visual con equipamiento de última generación y diagnóstico preciso.',
      features: ['Examen completo', 'Diagnóstico preciso', 'Plan personalizado'],
      color: 'from-indigo-500 to-violet-500',
      image: '🏥',
    },
  ];

  return (
    <section id="servicios" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-muted/30">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background/50 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Servicios Especializados</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Nuestros{' '}
            <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Servicios
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Ofrecemos una amplia gama de tratamientos oftalmológicos 
            con tecnología de vanguardia y atención personalizada.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-background rounded-2xl border hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-linear-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className="relative p-8 space-y-6">
                <div className="flex items-start justify-between">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-linear-to-br ${service.color} rounded-xl opacity-10 blur-xl group-hover:opacity-20 transition-opacity`} />
                    <div className="relative p-3 rounded-xl bg-background border">
                      <service.icon className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  <span className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                    {service.image}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 px-6 py-3 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                  <span className="font-medium">Más información</span>
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        <div className="text-center space-y-6">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 rounded-2xl bg-linear-to-r from-primary/10 via-purple-500/10 to-primary/10 border">
            <div className="space-y-2 text-left flex-1">
              <h3 className="text-2xl font-bold">¿No encuentras lo que buscas?</h3>
              <p className="text-muted-foreground">
                Contamos con más especialidades y tratamientos. Contáctanos para más información.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contacto"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/25 whitespace-nowrap"
              >
                Consultar Especialista
              </a>
              <a
                href="#"
                className="px-8 py-4 border-2 rounded-lg font-semibold hover:bg-accent transition-all duration-300 whitespace-nowrap"
              >
                Ver Todos los Servicios
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};