// Accordion.tsx

import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children,icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" rounded-lg">
      <div
        className="flex justify-between items-center py-4 cursor-pointer rounded-lg"
        onClick={toggleAccordion}
      >
        <h2 className="flex text-lg align-middle text-gray-900 dark:text-white items-center hover:underline gap-2"> {icon} {title}</h2>
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
      {isOpen && <div className="pt-4 border-t dark:border-gray-600 flex flex-col gap-4">{children}</div>}
    </div>
  );
};

export default Accordion;