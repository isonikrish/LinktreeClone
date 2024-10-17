"use client"
import React, { useState } from 'react';
import logo from '@/Assets/logo.png';
import Image from 'next/image';
import { IoEyeOutline, IoEyeOffOutline  } from "react-icons/io5";
import { toast } from 'react-hot-toast'; 
import axios from 'axios';
function Signup({ setLogin }) {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Toggle function for showing/hiding password
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const onSignup = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username",username);
        formData.append("email",email);
        formData.append("password",password);

        try {
            const response = await axios.post('/api/auth/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 201) {
                toast.success('Account created successfully! 🎉');
                setLogin(true);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.msg || 'Something went wrong!';
            toast.error(errorMessage);
        }
    }
    return (
        <div className='w-full h-full'>
            <div className='px-12 py-12'>
                <Image src={logo} width={120} alt="Logo" />
            </div>
            <div className="flex flex-col items-center justify-center w-full h-[70%]">
                <div className="mb-6 text-center">
                    <h3 className='text-textColor text-[50px] font-extrabold'>Create your account!</h3>
                    <p className="text-concrete text-md">Sign up for your Linktree</p>
                </div>
                <form className="w-full px-10" onSubmit={onSignup}>
                    <div className="mb-4">
                        <input
                            type='text'
                            placeholder='Username'
                            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8128D9]'
                            onChange={(e)=>setUsername(e.target.value)}
                            value={username}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type='email'
                            placeholder='Email'
                            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8128D9]'
                            onChange={(e)=>setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className="mb-4 relative flex items-center">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8128D9]'
                            onChange={(e)=>setPassword(e.target.value)}
                            value={password}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 text-gray-600 focus:outline-none"
                        >
                            {showPassword ?  <IoEyeOutline /> :  <IoEyeOffOutline />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#8128D9] text-white font-semibold py-4 rounded-full transition duration-200 text-xl"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <span className="text-gray-600">Already have an account? </span>
                    <span
                        onClick={() => setLogin(true)}
                        className="text-[#8128D9] cursor-pointer hover:underline  select-none"
                    >
                        Log In
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Signup;
