import { useState } from "react";
import AcademicLayout from "@/dashboard/AcademicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { config } from "config";
import { Upload, Image as ImageIcon, Eye, RotateCcw, AlertCircle, CheckCircle2, FileText, BarChart } from "lucide-react";
import { useAuth } from "@/dashboard/hooks/useAuth";

const predictionLabels: { [key: string]: { label: string; description: string; color: string } } = {
  'No_DR': {
    label: 'Sin Retinopatía Diabética',
    description: 'No se detectaron signos de retinopatía diabética',
    color: 'bg-green-500'
  },
  'Mild': {
    label: 'Retinopatía Leve',
    description: 'Etapa temprana de retinopatía diabética',
    color: 'bg-blue-500'
  },
  'Moderate': {
    label: 'Retinopatía Moderada',
    description: 'Etapa moderada que requiere seguimiento',
    color: 'bg-yellow-500'
  },
  'Severe': {
    label: 'Retinopatía Severa',
    description: 'Etapa avanzada que necesita atención médica',
    color: 'bg-orange-500'
  },
  'Proliferate_DR': {
    label: 'Retinopatía Proliferativa',
    description: 'Etapa más avanzada, requiere tratamiento urgente',
    color: 'bg-red-500'
  }
};

const predictionDescriptions: { [key: string]: string } = {
  'No_DR': 'El análisis de retinopatía diabética no muestra signos de la enfermedad. Se recomienda continuar con controles anuales y mantener un buen control glucémico.',
  'Mild': 'Se detectaron microaneurismas característicos de retinopatía diabética leve. Se sugiere seguimiento en 6-12 meses y control estricto de la diabetes.',
  'Moderate': 'Presencia de microaneurismas, hemorragias puntiformes y exudados duros. Etapa moderada que requiere seguimiento cada 3-6 meses y posible tratamiento.',
  'Severe': 'Múltiples hemorragias en forma de mancha, anomalías microvasculares intraretinianas. Etapa severa que necesita intervención médica y seguimiento cercano.',
  'Proliferate_DR': 'Presencia de neovasos, hemorragias vítreas y tejido fibroso. Etapa proliferativa que requiere tratamiento urgente con láser o intervención quirúrgica.'
};

// Interfaz para la nueva estructura de respuesta
interface PredictionResponse {
  prediction: {
    confidence: number;
    label: string;
  };
}

