//Para el formulario
export interface LoginFormInputs {
    email: string;
    password: string;
}

//Para la respuesta del servicio
export interface LoginResponse {
    data: {
        Usuario:[],
        Access_token: string;
    }; 
    error?: string; 
};

interface ApiError {
    message: string; // Mensaje de error que esperas del servidor
   
  }