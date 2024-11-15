import { Fingerprint, MapPinHouse } from "lucide-react";
import ImagenTemporal from "../../../../public/profile.jpg";
import Accordion from "../../../common/components/Acordion";

const CardProductor = () => {
  return (
    <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="pb-2">
        <div className="flex items-center space-x-4">
          <img
            src={ImagenTemporal}
            alt={"Mariana Melendez"}
            className="w-16 h-16 rounded-full border-2 border-primary"
          />
          <div>
            <h3 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Mariana Melendez
            </h3>
            <p className="font-normal text-gray-500 dark:text-gray-400">
              ID: 1
            </p>
          </div>
        </div>
        <div className="">
          <div className="flex items-center mb-2 text-sm text-gray-600 mt-2">
            <MapPinHouse className="mr-2 h-4 w-4" />
            <span>Marco antonio somarriba</span>
          </div>
          <div className="flex items-center mb-4 text-sm text-gray-600">
            <Fingerprint className="mr-2 h-4 w-4" />
            <span>611-120306-1015G</span>
          </div>
        </div>
        
        <div className="border-t dark:border-gray-600">
         <Accordion title="Parcelas y cultivos">
           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas impedit nesciunt sequi, tempora illo eos repellat deleniti quae ipsum quidem nam sunt veritatis consectetur deserunt nisi vero nemo, asperiores exercitationem.</p>
         </Accordion>
        </div>
      </div>
    </div>
  );
};

export default CardProductor;
