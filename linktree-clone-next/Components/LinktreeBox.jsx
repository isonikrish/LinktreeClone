"use client"
import React, { useState } from 'react'
import placeholder from '@/Assets/placeholder.png'
import Image from 'next/image'
import { CiInstagram, CiFacebook, CiYoutube } from "react-icons/ci";
import { MdOutlineEmail, MdAdd, MdEdit } from "react-icons/md"; // Added Add and Edit icons
import { useAuth } from '@/Contexts/AuthContext';
import AddLink from './AddLink';

function LinktreeBox() {
    const { selectedLinktree } = useAuth();
    const [addLinkOpen, setAddLinkOpen] = useState(false);
    const handleEditProfilePic = () => {
        console.log("Edit profile picture clicked");
    };

    const handleAddSocialImage = (platform) => {
        console.log(`Add image for ${platform} clicked`);
    };

    return (
        <>

            <div className="flex flex-row items-center p-6 mx-auto space-y-4 space-x-5">
                <div className="w-20 h-20 rounded-full overflow-hidden relative">
                    <Image src={selectedLinktree?.profilePic || placeholder} alt="Profile" width={80} height={80} className="object-cover" />


                    <div
                        onClick={handleEditProfilePic}
                        className="absolute right-1 bottom-4 bg-white p-1 rounded-full hover:bg-gray-300 cursor-pointer z-10"
                        title="Edit Profile Picture"
                    >
                        <MdEdit className="text-gray-600 text-[20px]" />
                    </div>

                </div>


                {/* Username and Social Media Icons with Add Image Icon */}
                <div className="text-left">
                    <p className="font-medium text-2xl">@{selectedLinktree?.username}</p>
                    <div className="flex space-x-4 mt-2 justify-center text-2xl text-gray-400">

                        <div className="relative">
                            <CiInstagram className="hover:text-pink-500 cursor-pointer text-[25px]" />
                            <div
                                onClick={() => handleAddSocialImage('Instagram')}
                                className="absolute -top-1 -right-2 bg-white p-1 rounded-full border border-gray-300 hover:bg-gray-100 cursor-pointer"
                                title="Add Image to Instagram"
                            >
                                <MdAdd className="text-black text-[10px]" />
                            </div>
                        </div>


                        <div className="relative">
                            <CiFacebook className="hover:text-blue-500 cursor-pointer text-[25px]" />
                            <div
                                onClick={() => handleAddSocialImage('Facebook')}
                                className="absolute -top-1 -right-2 bg-white p-1 rounded-full border border-gray-300 hover:bg-gray-100 cursor-pointer"
                                title="Add Image to Facebook"
                            >
                                <MdAdd className="text-black text-[10px]" />
                            </div>
                        </div>


                        <div className="relative">
                            <CiYoutube className="hover:text-red-500 cursor-pointer text-[25px]" />
                            <div
                                onClick={() => handleAddSocialImage('YouTube')}
                                className="absolute -top-1 -right-2 bg-white p-1 rounded-full border border-gray-300 hover:bg-gray-100 cursor-pointer"
                                title="Add Image to YouTube">
                                <MdAdd className="text-black text-[10px]" />
                            </div>
                        </div>


                        <div className="relative">
                            <MdOutlineEmail className="hover:text-yellow-500 cursor-pointer text-[25px]" />
                            <div
                                onClick={() => handleAddSocialImage('Email')}
                                className="absolute -top-1 -right-2 bg-white p-1 rounded-full border border-gray-300 hover:bg-gray-100 cursor-pointer"
                                title="Add Image to Email"
                            >
                                <MdAdd className="text-black text-[10px]" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {addLinkOpen ? <AddLink setAddLinkOpen={setAddLinkOpen} linktreeId ={selectedLinktree._id}/> :
                <>
                    <button className='w-[80%] text-white border-none text-[24px] p-3 flex items-center justify-center gap-2 rounded-full bg-[#8129D9] font-semibold' onClick={() => setAddLinkOpen(!addLinkOpen)}><MdAdd />Add a link</button></>}
        </>
    );
}

export default LinktreeBox;
