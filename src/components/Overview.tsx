'use client'

import React, { useState, useEffect } from 'react'
import InfoCard from './InfoCard';

interface OverviewData {
  data: {
    events: number;
    listings: number;
    published_listings: number;
    tickets: number;
    unpublished_listings: number;
  };
}

const Overview: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)


  const [data, setData] = useState<OverviewData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch('https://seller.listmyticket.com/seller/my-listings/overview', {
          headers: {
            'Authorization': `Bearer 636|5CDoPSftCNvIjj7i07fNm1WoxtOqbRwtqBjuI9JBced09850`
          }
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
        }

        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data, "data")

  return (
    <>
      <div className="bg-white   shadow-sm p-4 flex justify-between items-center">
        <h2>Overview</h2>
      </div>
      <div className="p-4 bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data && data.data && (
          <>
            <InfoCard title="Events" value={data.data.events} tickets={0} checkbox={false} />
            <InfoCard title="Listings" value={data.data.listings} tickets={data.data.tickets}  checkbox={false} />
            <InfoCard title="Published Listings" value={data.data.published_listings} tickets={data.data.tickets} checkbox={true} />
            {/* <InfoCard title="Tickets" value={data.data.tickets} /> */}
            <InfoCard title="Unpublished Listings" value={data.data.unpublished_listings} tickets={data.data.tickets} checkbox={true} />
          </>
        )}
      </div>
    </>
  )
}

export default Overview
