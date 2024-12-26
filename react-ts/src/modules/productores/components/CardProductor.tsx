import { Fingerprint, MapPinHouse, Pencil, Tractor, Trash2 } from "lucide-react";
import ImagenTemporal from "../../../../public/profile.jpg";
import Accordion from "../../../common/components/Acordion";
import CardParcela from "./CardParcela";
import React, { useEffect, useState } from "react";
import Modal from "../../../common/components/Modal";
import ParcelaForm from "./ParcelaForm";
import ProductorForm from "./ProductorForm";
import { useEliminarProductor } from "../hooks/useProductor";
import Toast from "../../../common/components/Toast";
import { ParcelaCompletaInterface, ProductorInterface } from "../models";

interface ProductorProps {
  productor:ProductorInterface,
  onSave:()=>void;
  parcelas:ParcelaCompletaInterface[]
}

const CardProductor:React.FC<ProductorProps> = ({productor,onSave,parcelas}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalProductorOpen, setIsModalProductorOpen] = useState(false);
  const [productorSelect,setProductorSelect] = useState({
    id:0,
    nombre: '',
    apellido:'',
    direccion: '',
    cedula: ''
  })
  const parcelasDelProductor = Array.isArray(parcelas) ? parcelas.filter((parcela) => {
    return parcela.productor && parcela.productor.id === productor.id; // Asegúrate de que productor no sea undefined
  }) : [];
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenProductorModal = (id:number,nombre:string,apellido:string,direccion:string,cedula:string) => {
    setProductorSelect({id,nombre,apellido,direccion,cedula});
    setIsModalProductorOpen(true);
  };

  const handleCloseProductorModal = () => {
    setIsModalProductorOpen(false);
  };

  const [toast, setToast] = useState<{
    type: "success" | "error" | "warning";
    message: string;
    visible: boolean;
  }>({
    type: "success", // Valor por defecto
    message: "",
    visible: false,
  });

  const { mutate: eliminarProductor, isError, isSuccess, error } = useEliminarProductor();

  const handleEliminar = (id: number) => {
      if (window.confirm("¿Estás seguro de que deseas eliminar este productor?")) {
          eliminarProductor(id);
          onSave()
      }
  };

  useEffect(()=>{
   if(isSuccess){
    setToast({
      type: "warning",
        message: "Productor se ha eliminado exitosamente.",
        visible: true,
    })
   } 
   if(isError){
    setToast({
      type: "error",
        message: "Error al eliminar productor",
        visible: true,
    })
   }
  },[isSuccess,isError,error]);

  const closeToast = () => {
    setToast({ ...toast, visible: false });
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
     {toast.visible && <Toast type={toast.type} message={toast.message} onClose={closeToast}/>}
      <div className="pb-2">
        <div className="flex items-center space-x-4">
          <img
            src={ImagenTemporal}
            alt={"Mariana Melendez"}
            className="w-16 h-16 rounded-full border-2 border-primary"
          />
          <div>
            <h3 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {productor.nombre} {productor.apellido}
            </h3>
            <p className="font-normal text-gray-900 dark:text-white">
              ID: {productor.id}
            </p>
          </div>
        </div>
        <div className="">
          <div className="flex items-center mb-2 text-md text-gray-700 dark:text-gray-400 mt-2">
            <MapPinHouse className="mr-2 h-4 w-4" />
            <span>{productor.direccion}</span>
          </div>
          <div className="flex items-center mb-4 text-md text-gray-700 dark:text-gray-400 ">
            <Fingerprint className="mr-2 h-4 w-4" />
            <span>{productor.cedula}</span>
          </div>
        </div>

        <div className="border-t dark:border-gray-600">
          <Accordion icon={<Tractor/>} title="Parcelas y cultivos">
            {
              parcelasDelProductor.map((parcelas)=>(
                <CardParcela parcela={parcelas} key={parcelas.id}/>
              ))
            }
            
            <button className="text-white inline-flex items-center bg-primary hover:bg-[#016F35] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-[#016F35] dark:focus:ring-primary w-full justify-center mt-4" onClick={handleOpenModal}>
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
          Agregar parcela
        </button>
          </Accordion>
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title='Crea una nueva parcela'>
            <ParcelaForm idProductor={productor.id ?? 0}/>
          </Modal>
        <Modal isOpen={isModalProductorOpen} onClose={handleCloseProductorModal} title='Actualiza este productor'>
            <ProductorForm onSave={onSave}  productor={productorSelect}/>
          </Modal>
      </div>
      <div className="border-t dark:border-gray-600 flex justify-end gap-4 pt-6">
        <button className="inline-flex text-white items-center bg-warning hover:bg-[#8C541D] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-warning dark:hover:bg-[#8C541D] dark:focus:ring-warning" 
        onClick={()=>handleOpenProductorModal(productor.id ?? 0,productor.nombre,productor.apellido,productor.direccion,productor.cedula)}>

          {" "}
          <Pencil className="h-4 w-4 mr-2" />
          Editar
        </button>
        <button onClick={()=>handleEliminar(productor.id ?? 0)} className="inline-flex text-white items-center bg-error hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-error dark:hover:bg-red-900 dark:focus:ring-error">
          {" "}
          <Trash2 className="h-4 w-4 mr-2" />
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CardProductor;
