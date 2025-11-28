/**
 * @abstract Config file
 * @description Este archivo contiene la configuracion de la aplicacion.
 * para esto, se ha creado un objeto config que contiene la url de la api y los endpoints.
 **/

export const config = {
  apiUrl:"http://127.0.0.1:8000",
  environment:"development",
  endpoints: {
    auth:{
      login: "/api/auth/login",
      register: "/api/auth/register"
    },
    prediction:{
      classify: "/api/classify-image",
      report: "/api/generate-report"
    },
    medicalHistory:{
      getByDNI: "/api/medical-histories/showByDni",
    },
    diagnosis: {
      getByPatientId: "/api/diagnoses/patient/:patientId",
    }
  },
};