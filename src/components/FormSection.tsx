// src/components/FormSection.tsx
import React, { useState } from 'react';
import { addInventoryItem, InventoryItem } from '../lib/mockApi';

interface FormSectionProps {
  onAddListing: (newItem: InventoryItem) => void;
}

const FormSection: React.FC<FormSectionProps> = ({ onAddListing }) => {
  const [formData, setFormData] = useState<InventoryItem>({
    id: '',
    ticketType: 'E-ticket',
    quantity: 1,
    splitType: 'None',
    maxDisplayQuantity: 1,
    category: 'Away Fans Section',
    sectionBlock: 'Longside Lower Tier',
    row: '5',
    firstSeat: '3',
    lastSeat: '', // Initialize lastSeat
    faceValue: 0,
    payoutPrice: 0,
    seatingArrangement: 'Not Seated Together',
    dateToShip: '2024-11-29', // Changed to YYYY-MM-DD format
    ticketsInHand: false,
    matchEvent: 'Chelsea vs Arsenal - Premier League',
    fanArea: 'Home',
    notes: '', // Initialize notes
    benefits: 'None',
    restrictions: 'None',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Format dateToShip to YYYY-MM-DD
    const [day, month, year] = formData.dateToShip.split('/');
    const formattedDateToShip = `${year}-${month}-${day}`;

    
    const newItem = { ...formData, id: String(Date.now()), dateToShip: formattedDateToShip }; // Generate a unique ID and format date
    await addInventoryItem(newItem);
    onAddListing(newItem);
    
    // Reset all fields to initial state
    setFormData({
      id: '',
      ticketType: 'E-ticket',
      quantity: 1,
      splitType: 'None',
      maxDisplayQuantity: 1,
      category: 'Away Fans Section',
      sectionBlock: 'Longside Lower Tier',
      row: '5',
      firstSeat: '3',
      lastSeat: '',
      faceValue: 0,
      payoutPrice: 0,
      seatingArrangement: 'Not Seated Together',
      dateToShip: '2024-11-29', // Reset to YYYY-MM-DD format
      ticketsInHand: false,
      matchEvent: 'Chelsea vs Arsenal - Premier League',
      fanArea: 'Home',
      notes: '',
      benefits: 'None',
      restrictions: 'None',
      });
    // Remove the extra closing brace here
  };
  

  return (
    <section className="bg-white p-6 rounded-lg shadow-md mb-6">
      <form onSubmit={handleSubmit} id="inventory-form">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Match Event */}
          <div className="md:col-span-3 flex items-center space-x-4">
            <label htmlFor="matchEvent" className="block text-sm font-medium text-gray-700">Choose Match Event</label>
            <div className="flex-grow flex items-center border border-gray-300 rounded-md shadow-sm p-2">
              <select
                id="matchEvent"
                name="matchEvent"
                value={formData.matchEvent} // Bind value to state
                onChange={handleChange} // Add onChange handler
                className="mt-1 block w-full border-none focus:ring-0 focus:border-none sm:text-sm"
              >
                <option>Chelsea vs Arsenal - Premier League</option>
                <option>Manchester United vs Liverpool - Premier League</option>
                <option>Barcelona vs Real Madrid - La Liga</option>
                <option>Bayern Munich vs Borussia Dortmund - Bundesliga</option>
              </select>
              <button type="button" className="ml-2 text-gray-400 hover:text-gray-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <input
                type="date"
                id="dateToShip"
                name="dateToShip"
                value={formData.dateToShip} // Bind value to state
                onChange={handleChange} // Add onChange handler
                className="text-sm border-none focus:ring-0 focus:border-none"
              />
            </div>
            <div className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>16:30</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span>Stamford Bridge, London, United Kingdom</span>
              <a href="#" className="text-blue-600 hover:underline text-sm">View Map</a>
            </div>
          </div>

          {/* Group of 5 fields in one row */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Ticket Type */}
            <div>
              <label htmlFor="ticketType" className="block text-sm font-medium text-gray-700">Ticket Type<span className="text-red-500">*</span></label>
              <select
                id="ticketType"
                name="ticketType"
                value={formData.ticketType}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>E-ticket</option>
                <option>Physical</option>
                <option>Local Delivery</option>
                <option>Flash Seats</option>
                <option>Mobile Transfer</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity<span className="text-red-500">*</span></label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Split Type */}
            <div>
              <label htmlFor="splitType" className="block text-sm font-medium text-gray-700">Split Type</label>
              <select
                id="splitType"
                name="splitType"
                value={formData.splitType}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>None</option>
                <option>Even</option>
                <option>Odd</option>
                <option>Pair</option>
                <option>Single</option>
              </select>
            </div>

            {/* Seating Arrangement */}
            <div>
              <label htmlFor="seatingArrangement" className="block text-sm font-medium text-gray-700">Seating Arrangement<span className="text-red-500">*</span></label>
              <select
                id="seatingArrangement"
                name="seatingArrangement"
                value={formData.seatingArrangement}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>Not Seated Together</option>
                <option>Seated Together</option>
                <option>Aisle Seats</option>
                <option>Center Seats</option>
              </select>
            </div>

            {/* Max Display Quantity */}
            <div>
              <label htmlFor="maxDisplayQuantity" className="block text-sm font-medium text-gray-700">Max Display Quantity</label>
              <input
                type="number"
                id="maxDisplayQuantity"
                name="maxDisplayQuantity"
                value={formData.maxDisplayQuantity}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Fan Area, Benefits, and Restrictions in the same row */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Fan Area */}
            <div>
              <label htmlFor="fanArea" className="block text-sm font-medium text-gray-700">Fan Area</label>
              <select
                id="fanArea"
                name="fanArea"
                value={formData.fanArea} // Bind value to state
                onChange={handleChange} // Add onChange handler
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>Home</option>
                <option>Away</option>
                <option>Neutral</option>
              </select>
            </div>

            {/* Benefits */}
            <div>
              <label htmlFor="benefits" className="block text-sm font-medium text-gray-700">Benefits</label>
              <select
                id="benefits"
                name="benefits"
                value={formData.benefits || 'None'}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>None</option>
                <option>Free Parking</option>
                <option>VIP Access</option>
                <option>Food and Beverage Included</option>
                <option>Merchandise Discount</option>
              </select>
            </div>

            {/* Restrictions */}
            <div>
              <label htmlFor="restrictions" className="block text-sm font-medium text-gray-700">Restrictions</label>
              <select
                id="restrictions"
                name="restrictions"
                value={formData.restrictions || 'None'}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>None</option>
                <option>Age Limit</option>
                <option>Bag Policy</option>
                <option>No Re-entry</option>
                <option>Camera Restrictions</option>
              </select>
            </div>
          </div>

          {/* Date to Ship */}
          <div>
            <label htmlFor="dateToShip" className="block text-sm font-medium text-gray-700">Date to Ship<span className="text-red-500">*</span></label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="date"
                id="dateToShip"
                name="dateToShip"
                value={formData.dateToShip}
                onChange={handleChange}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category<span className="text-red-500">*</span></label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option>Away Fans Section</option>
              <option>Home Fans Section</option>
              <option>Lower Tier</option>
              <option>Upper Tier</option>
              <option>Club Level</option>
            </select>
          </div>

          {/* Section Block */}
          <div>
            <label htmlFor="sectionBlock" className="block text-sm font-medium text-gray-700">Section Block<span className="text-red-500">*</span></label>
            <select
              id="sectionBlock"
              name="sectionBlock"
              value={formData.sectionBlock}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option>Longside Lower Tier</option>
              <option>Shortside Lower Tier</option>
              <option>Longside Upper Tier</option>
              <option>Shortside Upper Tier</option>
              <option>Block 1</option>
              <option>Block 2</option>
              <option>Block 3</option>
            </select>
          </div>

          {/* Row */}
          <div>
            <label htmlFor="row" className="block text-sm font-medium text-gray-700">Row<span className="text-red-500">*</span></label>
            <select
              id="row"
              name="row"
              value={formData.row}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option>5</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>

          {/* First Seat */}
          <div>
            <label htmlFor="firstSeat" className="block text-sm font-medium text-gray-700">First Seat<span className="text-red-500">*</span></label>
            <select
              id="firstSeat"
              name="firstSeat"
              value={formData.firstSeat}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option>3</option>
              <option>1</option>
              <option>2</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>

          {/* Last Seat */}
          <div>
            <label htmlFor="lastSeat" className="block text-sm font-medium text-gray-700">Last Seat</label>
            <select
              id="lastSeat"
              name="lastSeat"
              value={formData.lastSeat || ''}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option></option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
            </select>
          </div>

          {/* Face Value */}
          <div>
            <label htmlFor="faceValue" className="block text-sm font-medium text-gray-700">Face Value</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">£</span>
              </div>
              <input
                type="number"
                id="faceValue"
                name="faceValue"
                value={formData.faceValue}
                onChange={handleChange}
                className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">GBP</span>
              </div>
            </div>
          </div>

          {/* Payout Price */}
          <div>
            <label htmlFor="payoutPrice" className="block text-sm font-medium text-gray-700">Payout Price</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">£</span>
              </div>
              <input
                type="number"
                id="payoutPrice"
                name="payoutPrice"
                value={formData.payoutPrice}
                onChange={handleChange}
                className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">GBP</span>
              </div>
            </div>
          </div>

          {/* Tickets in Hand and Upload Tickets */}
          <div className="col-span-full flex items-center space-x-4">
            <div className="flex items-center">
              <input
                id="ticketsInHand"
                name="ticketsInHand"
                type="checkbox"
                checked={formData.ticketsInHand}
                onChange={handleCheckboxChange}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="ticketsInHand" className="ml-2 block text-sm font-medium text-gray-700">
                Tickets in hand
              </label>
              <span className="ml-1 text-gray-400 cursor-pointer" title="Indicates if you physically possess the tickets.">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </div>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L14.414 5A2 2 0 0115 6.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              Upload Tickets
            </button>
          </div>

          {/* Notes */}
          <div className="md:col-span-3">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>
        </div>

        {/* Remove the Add Listing button from here */}
        {/*
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Listing
            </button>
          </div>
        </div>
        */}
      </form>
    </section>
  );
};

export default FormSection;