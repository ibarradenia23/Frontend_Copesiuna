import React from 'react'
import Navbar from '../../../common/components/Navbar'

const Cultivos_Parcelas = () => {
  return (
    <main className="bg-white border-gray-200 dark:bg-gray-900">
         <Navbar />
         <section className="max-w-screen-xl mx-auto p-4">
         <div className="flex items-center justify-between space-y-2">
         <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Gestion de tipos de cultivo y parcelas
          </h2>
         </div>
         </section>
    </main>
  )
}

export default Cultivos_Parcelas