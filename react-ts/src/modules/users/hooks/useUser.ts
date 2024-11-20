import { useMutation,useQuery } from "@tanstack/react-query";
import { ServiceResponse } from "../../../common/types/globals";
import { actualizarUser, crearUser, eliminarUser, obtenerUsers } from "../api/userService";

// Hook para obtener todos los usuarios
export const useObtenerUduarios =()=>{
    return useQuery(['usuarios'],obtenerUsers);
}

// Hook para crear un usuario
export const useCrearUsuario = () => {
    return useMutation({
        mutationFn: (data: { nombre: string; apellido: string; telefono: string; email:string; contraseña:string; }) =>
            crearUser(data.nombre,data.apellido,data.telefono,data.email,data.contraseña),
        onSuccess: (data: ServiceResponse) => {
            console.log('Usuario creado con éxito:', data);
        },
        onError: (error) => {
            console.error('Error al crear usuario:', error);
        }
    });
};

// Hook para actualizar usuarios
export const useActualizarUsuarios = () => {
    return useMutation({
        mutationFn: (data: { id:number; nombre: string; apellido: string; telefono: string; email:string; contraseña:string; }) =>
            actualizarUser(data.id,data.nombre,data.apellido,data.telefono,data.email,data.contraseña),
        onSuccess: (data: ServiceResponse) => {
            console.log('Usuario actualizado con éxito:', data);
        },
        onError: (error) => {
            console.error('Error al actualizar usuario:', error);
        }
    });
};

// Hook para eliminar un usuario
export const useEliminarUsuario = () => {
    return useMutation({
        mutationFn: (id: number) => eliminarUser(id),
        onSuccess: (data: ServiceResponse) => {
            console.log('Usuario eliminado con éxito:', data);
        },
        onError: (error) => {
            console.error('Error al eliminar usuario:', error);
        }
    });
};