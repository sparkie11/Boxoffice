"use client";

import FilterSubHead from '@/components/FilterSubHead';
import Sidebar from '../../components/Sidebar';
import HeaderInventory from '@/components/HeaderInventory';
import Overview from '@/components/Overview';
import TableSectionDynamic from '@/components/TableSectionDynamic';
import { useState, useEffect } from 'react';
import { TicketHistoryResponse } from '@/types/ticketHistoryTypes';

export default function Inventory() {
  const [ticketHistoryData, setTicketHistoryData] = useState<TicketHistoryResponse>({ 
    success: true, 
    data: { 
      data: [] 
    } 
  });

  useEffect(() => {
    // Mock data fetching or actual API call can be implemented here
    const fetchData = async () => {
      try {
        // For now, we're just setting an empty response structure
        // This can be replaced with actual API call later
        setTicketHistoryData({
          success: true,
          data: {
            data: []
          }
        });
      } catch (error) {
        console.error("Failed to fetch ticket history:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderInventory />
        <FilterSubHead />
        <Overview />
        <TableSectionDynamic ticketHistoryData={ticketHistoryData} />
      </div>
    </div>
  );
}
