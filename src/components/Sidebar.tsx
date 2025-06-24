// src/components/Sidebar.tsx
import Image from 'next/image';
import React from 'react';
import { usePathname } from 'next/navigation';
import { navItems, logoutItem } from '../lib/constants';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  return (
    <aside className="hidden sm:flex w-16 text-white flex-col items-center py-4 bg-custom-dark-blue" style={{backgroundColor:"#130562"}}>
      <div className="pb-4 mb-4 w-full border-b border-gray-400 flex justify-center">
        <Image src="/logo-small.svg" height={100} width={100} alt="Logo" className="h-10 w-10" />
      </div>
      <nav className="flex flex-col space-y-6 flex-grow">
        {navItems.map((item, index) => (
          <a key={index} href={item.href} className={`p-2 rounded-md ${pathname === item.href ? 'bg-[#00A3EE]' : 'hover:bg-[#33beff]'} ${item.text === 'Add Inventory' ? 'bg-custom-blue' : ''}`}>
            <item.icon size={24} /> 
          </a>
        ))}
      </nav>
      <div>
        <a href={logoutItem.href} className="p-2 rounded-md hover:bg-gray-700">
          <logoutItem.icon size={24} />
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;