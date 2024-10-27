import { useAuth } from '@/Contexts/AuthContext';
import React from 'react';

function LinktreeCTA() {
    const { linktree } = useAuth();

    return (
        <div className="flex justify-between items-center p-4 m-8 bg-[#DFE8F9] rounded-full">
            <h2 className="text-xl font-semibold  text-gray-800">
                🔥 Your Linktree is live: <a 
                href={`http://localhost:3000/${linktree?.username}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-black-500 underline font-normal"
            >
                linktr.ee/{linktree?.username}
            </a>
            </h2>
           

            <button 
                className="bg-white text-black px-8 py-4 rounded-full transition duration-200 text-xl font-semibold"
                onClick={() => navigator.clipboard.writeText(`http://localhost:3000/${linktree?.username}`)}
            >
                Copy your Linktree URL
            </button>
        </div>
    );
}

export default LinktreeCTA;
