
import { useState } from 'react';
import Modal from '../../../common/components/Modal'
import Navbar from '../../../common/components/Navbar'
import UserForm from '../components/UserForm';

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Gestion de usuarios</h2>
          <div className="flex items-center space-x-2">
            <button className="bg-primary hover:bg-[#016F35] text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none" onClick={handleOpenModal}>
              Agregar usuario
            </button>
          </div>
          
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title='Crea un nuevo Usuario'>
            <UserForm/>
          </Modal>
         </section>
    </main>
  )
}

export default Users