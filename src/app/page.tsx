"use client";

import { useState, useEffect } from 'react';
import { deleteInventoryItem, updateInventoryItem } from '../lib/mockApi';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import FormSection from '../components/FormSection';
import TableSection from '../components/TableSection';
import { InventoryItem } from '../lib/mockApi';

export default function Home() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [clonedItemIds, setClonedItemIds] = useState<string[]>([]);

  const handleCheckboxChange = (id: string) => {
    setSelectedItems(prevSelected =>
      prevSelected.includes(id) ? prevSelected.filter(item => item !== id) : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === inventory.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(inventory.map(item => item.id));
    }
  };

  const handleDelete = async (id?: string) => {
    if (id) {
      await deleteInventoryItem(id);
      setInventory(prevInventory => prevInventory.filter(item => item.id !== id));
    } else if (selectedItems.length > 0) {
      for (const selectedId of selectedItems) {
        await deleteInventoryItem(selectedId);
      }
      setInventory(prevInventory => prevInventory.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
    }
  };

  const handleClone = (itemToClone: InventoryItem) => {
    const clonedItem = { ...itemToClone, id: String(inventory.length + 1) }; // Simple ID generation
    setInventory(prevInventory => [...prevInventory, clonedItem]);
    setClonedItemIds(prev => [...prev, itemToClone.id]);
  };

  const handleEdit = (itemToEdit: InventoryItem) => {
    // In a real application, this would open a modal or navigate to an edit page
    // For now, let's simulate an edit by changing a value directly for demonstration
    const updatedItem = { ...itemToEdit, quantity: itemToEdit.quantity + 1 };
    updateInventoryItem(updatedItem).then(() => {
      setInventory(prevInventory =>
        prevInventory.map(item => (item.id === updatedItem.id ? updatedItem : item))
      );
    });
  };

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
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              form="inventory-form"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Listing
            </button>
          </div>
          <TableSection
            inventory={inventory}
            setInventory={setInventory}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            clonedItemIds={clonedItemIds}
            setClonedItemIds={setClonedItemIds}
            handleCheckboxChange={handleCheckboxChange}
            handleSelectAll={handleSelectAll}
            handleDelete={handleDelete}
            handleClone={handleClone}
            handleEdit={handleEdit}
          />

          {/* Add Listing Button */}
          {/* <div className="flex justify-end mt-4">
            <button
              type="submit"
              form="inventory-form"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Listing
            </button>
          </div> */}


          <div className="flex space-x-4 absolute bottom-0 left-20 w-[calc(100%-5rem)] bg-white border-t z-40 border-gray-200 p-4 box-border">
            <button onClick={handleSelectAll} className="flex items-center space-x-2 px-3 py-1 rounded-md border border-gray-300 bg-white text-blue-600 hover:bg-gray-50">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                checked={selectedItems.length === inventory.length && inventory.length > 0}
                onChange={handleSelectAll}
              />
              <span className="text-gray-700">Select all</span>
            </button>
            <button onClick={() => setSelectedItems([])} className="flex items-center space-x-2 px-3 py-1 rounded-md border border-gray-300 bg-white text-blue-600 hover:bg-gray-50">
              <svg fill="none" strokeWidth="2" xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-deselect" width="1em" height="1em" viewBox="0 0 24 24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" style={{overflow: "visible", color: "currentcolor"}}><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 8h3a1 1 0 0 1 1 1v3"></path><path d="M16 16h-7a1 1 0 0 1 -1 -1v-7"></path><path d="M12 20v.01"></path><path d="M16 20v.01"></path><path d="M8 20v.01"></path><path d="M4 20v.01"></path><path d="M4 16v.01"></path><path d="M4 12v.01"></path><path d="M4 8v.01"></path><path d="M8 4v.01"></path><path d="M12 4v.01"></path><path d="M16 4v.01"></path><path d="M20 4v.01"></path><path d="M20 8v.01"></path><path d="M20 12v.01"></path><path d="M20 16v.01"></path><path d="M3 3l18 18"></path></svg>
              <span className="text-gray-700">Deselect all</span>
            </button>
            <button onClick={() => selectedItems.forEach(id => handleClone(inventory.find(item => item.id === id)!))} className="flex items-center space-x-2 px-3 py-1 rounded-md border border-gray-300 bg-white text-blue-600 hover:bg-gray-50">
              <svg fill="none" strokeWidth="2" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" height="1em" width="1em" style={{overflow: "visible", color: "currentcolor"}}><rect width="13" height="13" x="9" y="9" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span className="text-gray-700">Clone</span>
            </button>
            <button onClick={() => selectedItems.forEach(id => handleEdit(inventory.find(item => item.id === id)!))} className="flex items-center space-x-2 px-3 py-1 rounded-md border border-gray-300 bg-white text-blue-600 hover:bg-gray-50">
              <svg fill="currentColor" strokeWidth="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="1em" width="1em" style={{overflow: "visible", color: "currentcolor"}}><path d="M13.23 1h-1.46L3.52 9.25l-.16.22L1 13.59 2.41 15l4.12-2.36.22-.16L15 4.23V2.77L13.23 1zM2.41 13.59l1.51-3 1.45 1.45-2.96 1.55zm3.83-2.06L4.47 9.76l8-8 1.77 1.77-8 8z"></path></svg>
              <span className="text-gray-700">Edit</span>
            </button>
            <button onClick={() => handleDelete()} className="flex items-center space-x-2 px-3 py-1 rounded-md border border-gray-300 bg-white text-red-600 hover:bg-gray-50">
              <svg fill="currentColor" strokeWidth="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="1em" width="1em" style={{overflow: "visible", color: "currentcolor"}}><path d="m170.5 51.6-19 28.4h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6h-93.7c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6 36.7 55H424c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8v304c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128h-8c-13.3 0-24-10.7-24-24s10.7-24 24-24h69.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128v304c0 17.7 14.3 32 32 32h224c17.7 0 32-14.3 32-32V128H80zm80 64v208c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0v208c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0v208c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"></path></svg>
              <span className="text-gray-700">Delete</span>
            </button>
            <div className="flex-grow "></div>
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
