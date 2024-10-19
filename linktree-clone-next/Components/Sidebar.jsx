"use client"
import React, { useState } from 'react';
import { RiMenu2Line, RiSettingsLine } from 'react-icons/ri';
import { SiSimpleanalytics } from 'react-icons/si';
import { BsCircleSquare } from 'react-icons/bs';
import logo from '@/Assets/treeIcon_black.png';
import placeholder from '@/Assets/placeholder.png';
import Image from 'next/image';
import Link from 'next/link';

function Sidebar() {

  const [activeMenu, setActiveMenu] = useState('/admin');

  const handleMenuClick = (path) => {
    setActiveMenu(path);
  };

  return (
    <div className="h-screen w-64 bg-white flex flex-col justify-between px-4 py-2 shadow-2xl rounded-[40px] ml-4">
      {/* Logo Section */}
      <div className="py-6">
        <Image src={logo} width={20} alt="Logo" />
      </div>

      {/* Navigation Links */}
      <div className="flex-1">
        <ul>
          <Link href="/admin">
            <li
              onClick={() => handleMenuClick('/admin')}
              className={`flex items-center space-x-3 py-4 my-4 rounded-2xl px-2 cursor-pointer transition duration-200 ${
                activeMenu === '/admin'
                  ? 'text-[#8129D9] bg-[#F3F3F1]'
                  : 'text-gray-700 hover:text-[#8129D9] hover:bg-[#F3F3F1]'
              }`}
            >
              <RiMenu2Line className="text-2xl" />
              <span className="text-lg font-normal">Links</span>
            </li>
          </Link>

          <Link href="/admin/appearance">
            <li
              onClick={() => handleMenuClick('/admin/appearance')}
              className={`flex items-center space-x-3 py-4 my-4 rounded-2xl px-2 cursor-pointer transition duration-200 ${
                activeMenu === '/admin/appearance'
                  ? 'text-[#8129D9] bg-[#F3F3F1]'
                  : 'text-gray-700 hover:text-[#8129D9] hover:bg-[#F3F3F1]'
              }`}
            >
              <BsCircleSquare className="text-2xl" />
              <span className="text-lg font-normal">Appearance</span>
            </li>
          </Link>

          <Link href="/admin/analytics">
            <li
              onClick={() => handleMenuClick('/admin/analytics')}
              className={`flex items-center space-x-3 py-4 my-4 rounded-2xl px-2 cursor-pointer transition duration-200 ${
                activeMenu === '/admin/analytics'
                  ? 'text-[#8129D9] bg-[#F3F3F1]'
                  : 'text-gray-700 hover:text-[#8129D9] hover:bg-[#F3F3F1]'
              }`}
            >
              <SiSimpleanalytics className="text-2xl" />
              <span className="text-lg font-normal">Analytics</span>
            </li>
          </Link>

          <Link href="/admin/settings">
            <li
              onClick={() => handleMenuClick('/admin/settings')}
              className={`flex items-center space-x-3 py-4 my-4 rounded-2xl px-2 cursor-pointer transition duration-200 ${
                activeMenu === '/admin/settings'
                  ? 'text-[#8129D9] bg-[#F3F3F1]'
                  : 'text-gray-700 hover:text-[#8129D9] hover:bg-[#F3F3F1]'
              }`}
            >
              <RiSettingsLine className="text-2xl" />
              <span className="text-lg font-normal">Settings</span>
            </li>
          </Link>
        </ul>
      </div>

      {/* User Box */}
      <div className="flex items-center space-x-3 p-4 bg-[#F3F3F1] rounded-full">
        <Image src={placeholder} width={40} height={40} alt="User" className="rounded-full" />
        <p className="text-lg font-medium text-gray-800">@username</p>
      </div>
    </div>
  );
}

export default Sidebar;
