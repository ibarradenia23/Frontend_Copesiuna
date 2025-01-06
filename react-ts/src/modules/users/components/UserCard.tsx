import { MailCheck, Pencil, Phone, Pin, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Toast from "../../../common/components/Toast";
import Modal from "../../../common/components/Modal";
import UserForm from "./UserForm";
import { useEliminarUsuario } from "../hooks/useUser";
import { Asignacion, UserInterface } from "../models";
import Accordion from "../../../common/components/Acordion";
import AsignacionCard from "./AsignacionCard";
import AsignacionForm from "./AsignacionForm";

interface Props {
  users: UserInterface;
  asignaciones: Asignacion[];
}

const UserCard: React.FC<Props> = ({ users, asignaciones }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAOpen, setIsModalAOpen] = useState(false);
  const [userEdit, setUserEdit] = useState({
    id: 0,
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    role: "",
    password: "",
  });
  const [toast, setToast] = useState<{
    type: "success" | "error" | "warning";
    message: string;
    visible: boolean;
  }>({
    type: "success", // Valor por defecto
    message: "",
    visible: false,
  });

  const closeToast = () => {
    setToast({ ...toast, visible: false });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenModalAsignacion = () => {
    setIsModalAOpen(true);
  };

  const handleCloseModalAsignacion = () => {
    setIsModalAOpen(false);
  };

  const handleEditar = (
    id: number,
    nombre: string,
    apellido: string,
    telefono: string,
    email: string,
    role: string,
    password: string
  ) => {
    handleOpenModal();
    setUserEdit({ id, nombre, apellido, telefono, email, role, password });
  };

  const {
    mutate: eliminarUsuario,
    isError,
    isSuccess,
    error,
  } = useEliminarUsuario();

  const asignacionesUser = Array.isArray(asignaciones)
    ? asignaciones.filter((asignacion) => {
      if(asignacion.tecnico){
        return Number(asignacion.tecnico.id) === Number(users.id);
      }
      
      })
    : [];


  useEffect(() => {
    if (isSuccess) {
      setToast({
        type: "warning",
        message: "Usuario se ha eliminado exitosamente.",
        visible: true,
      });
    }
    if (isError) {
      setToast({
        type: "error",
        message: "Error al eliminar usuario",
        visible: true,
      });
    }
  }, [isSuccess, isError, error]);

  const handleEliminar = (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      eliminarUsuario(id);
    }
  };

     useEffect(() => {
        if (toast.visible) {
          const timer = setTimeout(() => {
            closeToast();
          }, 3000); // Duración del toast en milisegundos (3 segundos)
    
          return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
        }
      }, [toast.visible]);

  return (
    <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {toast.visible && (
        <Toast type={toast.type} message={toast.message} onClose={closeToast} />
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Actualiza este usuario"
      >
        <UserForm user={userEdit} />
      </Modal>
      <Modal
        isOpen={isModalAOpen}
        onClose={handleCloseModalAsignacion}
        title={`Agrega una asignacion a ${users.nombre}`}
      >
        <AsignacionForm idUsuario={users.id} />
      </Modal>
      <div className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4 align-middle items-center ">
            <div className="relative w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <svg
                className="absolute w-14 h-14 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <h3 className=" text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {users.nombre}
            </h3>
          </div>
          <div>
            {users.role === "ADMIN" ? (
              <span className="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                Administrador
              </span>
            ) : (
              <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                Tecnico
              </span>
            )}
          </div>
        </div>

        <div className="">
          <div className="flex items-center mb-2 text-md text-gray-700 dark:text-gray-400 mt-2">
            <MailCheck className="mr-2 h-4 w-4" />
            <span>{users.email} </span>
          </div>
          <div className="flex items-center mb-2 text-md text-gray-700 dark:text-gray-400 mt-2">
            <Phone className="mr-2 h-4 w-4" />
            <span>{users.telefono}</span>
          </div>
        </div>
        <div className="border-t dark:border-gray-600">
          <Accordion icon={<Pin/>} title="Asignaciones">
            {asignacionesUser.map((asignacion) => (
              <AsignacionCard asignacion={asignacion} key={asignacion.id} />
            ))}
            <button
              className="text-white inline-flex items-center bg-primary hover:bg-[#016F35] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-[#016F35] dark:focus:ring-primary w-full justify-center mt-4"
              onClick={handleOpenModalAsignacion}
            >
              {" "}
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>{" "}
              Agregar Asignacion
            </button>
          </Accordion>
        </div>
        <div className="flex justify-end gap-4 pt-6">
          <button
            className="inline-flex text-white items-center bg-warning hover:bg-[#8C541D] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-warning dark:hover:bg-[#8C541D] dark:focus:ring-warning"
            onClick={() =>
              handleEditar(
                users.id ?? 0,
                users.nombre,
                users.apellido,
                users.telefono,
                users.email,
                users.role,
                users.password
              )
            }
          >
            {" "}
            <Pencil className="h-4 w-4 mr-2" />
            Editar
          </button>
          <button
            onClick={() => handleEliminar(users.id ?? 0)}
            className="inline-flex text-white items-center bg-error hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-error dark:hover:bg-red-900 dark:focus:ring-error"
          >
            {" "}
            <Trash2 className="h-4 w-4 mr-2" />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
