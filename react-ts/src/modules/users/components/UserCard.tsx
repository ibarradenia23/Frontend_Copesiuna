import { MailCheck, Pencil, Phone, Trash2 } from "lucide-react";
import React from "react";

const UserCard = () => {
  return (
    <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <h3 className=" text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Mariana Melendez
          </h3>
        </div>
        <div className="">
        <div className="flex items-center mb-2 text-md text-gray-700 dark:text-gray-400 mt-2">
            <MailCheck className="mr-2 h-4 w-4" />
            <span>juan@gmail.com</span>
          </div>
        <div className="flex items-center mb-2 text-md text-gray-700 dark:text-gray-400 mt-2">
            <Phone className="mr-2 h-4 w-4" />
            <span>8467-3458</span>
          </div>
        </div>
        <div className="flex justify-end gap-4 pt-6">
        <button className="inline-flex text-white items-center bg-warning hover:bg-[#8C541D] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-warning dark:hover:bg-[#8C541D] dark:focus:ring-warning" 
        >

          {" "}
          <Pencil className="h-4 w-4 mr-2" />
          Editar
        </button>
        <button  className="inline-flex text-white items-center bg-error hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-error dark:hover:bg-red-900 dark:focus:ring-error">
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
