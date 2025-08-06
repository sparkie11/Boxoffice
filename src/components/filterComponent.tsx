import React from 'react';

interface FilterComponentProps {
  // Define props here
}

const FilterComponent: React.FC<FilterComponentProps> = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <div className='w-100 '>

        <div className="relative  border border-gray-300 rounded-md px-3 py-2 focus-within:ring-1 focus-within:ring-blue-600 focus-within:border-blue-600">
        {/* <div className="relative mb-4"> */}

          <label htmlFor="matchEvent"
           className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
          // className="placeholder-absolute block text-sm font-medium text-[#7D82A4]"

           >Choose Match Event</label>
          <input type="text" name="matchEvent" id="matchEvent"
          //  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
          className=" block w-full border border-gray-300 rounded-md  px-3 focus:outline-none focus:ring-blue-500 focus:focus:border-blue-500 sm:text-sm"

            placeholder="Chelsea vs Arsenal - Premier League" />
          {/* <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span> */}
          {/* <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button> */}
        </div>
        </div>
      <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Choose Match Event */}


        {/* Team members */}
        <div
        //  className="relative border border-gray-300 rounded-md px-3 py-2 focus-within:ring-1 focus-within:ring-blue-600 focus-within:border-blue-600"
        className="relative mb-4 "
         >
          <label htmlFor="teamMembers" 
          // className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
          className="placeholder-absolute block text-sm font-medium text-[#7D82A4]"

          >Team members</label>
          <select id="teamMembers" name="teamMembers" 
          // className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm appearance-none"
          className="mt-1 block w-full pl-3 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"

          >
            <option>1 selected</option>
          </select>
          {/* <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span> */}
        </div>

        {/* Event Date */}
        <div 
        // className="relative border border-gray-300 rounded-md px-3 py-2 focus-within:ring-1 focus-within:ring-blue-600 focus-within:border-blue-600"
        className="relative mb-4 "

        >
          <label htmlFor="eventDate" 
          // className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
          className="placeholder-absolute block text-sm font-medium text-[#7D82A4]"

          >Event Date</label>
          <input type="text" name="eventDate" id="eventDate" 
          // className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
          className="mt-1 block w-full pl-3 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"

           placeholder="29/11/2014" />
          {/* <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button> */}
        </div>

        {/* Ticket type */}
        <div 
        // className="relative border border-gray-300 rounded-md px-3 py-2 focus-within:ring-1 focus-within:ring-blue-600 focus-within:border-blue-600"
        className="relative mb-4 "

        >
          <label htmlFor="ticketType"
          //  className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
          className="placeholder-absolute block text-sm font-medium text-[#7D82A4]"

           >Ticket type</label>
          <select id="ticketType" name="ticketType"
          //  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm appearance-none"
          className="mt-1 block w-full pl-3 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"

           >
            <option>None</option>
          </select>
          {/* <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span> */}
        </div>

        {/* Ticket Status */}
        <div 
        // className="relative border border-gray-300 rounded-md px-3 py-2 focus-within:ring-1 focus-within:ring-blue-600 focus-within:border-blue-600">
        className="relative mb-4 ">

          <label htmlFor="ticketStatus" 
          // className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
          className="placeholder-absolute block text-sm font-medium text-[#7D82A4]"

          >Ticket Status</label>
          <select id="ticketStatus" name="ticketStatus"
          //  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm appearance-none"
          className="mt-1 block w-full pl-3 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"

           >
            <option>None</option>
          </select>
          {/* <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span> */}
        </div>

        {/* Listing Status */}
        <div 
        className="relative mb-4 "

        // className="relative border border-gray-300 rounded-md px-3 py-2 focus-within:ring-1 focus-within:ring-blue-600 focus-within:border-blue-600"
        >
          <label htmlFor="listingStatus" 
          className="placeholder-absolute block text-sm font-medium text-[#7D82A4]"

          // className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
          >Listing Status</label>
          <select id="listingStatus" name="listingStatus"
          //  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm appearance-none"
          className="mt-1 block w-full pl-3 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
           
           >
            <option>None</option>
          </select>
          {/* <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span> */}
        </div>

        {/* Category */}
        <div 
        className="relative mb-4 "

        // className="relative border border-gray-300 rounded-md px-3 py-2 focus-within:ring-1 focus-within:ring-blue-600 focus-within:border-blue-600"
        >
          <label htmlFor="category" 
          className="placeholder-absolute block text-sm font-medium text-[#7D82A4]"

          // className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
          >Category</label>
          <select id="category" name="category" 
          // className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm appearance-none"
          className="mt-1 block w-full pl-3 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          
          >
            <option>None</option>
          </select>
          {/* <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;