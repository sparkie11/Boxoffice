'use client'

import React, { useState } from 'react'
import { navItems } from '../lib/constants'

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className=''>

    </div>
  )
}

export default Header
