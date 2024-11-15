// Accordion.tsx
import { Tractor } from 'lucide-react';
import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" rounded-lg mb-4 ">
      <div
        className="flex justify-between items-center p-4 cursor-pointer rounded-lg"
        onClick={toggleAccordion}
      >
        <h2 className="flex text-lg font-medium align-middle text-gray-900 dark:text-white"> <Tractor className="mr-2 h-5 w-5" />{title}</h2>
        <span className={`transform transition-transform ${isOpen ? 'rotate-90' : ''}`}>
          <svg
          
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
      {isOpen && <div className="p-4 border-t dark:border-gray-600">{children}</div>}
    </div>
  );
};

export default Accordion;