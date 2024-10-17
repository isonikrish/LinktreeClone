"use client"
import React, { useState } from 'react'
import logo from '@/Assets/logo.png'
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Image from 'next/image'
import axios from 'axios';
import toast from 'react-hot-toast';
function Login({ setLogin }) {
    const [showPassword, setShowPassword] = useState(false);
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Toggle function for showing/hiding password
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("email",email);
        formData.append("password",password);
        
        try {
            const response = await axios.post('/api/auth/login', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                toast.success('Login Successfully! 🎉');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.msg || 'Something went wrong!';
            toast.error(errorMessage);
        }
    }
    return (
        <div className='w-full h-full'>
            <div className='px-12 py-12'>
                <Image src={logo} width={120} />
            </div>
            <div className="flex flex-col items-center justify-center w-full h-[70%]">
                <div className="mb-6 text-center">
                    <h3 className='text-textColor text-[50px] font-extrabold'>Welcome back!</h3>
                    <p className="text-concrete text-md">Log in to your Linktree</p>
                </div>
                <form className="w-full px-10" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type='text'
                            placeholder='Email'
                            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8128D9]'
                            onChange={(e)=> setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>
                    <div className="mb-4 relative flex items-center">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8128D9]'
                            onChange={(e)=>setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 text-gray-600 focus:outline-none"
                        >
                            {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#8128D9] text-white font-semibold py-4 rounded-full transition duration-200 text-xl"
                    >
                        Log In
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <span className="text-gray-600">Don't have an account? </span>
                    <span
                        onClick={() => setLogin(false)}
                        className="text-[#8128D9] cursor-pointer hover:underline select-none"
                    >
                        Sign Up
                    </span>
                </div>
            </div>

        </div>
    )
}

export default Login