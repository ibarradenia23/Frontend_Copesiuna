//Para el formulario
export interface LoginFormInputs {
    email: string;
    password: string;
}

//Para la respuesta del servicio
export interface LoginResponse {
    token?: string; 
    error?: string; 
  };