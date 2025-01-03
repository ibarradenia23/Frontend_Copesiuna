"use client";

import React, {useState } from "react";
import { Plus } from "lucide-react";
import Mazorcas from "./Mazorcas";
import Estados from "./Estados";
import Afectaciones from "./Afectaciones";
import Estimacion from "./Estimacion";

export default function CosechasDashboard() {
  const [activeTab, setActiveTab] = useState("mazorcas");


  const handleAdd = (section: string) => {
    console.log(`Agregar nuevo elemento a ${section}`);
    // Implementar lógica de agregar
  };

  const handleEdit = (section: string, id: number) => {
    console.log(`Editar elemento ${id} en ${section}`);
    // Implementar lógica de editar
  };

  const handleDelete = (section: string, id: number) => {
    console.log(`Eliminar elemento ${id} de ${section}`);
    // Implementar lógica de eliminar
  };

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">Dashboard de Cosechas</h1>
      <div className="flex space-x-4 mb-4 border-b border-gray-200 dark:border-gray-700 ">
        <div className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400 gap-4">
           <button
          className={`tab ${activeTab === "estimaciones" ? "text-primary border-b-2 border-primary rounded-t-lg active dark:text-primary dark:border-primary group" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-transparent"} inline-flex items-center justify-center p-4 border-b-2  rounded-t-lggroup gap-2`}
          onClick={() => setActiveTab("estimaciones")} aria-current="page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"  
            height="20"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke={`${activeTab === "estimaciones" ? "#016F35" : "#374151"} `}
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              color={`${activeTab === "estimaciones" ? "#016F35" : "#374151"} `}
            >
              <path d="M17.5 11V7.3c0-2.263 0-3.394-.775-4.097c-.776-.703-2.023-.703-4.52-.703h-4.41c-2.497 0-3.744 0-4.52.703S2.5 5.037 2.5 7.3v6.4c0 2.263 0 3.394.775 4.097c.776.703 2.023.703 4.52.703H11m-5.5-12h9m-9 4h1m3 0h1m3 0h1m-9 4h1m3 0h1" />
              <circle cx="17.5" cy="17.5" r="4" />
              <path d="m18.5 18l-1-.5V16" />
            </g>
          </svg>
          Estimación de Cosecha
        </button>
        <button
          className={`tab ${activeTab === "mazorcas" ? "text-primary border-b-2 border-primary rounded-t-lg active dark:text-primary dark:border-primary group" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-transparent"} inline-flex items-center justify-center p-4 border-b-2 rounded-t-lggroup gap-2`}
          onClick={() => setActiveTab("mazorcas")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill={`${activeTab === "mazorcas" ? "#016F35" : "#374151"} `}
              d="m16.525 4.11l.979.98l2.086-2.085c-.37-.062-.785-.006-1.257.152c-.61.205-1.232.559-1.808.953m4.473.316l-2.08 2.078l.972.972c.394-.575.747-1.194.951-1.802c.158-.469.215-.88.157-1.248m-2.336 4.65l-1.159-1.159L15.93 9.49l1.338 1.338l.989-1.243zm-2.65 3.326l-1.497-1.499l-2.06 2.058c.996-.053 1.994.04 2.902.263zm1.31 1.566a9 9 0 0 1 1.01.614a8 8 0 0 1 .8.64l.05.046l.016.016l.005.005l.002.002h.001l.001.002l1.374 1.374l-1.904.317h-.003l-.011.003a2 2 0 0 0-.146.042a6 6 0 0 0-.725.286c-.678.31-1.742.897-3.192 1.985c-.15.112-.325.25-.523.404c-1.004.786-2.576 2.017-4.257 2.687c-1.029.41-2.196.656-3.381.423c-1.173-.23-2.247-.905-3.154-2.1c-1.194-.906-1.869-1.98-2.1-3.153c-.232-1.186.013-2.352.424-3.381c.67-1.68 1.9-3.254 2.686-4.257c.155-.198.293-.373.405-.523c1.088-1.45 1.674-2.515 1.985-3.192c.155-.338.24-.58.286-.725a2 2 0 0 0 .045-.16l.317-1.904l1.374 1.374l.002.001l.002.002l.005.006l.015.015a4 4 0 0 1 .2.221a9 9 0 0 1 1.091 1.622l4.356-3.443c.825-.66 2.026-1.523 3.32-1.956c1.328-.445 2.933-.48 4.23.825c1.292 1.3 1.255 2.9.81 4.225c-.435 1.291-1.297 2.489-1.956 3.313h-.002l-.002.005l-.957 1.202l-1.688 2.12zm-2.4-8.632l-1.757 1.387l1.35 1.352l1.574-1.572zM13.1 9.489l-1.515-1.517l-.816.646c.227.917.323 1.925.268 2.932zm-3.474 6.298L5.36 20.053c.495.476.99.706 1.463.798c.677.133 1.435.01 2.256-.318c1.382-.55 2.667-1.552 3.685-2.344q.34-.265.635-.49c1.242-.931 2.251-1.542 3.026-1.942a7 7 0 0 0-1.02-.44c-1.822-.61-4.228-.477-5.779.47m-5.68 2.852l4.266-4.266c.95-1.557 1.081-3.975.462-5.8a7 7 0 0 0-.432-1c-.4.776-1.011 1.784-1.943 3.027q-.223.297-.489.635c-.793 1.018-1.793 2.302-2.345 3.685c-.327.82-.45 1.58-.318 2.256c.093.472.323.968.799 1.463"
            />
          </svg>
          Mazorcas
        </button>
        <button
          className={`tab ${activeTab === "estados" ? "text-primary border-b-2 border-primary rounded-t-lg active dark:text-primary dark:border-primary group" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-transparent"} inline-flex items-center justify-center p-4 border-b-2 rounded-t-lggroup gap-2`}
          onClick={() => setActiveTab("estados")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <circle cx="4" cy="4" r="3" fill={`${activeTab === "estados" ? "#016F35" : "#374151"} `}/>
            <path
              fill={`${activeTab === "estados" ? "#016F35" : "#374151"} `}
              d="M4 15a3 3 0 1 1 3-3a3 3 0 0 1-3 3m0-5a2 2 0 1 0 2 2a2 2 0 0 0-2-2m8 13a3 3 0 1 1 3-3a3 3 0 0 1-3 3m0-5a2 2 0 1 0 2 2a2 2 0 0 0-2-2m8-11a3 3 0 1 1 3-3a3 3 0 0 1-3 3m0-5a2 2 0 1 0 2 2a2 2 0 0 0-2-2"
            />
            <circle cx="4" cy="20" r="3" fill={`${activeTab === "estados" ? "#016F35" : "#374151"} `}/>
            <circle cx="12" cy="4" r="3" fill={`${activeTab === "estados" ? "#016F35" : "#374151"} `} />
            <circle cx="12" cy="12" r="3" fill={`${activeTab === "estados" ? "#016F35" : "#374151"} `}/>
            <circle cx="20" cy="12" r="3" fill={`${activeTab === "estados" ? "#016F35" : "#374151"} `}/>
            <circle cx="20" cy="20" r="3" fill={`${activeTab === "estados" ? "#016F35" : "#374151"} `}/>
          </svg>
          Estados de Mazorca
        </button>
        <button
          className={`tab ${activeTab === "afectaciones" ? "text-primary border-b-2 border-primary rounded-t-lg active dark:text-primary dark:border-primary group" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-transparent"} inline-flex items-center justify-center p-4 border-b-2 rounded-t-lggroup gap-2`}
          onClick={() => setActiveTab("afectaciones")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 48 48"
          >
            <g fill={`${activeTab === "afectaciones" ? "#016F35" : "#374151"} `} fill-rule="evenodd" clip-rule="evenodd">
              <path d="M24 42c9.941 0 18-8.059 18-18S33.941 6 24 6S6 14.059 6 24s8.059 18 18 18m0 2c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20" />
              <path d="M13.494 20.044c1.03-.206 2.382-.812 3.727-1.85c1.344-1.04 2.272-2.195 2.73-3.14c.309-.637.324-.97.312-1.1c-.123-.045-.45-.115-1.144.023c-1.03.206-2.381.812-3.726 1.85c-1.345 1.04-2.272 2.195-2.73 3.14c-.31.637-.324.97-.312 1.1c.123.045.449.115 1.143-.023m-2.749 1.265c1.18 1.527 4.627.84 7.699-1.533c3.071-2.374 4.605-5.536 3.425-7.064c-1.18-1.527-4.627-.84-7.699 1.533c-3.072 2.374-4.605 5.537-3.425 7.064M34.436 31.33c-.555-.873-1.594-1.9-3.03-2.768c-1.437-.867-2.83-1.308-3.861-1.393c-.67-.055-.981.04-1.102.097c.006.134.066.453.427 1.02c.555.874 1.594 1.901 3.03 2.769c1.437.867 2.83 1.308 3.861 1.393c.67.055.98-.04 1.102-.097c-.006-.134-.066-.453-.427-1.02m2.168 2.072c.986-1.634-.878-4.568-4.165-6.552c-3.286-1.985-6.75-2.269-7.737-.635s.878 4.567 4.165 6.552s6.75 2.269 7.737.635m-3.966-13.51c.025-1.05-.271-2.503-.992-4.043c-.72-1.54-1.645-2.698-2.468-3.353c-.556-.442-.878-.529-1.008-.546c-.07.11-.21.414-.227 1.124c-.025 1.05.272 2.503.992 4.043s1.645 2.698 2.468 3.353c.556.442.878.529 1.008.546c.07-.11.21-.414.227-1.124m.633 2.961c1.749-.818 1.833-4.333.187-7.852c-1.646-3.518-4.398-5.707-6.147-4.889c-1.75.819-1.833 4.334-.187 7.852s4.398 5.708 6.147 4.89M20.969 34.956c-.005-1.083-.352-2.566-1.136-4.125c-.784-1.558-1.766-2.721-2.633-3.372c-.627-.47-.973-.533-1.097-.54c-.069.104-.225.419-.221 1.203c.005 1.084.352 2.566 1.135 4.125c.784 1.559 1.767 2.722 2.634 3.372c.627.47.973.533 1.096.54c.069-.103.225-.418.221-1.203m.687 3.01c1.764-.888 1.748-4.484-.036-8.033s-4.66-5.707-6.425-4.82s-1.749 4.483.035 8.032s4.661 5.707 6.426 4.82" />
            </g>
          </svg>
          Afectaciones de Mazorca
        </button>
        </div>
       
      </div>
      {activeTab === "mazorcas" && (
        <SectionContent
          title="Mazorcas"
          render={<Mazorcas/>}
          onAdd={() => handleAdd("mazorcas")}
          onEdit={(id) => handleEdit("mazorcas", id)}
          onDelete={(id) => handleDelete("mazorcas", id)}
          columns={["Nombre"]}
        />
      )}
      {activeTab === "estados" && (
        <SectionContent
          title="Estados de Mazorca"
          render={<Estados/>}
          onAdd={() => handleAdd("estados")}
          onEdit={(id) => handleEdit("estados", id)}
          onDelete={(id) => handleDelete("estados", id)}
          columns={["Estado"]}
        />
      )}
      {activeTab === "afectaciones" && (
        <SectionContent
          title="Afectaciones de Mazorca"
          render={<Afectaciones/>}
          onAdd={() => handleAdd("afectaciones")}
          onEdit={(id) => handleEdit("afectaciones", id)}
          onDelete={(id) => handleDelete("afectaciones", id)}
          columns={["Tipo"]}
        />
      )}
      {activeTab === "estimaciones" && (
        <SectionContent
          title="Estimación de Cosecha"
          render={<Estimacion/>}
          onAdd={() => handleAdd("estimaciones")}
          onEdit={(id) => handleEdit("estimaciones", id)}
          onDelete={(id) => handleDelete("estimaciones", id)}
          columns={["Cantidad", "Fecha"]}
        />
      )}
    </div>
  );
}

type SectionContentProps = {
  title: string;
  render: React.ReactNode;
  onAdd: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  columns: string[];
};

function SectionContent({
  title,
  onAdd,
  render
}: SectionContentProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
        <button
          onClick={onAdd}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          <Plus className="inline-block mr-2" /> Agregar
        </button>
      </div>
      
      {render}
      
    </div>
  );
}
