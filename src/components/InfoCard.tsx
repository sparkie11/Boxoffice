import React from 'react';

interface InfoCardProps {
  title: string;
  value: string | number;
  tickets: number | 0;
  checkbox: boolean | string;

}

const InfoCard: React.FC<InfoCardProps> = ({ title, value ,tickets , checkbox }) => {
  return (
    <div className="bg-white rounded-lg border-1 border-gray-200 p-4 flex flex-col ">
      <div className=' flex justify-between'>
      {/* <h3 className="text-lg font-semibold text-gray-700">{title}</h3> */}
      <p className="text-3xl w-75 font-bold  mt-2">{value}</p>

      <div className=' flex   '>
        {tickets != 0 && (
          <div className='p-1 m-2 flex items-center text-xs text-[#4D5481] font-bold bg-[#F8F8FA] '>
<p> {tickets } tickets </p>

          </div>
        )}
      </div>
      </div>
      <div style={{justifyContent:"space-between"}} className='flex    w-100'>
      {/* <p className="text-3xl w-75 font-bold  mt-2">{value}</p> */}
      <h3 className="text-md font-extralight text-[#8D91AF] ">{title}</h3>
        <div>

      {checkbox && (
          <input
            type="checkbox"
            className="mt-2 "
            checked={tickets > 0}
            readOnly
          />
        )}
        </div>
      {/* <div>
      </div> */}

      </div>

    </div>
  );
};

export default InfoCard;