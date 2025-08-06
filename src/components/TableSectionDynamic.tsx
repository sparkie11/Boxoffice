import React, { useEffect, useMemo, useRef, useState } from 'react'
import { TicketHistoryResponse } from '../types/ticketHistoryTypes'
import { InventoryItem } from '../lib/mockApi';

interface TableSectionProps {
  ticketHistoryData: TicketHistoryResponse
}

const TableSectionDynamic: React.FC<TableSectionProps> = ({ ticketHistoryData }) => {
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [openFilter, setOpenFilter] = useState<string | null>(null)
  const [isTableVisible, setIsTableVisible] = useState<Record<string, boolean>>({}) // State for table visibility per match

    // Add missing states
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>([])
  const [filters] = useState<Record<keyof InventoryItem, Set<string>>>({} as Record<keyof InventoryItem, Set<string>>)


  const uniqueMatchNames = useMemo(() => {
    const names = new Set<string>();
    inventory.forEach(item => names.add(item.matchEvent));
    return Array.from(names);
  }, [inventory]);

  console.log(inventory,"qinventory")

  // const handleCloneItem = (id: string) => {
  //   setInventory(prevInventory => {
  //     const itemToClone = prevInventory.find(item => item.id === id);
  //     if (!itemToClone) return prevInventory;

  //     const clonedItem = { ...itemToClone, id: `${itemToClone.id}-clone-${Date.now()}` };
  //     const newInventory = [...prevInventory, clonedItem];
  //     setClonedItemIds(prev => [...prev, clonedItem.id]);
  //     return newInventory;
  //   });
  // };

  // Column key mapping for filters
  // const columnKeyMap: Record<string, keyof InventoryItem> = {
  //   'Match Info': 'matchEvent',
  //   'Ticket Type': 'ticketType',
  //   'Category': 'category',
  //   'Quantity': 'quantity',
  //   'Price': 'payoutPrice'
  // }

  // Function to fetch ticket history data
  // async function getTicketHistoryData(): Promise<TicketHistoryResponse | null> {
  //   try {
  //     const response = await fetch('https://seller.listmyticket.com/seller/my-listings/ticket-history', {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Bearer 636|5CDoPSftCNvIjj7i07fNm1WoxtOqbRwtqBjuI9JBced09850`
  //       },
  //       cache: 'no-store' // Ensure data is always fresh
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log('Ticket history data:', data);
  //     return data;
  //   } catch (error) {
  //     console.error("Failed to fetch ticket history:", error);
  //     return null;
  //   }
  // }

  // Initialize inventory data and fetch ticket history
  useEffect(() => {
    if (ticketHistoryData && ticketHistoryData.data && ticketHistoryData.data.data) {
      const transformedData: InventoryItem[] = ticketHistoryData.data.data.flatMap(item => {
        const matchInfo = item.match_info;
        return item.tickets.map(ticket => ({
          id: `${matchInfo.m_id}-${ticket.s_no}`,
          ticketsInHand: ticket.ticket_in_hand === 1, // Convert to boolean
          ticketStatus: ticket.ticket_in_hand === 1 ? 'In Hand' : 'Not In Hand', // Map to a status string
          listingId: ticket.s_no.toString(),
          matchEvent: matchInfo.match_name,
          date: matchInfo.match_date,
          time: matchInfo.match_time,
          venue: matchInfo.venue.toString(),
          stadium: matchInfo.stadium_name,
          ticketType: ticket.ticket_type as InventoryItem['ticketType'],
          category: ticket.ticket_category as InventoryItem['category'],
          quantity: ticket.quantity,
          payoutPrice: ticket.price,
          maxDisplayQuantity: ticket.quantity, // Assuming quantity can be maxDisplayQuantity
          faceValue: 0, // Default value, as it's not in the API response
          seatingArrangement: 'Seated Together', // Default value
          dateToShip: 'N/A', // Default value
          fanArea: 'Neutral', // Default value
          benefits: 'None', // Default value
          restrictions: 'None', // Default value
          row: ticket.row as InventoryItem['row'],
          sectionBlock: ticket.ticket_block as InventoryItem['sectionBlock'] || 'Block 1',
          firstSeat: (ticket.first_seat === null || ticket.first_seat === '') ? '1' : ticket.first_seat as '1' | '2' | '3' | '4' | '5',
          lastSeat: ticket.seat ? ticket.seat.toString() : undefined,
          splitType: ticket.split.name as InventoryItem['splitType'],
          notes: ticket.listing_note ? ticket.listing_note.map(note => note.name).join(', ') : '',
          barcode: 'N/A',
          serialNumber: ticket.s_no.toString(),
          ticketId: ticket.s_no.toString(),
          matchId: matchInfo.m_id.toString() // Ensure matchId is a string
        
        }));
      });
      setInventory(transformedData);
    }
  }, [ticketHistoryData]);

  useEffect(() => {
    const initialVisibility: Record<string, boolean> = {};
    uniqueMatchNames.forEach(matchName => {
      initialVisibility[matchName] = true; // Set all tables to be visible by default
    });
    setIsTableVisible(initialVisibility);
  }, [uniqueMatchNames]);

  // Filter inventory based on selected filters
  useEffect(() => {
    let currentFilteredInventory = inventory;
    Object.entries(filters).forEach(([key, values]) => {
      if (values.size > 0) {
        currentFilteredInventory = currentFilteredInventory.filter(item => values.has(String(item[key as keyof InventoryItem])));
      }
    });
    setFilteredInventory(currentFilteredInventory);
  }, [inventory, filters]);

  // Handle scroll for table
  useEffect(() => {
    const tableContainer = tableContainerRef.current;
    if (tableContainer) {
      const handleScroll = () => {
        setCanScrollLeft(tableContainer.scrollLeft > 0);
        setCanScrollRight(tableContainer.scrollLeft < tableContainer.scrollWidth - tableContainer.clientWidth);
      };

      tableContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check

      return () => {
        tableContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const scrollLeft = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };






  // const handleDeleteItem = async (id: string) => {
  //   try {
  //     await deleteInventoryItem(id);
  //     setInventory(prev => prev.filter(item => item.id !== id));
  //     setFilteredInventory(prev => prev.filter(item => item.id !== id));
  //   } catch (error) {
  //     console.error("Failed to delete item:", error);
  //   }
  // };

  // 2️⃣  Check horizontal scroll ability on mount + scroll + resize.
  useEffect(() => {
    const container = tableContainerRef.current
    if (!container) return

    const checkScroll = () => {
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth,
      )
    }

    checkScroll()
    container.addEventListener('scroll', checkScroll)
    window.addEventListener('resize', checkScroll)
    return () => {
      container.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  // 3️⃣ Close filter dropdown when clicking outside.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openFilter &&
        !(
          (event.target as HTMLElement).closest('.filter-dropdown') ||
          (event.target as HTMLElement).closest('.filter-button')
        )
      ) {
        setOpenFilter(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openFilter])

  /* ------------------------------------------------------------------ */
  /*                             HANDLERS                               */
  /* ------------------------------------------------------------------ */
  // const scrollLeft = () => {
  //   tableContainerRef.current?.scrollBy({ left: -200, behavior: 'smooth' })
  // }

  // const scrollRight = () => {
  //   tableContainerRef.current?.scrollBy({ left: 200, behavior: 'smooth' })
  // }

  // Handle filter button click
  const handleFilterClick = (columnName: string) => {
    setOpenFilter(openFilter === columnName ? null : columnName)
  }

  // Handle checkbox change for row selection
  const handleCheckboxChange = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectedItems.length === inventory.length && inventory.length > 0) {
      setSelectedItems([])
    } else {
      setSelectedItems(inventory.map(item => item.id))
    }
  }

  // Handle cell value change
  const handleCellChange = (id: string, field: keyof InventoryItem, value: string | number) => {
    setInventory(prev =>
      prev.map(item =>
        item.id === id ? { ...item, [field]:
          (field === 'quantity' || field === 'maxDisplayQuantity') ? Number(value) : value
        } : item
      )
    )
    setFilteredInventory(prev =>
      prev.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    )
  }

  // // Get unique options for filter dropdowns
  // const getUniqueOptions = (columnName: string): string[] => {
  //   const key = columnKeyMap[columnName] as keyof InventoryItem
  //   if (!key) return []
    
  //   const options = new Set<string>()
  //   inventory.forEach(item => {
  //     const value = item[key]
  //     if (value !== undefined && value !== null) {
  //       options.add(String(value))
  //     }
  //   })
    
  //   return Array.from(options)
  // }

  // Handle filter change
  // const handleFilterChange = (columnName: string, option: string) => {
  //   const key = columnKeyMap[columnName] as keyof InventoryItem
  //   if (!key) return
    
  //   setFilters(prev => {
  //     const newFilters = { ...prev }
  //     if (!newFilters[key]) {
  //       newFilters[key] = new Set<string>()
  //     }
      
  //     if (newFilters[key].has(option)) {
  //       newFilters[key].delete(option)
  //     } else {
  //       newFilters[key].add(option)
  //     }
      
  //     return newFilters
  //   })
  // }

  // Apply filters to inventory
  useEffect(() => {
    let result = [...inventory]
    
    // Apply each filter
    Object.entries(filters).forEach(([key, values]) => {
      if (values.size > 0) {
        result = result.filter(item => {
          const itemValue = item[key as keyof InventoryItem];
          return Array.from(values).some(value => String(itemValue) === value)

        })
      }
    })
    
    setFilteredInventory(result)
  }, [inventory, filters])













  return (
    <>
      {uniqueMatchNames.map((matchName) => {
        const matchInfo = ticketHistoryData?.data?.data?.find(
          item => item.match_info?.match_name === matchName
        )?.match_info;

        // Filter inventory for the current matchName
        const matchFilteredInventory = filteredInventory.filter(
          item => item.matchEvent === matchName
        );

        if (matchFilteredInventory.length === 0) {
          return null; // Don't render a table if there are no items for this match
        }
        console.log(matchFilteredInventory,"matchFilteredInventory")

        return (
          <React.Fragment key={matchName}>
          <section key={matchName} className= "p-6 bg-white mt-1 mb-20 rounded-lg shadow-md">
            <div
              className="flex justify-between items-center text-white "
              style={{ backgroundColor: '#130562' }}
            >
              <div className="flex items-center flex-grow flex-wrap">
                <div className="flex items-center space-x-2 border-r border-[#423283] flex-shrink-0 border-none">
                  <div className="px-4 py-3 sticky left-0 z-10 border-r border-[#423283]">
                    <input type="radio" name="" id="" className="w-4 h-4" />
                  </div>
                  <div className="flex items-center flex-grow flex-wrap">
                    <h6 className="text-sm flex gap-1 font-semibold custom-table-header-width">
                      {matchName}
                    </h6>
                    <div className="flex-wrap items-center text-sm ml-4 gap-2 hidden md:flex">
                      <div className="flex items-center space-x-4 pr-8 h-10 border-r border-[#423283] border-none">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#fff">
                          <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" />
                        </svg>
                        <span>
                          {matchInfo?.match_date || 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 px-2 border-r h-10 border-[#423283] border-none pr-8">
                        <svg
                          className="h-5 w-5 text-white"
                          fill="none"
                          stroke="white"
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
                        <span>
                        {matchInfo?.match_time || 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 pl-2">
                      <svg
                        className="h-5 w-5  text-white"
                        fill="none"
                        stroke="white"
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
                      <span>
                        {matchInfo?.venue && matchInfo?.stadium_name
                          ? `${matchInfo.venue}, ${matchInfo.stadium_name}`
                          : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm flex-shrink-0 px-4 border-[#423283] border-l h-10">
          <button
            onClick={() => setIsTableVisible(prevState => ({
              ...prevState,
              [matchName]: !prevState[matchName]
            }))}
            className="p-1   hover:bg-gray-300"
            aria-label="Toggle Table Visibility"
          >
            <svg xmlns="http://www.w3.org/2000/svg"
                   className={`h-5 w-5 text-[#fff] transform ${
                    isTableVisible[matchName] ? '' : 'rotate-180'
                  }`} 
             height="24px" viewBox="0 -960 960 960" width="24px" fill="white"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg>
          </button>
        </div>
      </div>

      {/* TABLE */}
      {isTableVisible[matchName] && (
        <div
          ref={tableContainerRef}
          className="overflow-x-auto  border border-gray-200 hide-scrollbar overflow-y-hidden rounded-md"
        >
          <table className="min-w-[1920px] table-fixed   divide-y divide-gray-200">
            <thead>
              <tr>
                {/* ✅ Sticky checkbox header */}
                <th className=" px-4 py-2 sticky left-0 top-0 bg-gray-50 z-20 border-r border-gray-200">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    checked={
                      selectedItems.length === inventory.length &&
                      inventory.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>

                {/* Column headers */}
                {/* Static columns that always appear */}
                {['Listing ID', 'Ticket Type', 'Quantity', 'Sold', 'Split Type', 'Seating Arrangement', 'Max Display Quantity', 'Category', 'Section/Block', 'Row', 'First Seat', 'Last Seat', 'Notes', 'Barcode', 'Serial Number', 'Ticket ID', 'Match ID'].map(title => (
                  <th
                    key={title}
                    className="px-4 py-2 text-left text-nowrap text-xs font-medium text-gray-500 uppercase border-r border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="capitalize-first">{title}</div>
                      <button
                        onClick={e => {
                          e.stopPropagation() // Prevent sorting when clicking filter icon
                          handleFilterClick(title)
                        }}
                        className="ml-2 p-1 rounded-full hover:bg-gray-200 filter-button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="gray"
                          className="transform transition-transform duration-200"
                          style={{
                            transform:
                              openFilter === title
                                ? 'rotate(180deg)'
                                : 'rotate(0deg)',
                          }}
                        >
                          <path d="M480-360 280-560h400L480-360Z" />
                        </svg>
                      </button>
                    </div>
                  </th>
                ))}
                <th className="w-42 px-4 py-2 sticky right-0 top-0 z-20 bg-white border-l border-gray-300 text-xs font-medium text-gray-500 uppercase flex items-center justify-end space-x-1 ">
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
                  <div className="" />
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
            <tbody>
              {matchFilteredInventory.map(item => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="px-4 py-2 sticky left-0 bg-white z-10 border-r border-gray-200 group-hover:bg-[#EFF1FD]">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                    <input
                      type="text"
                      value={item.listingId}
                      onChange={e => handleCellChange(item.id, 'listingId', e.target.value)}
                      className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                    <input
                      type="text"
                      value={item.ticketType}
                      onChange={e => handleCellChange(item.id, 'ticketType', e.target.value)}
                      className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={e => handleCellChange(item.id, 'quantity', parseInt(e.target.value))}
                      className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                    <input
                      type="text"
                      value={item.ticketStatus}
                      onChange={e => handleCellChange(item.id, 'ticketStatus', e.target.value)}
                      className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                    <input
                      type="text"
                      value={item.splitType}
                      onChange={e => handleCellChange(item.id, 'splitType', e.target.value)}
                      className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                    <input
                      type="text"
                      value={item.seatingArrangement}
                      onChange={e => handleCellChange(item.id, 'seatingArrangement', e.target.value)}
                      className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                    <input
                      type="number"
                      value={item.maxDisplayQuantity}
                      onChange={e => handleCellChange(item.id, 'maxDisplayQuantity', parseInt(e.target.value))}
                      className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                    <input
                      type="text"
                      value={item.category}
                      onChange={e => handleCellChange(item.id, 'category', e.target.value)}
                      className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                    <input
                      type="text"
                      value={item.sectionBlock}
                      onChange={e => handleCellChange(item.id, 'sectionBlock', e.target.value)}
                      className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                    <input
                      type="text"
                      value={item.row}
                      onChange={e => handleCellChange(item.id, 'row', e.target.value)}
                      className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                    <input
                      type="text"
                      value={item.firstSeat}
                      onChange={e => handleCellChange(item.id, 'firstSeat', e.target.value)}
                      className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                    <input
                      type="text"
                      value={item.lastSeat}
                      onChange={e => handleCellChange(item.id, 'lastSeat', e.target.value)}
                      className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                    <input
                      type="text"
                      value={item.notes}
                      onChange={e => handleCellChange(item.id, 'notes', e.target.value)}
                      className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                    <input
                      type="text"
                      value={item.barcode}
                      onChange={e => handleCellChange(item.id, 'barcode', e.target.value)}
                      className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                    <input
                      type="text"
                      value={item.serialNumber}
                      onChange={e => handleCellChange(item.id, 'serialNumber', e.target.value)}
                      className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                    <input
                      type="text"
                      value={item.ticketId}
                      onChange={e => handleCellChange(item.id, 'ticketId', e.target.value)}
                      className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                    <input
                      type="text"
                      value={item.matchId}
                      onChange={e => handleCellChange(item.id, 'matchId', e.target.value)}
                      className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="bg-white text-sm text-gray-900 flex space-x-2 w-42 px-4 py-5 sticky right-0">

                    <button
                      // onClick={() => handleEditItem(item)}
                      className="text-black hover:text-red-900"
                    >
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="currentColor"
                      >
                        <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                      </svg> */}
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="green"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
                    </button>
                    <div className="h-6 border-r-custom"></div>

                    {/*  */}

                    <button
                      // onClick={() => handleEditItem(item)}
                      className="text-black hover:text-red-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="currentColor"
                      >
                        <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                      </svg>
                    </button>
                    <div className="h-6 border-r-custom"></div>
  

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
          </section>
          </React.Fragment>
        );
      })}

      {/* Scroll buttons */}
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg"
        >
          &lt;
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg"
        >
          &gt;
        </button>
      )}
    </>
  )
}

export default TableSectionDynamic
