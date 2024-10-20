"use client"; // Ensure this component is a client component

import { useEffect, useState } from "react";
import Login from "@/Components/Login";
import Signup from "@/Components/Signup";
import Image from "next/image";
import BannerImg from "@/Assets/banner-login.png";
import { Toaster } from "react-hot-toast";
import { useAuth } from "@/Contexts/AuthContext";
import { redirect } from "next/navigation";

export default function Auth() {
  const [login, setLogin] = useState(true);
  const { isAuthenticated } = useAuth(); // Get authentication state

  useEffect(() => {
    if (isAuthenticated) {
      redirect("/admin"); // Redirect to the admin page
    }
  }, [isAuthenticated, redirect]); // Add dependencies to the useEffect

  return (
    <div className="flex h-screen">
      
      <div className="flex-1 flex bg-white shadow-md">
        {login ? <Login setLogin={setLogin} /> : <Signup setLogin={setLogin} />}
      </div>
      <div className="flex-1 relative hidden lg:block">
        <Image
          src={BannerImg}
          alt="Banner"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
      </div>
    </div>
  );
}
