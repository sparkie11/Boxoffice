import React from 'react';

interface InfoCardProps {
  title: string;
  value: string | number;
  tickets: number | 0;
  checkbox: boolean | string;

}

const InfoCard: React.FC<InfoCardProps> = ({ title, value ,tickets , checkbox }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
      <div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <div>
        {tickets != 0 && (
          <input
            type="checkbox"
            className="mt-2"
            checked={tickets > 0}
            readOnly
          />
        )}
      </div>
      </div>
      <div>
      <p className="text-3xl font-bold text-indigo-600 mt-2">{value}</p>
      <div>
      {checkbox && (
          <input
            type="checkbox"
            className="mt-2"
            checked={tickets > 0}
            readOnly
          />
        )}
      </div>

      </div>

    </div>
  );
};

export default InfoCard;