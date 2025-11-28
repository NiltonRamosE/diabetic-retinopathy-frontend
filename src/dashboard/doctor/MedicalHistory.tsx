import { useState } from "react";
import AcademicLayout from "@/dashboard/AcademicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { config } from "config";
import { useAuth } from "@/dashboard/hooks/useAuth";
import { Search, User, Calendar, FileText, Stethoscope, IdCard, AlertCircle } from "lucide-react";

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

interface MedicalHistoryResponse {
  patient: Patient;
}

export default function MedicalHistory() {
  const [dni, setDni] = useState("");
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistoryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dni.trim()) {
      toast.error("Por favor, ingresa un DNI válido");
      return;
    }

    if (!token) {
      toast.error("No hay token de autenticación disponible");
      return;
    }

    setIsLoading(true);
    setMedicalHistory(null);

    try {
      console.log(JSON.stringify({
          dni: dni
        }));
      const tokenWithoutQuotes = token.replace(/^"|"$/g, '');
      const response = await fetch(`${config.apiUrl}${config.endpoints.medicalHistory.getByDNI}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenWithoutQuotes}`,
        },
        body: JSON.stringify({
          dni: dni
        }),
      });
      
      if (response.ok) {
        const data: MedicalHistoryResponse = await response.json();
        setMedicalHistory(data);
        toast.success("Historial médico encontrado");
      } else if (response.status === 404) {
        toast.error("No se encontró historial médico para este DNI");
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message || "No se pudo obtener el historial médico"}`);
      }
    } catch (error) {
      console.error("Medical history error:", error);
      toast.error("Error al conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

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

  // Obtener diagnósticos del historial médico
  const diagnoses = medicalHistory?.patient?.medical_history?.diagnoses || [];

  return (
    <AcademicLayout title="Dashboard: Historiales Médicos">
      <div className="flex flex-1 flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Historiales Médicos</h1>
          <p className="text-muted-foreground">
            Busca y visualiza el historial médico completo de los pacientes por DNI
          </p>
        </div>

        {/* Formulario de búsqueda */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Búsqueda de Paciente
            </CardTitle>
            <CardDescription>
              Ingresa el DNI del paciente para consultar su historial médico
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="dni">DNI del Paciente</Label>
                <Input
                  id="dni"
                  type="text"
                  placeholder="Ej: 81712601"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="flex items-end">
                <Button type="submit" disabled={isLoading || !dni.trim()}>
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                      Buscando...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Buscar
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Resultados */}
        {medicalHistory && (
          <div className="space-y-6">
            {/* Información del paciente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Información del Paciente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <IdCard className="h-4 w-4" />
                      DNI
                    </Label>
                    <p className="text-lg font-semibold">{medicalHistory.patient.dni}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <AlertCircle className="h-4 w-4" />
                      Fecha de Nacimiento
                    </Label>
                    <p className="text-lg font-semibold">
                      {formatDate(medicalHistory.patient.birth_date)}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <Calendar className="h-4 w-4" />
                      Edad
                    </Label>
                    <p className="text-lg font-semibold">
                      {calculateAge(medicalHistory.patient.birth_date)} años
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <FileText className="h-4 w-4" />
                      ID Historial
                    </Label>
                    <p className="text-lg font-semibold">#{medicalHistory.patient.medical_history.id}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Diagnósticos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  Diagnósticos ({diagnoses.length})
                </CardTitle>
                <CardDescription>
                  Historial completo de diagnósticos y tratamientos
                </CardDescription>
              </CardHeader>
              <CardContent>
                {diagnoses.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No se encontraron diagnósticos registrados</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {diagnoses.map((diagnosis, index) => (
                      <div
                        key={diagnosis.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start gap-3">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-muted-foreground mb-1">
                                  {formatDateTime(diagnosis.diagnosis_date)}
                                </p>
                                <p className="text-base leading-relaxed">
                                  {diagnosis.description}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="lg:w-48 space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Stethoscope className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">Médico Tratante</span>
                            </div>
                            <div className="space-y-1 text-sm">
                              <p className="font-medium">CMP: {diagnosis.doctor.cmp}</p>
                              <p className="text-muted-foreground">Especialidad: {diagnosis.doctor.specialty}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Resumen del historial médico */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen del Historial Médico</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2 text-center p-4 border rounded-lg">
                    <FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-600">
                      {diagnoses.length}
                    </p>
                    <p className="text-sm text-muted-foreground">Total de Diagnósticos</p>
                  </div>
                  
                  <div className="space-y-2 text-center p-4 border rounded-lg">
                    <Calendar className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">
                      {formatDate(medicalHistory.patient.medical_history.created_at)}
                    </p>
                    <p className="text-sm text-muted-foreground">Historial Creado</p>
                  </div>
                  
                  <div className="space-y-2 text-center p-4 border rounded-lg">
                    <User className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-600">
                      {new Set(diagnoses.map(d => d.doctor_id)).size}
                    </p>
                    <p className="text-sm text-muted-foreground">Médicos Involucrados</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Estado inicial o sin resultados */}
        {!medicalHistory && !isLoading && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Search className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Buscar Historial Médico</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Ingresa el DNI de un paciente en el campo de búsqueda para visualizar 
                su historial médico completo, incluyendo diagnósticos y tratamientos.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AcademicLayout>
  );
}