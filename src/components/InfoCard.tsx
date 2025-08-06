import React from 'react';

interface InfoCardProps {
  title: string;
  value: string | number;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, value }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-indigo-600 mt-2">{value}</p>
    </div>
  );
};

export default InfoCard;