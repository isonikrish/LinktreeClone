"use client"
import React, { useEffect, useState } from 'react';
import logo from '@/Assets/logo.png';
import placeholder from '@/Assets/placeholder.png'
import Image from 'next/image';
import { useAuth } from '@/Contexts/AuthContext';
import axios from 'axios';

function Preview() {
    const { linktree } = useAuth();


    return (
        <div className="h-[70vh] bg-white shadow-lg rounded-xl w-[300px] mt-auto mb-auto p-6 flex flex-col items-center justify-between">
            {/* Top Section with Logo */}
            <div className="flex flex-col items-center mb-4">

                <Image
                    src={linktree?.image || placeholder}
                    alt="Linktree Image"
                    width={100}
                    height={100}
                    className='rounded-full'
                />
                <p className="text-xl text-black my-2 font-semibold">
                    @{linktree?.username || 'Add a username to your Linktree.'}
                </p>

            </div>

            {/* Links Section */}
            <div className="w-full flex-1 overflow-y-auto">
                {linktree?.links?.map((link, index) => (
                    link.isVisible ? (  
                        <div key={index} className="w-full bg-gray-100 hover:bg-gray-200 rounded-lg shadow-md my-3 p-4 transition-colors duration-300">
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-black hover:underline">
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
