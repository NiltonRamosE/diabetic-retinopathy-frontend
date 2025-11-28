import { useState } from "react";
import AcademicLayout from "@/dashboard/AcademicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { config } from "config";
import { Upload, Image as ImageIcon, Eye, RotateCcw, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/dashboard/hooks/useAuth";
// Mapeo de las predicciones a nombres más legibles
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

export default function Clasificator() {

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const { token } = useAuth();

  const handleImageSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error("Por favor, selecciona un archivo de imagen válido");
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
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
        const data = await response.json();
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

  const resetForm = () => {
    setSelectedImage(null);
    setPreviewUrl("");
    setPrediction(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <AcademicLayout title="Dashboard: Predicciones">
      <div className="flex flex-1 flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Clasificador de Retinopatía Diabética</h1>
          <p className="text-muted-foreground">
            Sube una imagen del fondo de ojo para analizar y clasificar el estado de retinopatía diabética
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Panel de carga de imagen */}
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
              {/* Área de drop */}
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

              {/* Botones de acción */}
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
            </CardContent>
          </Card>

          {/* Panel de resultados */}
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
                  {/* Indicador de resultado */}
                  <div className={`rounded-lg p-4 border-l-4 ${
                    prediction === 'No_DR' ? 'border-l-green-500 bg-green-50 dark:bg-green-950/20' :
                    prediction === 'Mild' ? 'border-l-blue-500 bg-blue-50 dark:bg-blue-950/20' :
                    prediction === 'Moderate' ? 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20' :
                    prediction === 'Severe' ? 'border-l-orange-500 bg-orange-50 dark:bg-orange-950/20' :
                    'border-l-red-500 bg-red-50 dark:bg-red-950/20'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${predictionLabels[prediction]?.color}`} />
                      <div>
                        <h3 className="font-semibold text-lg">
                          {predictionLabels[prediction]?.label || prediction}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {predictionLabels[prediction]?.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Información adicional */}
                  <div className="space-y-3">
                    <h4 className="font-medium">Recomendaciones:</h4>
                    <ul className="space-y-2 text-sm">
                      {prediction === 'No_DR' && (
                        <>
                          <li>✅ Continúa con tus chequeos regulares anuales</li>
                          <li>✅ Mantén un buen control de tus niveles de glucosa</li>
                          <li>✅ Sigue un estilo de vida saludable</li>
                        </>
                      )}
                      {prediction === 'Mild' && (
                        <>
                          <li>🟡 Programa un seguimiento en 6-12 meses</li>
                          <li>🟡 Controla cuidadosamente tu diabetes</li>
                          <li>🟡 Consulta con tu oftalmólogo</li>
                        </>
                      )}
                      {prediction === 'Moderate' && (
                        <>
                          <li>🟠 Consulta con un especialista en 3-6 meses</li>
                          <li>🟠 Considera tratamiento preventivo</li>
                          <li>🟠 Monitorea tu visión regularmente</li>
                        </>
                      )}
                      {prediction === 'Severe' && (
                        <>
                          <li>🔴 Busca atención médica inmediata</li>
                          <li>🔴 Tratamiento con láser puede ser necesario</li>
                          <li>🔴 Seguimiento estrecho requerido</li>
                        </>
                      )}
                      {prediction === 'Proliferate_DR' && (
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

        {/* Información adicional */}
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