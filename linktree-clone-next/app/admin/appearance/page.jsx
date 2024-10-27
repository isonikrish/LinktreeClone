"use client";
import { useAuth } from "@/Contexts/AuthContext.jsx";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import placeholder from "@/Assets/placeholder.png";
import { MdModeEditOutline } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

function Page() {
  const { linktree } = useAuth();
  const [bgColor, setBgColor] = useState(null);
  const [color, setColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(linktree?.image || placeholder);
  const [fileImage, setFileImage] = useState(null);

  const themes = [
    { bgColor: "bg-white", color: "text-gray-800", name: "Light Theme" },
    { bgColor: "bg-gray-800", color: "text-gray-100", name: "Dark Theme" },
    { bgColor: "bg-blue-500", color: "text-white", name: "Ocean Breeze" },
    { bgColor: "bg-green-500", color: "text-white", name: "Forest Vibes" },
    { bgColor: "bg-purple-500", color: "text-white", name: "Royal Purple" },
    { bgColor: "bg-yellow-500", color: "text-gray-800", name: "Sunny Day" },
  ];

  // Update selectedImage if linktree image changes
  useEffect(() => {
    if (linktree?.image) {
      setSelectedImage(linktree.image);
    }
  }, [linktree]);

  const handleThemeChange = (theme) => {
    setColor(theme.color);
    setBgColor(theme.bgColor);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setSelectedImage(previewUrl); // For preview
      setFileImage(file); // Store the actual file for submission
    }
    e.target.value = ""; // Reset the file input value to allow re-uploading the same file
  };

  async function handleSave(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", fileImage);
    formData.append("bgColor", bgColor);
    formData.append("color", color);
    formData.append("linktreeId", linktree._id);
    
    try {
      const response = await axios.put("/api/linktree", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        toast.success("Saved Changes! 🎉");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.msg || "Something went wrong!";
      toast.error(errorMessage);
    }
  }

  return (
    <div className={`min-h-screen flex flex-col items-center p-6 bg-gray-100 text-gray-800`}>
      {/* Profile & Theme Section */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Profile Edit Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6">Edit Profile Image</h2>
          <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-md group">
            <Image
              src={selectedImage}
              width={96}
              height={96}
              className="object-cover w-full h-full"
              alt="Profile Image"
            />
            <MdModeEditOutline
              className="absolute bottom-2 right-2 text-white bg-black bg-opacity-75 rounded-full p-1 text-2xl cursor-pointer"
              title="Edit Profile Image"
            />
            {/* File input for image upload */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              title="Upload Image"
            />
          </div>
        </div>

        {/* Theme Selection Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Choose Your Theme</h2>
          <div className="grid grid-cols-1 gap-4">
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => handleThemeChange(theme)}
                className={`p-4 rounded-lg transition duration-300 ease-in-out ${theme.bgColor} ${theme.color} 
                  ${bgColor === theme.bgColor ? "ring-4 ring-purple-400 transform scale-105" : ""}`}
              >
                <span className="text-lg font-semibold">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="w-full max-w-4xl mt-12 flex justify-center">
        <button
          className="px-8 py-4 bg-purple-600 text-white text-xl rounded-lg shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Page;
