"use client"
import React, { useEffect, useState } from 'react'
import logo from '@/Assets/logo.png'
import Image from 'next/image'
import { RiArrowLeftSLine } from "react-icons/ri";
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';

function Page() {
  const [username, setUsername] = useState(null);
  async function handleLinktreeSubmit(e) {
    e.preventDefault();
    if (username.length < 3 || username.length > 30 || username === null) {
      toast.error('Username must be between 3 and 30 characters.');
      return;
    }
    const formData = new FormData();
    formData.append("username", username);
    try {
      const response = await axios.post('/api/linktree', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 201) {
        toast.success('Linktree created successfully! 🎉');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.msg || 'Something went wrong!';
      toast.error(errorMessage);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">

      {/* Header Section */}
      <div className="flex items-center justify-between w-full max-w-xl mb-10">
        <Image src={logo} width={90} height={90} alt="Logo" />
        <Link href={'/admin'} className="flex items-center text-[#8228D9] cursor-pointer">
          <RiArrowLeftSLine className="text-2xl" />
          <p className="text-sm ml-2">Back to admin</p>
        </Link>
      </div>

      {/* Form Section */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4">Choose a username</h1>
        <p className="text-gray-500 mb-6">
          Choose a Linktree URL for your new Linktree. You can always change it later.
        </p>

        <form className="space-y-6" onSubmit={handleLinktreeSubmit}>
          {/* Username Input */}
          <div className="flex items-center border border-gray-300 rounded-lg p-4">
            <p className="text-gray-500">linktr.ee/</p>
            <input
              type="text"
              placeholder="Username"
              className="px-1 flex-grow outline-none text-gray-700 bg-transparent placeholder-gray-400"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#8228D9] text-white py-3 rounded-full font-semibold hover:bg-[#b260ff] transition"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page;
