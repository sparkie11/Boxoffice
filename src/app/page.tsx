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

          {/* Add Listing Button */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              form="inventory-form"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Listing
            </button>
          </div>

          {/* Cancel and Publish Live Buttons */}
          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Publish Live
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
