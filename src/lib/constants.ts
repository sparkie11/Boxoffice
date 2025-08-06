import { FaHome, FaPlus, FaList, FaShoppingCart, FaChartLine, FaTicketAlt, FaCog, FaSignOutAlt, FaArrowRight } from 'react-icons/fa';

export const navItems = [

  
  { icon: FaArrowRight, text: 'Right', href: '#' },
  { icon: "MJ", text: 'Home', href: '#' },
  { icon: FaPlus, text: 'Add Inventory', href: '#' },
  { icon: FaList, text: 'Inventory List', href: '/inventory' },
  { icon: FaShoppingCart, text: 'Orders', href: '#' },
  { icon: FaChartLine, text: 'Analytics', href: '#' },
  { icon: FaTicketAlt, text: 'Events', href: '#' },
  { icon: FaCog, text: 'Settings', href: '#' },
];

export const logoutItem = { icon: FaSignOutAlt, text: 'Logout', href: '#' };