import  { useEffect, useState } from 'react'
import Navbar from '../../../common/components/Navbar'
import Modal from '../../../common/components/Modal';
import ProductorForm from '../components/ProductorForm';
import CardProductor from '../components/CardProductor';
import { useObtenerProductores } from '../hooks/useProductor';
import { ParcelaCompletaInterface, ProductorInterface } from '../models';
import { CirclePlus } from 'lucide-react';
import Loading from '../../../common/components/Loading';
import NoData from '../../../common/components/NoData';
import { useObtenerParcelas } from '../hooks/useParcela';

const Productores = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: productoresResponse, isLoading } = useObtenerProductores();
  const [productores,setProductores] = useState<ProductorInterface[]>([])

  //Extraer todas las parcelas
  const { data: serviceResponse } = useObtenerParcelas();
  const parcelasArray: ParcelaCompletaInterface[] = serviceResponse?.data || [];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const traerProductores =()=>{
    if (productoresResponse && Array.isArray(productoresResponse.data)) {
      setProductores(productoresResponse.data); // Asigna directamente el array de productores
    }
  }

  useEffect(() => {
    traerProductores();
  }, [productoresResponse]);
  
  return (
    <main className="bg-white border-gray-200 dark:bg-gray-900">
         <Navbar />
         <section className="max-w-screen-xl mx-auto p-4">
         <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Gestion de productores</h2>
          <div className="flex items-center space-x-2">
            <button className="bg-primary hover:bg-[#016F35] text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none inline-flex items-center gap-2" onClick={handleOpenModal}>
            <CirclePlus /> Agregar productor
            </button>
          </div>
          
        </div>
        <div className="min-h-128 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
          {
            isLoading ?? <Loading/>
          }
          {
            productores && productores.length < 1 ? <NoData/> : productores.map((productor)=>(
              <CardProductor parcelas={parcelasArray} onSave={traerProductores} key={productor.id} productor={productor}/>
            ))
          }
        </div><Modal isOpen={isModalOpen} onClose={handleCloseModal} title='Crea un nuevo Productor'>
            <ProductorForm onSave={traerProductores}/>
          </Modal>
         </section>
    </main>
  )
}

export default Productores