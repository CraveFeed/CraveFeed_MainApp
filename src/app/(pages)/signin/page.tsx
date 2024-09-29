"use client"
import '../signin/login.css'
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setUserId } from '@/lib/features/services/global';
import { useRouter } from 'next/navigation';

export default function Component() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.global.userId);
  const router = useRouter();
  
  const handleSignIn = async () => {
    try {
      const response = await fetch('http://ec2-3-27-104-150.ap-southeast-2.compute.amazonaws.com:3000/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Username: username,
          Password: password,
        }),
      });

      const data = await response.json();
      console.log('User ID:', data.userId);
      await dispatch(setUserId(data.userId));
      console.log('User ID:', data.userId);
      router.push("/home")
    } catch (error) {
      console.error('Error:', error);
      alert("Login Failed")
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="card-title">Sign In</h1>
        <div className="card-content">
          <div className="input-group">
            <label htmlFor="UserName">UserName</label>
            <input
              id="UserName"
              type="text"
              placeholder="Enter your UserName"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="card-footer">
          <button className="sign-in-button" onClick={handleSignIn}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
