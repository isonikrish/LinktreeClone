"use client";
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

function AddLink({ setAddLinkOpen, linktreeId }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  async function handleLinkSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("url", url);
    formData.append("linktreeId", linktreeId);

    try {
      const response = await axios.post('/api/link', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 201) {
        toast.success('Link created');
        setTitle("");
        setUrl("")
      }
    } catch (error) {
      const errorMessage = error.response?.data?.msg || 'Something went wrong!';
      toast.error(errorMessage);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-[60vh] bg-white rounded-lg mt-5 shadow-lg relative">
      <div
        className='absolute top-10 right-10 text-3xl cursor-pointer flex items-center justify-center w-12 h-12 p-0 m-0 hover:bg-gray-200 rounded-full'
        onClick={() => setAddLinkOpen(false)}
      >
        x
      </div>

      <form className="flex flex-col items-center w-[90%]" onSubmit={handleLinkSubmit}>
        <div className="mb-4 w-full">
          <label className="block text-gray-700 mb-1">Enter Title</label>
          <input
            type="text"
            placeholder='Title'
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8129D9] transition duration-200"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block text-gray-700 mb-1">Enter URL</label>
          <input
            type="text"
            placeholder='URL'
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8129D9] transition duration-200"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className='w-full text-white text-[24px] p-3 rounded-full bg-[#8129D9] font-semibold hover:bg-[#6e24a3] transition duration-200'
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default AddLink;
