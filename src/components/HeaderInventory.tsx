'use client'

import React, { useState } from 'react'
import { navItems } from '../lib/constants'

interface HeaderInventoryProps {
  // matchName?: string; // Currently unused
}

const HeaderInventory: React.FC<HeaderInventoryProps> = ({ /* matchName */ }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <header className="bg-white border-b-1 border-gray-200 shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-[#130562] text-3xl mt-1 ml-3 font-semibold">
             { 'Inventory'}
          </h1>
        </div>

        

        <div className="hidden sm:flex gap-5">
          <button className="border-1 border-blue-600 text-blue-600 text-sm font-semibold px-4 py-2 h-10 rounded-md hover:bg-blue-600 hover:text-white">
            Request Event
          </button>
          <button className="flex justify-center items-center p-2 rounded-full bg-[#00A3EE] ">
            <svg
              fill="white"
              strokeWidth="0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              height="1.5em"
              width="1.5em"
              style={{ overflow: 'visible', color: 'currentcolor' }}
            >
              <path
                fill="currentColor"
                fillOpacity="0.09"
                d="M775.3 248.9a369.62 369.62 0 0 0-119-80A370.2 370.2 0 0 0 512.1 140h-1.7c-99.7.4-193 39.4-262.8 109.9-69.9 70.5-108 164.1-107.6 263.8.3 60.3 15.3 120.2 43.5 173.1l4.5 8.4V836h140.8l8.4 4.5c52.9 28.2 112.8 43.2 173.1 43.5h1.7c99 0 192-38.2 262.1-107.6 70.4-69.8 109.5-163.1 110.1-262.7.2-50.6-9.5-99.6-28.9-145.8a370.15 370.15 0 0 0-80-119zM312 560a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96zm200 0a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96zm200 0a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"
              ></path>
              <path d="M664 512a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm-400 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0z"></path>
              <path d="M925.2 338.4c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 0 0-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 0 0-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 0 0 112 714v152a46 46 0 0 0 46 46h152.1A449.4 449.4 0 0 0 510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 0 0 142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z"></path>
              <path d="M464 512a48 48 0 1 0 96 0 48 48 0 1 0-96 0z"></path>
            </svg>
          </button>
        </div>

        {/* Hamburger icon (mobile) */}
        <div className="sm:hidden">
          <button
            onClick={toggleModal}
            className="p-2 rounded-md text-custom-dark-blue hover:bg-custom-light-blue"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Slide-in menu modal (mobile) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-end sm:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={toggleModal}
          />
          <div className="relative bg-white w-64 h-full shadow-lg p-4 animate-slide-in-right">
            <div className="flex justify-end mb-4">
              <button
                onClick={toggleModal}
                className="text-custom-dark-blue hover:text-custom-blue"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`p-2 rounded-md ${
                    item.text === 'Add Inventory'
                      ? 'text-custom-blue'
                      : 'text-custom-dark-blue'
                  } hover:bg-custom-light-blue flex items-center`}
                >
                  <item.icon className="mr-2" /> {item.text}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

export default HeaderInventory
