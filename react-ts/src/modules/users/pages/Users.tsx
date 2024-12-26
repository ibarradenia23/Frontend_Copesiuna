import { useEffect, useState } from "react";
import Modal from "../../../common/components/Modal";
import Navbar from "../../../common/components/Navbar";
import UserForm from "../components/UserForm";
import UserCard from "../components/UserCard";
import { useObtenerUduarios } from "../hooks/useUser";
import { UserInterface } from "../models";
import NoData from "../../../common/components/NoData";

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {data:userResponse} = useObtenerUduarios();
  const [usuarios,setUsuarios] = useState<UserInterface[]>([]);

  const traerUsuarios =()=>{
    if(userResponse && Array.isArray(userResponse.data)){
      setUsuarios(userResponse.data);
    }
  }

  useEffect(()=>{
   traerUsuarios();
  },[userResponse]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <main className="bg-white border-gray-200 dark:bg-gray-900">
      <Navbar />
      <section className="max-w-screen-xl mx-auto p-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Gestion de usuarios
          </h2>
          <div className="flex items-center space-x-2">
            <button
              className="bg-primary hover:bg-[#016F35] text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
              onClick={handleOpenModal}
            >
              Agregar usuario
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
          {
            !usuarios ? <NoData/> : 
              usuarios?.map((usuario)=>(
                <UserCard users={usuario} key={usuario.id}/>
              ))
            
          }
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Crea un nuevo Usuario"
        >
          <UserForm />
        </Modal>
      </section>
    </main>
  );
};

export default Users;
