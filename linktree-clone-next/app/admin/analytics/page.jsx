"use client";
import { useAuth } from '@/Contexts/AuthContext';
import React from 'react';

function AnalyticsPage() {
  const { linktree } = useAuth();

  const totalClicks = linktree?.links.reduce((acc, link) => acc + link.clicks, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Analytics for @{linktree?.username}</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Total Clicks: <span className="text-pink-600">{totalClicks}</span>
        </h2>
        <h3 className="text-lg font-medium mb-2 text-gray-600">Link Clicks Overview:</h3>
        <ul className="space-y-4">
          {linktree?.links.map((link) => (
            link.isVisible && ( // Only display visible links
              <li key={link._id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow hover:shadow-md transition duration-300">
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline font-medium"
                >
                  {link.title}
                </a>
                <span className="text-gray-500 font-semibold">{link.clicks} clicks</span>
              </li>
            )
          ))}
        </ul>
      </div>

      {/* Additional Section for Link Analytics */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4 text-gray-600">Link Performance Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {linktree?.links.map((link) => (
            link.isVisible && (
              <div key={link._id} className="flex flex-col items-start bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition duration-300">
                <h4 className="text-lg font-semibold text-gray-800">{link.title}</h4>
                <p className="text-gray-600">URL: <span className="text-blue-600">{link.url}</span></p>
                <p className="text-gray-600">Clicks: <span className="font-bold">{link.clicks}</span></p>
                <p className="text-gray-600">Created At: <span className="font-semibold">{new Date(link.createdAt).toLocaleDateString()}</span></p>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
