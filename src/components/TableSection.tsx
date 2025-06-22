import React, { useEffect, useRef, useState } from "react";
import {
  getInventoryItems,
  InventoryItem,
  updateInventoryItem,
} from "../lib/mockApi";

interface TableSectionProps {
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  selectedItems: string[];
  clonedItemIds: string[];
  handleCheckboxChange: (id: string) => void;
  handleSelectAll: () => void;
  handleClone: (item: InventoryItem) => void;
  handleEdit: (item: InventoryItem) => void;
}

/**
 * Sticky-header, horizontally scrollable inventory table.
 *
 * NOTES
 *  • The table container listens for scroll + resize to enable/disable the chevron buttons.
 *  • Edits are written optimistically to local state and then persisted via updateInventoryItem.
 */
const TableSection: React.FC<TableSectionProps> = ({
  inventory,
  setInventory,
  selectedItems,
  clonedItemIds,
  handleCheckboxChange,
  handleSelectAll,
  handleClone,
  handleEdit,
}) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [isTableVisible, setIsTableVisible] = useState<boolean>(true);// New state for table visibility
  const [filters, setFilters] = useState<Record<string, Set<string>>>({
    ticketType: new Set(),
    splitType: new Set(),
    category: new Set(),
    sectionBlock: new Set(),
    row: new Set(),
    firstSeat: new Set(),
    seatingArrangement: new Set(),
    fanArea: new Set(),
    benefits: new Set(),
    restrictions: new Set(),
    ticketsInHand: new Set(),
  });

  /* ------------------------------------------------------------------ */
  /*                               EFFECTS                              */
  /* ------------------------------------------------------------------ */
  // 1️⃣  Fetch inventory once on mount.
  useEffect(() => {
    const fetchInventory = async () => {
      const items = await getInventoryItems();
      setInventory(items);
    };
    fetchInventory();
  }, [setInventory]);

  // 2️⃣  Check horizontal scroll ability on mount + scroll + resize.
  useEffect(() => {
    const container = tableContainerRef.current;
    if (!container) return;

    const checkScroll = () => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    };

    checkScroll();
    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  // 3️⃣ Close filter dropdown when clicking outside.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openFilter && !((event.target as HTMLElement).closest('.filter-dropdown') || (event.target as HTMLElement).closest('.filter-button'))) {
        setOpenFilter(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openFilter]);

  /* ------------------------------------------------------------------ */
  /*                             HANDLERS                               */
  /* ------------------------------------------------------------------ */
  const scrollLeft = () => {
    tableContainerRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    tableContainerRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  const handleCellChange = (
    id: string,
    field: keyof InventoryItem,
    value: string | number | boolean
  ) => {
    // optimistic update → UI is snappy
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );

    // background persistence
    const updatedItem = inventory.find((item) => item.id === id);
    if (updatedItem) updateInventoryItem({ ...updatedItem, [field]: value });
  };

  const handleFilterClick = (title: string) => {
    setOpenFilter(openFilter === title ? null : title);
  };

  const columnKeyMap: Record<string, keyof InventoryItem> = {
    "Ticket Type": "ticketType",
    "Quantity": "quantity",
    "Split Type": "splitType",
    "Max Displ.": "maxDisplayQuantity",
    "Category": "category",
    "Section/Block": "sectionBlock",
    "Row": "row",
    "First Seat": "firstSeat",
    "Face Value": "faceValue",
    "Payout Price": "payoutPrice",
    "Seating": "seatingArrangement",
  };

  const getUniqueOptions = (columnTitle: string) => {
    const column = columnKeyMap[columnTitle];
    if (!column) return [];

    const options = new Set<string>();
    inventory.forEach((item) => {
      const value = item[column];
      if (typeof value === 'boolean') {
        options.add(String(value));
      } else if (typeof value === 'string' || typeof value === 'number') {
        options.add(String(value));
      }
    });
    return Array.from(options).sort();
  };

  const handleFilterChange = (columnTitle: string, value: string) => {
    const itemKey = columnKeyMap[columnTitle]; // Get the actual item key from the column title
    if (!itemKey) return;

    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (!newFilters[itemKey]) {
        newFilters[itemKey] = new Set();
      }
      if (newFilters[itemKey].has(value)) {
        newFilters[itemKey].delete(value);
      } else {
        newFilters[itemKey].add(value);
      }
      return newFilters;
    });
  };

  const filteredInventory = inventory.filter((item) => {
    for (const itemKey in filters) { // itemKey will be "ticketType", "splitType", etc.
      const filterValues = filters[itemKey];
      if (filterValues.size > 0) {
        const itemValue = item[itemKey as keyof InventoryItem];
        let itemValueString: string;
        if (typeof itemValue === 'boolean') {
          itemValueString = String(itemValue);
        } else if (typeof itemValue === 'string' || typeof itemValue === 'number') {
          itemValueString = String(itemValue);
        } else {
          itemValueString = '';
        }

        if (!filterValues.has(itemValueString)) {
          return false;
        }
      }
    }
    return true;
  });



  /* ------------------------------------------------------------------ */
  /*                                JSX                                 */
  /* ------------------------------------------------------------------ */
  return (
    <section className="bg-white mt-6 mb-20 rounded-lg shadow-md">
      {/* HEADER */}
      <div
        className="flex justify-between items-center p-2 text-white"
        style={{ backgroundColor: "#130562" }}
      >
        <div className="flex items-center flex-grow flex-wrap">
          <div className="flex items-center space-x-2 pr-2 border-r border-gray-400 flex-shrink-0">
            <div className="w-10 px-4 py-2 sticky left-0  z-10 border-r border-gray-400">
              <div className="w-3 h-3 rounded-full bg-white mr-1"></div>
            </div>
            <h2 className="text-lg flex gap-1 font-semibold">Chelsea vs Arsenal  <span className="hidden sm:block">  – Premier League </span> </h2>
          </div>
          <div className="flex flex-wrap items-center text-sm ml-4 gap-2">
            <div className="flex items-center space-x-4 pr-2 pl-8 border-r border-gray-400">
              <svg className="h-5 w-5 text-white" fill="white" stroke="#155dfc" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <span>Sun, 10 Nov 2024</span>
            </div>
            <div className="flex items-center space-x-2 px-2 border-r border-gray-400">
              <svg className="h-5 w-5 text-white" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>16:30</span>
            </div>
            <div className="flex items-center space-x-2 pl-2">
              <svg className="h-5 w-5  text-white" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span>Stamford Bridge, London, United Kingdom</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm flex-shrink-0">
          <button
            onClick={() => setIsTableVisible(!isTableVisible)}
            className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
            aria-label="Toggle Table Visibility"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 text-[#130562] transform ${isTableVisible ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* TABLE */}
      {isTableVisible && (
        <div
          ref={tableContainerRef}
          className="overflow-x-auto border border-gray-200 rounded-md"
        >
          <table className="min-w-[2400px] table-fixed divide-y divide-gray-200">
            <thead>
            <tr>
              {/* ✅ Sticky checkbox header */}
              <th className="w-12 px-4 py-2 sticky left-0 top-0 bg-gray-50 z-20 border-r border-gray-200">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  checked={selectedItems.length === inventory.length && inventory.length > 0}
                  onChange={handleSelectAll}
                />
              </th>

              {/* Column headers */}
              {[
                "Ticket Type",
                "Quantity",
                "Split Type",
                "Max Displ.",
                "Category",
                "Section/Block",
                "Row",
                "First Seat",
                "Face Value",
                "Payout Price",
                "Seating",
              ].map((title) => (
                <th
                  key={title}
                  className="px-4 py-2 text-left text-nowrap text-xs font-medium text-gray-500 uppercase border-r border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <span>{title}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent sorting when clicking filter icon
                        handleFilterClick(title);
                      }}
                      className="ml-2 p-1 rounded-full hover:bg-gray-200 filter-button"
                    >
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="w-4 h-4 transform transition-transform duration-200"
                        style={{ transform: openFilter === title ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  {openFilter === title && (
                    <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none filter-dropdown">
                      <div className="py-1">
                        {getUniqueOptions(title).map((option) => (
                          <label key={option} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-blue-600"
                                checked={filters[columnKeyMap[title] as keyof InventoryItem]?.has(option) || false}
                              onChange={() => handleFilterChange(title, option)}
                            />
                            <span className="ml-2">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </th>
              ))}

              {/* ✅ Sticky actions header */}
              <th className="w-32 px-4 py-2 sticky right-0 top-0 z-20 bg-white text-xs font-medium text-gray-500 uppercase flex items-center justify-center space-x-2 border-gray-200">
                <button
                  onClick={scrollLeft}
                  disabled={!canScrollLeft}
                  className="p-1 rounded-full hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {/* Left chevron */}
                  <svg
                    fill="#130562"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                    width="24px"
                    height="24px"
                  >
                    <path d="M689 165.1 308.2 493.5c-10.9 9.4-10.9 27.5 0 37L689 858.9c14.2 12.2 35 1.2 35-18.5V183.6c0-19.7-20.8-30.7-35-18.5z" />
                  </svg>
                </button>
                <div className="h-6 border-l border-gray-300" />
                <button
                  onClick={scrollRight}
                  disabled={!canScrollRight}
                  className="p-1 rounded-full hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {/* Right chevron */}
                  <svg
                    fill="#130562"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                    width="24px"
                    height="24px"
                  >
                    <path d="M715.8 493.5 335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z" />
                  </svg>
                </button>
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInventory.map((item) => (
              <tr key={item.id}>
                {/* ✅ Sticky checkbox column */}
                <td className="w-12 px-4 py-2 sticky left-0 bg-white z-10 border-r border-gray-200">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </td>

                {/* ------------------ Editable cells ------------------ */}
                {/* Ticket Type */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <select
                    value={item.ticketType}
                    onChange={(e) =>
                      handleCellChange(
                        item.id,
                        "ticketType",
                        e.target.value as InventoryItem["ticketType"]
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="E-ticket">E-ticket</option>
                    <option value="Physical">Physical</option>
                    <option value="Local Delivery">Local Delivery</option>
                    <option value="Flash Seats">Flash Seats</option>
                    <option value="Mobile Transfer">Mobile Transfer</option>
                  </select>
                </td>

                {/* Quantity */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleCellChange(item.id, "quantity", Number(e.target.value))
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-1  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>

                {/* Split Type */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <select
                    value={item.splitType}
                    onChange={(e) =>
                      handleCellChange(
                        item.id,
                        "splitType",
                        e.target.value as InventoryItem["splitType"]
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="None">None</option>
                    <option value="Even">Even</option>
                    <option value="Odd">Odd</option>
                    <option value="Pair">Pair</option>
                    <option value="Single">Single</option>
                  </select>
                </td>

                {/* Max Display Quantity */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <input
                    type="number"
                    value={item.maxDisplayQuantity}
                    onChange={(e) =>
                      handleCellChange(
                        item.id,
                        "maxDisplayQuantity",
                        Number(e.target.value)
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-1  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>

                {/* Category */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <select
                    value={item.category}
                    onChange={(e) =>
                      handleCellChange(
                        item.id,
                        "category",
                        e.target.value as InventoryItem["category"]
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="Away Fans Section">Away Fans Section</option>
                    <option value="Home Fans Section">Home Fans Section</option>
                    <option value="Lower Tier">Lower Tier</option>
                    <option value="Upper Tier">Upper Tier</option>
                    <option value="Club Level">Club Level</option>
                  </select>
                </td>

                {/* Section / Block */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <select
                    value={item.sectionBlock}
                    onChange={(e) =>
                      handleCellChange(
                        item.id,
                        "sectionBlock",
                        e.target.value as InventoryItem["sectionBlock"]
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="Longside Lower Tier">Longside Lower Tier</option>
                    <option value="Shortside Lower Tier">Shortside Lower Tier</option>
                    <option value="Longside Upper Tier">Longside Upper Tier</option>
                    <option value="Shortside Upper Tier">Shortside Upper Tier</option>
                    <option value="Block 1">Block 1</option>
                    <option value="Block 2">Block 2</option>
                    <option value="Block 3">Block 3</option>
                  </select>
                </td>

                {/* Row */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <select
                    value={item.row}
                    onChange={(e) =>
                      handleCellChange(
                        item.id,
                        "row",
                        e.target.value as InventoryItem["row"]
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    {(["5", "A", "B", "C", "1", "2", "3"] as const).map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                </td>

                {/* First Seat */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <select
                    value={item.firstSeat}
                    onChange={(e) =>
                      handleCellChange(
                        item.id,
                        "firstSeat",
                        e.target.value as InventoryItem["firstSeat"]
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    {(["1", "2", "3", "4", "5"] as const).map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Face Value */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <input
                    type="number"
                    value={item.faceValue}
                    onChange={(e) =>
                      handleCellChange(
                        item.id,
                        "faceValue",
                        Number(e.target.value)
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>

                {/* Payout Price */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <input
                    type="number"
                    value={item.payoutPrice}
                    onChange={(e) =>
                      handleCellChange(
                        item.id,
                        "payoutPrice",
                        Number(e.target.value)
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>

                {/* Seating arrangement */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <select
                    value={item.seatingArrangement}
                    onChange={(e) =>
                      handleCellChange(
                        item.id,
                        "seatingArrangement",
                        e.target.value as InventoryItem["seatingArrangement"]
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="Not Seated Together">Not Seated Together</option>
                    <option value="Seated Together">Seated Together</option>
                    <option value="Aisle Seats">Aisle Seats</option>
                    <option value="Center Seats">Center Seats</option>
                  </select>
                </td>



                {/* ✅ Sticky actions column */}
                <td className="w-32 px-4 py-5 sticky right-0 bg-white z-20 text-sm flex items-center justify-center space-x-2">
                  <button onClick={() => handleClone(item)} className={`${clonedItemIds.includes(item.id) ? 'text-green-500' : 'text-gray-400'} hover:text-gray-600`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 3H14.82C14.4 1.84 13.3 1 12 1C10.7 1 9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 3C12.55 3 13 3.45 13 4C13 4.55 12.55 5 12 5C11.45 5 11 4.55 11 4C11 3.45 11.45 3 12 3ZM14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z" fill="currentColor"/>
                    </svg>
                  </button>
                  <div className="h-6 border-l border-gray-300" />
                  <button onClick={() => handleEdit(item)} className="text-gray-400 hover:text-gray-600">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="currentColor"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </section>
  );
};

export default TableSection;