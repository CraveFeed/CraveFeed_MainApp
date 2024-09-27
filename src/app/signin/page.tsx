"use client"
import '../signin/login.css'
import React, { useState } from "react";

export default function Component() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Sign In</h1>
        </div>
        <div className="card-content">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your Email"
              className="input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                className="input password-input"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="remember-forgot">
            <div className="checkbox-group" >
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="/forgot-password" className="forgot-password">
              Forgot password?
            </a>
          </div>
        </div>
        <div className="card-footer">
          <button className="sign-in-button">Sign In</button>
          <p className="signup-link">
            Don't have an account?{" "}
            <a href="/signup" className="link">
              Sign Up
            </a>
          </p>
         
          
        </div>
      </div>
    </div>
  );
}

