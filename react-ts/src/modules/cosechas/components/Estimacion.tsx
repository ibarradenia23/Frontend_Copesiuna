import { Cloud, CloudRain, Edit2, Eye, FileSpreadsheet, Sun, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

type WeatherCard = {
  id: number
  weather: "soleado" | "nublado" | "lluvioso"
  creationDate: string
  parcel: string
  producer: string
}


const Estimacion = () => {
  const weatherIcons = {
    soleado: Sun,
    nublado: Cloud,
    lluvioso: CloudRain,
  }

  const [cards, setCards] = useState<WeatherCard[]>([
    { id: 1, weather: "soleado", creationDate: "2023-05-01", parcel: "Parcela A", producer: "Juan Pérez" },
    { id: 2, weather: "nublado", creationDate: "2023-05-02", parcel: "Parcela B", producer: "María García" },
    { id: 3, weather: "lluvioso", creationDate: "2023-05-03", parcel: "Parcela C", producer: "Carlos Rodríguez" },
  ])

  const handleDelete = (id: number) => {
    setCards(cards.filter(card => card.id !== id))
  }

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
      {cards.map((card) => {
        const WeatherIcon = weatherIcons[card.weather]
        return(
           <div key={card.id} className="overflow-hidden transition-all duration-300 hover:shadow-xl bg-white dark:bg-[#111827] border-t-4 border-primary rounded-lg border">
  <div className="flex flex-row items-center justify-between dark:bg-gray-800  bg-gray-50 p-4">
    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Ficha de estimacion</h3>
    <WeatherIcon className="h-8 w-8 text-primary" />
  </div>
  <div className="p-4">
    <div className="space-y-2">
      <p className="text-sm text-gray-500">
        <span className="font-medium text-gray-700 dark:text-gray-300">Fecha de Creación:</span> {card.creationDate}
      </p>
      <p className="text-sm text-gray-500 ">
        <span className="font-medium text-gray-700 dark:text-gray-300">Parcela:</span> {card.parcel}
      </p>
      <p className="text-sm text-gray-500">
        <span className="font-medium text-gray-700 dark:text-gray-300">Productor:</span> {card.producer}
      </p>
    </div>
    <span className="inline-block mt-3 bg-gray-200 dark:bg-gray-800 dark:text-gray-400 text-gray-600 text-xs font-medium px-2 py-1 rounded">
      {card.weather.charAt(0).toUpperCase() + card.weather.slice(1)}
    </span>
  </div>
  <div className="flex flex-wrap justify-between dark:bg-gray-800  bg-gray-50 p-4 gap-2">
    <button className="text-blue-500 hover:text-blue-700 border dark:border-gray-600 rounded px-3 py-2 text-sm flex items-center flex-grow basis-[calc(50%-0.25rem)] sm:basis-[calc(25%-0.375rem)]">
      <Eye className="h-4 w-4 mr-2" />
      Examinar
    </button>
    <button className="text-green-500 hover:text-green-700 border dark:border-gray-600 rounded px-3 py-2 text-sm flex items-center flex-grow basis-[calc(50%-0.25rem)] sm:basis-[calc(25%-0.375rem)]">
      <FileSpreadsheet className="h-4 w-4 mr-2" />
      Excel
    </button>
    <button
      className="text-red-500 hover:text-red-700 border dark:border-gray-600 rounded px-3 py-2 text-sm flex items-center flex-grow basis-[calc(50%-0.25rem)] sm:basis-[calc(25%-0.375rem)]"
      onClick={() => handleDelete(card.id)}
    >
      <Trash2 className="h-4 w-4 mr-2" />
      Eliminar
    </button>
    <button className="text-yellow-500 hover:text-yellow-700 border dark:border-gray-600 rounded px-3 py-2 text-sm flex items-center flex-grow basis-[calc(50%-0.25rem)] sm:basis-[calc(25%-0.375rem)] justify-center">
      <Edit2 className="h-4 w-4 mr-2" />
      Editar
    </button>
  </div>
</div>
        )
      })}
     

    </div>
  )
}

export default Estimacion