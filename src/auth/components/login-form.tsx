import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { config } from "config"
import { toast } from "sonner"
import { routes } from "@/shared/site"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"

const roles = [
  {
    id: "patient",
    label: "Paciente",
    icon: "👤"
  },
  {
    id: "doctor",
    label: "Doctor",
    icon: "👨‍⚕️"
  },
  {
    id: "admin",
    label: "Admin",
    icon: "⚙️"
  }
]

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "patient"
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleRoleSelect = (roleId: string) => {
    setFormData(prev => ({
      ...prev,
      role: roleId
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    
    try {
      const response = await fetch(`${config.apiUrl}${config.endpoints.auth.login}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      })
      console.log(JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }))
      if (response.ok) {
        const responseData = await response.json()
        console.log("Login response:", responseData.data)
        
        localStorage.setItem("user", JSON.stringify(responseData.user))
        localStorage.setItem("token", JSON.stringify(responseData.access_token))
        localStorage.setItem("profile", JSON.stringify(responseData.profile))
        localStorage.setItem("role", formData.role)
        
        toast.success("¡Inicio de sesión exitoso!", {
          description: "Redirigiendo a tu dashboard.",
        })
        
        setTimeout(() => {
          window.location.href = routes.dashboard.index;
        }, 2000)
      } else {
        const errorData = await response.json()
        toast.error(`Error: ${errorData.message || "Algo salió mal."}`)
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Hubo un error al conectar con el servidor.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        
        {/* Campo de Email */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input 
            id="email" 
            type="email" 
            placeholder="m@example.com" 
            required 
            value={formData.email}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Contraseña</FieldLabel>
          <div className="relative">
            <Input
              id="password" 
              type={showPassword ? "text" : "password"}
              placeholder="Mínimo 8 caracteres"
              className="pr-10"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </Field>

        {/* Selección de Rol con Cards */}
        <Field>
          <FieldLabel>Selecciona tu rol</FieldLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {roles.map((role) => (
              <Card
                key={role.id}
                className={cn(
                  "cursor-pointer transition-all duration-200 border-2 hover:border-primary hover:shadow-md",
                  formData.role === role.id 
                    ? "border-primary bg-primary/5 shadow-md" 
                    : "border-border"
                )}
                onClick={() => handleRoleSelect(role.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{role.icon}</div>
                  <h3 className="font-semibold text-sm mb-1">{role.label}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </Field>

        {/* Botón de Login */}
        <Field>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Iniciando sesión..." : "Login"}
          </Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>
        
        <Field>
          <Button variant="outline" type="button" disabled={isLoading} className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mr-2">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            Login with GitHub
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline underline-offset-4">
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}