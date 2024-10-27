import React, { useState, useEffect } from 'react';
import { SiGoogleanalytics } from "react-icons/si";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDragHandleDots2 } from "react-icons/rx";
import axios from 'axios'; // Import axios
import { useAuth } from '@/Contexts/AuthContext';
import toast from 'react-hot-toast';

function Links({ title, url, id, linktreeId, isVisible, fetchLinktree , clicks}) {
    const [isToggled, setIsToggled] = useState(isVisible || false);
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = async (id) => {
        try {
            // Await the delete request and pass the id as query param
            const response = await axios.delete(`/api/link?id=${id}`);
            
            if (response.status === 200) {
                toast.success("Link Deleted Successfully");
                fetchLinktree(); // Call fetchLinktree to update the list after deletion
            } else {
                toast.error("Failed to delete the link.");
            }
        } catch (error) {
            console.error("Error deleting link:", error);
            toast.error("An error occurred while deleting the link.");
        }
    };

    useEffect(() => {
        setIsToggled(isVisible);
    }, [isVisible]);

    const toggleHandler = async () => {
        const newVisibility = !isToggled;
        setIsToggled(newVisibility); // Optimistically update the UI
        setIsLoading(true);

        try {
            const response = await axios.put('/api/link', {
                linkId: id,
                linktreeId: linktreeId,
                isVisible: newVisibility,  // Send the new visibility status
            });

            if (response.status === 200) {
                fetchLinktree(); // Call fetchLinktree to update the data in Preview
            } else {
                console.error('Failed to update link:', response.data.msg);
                alert(response.data.msg); // Show error message if the update fails
                setIsToggled(!newVisibility); // Revert if update fails
            }
        } catch (error) {
            console.error('Error updating link visibility:', error);
            alert('An error occurred while updating the link.');
            setIsToggled(!newVisibility); // Revert if there’s an error
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className='bg-white w-[600px] px-4 py-3 mt-4 rounded-lg shadow-md transition-transform duration-200 flex items-center gap-6 justify-between'>
                {/* Drag Handle */}
                <div className="flex justify-between items-center">
                    <RxDragHandleDots2 className="text-gray-500 cursor-move" />
                </div>

                {/* Title and URL */}
                <div className='flex flex-col flex-grow items-start mt-2'>
                    <p className='text-[16px] font-medium truncate'>{title}</p>
                    <p className='text-gray-500 break-all overflow-hidden'>{url}</p>
                    
                    {/* Icons: Analytics and Delete */}
                    <div className="flex gap-4 mt-2">
                    <span className='flex items-center gap-2'>
                        <SiGoogleanalytics className="text-gray-600 cursor-pointer hover:text-[#8129D9] transition duration-200" />
                        {clicks}</span>
                        <RiDeleteBin6Line className="text-gray-600 cursor-pointer hover:text-red-600 transition duration-200" onClick={() => onDelete(id)} />
                    </div>
                </div>

                {/* Share Icon and Toggle Switch */}
                <div className="flex justify-between items-center mt-3 gap-3">
                    <button
                        className={`flex items-center justify-between w-10 h-6 rounded-full p-1 cursor-pointer transition duration-300 ${isToggled ? 'bg-green-500' : 'bg-gray-300'}`}
                        onClick={toggleHandler}
                        disabled={isLoading} // Disable button while loading
                    >
                        <span className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${isToggled ? 'translate-x-4' : ''}`}></span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Links;
