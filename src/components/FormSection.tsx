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
          <div className="md:col-span-3 lg:grid-cols-4 flex-wrap flex items-center space-x-4 relative mb-4 mt-2">
            <label htmlFor="matchEvent" className="block placeholder-absolute text-sm font-medium text-gray-700">Choose Match Event</label>
            <div className="flex-grow flex items-center border border-gray-300 rounded-md shadow-sm p-2">
              <select
                id="matchEvent"
                name="matchEvent"
                value={formData.matchEvent} // Bind value to state
                onChange={handleChange} // Add onChange handler
                className="mt-1 block w-full border-focus border-none focus:ring-0 focus:border-none sm:text-sm"
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
              <svg className="h-5 w-5 text-gray-500" fill="none" stroke="#155dfc" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <input
                type="date"
                id="dateToShip"
                name="dateToShip"
                value={formData.dateToShip} // Bind value to state
                onChange={handleChange} // Add onChange handler
                className="text-sm border-0 border-focus focus:ring-0 focus:border-none"
              />
            </div>
            <div className="">|</div>
            <div className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-gray-500" fill="none" stroke="#155dfc" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>16:30</span>
            </div>
            <div className="">|</div>
            <div className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-gray-500" fill="none" stroke="#155dfc" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span>Stamford Bridge, London, United Kingdom</span>
              <a href="#" className="text-blue-600 hover:underline text-sm">View Map</a>
            </div>
          </div>        

          {/* Group of 5 fields in one row */}
          <div className="md:col-span-4 grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {/* Ticket Type */}
            <div className='relative mb-4'>
              <label htmlFor="ticketType" className="placeholder-absolute block text-sm font-medium text-gray-700">Ticket Type<span className="text-red-500">*</span></label>
              <select
                id="ticketType"
                name="ticketType"
                value={formData.ticketType}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>E-ticket</option>
                <option>Physical</option>
                <option>Local Delivery</option>
                <option>Flash Seats</option>
                <option>Mobile Transfer</option>
              </select>
            </div>

            {/* Quantity */}
            <div className='relative mb-4'>
              <label htmlFor="quantity" className="placeholder-absolute block text-sm font-medium text-gray-700">Quantity<span className="text-red-500">*</span></label>
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
            <div className='relative mb-4'>
              <label htmlFor="splitType" className="placeholder-absolute block text-sm font-medium text-gray-700">Split Type</label>
              <select
                id="splitType"
                name="splitType"
                value={formData.splitType}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>None</option>
                <option>Even</option>
                <option>Odd</option>
                <option>Pair</option>
                <option>Single</option>
              </select>
            </div>

            {/* Seating Arrangement */}
            <div className='relative mb-4'>
              <label htmlFor="seatingArrangement" className="placeholder-absolute block text-sm font-medium text-gray-700">Seating Arrangement<span className="text-red-500">*</span></label>
              <select
                id="seatingArrangement"
                name="seatingArrangement"
                value={formData.seatingArrangement}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>Not Seated Together</option>
                <option>Seated Together</option>
                <option>Aisle Seats</option>
                <option>Center Seats</option>
              </select>
            </div>

            {/* Max Display Quantity */}
            <div className='relative mb-4'>
              <label htmlFor="maxDisplayQuantity" className="placeholder-absolute block text-sm font-medium text-gray-700">Max Display Quantity</label>
              <input
                type="number"
                id="maxDisplayQuantity"
                name="maxDisplayQuantity"
                value={formData.maxDisplayQuantity}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          {/* </div> */}

          {/* Fan Area, Benefits, and Restrictions in the same row */}
          {/* <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"> */}
            {/* Fan Area */}
            <div className='relative mb-4'>
              <label htmlFor="fanArea" className="placeholder-absolute block text-sm font-medium text-gray-700">Fan Area</label>
              <select
                id="fanArea"
                name="fanArea"
                value={formData.fanArea} // Bind value to state
                onChange={handleChange} // Add onChange handler
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>Home</option>
                <option>Away</option>
                <option>Neutral</option>
              </select>
            </div>

             {/* Category */}
          <div className='relative mb-4'>
            <label htmlFor="category" className="placeholder-absolute block text-sm font-medium text-gray-700">Category<span className="text-red-500">*</span></label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option>Away Fans Section</option>
              <option>Home Fans Section</option>
              <option>Lower Tier</option>
              <option>Upper Tier</option>
              <option>Club Level</option>
            </select>
          </div>

          {/* Section Block */}
          <div className='relative mb-4'>
            <label htmlFor="sectionBlock" className="placeholder-absolute block text-sm font-medium text-gray-700">Section Block<span className="text-red-500">*</span></label>
            <select
              id="sectionBlock"
              name="sectionBlock"
              value={formData.sectionBlock}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
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
          <div className='relative mb-4'>
            <label htmlFor="row" className="placeholder-absolute block text-sm font-medium text-gray-700">Row<span className="text-red-500">*</span></label>
            <select
              id="row"
              name="row"
              value={formData.row}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
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
          <div className='relative mb-4'>
            <label htmlFor="firstSeat" className="placeholder-absolute block text-sm font-medium text-gray-700">First Seat<span className="text-red-500">*</span></label>
            <select
              id="firstSeat"
              name="firstSeat"
              value={formData.firstSeat}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option>3</option>
              <option>1</option>
              <option>2</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>

         

          {/* Face Value */}
          <div className='relative mb-4'>
            <label htmlFor="faceValue" className="placeholder-absolute logo-left block text-sm font-medium text-gray-700">Face Value</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="border-end py-2 pr-3">
                  <span className="text-gray-500 sm:text-sm">£</span>
                  </div>
              </div>
              <input
                type="number"
                id="faceValue"
                name="faceValue"
                value={formData.faceValue}
                onChange={handleChange}
                className="block w-full input-padding-left pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">GBP</span>
              </div>
            </div>
          </div>

          {/* Payout Price */}
          <div className='relative mb-4'>
            <label htmlFor="payoutPrice" className="placeholder-absolute  logo-left block text-sm font-medium text-gray-700">Payout Price</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="border-end py-2 pr-3">
                <span className="text-gray-500 sm:text-sm">£</span>
                </div>
              </div>
              <input
                type="number"
                id="payoutPrice"
                name="payoutPrice"
                value={formData.payoutPrice}
                onChange={handleChange}
                className="block w-full input-padding-left pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">GBP</span>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className='relative mb-4'>
              <label htmlFor="benefits" className="placeholder-absolute block text-sm font-medium text-gray-700">Benefits</label>
              <select
                id="benefits"
                name="benefits"
                value={formData.benefits || 'None'}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>None</option>
                <option>Free Parking</option>
                <option>VIP Access</option>
                <option>Food and Beverage Included</option>
                <option>Merchandise Discount</option>
              </select>
            </div>

            {/* Restrictions */}
            <div className='relative mb-4'>
              <label htmlFor="restrictions" className="placeholder-absolute block text-sm font-medium text-gray-700">Restrictions</label>
              <select
                id="restrictions"
                name="restrictions"
                value={formData.restrictions || 'None'}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>None</option>
                <option>Age Limit</option>
                <option>Bag Policy</option>
                <option>No Re-entry</option>
                <option>Camera Restrictions</option>
              </select>
            </div>
          {/* </div> */}

          {/* Date to Ship */}
          <div className='relative mb-4'>
            <label htmlFor="dateToShip" className="placeholder-absolute block text-sm font-medium text-gray-700">Date to Ship<span className="text-red-500">*</span></label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="date"
                id="dateToShip"
                name="dateToShip"
                value={formData.dateToShip}
                onChange={handleChange}
                className="block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              />
            </div>
          </div>

          {/* Tickets in Hand and Upload Tickets */}
          
            <div className="flex items-center mb-4">
              <div className="rounded-md border flex items-center justify-between w-full">
                <div className="border-end pl-3 py-2 pr-3"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M512-40q-82 0-154-37.5T240-182L48-464l19-19q20-21 49.5-24t53.5 14l110 76v-383q0-17 11.5-28.5T320-840q17 0 28.5 11.5T360-800v537L212-366l95 138q35 51 89 79.5T512-120q103 0 175.5-72.5T760-368v-392q0-17 11.5-28.5T800-800q17 0 28.5 11.5T840-760v392q0 137-95.5 232.5T512-40Zm-72-440v-400q0-17 11.5-28.5T480-920q17 0 28.5 11.5T520-880v400h-80Zm160 0v-360q0-17 11.5-28.5T640-880q17 0 28.5 11.5T680-840v360h-80ZM486-300Z"/></svg></div>
                <div className="flex items-center w-full justify-between pl-3 pr-3">
                  <label htmlFor="ticketsInHand" className=" block flex items-center gap-2 text-sm font-medium text-gray-700">
                    Tickets 
                    <span className="ml-1 text-gray-400 cursor-pointer" title="Indicates if you physically possess the tickets.">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  </label>
                  
                  <input
                    id="ticketsInHand"
                    name="ticketsInHand"
                    type="checkbox"
                    checked={formData.ticketsInHand}
                    onChange={handleCheckboxChange}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 ml-3 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex items-center pr-3 border border-gray-600 mb-4 p-0 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            ><div className="border-end pl-3 py-2 pr-3">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
            </div>
              <span className='pl-3'>Upload Tickets</span>
            </button>
          

 {/* Last Seat */}
 {/* <div className='relative mb-4'>
            <label htmlFor="lastSeat" className="placeholder-absolute block text-sm font-medium text-gray-700">Last Seat</label>
            <select
              id="lastSeat"
              name="lastSeat"
              value={formData.lastSeat || ''}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option></option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
            </select>
          </div> */}
          {/* Notes */}
          {/* <div className="md:col-span-3">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div> */}
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