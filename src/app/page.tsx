"use client";

import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import FormSection from '../components/FormSection';
import TableSection from '../components/TableSection';
import { InventoryItem } from '../lib/mockApi';

export default function Home() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  const handleAddListing = (newItem: InventoryItem) => {
    setInventory(prevInventory => [...prevInventory, newItem]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          <FormSection onAddListing={handleAddListing} />
          <TableSection inventory={inventory} setInventory={setInventory} />
        </main>
      </div>
    </div>
  );
}
