import { Pencil, Scan, Sprout, Trash2 } from "lucide-react";

const CultivoItem = () => {
  return (
    <div className="bg-green-50 p-2 rounded-md shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700 ">
      <div className="header-card flex justify-between">
        <h4>Forastero</h4>
        <div className="btones">
          <button className="mr-2">
            <Pencil className="h-4 w-4" />
          </button>
          <button>
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="py-2">
        <div className="text-xs text-gray-500 grid grid-cols-2 gap-1">
          <div className="flex items-center">
            <Sprout className="mr-1 h-3 w-3" />
            <span>Edad: 3 años</span>
          </div>
          <div className="flex items-center">
            <Scan className="mr-1 h-3 w-3" />
            <span>Área: 30 ha</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CultivoItem;
