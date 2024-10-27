"use client"; // Ensure this component is a client component

import { useEffect, useState } from "react";
import Login from "@/Components/Login";
import Signup from "@/Components/Signup";
import Image from "next/image";
import BannerImg from "@/Assets/banner-login.png";
import { redirect, useRouter} from "next/navigation";
import { useAuth } from "@/Contexts/AuthContext";
export default function Auth() {
  const [login, setLogin] = useState(true);
  const router = useRouter();
  const {isAuthenticated} = useAuth();
  useEffect(() => {
    // Redirect based on authentication status
    if (isAuthenticated) {
      router.push('/admin');
    } else {
      router.push('/'); // Redirect to home if not authenticated
    }
  }, [isAuthenticated, router]);
  return (
    <div className="flex h-screen">
      
      <div className="flex-1 flex bg-white shadow-md">
        {login ? <Login setLogin={setLogin}/> : <Signup setLogin={setLogin}/>}
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
