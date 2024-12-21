import { MailCheck, Pencil, Phone, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Toast from "../../../common/components/Toast";
import Modal from "../../../common/components/Modal";
import UserForm from "./UserForm";
import { useEliminarUsuario } from "../hooks/useUser";
import { UserInterface } from "../models";

interface Props {
  users: UserInterface
}

const UserCard:React.FC<Props> = ({users}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userEdit,setUserEdit] = useState({
      id:0,
      nombre: '',
      apellido: '',
      telefono:'',
      email:'',
      password:''
    })
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

      const handleEditar =(id:number,nombre:string,apellido:string,telefono:string,email:string,password:string)=>{
        handleOpenModal();
        setUserEdit({id,nombre,apellido,telefono,email,password})
      }

      const { mutate: eliminarUsuario, isError, isSuccess, error } = useEliminarUsuario();

      useEffect(()=>{
        if(isSuccess){
         setToast({
           type: "warning",
             message: "Usuario se ha eliminado exitosamente.",
             visible: true,
         })
        } 
        if(isError){
         setToast({
           type: "error",
             message: "Error al eliminar usuario",
             visible: true,
         })
        }
       },[isSuccess,isError,error]);

      const handleEliminar = (id: number) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            eliminarUsuario(id);
        }
    };



  return (
    <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {toast.visible && <Toast type={toast.type} message={toast.message} onClose={closeToast}/>}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title='Actualiza este usuario'>
            <UserForm user={userEdit}/>
          </Modal>
      <div className="pb-2">
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
        <div className="">
        <div className="flex items-center mb-2 text-md text-gray-700 dark:text-gray-400 mt-2">
            <MailCheck className="mr-2 h-4 w-4" />
            <span>{users.email} {users.apellido}</span>
          </div>
        <div className="flex items-center mb-2 text-md text-gray-700 dark:text-gray-400 mt-2">
            <Phone className="mr-2 h-4 w-4" />
            <span>{users.telefono}</span>
          </div>
        </div>
        <div className="flex justify-end gap-4 pt-6">
        <button className="inline-flex text-white items-center bg-warning hover:bg-[#8C541D] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-warning dark:hover:bg-[#8C541D] dark:focus:ring-warning" onClick={()=>handleEditar(users.id ?? 0,users.nombre,users.apellido,users.telefono,users.email,users.password)}
        >

          {" "}
          <Pencil className="h-4 w-4 mr-2" />
          Editar
        </button>
        <button onClick={()=>handleEliminar(1)} className="inline-flex text-white items-center bg-error hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-error dark:hover:bg-red-900 dark:focus:ring-error">
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
