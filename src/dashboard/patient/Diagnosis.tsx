import { useState, useEffect } from "react";
import AcademicLayout from "@/dashboard/AcademicLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { config } from "config";
import { useAuth } from "@/dashboard/hooks/useAuth";
import { User, Calendar, FileText, Stethoscope, IdCard, AlertCircle, Clock, UserCheck } from "lucide-react";

interface Doctor {
  id: number;
  cmp: string;
  specialty: string;
  user_id: string;
}

interface Diagnosis {
  id: number;
  description: string;
  diagnosis_date: string;
  history_id: string;
  doctor_id: string;
  doctor: Doctor;
}

interface MedicalHistory {
  id: number;
  patient_id: string;
  created_at: string;
  diagnoses: Diagnosis[];
}

interface Patient {
  id: number;
  birth_date: string;
  dni: string;
  user_id: string;
  medical_history: MedicalHistory;
}

// Corregir la interfaz - la respuesta solo tiene patient, no diagnoses en el nivel superior
interface DiagnosisResponse {
  patient: Patient;
}

export default function Diagnosis() {
  const [diagnosisData, setDiagnosisData] = useState<DiagnosisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token, profile } = useAuth();

  useEffect(() => {
    const fetchDiagnoses = async () => {
      if (!token || !profile) {
        setIsLoading(false);
        return;
      }

      try {
        const tokenWithoutQuotes = token.replace(/^"|"$/g, '');
        // Obtener el patientId del usuario en sesión
        const patientId = profile.id;

        const endpoint = config.endpoints.diagnosis.getByPatientId.replace(':patientId', patientId);
        
        const response = await fetch(`${config.apiUrl}${endpoint}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenWithoutQuotes}`,
          },
        });

        if (response.ok) {
          const data: DiagnosisResponse = await response.json();
          console.log("Fetched diagnosis data:", data);
          setDiagnosisData(data);
        } else if (response.status === 404) {
          toast.error("No se encontraron diagnósticos para este paciente");
        } else {
          const errorData = await response.json();
          toast.error(`Error: ${errorData.message || "No se pudieron obtener los diagnósticos"}`);
        }
      } catch (error) {
        console.error("Diagnosis fetch error:", error);
        toast.error("Error al conectar con el servidor");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiagnoses();
  }, [token, profile]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Hoy";
    if (diffInDays === 1) return "Ayer";
    if (diffInDays < 7) return `Hace ${diffInDays} días`;
    if (diffInDays < 30) return `Hace ${Math.floor(diffInDays / 7)} semana${Math.floor(diffInDays / 7) > 1 ? 's' : ''}`;
    if (diffInDays < 365) return `Hace ${Math.floor(diffInDays / 30)} mes${Math.floor(diffInDays / 30) > 1 ? 'es' : ''}`;
    return `Hace ${Math.floor(diffInDays / 365)} año${Math.floor(diffInDays / 365) > 1 ? 's' : ''}`;
  };

  if (isLoading) {
    return (
      <AcademicLayout title="Dashboard: Diagnósticos">
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-muted-foreground">Cargando diagnósticos...</p>
        </div>
      </AcademicLayout>
    );
  }

  // CORREGIDO: Los diagnósticos están dentro de patient.medical_history.diagnoses
  const diagnoses = diagnosisData?.patient?.medical_history?.diagnoses || [];

  return (
    <AcademicLayout title="Dashboard: Diagnósticos">
      <div className="flex flex-1 flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Mis Diagnósticos</h1>
          <p className="text-muted-foreground">
            Historial completo de tus diagnósticos y consultas médicas
          </p>
        </div>

        {diagnosisData ? (
          <div className="space-y-6">
            {/* Información del paciente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Mi Información
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <IdCard className="h-4 w-4" />
                      DNI
                    </Label>
                    <p className="text-lg font-semibold">{diagnosisData.patient.dni}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <AlertCircle className="h-4 w-4" />
                      Fecha de Nacimiento
                    </Label>
                    <p className="text-lg font-semibold">
                      {formatDate(diagnosisData.patient.birth_date)}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <Calendar className="h-4 w-4" />
                      Edad
                    </Label>
                    <p className="text-lg font-semibold">
                      {calculateAge(diagnosisData.patient.birth_date)} años
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <FileText className="h-4 w-4" />
                      Total Diagnósticos
                    </Label>
                    <p className="text-lg font-semibold">{diagnoses.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estadísticas rápidas */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{diagnoses.length}</p>
                      <p className="text-sm text-muted-foreground">Diagnósticos Totales</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                      <User className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {new Set(diagnoses.map(d => d.doctor_id)).size}
                      </p>
                      <p className="text-sm text-muted-foreground">Médicos Diferentes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900">
                      <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {diagnoses.length > 0 ? getTimeAgo(diagnoses[0].diagnosis_date) : 'N/A'}
                      </p>
                      <p className="text-sm text-muted-foreground">Última Consulta</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de diagnósticos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  Historial de Diagnósticos
                </CardTitle>
                <CardDescription>
                  {diagnoses.length === 0 
                    ? "No tienes diagnósticos registrados" 
                    : `Tienes ${diagnoses.length} diagnóstico${diagnoses.length > 1 ? 's' : ''} registrado${diagnoses.length > 1 ? 's' : ''}`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {diagnoses.length === 0 ? (
                  <div className="text-center py-12">
                    <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No hay diagnósticos</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      No se han registrado diagnósticos para tu cuenta. 
                      Tus diagnósticos aparecerán aquí después de tus consultas médicas.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {diagnoses.map((diagnosis, index) => (
                      <div
                        key={diagnosis.id}
                        className="border-l-4 border-primary pl-6 py-4 hover:bg-muted/50 transition-colors rounded-r-lg"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="flex-1 space-y-4">
                            <div className="flex items-start gap-4">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium shrink-0">
                                {index + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                  <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    {formatDateTime(diagnosis.diagnosis_date)}
                                  </span>
                                  <span className="text-xs bg-muted px-2 py-1 rounded-full">
                                    {getTimeAgo(diagnosis.diagnosis_date)}
                                  </span>
                                </div>
                                <div className="prose prose-sm max-w-none">
                                  <p className="text-base leading-relaxed whitespace-pre-wrap">
                                    {diagnosis.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="lg:w-64 space-y-3 p-4 bg-muted/30 rounded-lg">
                            <div className="flex items-center gap-2 text-sm font-medium">
                              <User className="h-4 w-4" />
                              Médico Tratante
                            </div>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium">CMP: </span>
                                <span className="text-muted-foreground">{diagnosis.doctor.cmp}</span>
                              </div>
                              <div>
                                <span className="font-medium">Especialidad: </span>
                                <span className="text-muted-foreground">{diagnosis.doctor.specialty}</span>
                              </div>
                              <div className="pt-2">
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                  ID: {diagnosis.doctor.id}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Resumen por especialidades */}
            {diagnoses.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Resumen por Especialidad</CardTitle>
                  <CardDescription>
                    Distribución de tus consultas por especialidad médica
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Array.from(new Set(diagnoses.map(d => d.doctor.specialty))).map(specialty => {
                      const specialtyDiagnoses = diagnoses.filter(d => d.doctor.specialty === specialty);
                      return (
                        <div key={specialty} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="h-3 w-3 rounded-full bg-primary" />
                            <span className="font-medium">{specialty}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">
                              {specialtyDiagnoses.length} consulta{specialtyDiagnoses.length > 1 ? 's' : ''}
                            </span>
                            <span className="text-xs bg-muted px-2 py-1 rounded-full">
                              {Math.round((specialtyDiagnoses.length / diagnoses.length) * 100)}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No se pudieron cargar los diagnósticos</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Hubo un problema al cargar tu información médica. 
                Por favor, intenta nuevamente más tarde.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AcademicLayout>
  );
}

// Componente Label auxiliar
function Label({ children, className, ...props }: { children: React.ReactNode; className?: string; htmlFor?: string }) {
  return (
    <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>
      {children}
    </label>
  );
}