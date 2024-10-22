// app/[username]/page.jsx
"use client"
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const { username } = params; // Access the username from params
  const[linktree, setLinktree] = useState(null);
  async function fetchLinktree() {
    if (username) {
      try {
        const response = await axios.get(`/api/linktree?username=${username}`);
        setLinktree(response.data);
      } catch (error) {
        console.error('Error fetching linktree:', error);
      }
    }
  }
  useEffect(()=>{
    fetchLinktree();
  },[])
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {username}!</h1>
      <p>This is your personalized page.</p>
    </div>
  );
}
