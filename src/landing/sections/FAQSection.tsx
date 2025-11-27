import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: '¿Cuánto dura una consulta oftalmológica completa?',
      answer: 'Una consulta oftalmológica completa tiene una duración aproximada de 30 a 45 minutos. Este tiempo incluye la historia clínica, exámenes diagnósticos como medición de agudeza visual, presión intraocular, y evaluación del fondo de ojo. Si se requieren estudios especializados como OCT o campimetría, el tiempo puede extenderse.',
    },
    {
      question: '¿La cirugía de cataratas es dolorosa y requiere hospitalización?',
      answer: 'No, la cirugía de cataratas moderna es un procedimiento ambulatorio prácticamente indoloro. Se realiza con anestesia local en gotas, dura aproximadamente 15-20 minutos, y el paciente puede regresar a casa el mismo día. La recuperación es rápida y la mayoría de pacientes retoman sus actividades normales en pocos días.',
    },
    {
      question: '¿Aceptan seguros médicos y cuál es el proceso?',
      answer: 'Sí, trabajamos con las principales aseguradoras del país incluyendo EsSalud, Pacífico, Rímac, Sanitas, y más. Para usar tu seguro, solo necesitas tu carta de garantía o autorización previa. Nuestro equipo administrativo te ayuda con todo el proceso de coordinación con tu aseguradora.',
    },
    {
      question: '¿Con qué frecuencia debo realizar un examen visual?',
      answer: 'Para adultos sin problemas visuales, recomendamos un examen anual. En niños, especialmente en edad escolar, es ideal cada 6-12 meses. Personas con diabetes, glaucoma, miopía alta u otras condiciones requieren controles más frecuentes según indicación médica. La detección temprana es clave para preservar la salud visual.',
    },
    {
      question: '¿Qué tecnología utilizan para los diagnósticos?',
      answer: 'Contamos con equipamiento de última generación incluyendo: OCT (Tomografía de Coherencia Óptica) para análisis detallado de retina, tonómetro de no contacto para medir presión ocular, campímetro computarizado para evaluar campo visual, topógrafo corneal, y microscopios de alta precisión. Todo calibrado según estándares internacionales.',
    },
    {
      question: '¿Cuánto tiempo toma recuperarse de una cirugía refractiva LASIK?',
      answer: 'La recuperación visual es sorprendentemente rápida. La mayoría de pacientes notan mejora significativa en las primeras 24 horas. Puedes retomar actividades cotidianas en 2-3 días. La visión se estabiliza completamente entre 1-3 meses. Durante la primera semana debes usar gotas oftálmicas y evitar actividades de alto impacto.',
    },
  ];

  return (
    <section id="faqs" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="lg:sticky lg:top-32 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background/50 backdrop-blur-sm">
                <HelpCircle className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Centro de Ayuda</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Preguntas{' '}
                <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Frecuentes
                </span>
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Resolvemos las dudas más comunes sobre nuestros servicios, 
                procedimientos y atención oftalmológica.
              </p>
            </div>

            <div className="p-8 rounded-2xl border bg-linear-to-br from-primary/5 to-transparent space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary text-primary-foreground">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">¿No encuentras tu respuesta?</h3>
                  <p className="text-sm text-muted-foreground">
                    Estamos aquí para ayudarte
                  </p>
                </div>
              </div>
              
              <div className="space-y-3 pt-4 border-t">
                <a 
                  href="tel:+51043123456"
                  className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                >
                  <span className="font-medium">Teléfono:</span>
                  <span className="text-muted-foreground">+51 043 123 456</span>
                </a>
                <a 
                  href="mailto:contacto@clinicagismondi.com"
                  className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                >
                  <span className="font-medium">Email:</span>
                  <span className="text-muted-foreground">contacto@clinicagismondi.com</span>
                </a>
              </div>

              <a
                href="#contacto"
                className="block w-full px-6 py-3 bg-primary text-primary-foreground text-center rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/25"
              >
                Contactar un Especialista
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-xl border bg-background">
                <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">Atención disponible</div>
              </div>
              <div className="p-6 rounded-xl border bg-background">
                <div className="text-3xl font-bold text-primary mb-1">&lt;2h</div>
                <div className="text-sm text-muted-foreground">Tiempo de respuesta</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="group border rounded-xl overflow-hidden bg-background hover:shadow-lg transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 hover:bg-accent transition-colors"
                >
                  <span className="font-semibold text-lg flex-1 leading-relaxed">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 mt-1 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 py-5 bg-muted/30 border-t">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};