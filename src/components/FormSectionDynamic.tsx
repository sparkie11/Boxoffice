import React, { useState, useEffect } from "react";
import {
  addInventoryItem,
  InventoryItem,
  getInventoryItems,
} from "../lib/mockApi";

interface FormSectionProps {
  onAddListing: (newItem: InventoryItem) => void;
}

const FormSectionDynamic: React.FC<FormSectionProps> = ({ onAddListing }) => {
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const data = await getInventoryItems();
      setInventoryData(data);
      if (data.length > 0) {
        setFormData((prevData) => ({
          ...prevData,
          matchEvent: data[0].matchEvent,
          matchTime: data[0].matchTime,
          matchLocation: data[0].matchLocation,
          dateToShip: data[0].dateToShip,
        }));
      }
    };
    fetchInventory();
  }, []);

  const [formData, setFormData] = useState<InventoryItem>({
    id: "",
    ticketType: "None",
    quantity: 0,
    splitType: "None",
    maxDisplayQuantity: 1,
    category: "Away Fans Section",
    sectionBlock: "Longside Lower Tier",
    row: "5",
    firstSeat: "3",
    lastSeat: "", // Initialize lastSeat
    faceValue: 0,
    payoutPrice: 0,
    seatingArrangement: "Not Seated Together",
    dateToShip: "2024-11-29", // Changed to YYYY-MM-DD format
    ticketsInHand: false,
    matchEvent: "Chelsea vs Arsenal - Premier League",
    fanArea: "Home",
    notes: "", // Initialize notes
    benefits: "None",
    restrictions: "None",
    matchTime: "16:30",
    matchLocation: "Stamford Bridge, London, United Kingdom",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => {
      let updatedValue: string | number | boolean = value;

      if (type === "number") {
        updatedValue = parseFloat(value);
      } else if (name === "matchEvent") {
        // Find the selected match event from mockApi and update matchTime and matchLocation
        const selectedMatch = inventoryData.find(
          (item) => item.matchEvent === value
        );
        if (selectedMatch) {
          return {
            ...prevData,
            [name]: updatedValue,
            matchTime: selectedMatch.matchTime,
            matchLocation: selectedMatch.matchLocation,
            dateToShip: selectedMatch.dateToShip, // Also update dateToShip from selected match
          };
        }
      }

      return {
        ...prevData,
        [name]: updatedValue,
      };
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!formData.ticketType || formData.ticketType === "None") {
      newErrors.ticketType = "Ticket Type is required.";
    }
    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = "Quantity is required.";
    }
    if (!formData.seatingArrangement) {
      newErrors.seatingArrangement = "Seating Arrangement is required.";
    }
    if (!formData.category) {
      newErrors.category = "Category is required.";
    }
    if (!formData.sectionBlock) {
      newErrors.sectionBlock = "Section Block is required.";
    }
    if (!formData.row) {
      newErrors.row = "Row is required.";
    }
    if (!formData.firstSeat) {
      newErrors.firstSeat = "First Seat is required.";
    }
    if (!formData.dateToShip) {
      newErrors.dateToShip = "Date to Ship is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // Clear errors if validation passes

    // Format dateToShip to YYYY-MM-DD
    const [day, month, year] = formData.dateToShip.split("/");
    const formattedDateToShip = `${year}-${month}-${day}`;

    const newItem = {
      ...formData,
      id: String(Date.now()),
      dateToShip: formattedDateToShip,
    }; // Generate a unique ID and format date
    await addInventoryItem(newItem);
    onAddListing(newItem);

    // Reset all fields to initial state
    setFormData({
      id: "",
      ticketType: "None",
      quantity: 1,
      splitType: "None",
      maxDisplayQuantity: 1,
      category: "Away Fans Section",
      sectionBlock: "Longside Lower Tier",
      row: "5",
      firstSeat: "3",
      lastSeat: "",
      faceValue: 0,
      payoutPrice: 0,
      seatingArrangement: "Not Seated Together",
      dateToShip: "2024-11-29", // Reset to YYYY-MM-DD format
      ticketsInHand: false,
      matchEvent: "Chelsea vs Arsenal - Premier League",
      fanArea: "Home",
      notes: "",
      benefits: "None",
      restrictions: "None",
      matchTime: "16:30",
      matchLocation: "Stamford Bridge, London, United Kingdom",
    });
  };

  return (
    <section className="bg-white   shadow-md border-b-1 border-gray-200  ">
      <form onSubmit={handleSubmit} id="inventory-form">
        <div className="grid grid-cols-1 p-6 md:grid-cols-3   gap-3 ">
          {/* Match Event */}
          {/* <div className='flex  '> */}
          <div className="md:col-span-3  flex flex-wrap items-center sm:justify-start gap-2 relative  mt-1 md:flex md:justify-start md:items-center  ">
            <label
              htmlFor="matchEvent"
              className="block placeholder-absolute text-sm font-medium text-[#7D82A4]"
            >
              Choose Match Event
            </label>
            <div className=" flex items-center border border-gray-300 rounded-md p-1">
              <select
                id="matchEvent"
                name="matchEvent"
                value={formData.matchEvent}
                onChange={handleChange}
                className="mt-1 block w-full border-focus border-none focus:ring-0 focus:border-none sm:text-sm"
              >
                {inventoryData.map((item) => (
                  <option key={item.id} value={item.matchEvent}>
                    {item.matchEvent}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="ml-2 text-[#323A70] hover:text-gray-600"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#6BC7F4"
              >
                <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" />
              </svg>
              <input
                type="text"
                id="dateToShip"
                name="dateToShip"
                value={formData.dateToShip}
                onChange={handleChange}
                className="text-sm border-0 border-focus  text-[#676C93] focus:ring-0 w-30 focus:border-none"
              />
            </div>
            {/* <div className="">|</div> */}
            <div className="vertical-line"></div>
            <div className="flex items-center text-[#676C93] font-light space-x-2">
              <svg
                className="h-5 w-5 text-[#676C93]"
                fill="none"
                stroke="#6BC7F4"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>{formData.matchTime}</span>
            </div>
            {/* <div className="">|</div> */}
            <div className="vertical-line"></div>

            <div className="flex font-light text-[#676C93] items-center space-x-2">
              <svg
                className="h-5 w-5  text-[#676C93]"
                fill="none"
                stroke="#6BC7F4"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <span>{formData.matchLocation}</span>
            </div>
            <div className="ml-auto">
              <a
                href="#"
                className="text-blue-600 flex justify-between items-center hover:underline font-bold text-sm"
              >
                View Map
              </a>
            </div>
          </div>
          {/* </div> */}
        </div>
        <div className="mb-1 border-t-1 border-gray-200  p-6 pb-0">
          {/* Group of 5 fields in one row */}
          {/* <hr className=''/> */}
          <div className="md:col-span-4 grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {/* Ticket Type */}
            <div className="relative mb-4">
              <label
                htmlFor="ticketType"
                className="placeholder-absolute block text-sm font-medium text-[#7D82A4]"
              >
                Ticket Type<span className="text-red-500">*</span>
              </label>
              <select
                id="ticketType"
                name="ticketType"
                value={formData.ticketType}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>None</option>

                <option>E-ticket</option>
                <option>Physical</option>
                <option>Local Delivery</option>
                <option>Flash Seats</option>
                <option>Mobile Transfer</option>
              </select>
              {errors.ticketType && (
                <p className="text-red-500 text-xs mt-1">{errors.ticketType}</p>
              )}
            </div>

            {/* Quantity */}
            <div className="relative mb-4">
              <label
                htmlFor="quantity"
                className="placeholder-absolute block text-sm font-medium text-[#7D82A4]"
              >
                Quantity<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md py-3 px-3 focus:outline-none focus:ring-blue-500 focus:focus:border-blue-500 sm:text-sm"
              />
              {errors.quantity && (
                <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
              )}
            </div>

            {/* Split Type */}
            <div className="relative mb-4">
              <label
                htmlFor="splitType"
                className="placeholder-absolute block text-sm font-medium text-[#7D82A4]"
              >
                Split Type
              </label>
              <select
                id="splitType"
                name="splitType"
                value={formData.splitType}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>None</option>
                <option>Even</option>
                <option>Odd</option>
                <option>Pair</option>
                <option>Single</option>
              </select>
            </div>

            {/* Seating Arrangement */}
            <div className="relative mb-4">
              <label
                htmlFor="seatingArrangement"
                className="placeholder-absolute block text-sm font-medium text-[#7D82A4]"
              >
                Seating Arrangement<span className="text-red-500">*</span>
              </label>
              <select
                id="seatingArrangement"
                name="seatingArrangement"
                value={formData.seatingArrangement}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>Not Seated Together</option>
                <option>Seated Together</option>
                <option>Aisle Seats</option>
                <option>Center Seats</option>
              </select>
              {errors.seatingArrangement && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.seatingArrangement}
                </p>
              )}
            </div>

            {/* Max Display Quantity */}
            <div className="relative mb-4">
              <label
                htmlFor="maxDisplayQuantity"
                className="placeholder-absolute block text-sm font-medium text-[#7D82A4]"
              >
                Max Display Quantity
              </label>
              <input
                type="number"
                id="maxDisplayQuantity"
                name="maxDisplayQuantity"
                value={formData.maxDisplayQuantity}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md py-3 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            {/* </div> */}

            {/* Fan Area, Benefits, and Restrictions in the same row */}
            {/* <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"> */}
            {/* Fan Area */}
            <div className="relative mb-4">
              <label
                htmlFor="fanArea"
                className="placeholder-absolute block text-sm font-medium text-[#7D82A4]"
              >
                Fan Area
              </label>
              <select
                id="fanArea"
                name="fanArea"
                value={formData.fanArea} // Bind value to state
                onChange={handleChange} // Add onChange handler
                className="mt-1 block w-full pl-3 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>Home</option>
                <option>Away</option>
                <option>Neutral</option>
              </select>
            </div>

            {/* Category */}
            <div className="relative mb-4">
              <label
                htmlFor="category"
                className="placeholder-absolute block text-sm font-medium text-[#7D82A4]"
              >
                Category<span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>Away Fans Section</option>
                <option>Home Fans Section</option>
                <option>Lower Tier</option>
                <option>Upper Tier</option>
                <option>Club Level</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
            </div>

            {/* Section Block */}
            <div className="relative mb-4">
              <label
                htmlFor="sectionBlock"
                className="placeholder-absolute block text-sm font-medium text-[#7D82A4]"
              >
                Section Block<span className="text-red-500">*</span>
              </label>
              <select
                id="sectionBlock"
                name="sectionBlock"
                value={formData.sectionBlock}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>Longside Lower Tier</option>
                <option>Shortside Lower Tier</option>
                <option>Longside Upper Tier</option>
                <option>Shortside Upper Tier</option>
                <option>Block 1</option>
                <option>Block 2</option>
                <option>Block 3</option>
              </select>
              {errors.sectionBlock && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.sectionBlock}
                </p>
              )}
            </div>

            {/* Row */}
            <div className="relative mb-4">
              <label
                htmlFor="row"
                className="placeholder-absolute block text-sm font-medium text-[#7D82A4]"
              >
                Row<span className="text-red-500">*</span>
              </label>
              <select
                id="row"
                name="row"
                value={formData.row}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>5</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
              {errors.row && (
                <p className="text-red-500 text-xs mt-1">{errors.row}</p>
              )}
            </div>

            {/* First Seat */}
            <div className="relative mb-4">
              <label
                htmlFor="firstSeat"
                className="placeholder-absolute block text-sm font-medium text-[#7D82A4]"
              >
                First Seat<span className="text-red-500">*</span>
              </label>
              <select
                id="firstSeat"
                name="firstSeat"
                value={formData.firstSeat}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>3</option>
                <option>1</option>
                <option>2</option>
                <option>4</option>
                <option>5</option>
              </select>
              {errors.firstSeat && (
                <p className="text-red-500 text-xs mt-1">{errors.firstSeat}</p>
              )}
            </div>

            {/* Face Value */}
            <div style={{ marginTop: "1px" }} className="relative mb-4">
              <label
                htmlFor="faceValue"
                className="placeholder-absolute logo-left block text-sm font-medium text-[#7D82A4]"
              >
                Face Value{" "}
              </label>
              <div className="  relative rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className=" py-2 pr-3">
                    <span className="text-[#696F95] font-medium text-xl ">
                      £
                    </span>
                  </div>
                  <div className="vertical-line-div"></div>
                </div>
                <input
                  type="number"
                  id="faceValue"
                  name="faceValue"
                  value={formData.faceValue}
                  onChange={handleChange}
                  className="block w-full input-padding-left pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="0.00"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  {/* <span className="text-gray-500 sm:text-sm">GBP</span> */}
                </div>
              </div>
            </div>

            {/* Payout Price */}
            <div style={{ marginTop: "-0.9px" }} className=" relative mb-4">
              <label
                htmlFor="payoutPrice"
                className="placeholder-absolute  logo-left block text-sm font-medium text-[#7D82A4]"
              >
                Payout Price <span className="text-red-500">*</span>
              </label>
              <div className=" relative rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className=" py-2 pr-3">
                    {/* <span className="text-gray-500 sm:text-sm">£</span> */}
                    <span className="text-[#696F95] font-medium text-xl ">
                      £
                    </span>
                  </div>
                  <div className="vertical-line-div"></div>
                </div>
                <input
                  type="number"
                  id="payoutPrice"
                  name="payoutPrice"
                  value={formData.payoutPrice}
                  onChange={handleChange}
                  className="block w-full input-padding-left pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="0.00"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  {/* <span className="text-gray-500 sm:text-sm">GBP</span> */}
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="relative mb-4">
              <label
                htmlFor="benefits"
                className="placeholder-absolute block text-sm font-medium text-[#7D82A4]"
              >
                Benefits
              </label>
              <select
                id="benefits"
                name="benefits"
                value={formData.benefits || "None"}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>None</option>
                <option>Free Parking</option>
                <option>VIP Access</option>
                <option>Food and Beverage Included</option>
                <option>Merchandise Discount</option>
              </select>
            </div>

            {/* Restrictions */}
            <div className="relative mb-4">
              <label
                htmlFor="restrictions"
                className="placeholder-absolute block text-sm font-medium text-[#7D82A4]"
              >
                Restrictions
              </label>
              <select
                id="restrictions"
                name="restrictions"
                value={formData.restrictions || "None"}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>None</option>
                <option>Age Limit</option>
                <option>Bag Policy</option>
                <option>No Re-entry</option>
                <option>Camera Restrictions</option>
              </select>
            </div>

            {/* Last Seat */}
            <div className="relative mb-4 ">
              <label
                htmlFor="dateToShip"
                className="placeholder-absolute block text-sm font-medium text-[#7D82A4]"
              >
                Date to Ship<span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md ">
                <input
                  type="date"
                  id="dateToShip"
                  name="dateToShip"
                  value={formData.dateToShip}
                  onChange={handleChange}
                  className="block w-full pl-3 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                />
              </div>
            </div>

            {/* Tickets in Hand Checkbox */}
            <div className="flex items-center mb-4">
              <div className="rounded-md border border-gray-300 flex items-center justify-between w-full">
                <div className="border-end border-gray-300 pl-3 py-3 pr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="currentColor"
                  >
                    <path d="M512-40q-82 0-154-37.5T240-182L48-464l19-19q20-21 49.5-24t53.5 14l110 76v-383q0-17 11.5-28.5T320-840q17 0 28.5 11.5T360-800v537L212-366l95 138q35 51 89 79.5T512-120q103 0 175.5-72.5T760-368v-392q0-17 11.5-28.5T800-800q17 0 28.5 11.5T840-760v392q0 137-95.5 232.5T512-40Zm-72-440v-400q0-17 11.5-28.5T480-920q17 0 28.5 11.5T520-880v400h-80Zm160 0v-360q0-17 11.5-28.5T640-880q17 0 28.5 11.5T680-840v360h-80ZM486-300Z" />
                  </svg>
                </div>
                <div className="flex items-center w-full justify-between pl-3  pr-3">
                  <label
                    htmlFor="ticketsInHand"
                    className=" block flex items-center gap-1 text-sm font-medium text-gray-700"
                  >
                    Tickets in hand
                    <span
                      className="ml-1 text-gray-400 cursor-pointer"
                      title="Indicates if you physically possess the tickets."
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="gray"
                      >
                        <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
                      </svg>
                    </span>
                  </label>

                  <input
                    id="ticketsInHand"
                    name="ticketsInHand"
                    type="checkbox"
                    checked={formData.ticketsInHand}
                    disabled={true}
                    onChange={handleCheckboxChange}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 ml-3 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
            {/* <button
              type="button"
              disabled={true}
              // disabled
              className="inline-flex items-center pr-3 border border-gray-300 mb-4 p-0 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            ><div className="border-end border-gray-300 pl-3 py-2 pr-3">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
            </div>
              <span className='pl-3 '>Upload Tickets</span>
            </button> */}
            <button
              type="button"
              disabled={true}
              className="inline-flex items-center pr-3 border border-gray-300 mb-4 p-0 text-sm font-medium rounded-md
              text-gray-700 bg-gray-100 hover:bg-gray-50
              disabled:bg-[#FAFAFB] disabled:text-gray-400 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <div className=" border-gray-300 pl-3 py-2 pr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="currentColor"
                >
                  <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                </svg>
              </div>
              <div className="vertical-line-div"></div>
              <span className="pl-3 text-[14px]">Upload Tickets</span>
            </button>
          </div>

          {/* Submit Button */}
        </div>
      </form>
    </section>
  );
};

export default FormSectionDynamic;
