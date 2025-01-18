import React from 'react'

const Help = () => {
  return (
     
     <div className="p-4">
     <p className="text-gray-900 dark:text-white mb-4">
       Aquí encontrarás información útil sobre cómo usar nuestra aplicación.
     </p>
     <h3 className="font-medium text-gray-900 dark:text-white">Funciones principales:</h3>
     <ul className="list-disc pl-5 space-y-2 text-gray-600 mt-2">
                <li className='text-gray-500 dark:text-gray-400'>Gestión de usuarios: Administra los datos y permisos de los usuarios.</li>
                <li className='text-gray-500 dark:text-gray-400'>Gestión de productores: Registra y organiza la información de los productores.</li>
                <li className='text-gray-500 dark:text-gray-400'>Revisión de bitácoras de cosecha: Consulta y supervisa los registros de cosecha.</li>
                <li className='text-gray-500 dark:text-gray-400'>Revisión de bitácoras de análisis de suelo: Accede y analiza los reportes de suelos.</li>
              </ul>
     <p className="text-gray-500 dark:text-gray-400 mt-4">
       Si necesitas más ayuda, no dudes en contactar a nuestro equipo de desarrollo atravez de 
       <a
         href="mailto:support@example.com"
         className="text-blue-500 hover:underline ml-2"
       >
          support@example.com
       </a>
       .
     </p>
   </div>

  )
}

export default Help