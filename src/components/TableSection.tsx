// src/components/TableSection.tsx
import React, { useState, useEffect } from 'react';
import { getInventoryItems, InventoryItem, deleteInventoryItem, updateInventoryItem } from '../lib/mockApi';

interface TableSectionProps {
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
}

const TableSection: React.FC<TableSectionProps> = ({ inventory, setInventory }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const items = await getInventoryItems();
      setInventory(items);
    };
    fetchInventory();
  }, [setInventory]);

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

  return (
    <section className="bg-white mt-3  rounded-lg shadow-md">
      <div className="flex justify-between items-center p-2 text-white " style={{backgroundColor:'#130562'}}>
        <h2 className="text-lg font-semibold">Chelsea vs Arsenal - Premier League</h2>
        <div className="flex items-center space-x-2">
          <span>Sun, 10 Nov 2024</span>
          <span>16:30</span>
          <span>Stamford Bridge, London, United Kingdom</span>
          <button className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-md">
  <table className="min-w-[2400px] table-fixed divide-y divide-gray-200">
    <thead>
      <tr>
        {/* ✅ Sticky checkbox header */}
        <th className="w-12 px-4 py-2 sticky left-0 top-0 bg-gray-50 z-20">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            checked={selectedItems.length === inventory.length && inventory.length > 0}
            onChange={handleSelectAll}
          />
        </th>

        {/* ❌ Scrollable headers */}
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ticket Type</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Split Type</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Max Displ.</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Section/Block</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Row</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">First Seat</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Face Value</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Payout Price</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Seating</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Last Seat</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date to Ship</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tickets in Hand</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Match Event</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fan Area</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Benefits</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Restrictions</th>

        {/* ✅ Sticky actions header */}
        <th className="w-32 px-4 py-2 sticky right-0 top-0 bg-gray-50 z-20 text-xs font-medium text-gray-500 uppercase">
          Actions
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {inventory.map((item) => (
        <tr key={item.id}>
          {/* ✅ Sticky checkbox column */}
          <td className="w-12 px-4 py-2 sticky left-0 bg-white z-10">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              checked={selectedItems.includes(item.id)}
              onChange={() => handleCheckboxChange(item.id)}
            />
          </td>

          {/* ❌ Scrollable content */}
          <td className="px-4 py-2 text-sm text-gray-900">{item.ticketType}</td>
          <td className="px-4 py-2 text-sm text-gray-900">{item.quantity}</td>
          <td className="px-4 py-2 text-sm text-gray-900">{item.splitType}</td>
          <td className="px-4 py-2 text-sm text-gray-900">{item.maxDisplayQuantity}</td>
          <td className="px-4 py-2 text-sm text-gray-900">{item.category}</td>
          <td className="px-4 py-2 text-sm text-gray-900">{item.sectionBlock}</td>
          <td className="px-4 py-2 text-sm text-gray-900">{item.row}</td>
          <td className="px-4 py-2 text-sm text-gray-900">{item.firstSeat}</td>
          <td className="px-4 py-2 text-sm text-gray-900">£ {item.faceValue.toFixed(2)}</td>
          <td className="px-4 py-2 text-sm text-gray-900">£ {item.payoutPrice.toFixed(2)}</td>
          <td className="px-4 py-2 text-sm text-gray-900">{item.seatingArrangement}</td>
          <td className="px-4 py-2 text-sm text-gray-900">{item.lastSeat}</td>
          <td className="px-4 py-2 text-sm text-gray-900">{item.dateToShip}</td>
          <td className="px-4 py-2 text-sm text-gray-900">{item.ticketsInHand ? 'Yes' : 'No'}</td>
          <td className="px-4 py-2 text-sm text-gray-900">{item.matchEvent}</td>
          <td className="px-4 py-2 text-sm text-gray-900">{item.fanArea}</td>
          <td className="px-4 py-2 text-sm text-gray-900">{item.notes}</td>
          <td className="px-4 py-2 text-sm text-gray-900">{item.benefits}</td>
          <td className="px-4 py-2 text-sm text-gray-900">{item.restrictions}</td>

          {/* ✅ Sticky actions column */}
          <td className="w-32 px-4 py-2 sticky right-0 bg-white z-10 text-sm">
            <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
            <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">Delete</button>
            <button onClick={() => handleClone(item)} className="text-green-600 hover:text-green-900 ml-2">Clone</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4">
          <button onClick={handleSelectAll} className="text-blue-600 hover:text-blue-900">Select all</button>
          <button onClick={() => setSelectedItems([])} className="text-blue-600 hover:text-blue-900">Deselect all</button>
          <button onClick={() => selectedItems.forEach(id => handleClone(inventory.find(item => item.id === id)!))} className="text-blue-600 hover:text-blue-900">Clone</button>
          <button onClick={() => selectedItems.forEach(id => handleEdit(inventory.find(item => item.id === id)!))} className="text-blue-600 hover:text-blue-900">Edit</button>
          <button onClick={() => handleDelete()} className="text-red-600 hover:text-red-900">Delete</button>
        </div>
        <div className="space-x-4">
          <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Cancel</button>
          <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">Publish Live</button>
        </div>
      </div>
    </section>
  );
};

export default TableSection;