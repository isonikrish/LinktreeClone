"use client"
import React, { useState } from 'react'
import placeholder from '@/Assets/placeholder.png';
import { RiArrowDropDownLine, RiAccountBoxLine } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/Contexts/AuthContext';

function AccountPopup() {
    const { selectedLinktree, setSelectedLinktree, user } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);  // Toggle dropdown state

    // Function to handle the selection of a Linktree
    function handleLinktreeSelect(linktree) {
        setSelectedLinktree(linktree);  // Update the selected Linktree
        setIsDropdownOpen(false);  // Close the dropdown after selection
    }

    return (
        <div className='bg-white px-6 py-2 shadow-lg rounded-sm w-[400px]'>

            {/* Linktree box (Currently Selected Linktree) */}
            <div
                className='flex items-center py-3 gap-8 justify-center cursor-pointer hover:bg-stone-100 rounded-lg'
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
            >
                <Image src={placeholder} width={48} height={48} className='rounded-full' />
                <div className='flex flex-col items-start'>
                    <p className='font-semibold text-[20px]'>@{selectedLinktree?.username || "Select a Linktree"}</p>
                    <p className='text-[#676B5F] text-[13px]'>linktr.ee/{selectedLinktree?.username || ""}</p>
                </div>
                <RiArrowDropDownLine className={`text-3xl transition-transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
            </div>

            {/* Dropdown for selecting a Linktree */}
            {isDropdownOpen && (
                <div className='border-t'>
                    {user?.linktrees.map((linktree, index) => (
                        <div
                            key={index}
                            className='flex items-center py-3 gap-8 justify-center cursor-pointer hover:bg-stone-100 rounded-lg'
                            onClick={() => handleLinktreeSelect(linktree)}  // Select the linktree
                        >
                            <Image src={placeholder} width={48} height={48} className='rounded-full' />
                            <div className='flex flex-col items-start'>
                                <p className='font-semibold text-[20px]'>@{linktree.username}</p>
                                <p className='text-[#676B5F] text-[13px]'>linktr.ee/{linktree.username}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Button */}
            <div className='flex justify-center my-4'>
                <Link href={'/new-linktree'}>
                    <button className='border border-gray-300 py-[15px] px-[20px] w-[300px] rounded-full hover:bg-gray-200'>
                        Create a new Linktree
                    </button>
                </Link>
            </div>

            {/* Styled List */}
            <div className='mt-6'>
                <ul className='space-y-4'>
                    <li className='flex items-center gap-4 cursor-pointer hover:bg-stone-100 py-2 px-3 rounded-lg transition'>
                        <RiAccountBoxLine className='text-2xl text-gray-600' />
                        <span className='text-gray-700 text-[16px]'>My Account</span>
                    </li>
                    <li className='flex items-center gap-4 cursor-pointer py-2 px-3 rounded-lg transition hover:bg-stone-100'>
                        <CiLogout className='text-2xl text-red-600' />
                        <span className='text-red-600 text-[16px]'>Sign out</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default AccountPopup;
