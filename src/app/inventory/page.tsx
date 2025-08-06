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
    const fetchData = async () => {
      try {
        const response = await fetch('https://seller.listmyticket.com/seller/my-listings/ticket-history', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer 636|5CDoPSftCNvIjj7i07fNm1WoxtOqbRwtqBjuI9JBced09850`
          },
          cache: 'no-store'
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: TicketHistoryResponse = await response.json();
        setTicketHistoryData(data);
      } catch (error) {
        console.error("Failed to fetch ticket history:", error);
      }
    };

    fetchData();
  }, []);

  const matchName = ticketHistoryData.data.data.length > 0 
    ? ticketHistoryData.data.data[0].match_info.match_name
    : undefined;

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overere">
        <HeaderInventory matchName={matchName} />
        <FilterSubHead />
        <Overview />
        <TableSectionDynamic ticketHistoryData={ticketHistoryData} />
      </div>
    </div>
  );
}
