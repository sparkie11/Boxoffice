
export interface InventoryItem {
    id: string;
    ticketType: 'E-ticket' | 'Physical' | 'Local Delivery' | 'Flash Seats' | 'Mobile Transfer' | 'None' ;
    quantity: number;
    splitType: 'None' | 'Even' | 'Odd' | 'Pair' | 'Single';
    maxDisplayQuantity: number;
    category: 'Away Fans Section' | 'Home Fans Section' | 'Lower Tier' | 'Upper Tier' | 'Club Level';
    sectionBlock: 'Longside Lower Tier' | 'Shortside Lower Tier' | 'Longside Upper Tier' | 'Shortside Upper Tier' | 'Block 1' | 'Block 2' | 'Block 3';
    row: '5' | 'A' | 'B' | 'C' | '1' | '2' | '3';
    firstSeat: '1' | '2' | '3' | '4' | '5';
    lastSeat?: string;
    faceValue: number;
    payoutPrice: number;
    seatingArrangement: 'Not Seated Together' | 'Seated Together' | 'Aisle Seats' | 'Center Seats';
    dateToShip: string;
    ticketsInHand: boolean;
    matchEvent: string;
    fanArea: 'Home' | 'Away' | 'Neutral';
    notes: string;
    benefits: 'None' | 'Free Parking' | 'VIP Access' | 'Food and Beverage Included' | 'Merchandise Discount';
    restrictions: 'None' | 'Age Limit' | 'Bag Policy' | 'No Re-entry' | 'Camera Restrictions';
  }
  
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
  
  let inventoryData: InventoryItem[] = [
    {
      id: '1',
      matchEvent: 'Chelsea vs Arsenal - Premier League',
      ticketType: 'E-ticket',
      quantity: 5,
      splitType: 'None',
      seatingArrangement: 'Not Seated Together',
      maxDisplayQuantity: 30,
      fanArea: 'Home',
      category: 'Away Fans Section',
      sectionBlock: 'Longside Lower Tier',
      row: '5',
      firstSeat: '3',
      lastSeat: '4',
      faceValue: 90000,
      payoutPrice: 90000,
      dateToShip: '2024-11-10',
      ticketsInHand: true,
      notes: 'These are premium tickets with excellent views.',
      benefits: 'None',
      restrictions: 'None',
    },
    {
      id: '2',
      matchEvent: 'Manchester United vs Liverpool - Premier League',
      ticketType: 'Physical',
      quantity: 2,
      splitType: 'Even',
      seatingArrangement: 'Seated Together',
      maxDisplayQuantity: 2,
      fanArea: 'Away',
      category: 'Lower Tier',
      sectionBlock: 'Block 1',
      row: 'A',
      firstSeat: '1',
      lastSeat: '2',
      faceValue: 120000,
      payoutPrice: 110000,
      dateToShip: '2024-12-01',
      ticketsInHand: false,
      notes: 'Physical tickets will be shipped via courier.',
      benefits: 'Free Parking',
      restrictions: 'Age Limit',
    },
    {
      id: '3',
      matchEvent: 'Barcelona vs Real Madrid - La Liga',
      ticketType: 'Mobile Transfer',
      quantity: 4,
      splitType: 'None',
      seatingArrangement: 'Aisle Seats',
      maxDisplayQuantity: 4,
      fanArea: 'Home',
      category: 'Club Level',
      sectionBlock: 'Longside Upper Tier',
      row: 'C',
      firstSeat: '5',
      lastSeat: '8',
      faceValue: 200000,
      payoutPrice: 180000,
      dateToShip: '2025-01-15',
      ticketsInHand: true,
      notes: 'Mobile transfer tickets, will be sent 24 hours before the match.',
      benefits: 'VIP Access',
      restrictions: 'No Re-entry',
    },
  ];
  
  export const getInventoryItems = async (): Promise<InventoryItem[]> => {
    await delay(500);
    return [...inventoryData];
  };
  
  export const addInventoryItem = async (item: InventoryItem): Promise<InventoryItem> => {
    await delay(500);
    const newItem: InventoryItem = {
      ...item,
      id: item.id || String(inventoryData.length + 1),
    };
    inventoryData.push(newItem);
    return newItem;
  };
  
  export const updateInventoryItem = async (updatedItem: InventoryItem): Promise<InventoryItem> => {
    await delay(500);
    const index = inventoryData.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      inventoryData[index] = updatedItem;
    }
    return updatedItem;
  };
  
  export const deleteInventoryItem = async (id: string): Promise<void> => {
    await delay(500);
    inventoryData = inventoryData.filter(item => item.id !== id);
  };
  