"use client"; // Ensure this component is rendered on the client side

import React from 'react';
import logo from '@/Assets/logo.png';
import placeholder from '@/Assets/placeholder.png';
import Image from 'next/image';
import { useAuth } from '@/Contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

function Preview({ linktrees, linktree }) {
    let data;
    if (linktree) {
        data = linktree;
    } else if (linktrees) {
        data = linktrees;
    }

    const handleLinkClick = async (id, url) => {
        try {
            // Update the click count for this link
            await axios.put('/api/link', { linkId: id, incrementClicks: true });
            // Redirect to the link URL
            window.open(url, "_blank");
        } catch (error) {
            console.error("Error updating link clicks:", error);
            toast.error("An error occurred while updating clicks.");
        }
    };

    return (
        <div className={`h-[70vh] ${data?.bgColor || "bg-white"} shadow-lg rounded-xl w-[300px] mt-auto mb-auto p-6 flex flex-col items-center justify-between`}>
            {/* Top Section with Logo */}
            <div className="flex flex-col items-center mb-4">
                <Image
                    src={data?.image || placeholder}
                    alt="Linktree Image"
                    width={80}
                    height={80}
                    className='rounded-full'
                />
                <p className={`text-xl ${data?.color || "text-black"} my-2 font-semibold`}>
                    @{data?.username || 'Add a username to your Linktree.'}
                </p>
            </div>

            {/* Links Section */}
            <div className="w-full flex-1 overflow-y-auto">
                {data?.links?.map((link, index) => (
                    link.isVisible ? (
                        <div key={index} className={`w-full ${data?.bgColor || "bg-white"} rounded-lg shadow-md my-3 p-4 transition-colors duration-300 border border-white`}>
                            <a 
                                href={link.url} 
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent default anchor behavior
                                    handleLinkClick(link._id, link.url); // Call handleLinkClick
                                }} 
                                className={`text-lg font-medium ${data?.color || "text-black"} hover:underline`}
                            >
                                {link.title}
                            </a>
                        </div>
                    ) : null
                ))}
            </div>

            {/* Footer */}
            <div className="mt-4 text-sm text-gray-500">
                <Image src={logo} width={70} height={70} alt="Logo" className="mb-4" />
            </div>
        </div>
    );
}

export default Preview;