export default function Clasificator() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [prediction, setPrediction] = useState<PredictionResponse['prediction'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [dni, setDni] = useState("");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const { token, profile } = useAuth();

  const handleImageSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error("Por favor, selecciona un archivo de imagen válido");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("La imagen es demasiado grande. Máximo 10MB");
      return;
    }

    setSelectedImage(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setPrediction(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleClassify = async () => {
    if (!selectedImage) {
      toast.error("Por favor, selecciona una imagen primero");
      return;
    }

    setIsLoading(true);
    setPrediction(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      const tokenWithoutQuotes = token?.replace(/^"|"$/g, '');
      const response = await fetch(`${config.apiUrl}${config.endpoints.prediction.classify}`, {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${tokenWithoutQuotes}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data: PredictionResponse = await response.json();
        setPrediction(data.prediction);
        toast.success("Imagen clasificada exitosamente");
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message || "No se pudo clasificar la imagen"}`);
      }
    } catch (error) {
      console.error("Classification error:", error);
      toast.error("Error al conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    if (!dni.trim()) {
      toast.error("Por favor, ingresa el DNI del paciente");
      return;
    }

    if (!prediction) {
      toast.error("Primero debes clasificar una imagen");
      return;
    }

    if (!profile) {
      toast.error("No se pudo obtener la información del médico");
      return;
    }

    setIsGeneratingReport(true);

    try {
      const tokenWithoutQuotes = token?.replace(/^"|"$/g, '');
      const doctorId = profile.id;

      const reportData = {
        dni: dni.trim(),
        doctor_id: doctorId,
        description: predictionDescriptions[prediction.label] || `Diagnóstico: ${prediction.label}`
      };

      const response = await fetch(`${config.apiUrl}${config.endpoints.prediction.report}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenWithoutQuotes}`,
        },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Reporte generado exitosamente");
        setShowReportModal(false);
        setDni("");
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message || "No se pudo generar el reporte"}`);
      }
    } catch (error) {
      console.error("Report generation error:", error);
      toast.error("Error al conectar con el servidor");
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const resetForm = () => {
    setSelectedImage(null);
    setPreviewUrl("");
    setPrediction(null);
    setDni("");
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  const openReportModal = () => {
    if (!prediction) {
      toast.error("Primero debes clasificar una imagen");
      return;
    }
    setShowReportModal(true);
  };

  // Función para obtener el color de la barra de confianza basado en el porcentaje
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-500';
    if (confidence >= 60) return 'bg-blue-500';
    if (confidence >= 40) return 'bg-yellow-500';
    if (confidence >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <AcademicLayout title="Dashboard: Predicciones">
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Clasificador de Retinopatía Diabética</h1>
          <p className="text-muted-foreground">
            Sube una imagen del fondo de ojo para analizar y clasificar el estado de retinopatía diabética
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Cargar Imagen
              </CardTitle>
              <CardDescription>
                Selecciona o arrastra una imagen del fondo de ojo para analizar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                  dragOver 
                    ? 'border-primary bg-primary/5' 
                    : 'border-muted-foreground/25 hover:border-muted-foreground/50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                {!previewUrl ? (
                  <div className="space-y-3">
                    <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto" />
                    <div className="space-y-1">
                      <p className="font-medium">Haz clic o arrastra una imagen aquí</p>
                      <p className="text-sm text-muted-foreground">
                        PNG, JPG, JPEG hasta 10MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <img
                      src={previewUrl}
                      alt="Vista previa"
                      className="mx-auto h-32 w-32 object-cover rounded-lg border"
                    />
                    <p className="text-sm text-muted-foreground">
                      Imagen seleccionada: {selectedImage?.name}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleClassify} 
                  disabled={!selectedImage || isLoading}
                  className="flex-1"
                >
                  {isLoading ? (
                    <>
                      <RotateCcw className="h-4 w-4 animate-spin mr-2" />
                      Analizando...
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Clasificar Imagen
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={resetForm}
                  disabled={isLoading}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reiniciar
                </Button>
              </div>

              {prediction && (
                <div className="pt-4 border-t">
                  <Button 
                    onClick={openReportModal}
                    className="w-full"
                    variant="secondary"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generar Reporte
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Resultados del Análisis
              </CardTitle>
              <CardDescription>
                Resultado de la clasificación de retinopatía diabética
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!prediction ? (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {selectedImage 
                      ? "Haz clic en 'Clasificar Imagen' para analizar" 
                      : "Sube una imagen para comenzar el análisis"}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Indicador de resultado con confianza */}
                  <div className={`rounded-lg p-4 border-l-4 ${
                    prediction.label === 'No_DR' ? 'border-l-green-500 bg-green-50 dark:bg-green-950/20' :
                    prediction.label === 'Mild' ? 'border-l-blue-500 bg-blue-50 dark:bg-blue-950/20' :
                    prediction.label === 'Moderate' ? 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20' :
                    prediction.label === 'Severe' ? 'border-l-orange-500 bg-orange-50 dark:bg-orange-950/20' :
                    'border-l-red-500 bg-red-50 dark:bg-red-950/20'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${predictionLabels[prediction.label]?.color}`} />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {predictionLabels[prediction.label]?.label || prediction.label}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {predictionLabels[prediction.label]?.description}
                        </p>
                        
                        {/* Barra de confianza */}
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <BarChart className="h-3 w-3" />
                              Confianza del modelo:
                            </span>
                            <span className="font-medium">{prediction.confidence.toFixed(2)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                            <div 
                              className={`h-2 rounded-full ${getConfidenceColor(prediction.confidence)} transition-all duration-500`}
                              style={{ width: `${prediction.confidence}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Información adicional */}
                  <div className="space-y-3">
                    <h4 className="font-medium">Recomendaciones:</h4>
                    <ul className="space-y-2 text-sm">
                      {prediction.label === 'No_DR' && (
                        <>
                          <li>✅ Continúa con tus chequeos regulares anuales</li>
                          <li>✅ Mantén un buen control de tus niveles de glucosa</li>
                          <li>✅ Sigue un estilo de vida saludable</li>
                        </>
                      )}
                      {prediction.label === 'Mild' && (
                        <>
                          <li>🟡 Programa un seguimiento en 6-12 meses</li>
                          <li>🟡 Controla cuidadosamente tu diabetes</li>
                          <li>🟡 Consulta con tu oftalmólogo</li>
                        </>
                      )}
                      {prediction.label === 'Moderate' && (
                        <>
                          <li>🟠 Consulta con un especialista en 3-6 meses</li>
                          <li>🟠 Considera tratamiento preventivo</li>
                          <li>🟠 Monitorea tu visión regularmente</li>
                        </>
                      )}
                      {prediction.label === 'Severe' && (
                        <>
                          <li>🔴 Busca atención médica inmediata</li>
                          <li>🔴 Tratamiento con láser puede ser necesario</li>
                          <li>🔴 Seguimiento estrecho requerido</li>
                        </>
                      )}
                      {prediction.label === 'Proliferate_DR' && (
                        <>
                          <li>🚨 Tratamiento urgente necesario</li>
                          <li>🚨 Alto riesgo de pérdida de visión</li>
                          <li>🚨 Intervención médica inmediata</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Generar Reporte Médico
              </DialogTitle>
              <DialogDescription>
                Ingresa el DNI del paciente para generar el reporte con el diagnóstico de retinopatía diabética.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="dni">DNI del Paciente</Label>
                <Input
                  id="dni"
                  type="text"
                  placeholder="Ej: 18007564"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  disabled={isGeneratingReport}
                />
              </div>

              {prediction && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Resumen del Diagnóstico</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Resultado:</span>
                        <span className="font-medium">{predictionLabels[prediction.label]?.label}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Código:</span>
                        <span className="font-medium">{prediction.label}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Confianza:</span>
                        <span className="font-medium">{prediction.confidence.toFixed(2)}%</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        {predictionDescriptions[prediction.label]}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowReportModal(false)}
                disabled={isGeneratingReport}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleGenerateReport}
                disabled={!dni.trim() || isGeneratingReport}
              >
                {isGeneratingReport ? (
                  <>
                    <RotateCcw className="h-4 w-4 animate-spin mr-2" />
                    Generando...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Generar Reporte
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Card>
          <CardHeader>
            <CardTitle>Acerca del Clasificador</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 text-sm text-muted-foreground">
              <p>
                Este sistema utiliza inteligencia artificial para analizar imágenes del fondo de ojo 
                y clasificar el estado de retinopatía diabética según la escala internacional.
              </p>
              <div className="grid gap-2">
                <p className="font-medium text-foreground">Escala de clasificación:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><span className="text-green-600">No_DR</span> - Sin retinopatía diabética</li>
                  <li><span className="text-blue-600">Mild</span> - Retinopatía leve no proliferativa</li>
                  <li><span className="text-yellow-600">Moderate</span> - Retinopatía moderada no proliferativa</li>
                  <li><span className="text-orange-600">Severe</span> - Retinopatía severa no proliferativa</li>
                  <li><span className="text-red-600">Proliferate_DR</span> - Retinopatía proliferativa</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AcademicLayout>
  );
}