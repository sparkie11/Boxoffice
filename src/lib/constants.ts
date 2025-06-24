import { FaHome, FaPlus, FaList, FaShoppingCart, FaChartLine, FaTicketAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';

export const navItems = [
  { icon: FaHome, text: 'Home', href: '#' },
  { icon: FaPlus, text: 'Add Inventory', href: '#' },
  { icon: FaList, text: 'Inventory List', href: '/' },
  { icon: FaShoppingCart, text: 'Orders', href: '#' },
  { icon: FaChartLine, text: 'Analytics', href: '#' },
  { icon: FaTicketAlt, text: 'Events', href: '#' },
  { icon: FaCog, text: 'Settings', href: '#' },
];

export const logoutItem = { icon: FaSignOutAlt, text: 'Logout', href: '#' };