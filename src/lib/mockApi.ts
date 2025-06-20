// src/lib/mockApi.ts

export interface InventoryItem {
  id: string;
  ticketType: string;
  quantity: number;
  splitType: string;
  maxDisplayQuantity: number;
  category: string;
  sectionBlock: string;
  row: string;
  firstSeat: string;
  lastSeat?: string; // Added missing field
  faceValue: number;
  payoutPrice: number;
  seatingArrangement: string;
  dateToShip: string;
  ticketsInHand: boolean;
  matchEvent: string; // Added missing field
  fanArea: string; // Added missing field
  notes?: string; // Added missing field
}

let inventoryData: InventoryItem[] = [
  {
    id: '1',
    ticketType: 'E-ticket',
    quantity: 5,
    splitType: 'Split Type',
    maxDisplayQuantity: 5,
    category: 'Longside Lower Tier Central',
    sectionBlock: 'Block 1',
    row: '5',
    firstSeat: '3',
    lastSeat: '4',
    faceValue: 90000.00,
    payoutPrice: 90000.00,
    seatingArrangement: 'No pr',
    dateToShip: '2014-11-29',
    ticketsInHand: false,
    matchEvent: 'Chelsea vs Arsenal - Premier League',
    fanArea: 'Home',
    notes: 'Some notes here',
  },
  {
    id: '2',
    ticketType: 'E-ticket',
    quantity: 5,
    splitType: 'Split Type',
    maxDisplayQuantity: 5,
    category: 'Longside Lower Tier Central',
    sectionBlock: 'Block 1',
    row: '5',
    firstSeat: '3',
    lastSeat: '4',
    faceValue: 90000.00,
    payoutPrice: 90000.00,
    seatingArrangement: 'No pr',
    dateToShip: '2014-11-29',
    ticketsInHand: false,
    matchEvent: 'Chelsea vs Arsenal - Premier League',
    fanArea: 'Home',
    notes: 'Some notes here',
  },
  {
    id: '3',
    ticketType: 'E-ticket',
    quantity: 5,
    splitType: 'Split Type',
    maxDisplayQuantity: 5,
    category: 'Longside Lower Tier Central',
    sectionBlock: 'Block 1',
    row: '5',
    firstSeat: '3',
    lastSeat: '4',
    faceValue: 90000.00,
    payoutPrice: 90000.00,
    seatingArrangement: 'No pr',
    dateToShip: '2014-11-29',
    ticketsInHand: false,
    matchEvent: 'Chelsea vs Arsenal - Premier League',
    fanArea: 'Home',
    notes: 'Some notes here',
  },
  {
    id: '4',
    ticketType: 'E-ticket',
    quantity: 5,
    splitType: 'Split Type',
    maxDisplayQuantity: 5,
    category: 'Longside Lower Tier Central',
    sectionBlock: 'Block 1',
    row: '5',
    firstSeat: '3',
    lastSeat: '4',
    faceValue: 90000.00,
    payoutPrice: 90000.00,
    seatingArrangement: 'No pr',
    dateToShip: '2014-11-29',
    ticketsInHand: false,
    matchEvent: 'Chelsea vs Arsenal - Premier League',
    fanArea: 'Home',
    notes: 'Some notes here',
  },
  {
    id: '5',
    ticketType: 'E-ticket',
    quantity: 5,
    splitType: 'Split Type',
    maxDisplayQuantity: 5,
    category: 'Longside Lower Tier Central',
    sectionBlock: 'Block 1',
    row: '5',
    firstSeat: '3',
    lastSeat: '4',
    faceValue: 90000.00,
    payoutPrice: 90000.00,
    seatingArrangement: 'No pr',
    dateToShip: '2014-11-29',
    ticketsInHand: false,
    matchEvent: 'Chelsea vs Arsenal - Premier League',
    fanArea: 'Home',
    notes: 'Some notes here',
  },
];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getInventoryItems = async (): Promise<InventoryItem[]> => {
  await delay(500);
  return [...inventoryData];
};

export const addInventoryItem = async (item: Omit<InventoryItem, 'id'>): Promise<InventoryItem> => {
  await delay(500);
  const newItem = { ...item, id: String(inventoryData.length + 1) };
  inventoryData.push(newItem);
  return newItem;
};

export const updateInventoryItem = async (updatedItem: InventoryItem): Promise<InventoryItem> => {
  await delay(500);
  inventoryData = inventoryData.map(item =>
    item.id === updatedItem.id ? updatedItem : item
  );
  return updatedItem;
};

export const deleteInventoryItem = async (id: string): Promise<void> => {
  await delay(500);
  inventoryData = inventoryData.filter(item => item.id !== id);
};