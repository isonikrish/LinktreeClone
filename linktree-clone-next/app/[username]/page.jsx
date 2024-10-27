// app/[username]/page.jsx
"use client"
import Preview from "@/Components/Preview";
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
    <div className={`p-4 h-[100vh] w-full flex justify-center items-center ${linktree?.bgColor}`}>
      <Preview linktrees={linktree}/>
    </div>
  );
}
