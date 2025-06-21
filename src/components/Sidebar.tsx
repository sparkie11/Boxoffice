// src/components/Sidebar.tsx
import Image from 'next/image';
import React from 'react';
import { FaHome, FaPlus, FaList, FaShoppingCart, FaChartLine, FaTicketAlt, FaCog, FaArrowRight, } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden sm:flex w-20 text-white flex-col items-center py-4" style={{backgroundColor:"#130562"}}>
      <div className="mb-8">
        <Image src="/logo-small.svg" height={100} width={100} alt="Logo" className="h-10 w-10" />
      </div>
      <nav className="flex flex-col space-y-6">
        <a href="#" className="p-2 rounded-md hover:bg-gray-700">
          <FaArrowRight size={24} />
        </a>
        <a href="#" className="p-2 rounded-md hover:bg-gray-700">
          <FaHome size={24} />
        </a>
        <a href="#" className="p-2 rounded-md bg-blue-600">
          <FaPlus size={24} />
        </a>
        <a href="#" className="p-2 rounded-md hover:bg-gray-700">
          <FaList size={24} />
        </a>
        <a href="#" className="p-2 rounded-md hover:bg-gray-700">
          <FaShoppingCart size={24} />
        </a>
        <a href="#" className="p-2 rounded-md hover:bg-gray-700">
          <FaChartLine size={24} />
        </a>
        <a href="#" className="p-2 rounded-md hover:bg-gray-700">
          <FaTicketAlt size={24} />
        </a>
        <a href="#" className="p-2 rounded-md hover:bg-gray-700">
          <FaCog size={24} />
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;