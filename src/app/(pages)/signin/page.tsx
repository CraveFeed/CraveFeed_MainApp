"use client"
import '../signin/login.css'
import React, { useState } from "react";
import { Button, notification, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { signIn } from '@/lib/features/services/signIn/signIn';
import { setTokenAndId } from '@/lib/features/services/global';
import { useRouter } from 'next/navigation';
import logo from "@/app/assets/cravefeed_logo_removedText.png"
import { Dancing_Script } from 'next/font/google';
import { Checkbox } from "antd";

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Component() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.global.token);
  const router = useRouter();
  
  const [isChecked, setIsChecked] = useState(false);  

  const openNotification = (pauseOnHover: boolean) => {
    api.open({
      message: 'Alert',
      description:
        'Please accept the terms and conditions to proceed',
      duration: pauseOnHover ? 4.5 : 0,
    });
  };  

  const handleSignIn = async () => {
    if (isChecked) {
      const resultAction = await dispatch(signIn({ email, password }));
      if (signIn.fulfilled.match(resultAction)) {
        const token = resultAction.payload.token;
        const userId = resultAction.payload.userId;
        dispatch(setTokenAndId({token , userId} ));
      }
      router.push('/home');
    } else {
      openNotification(true);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      {contextHolder}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#"  className={`flex items-center mb-6 text-4xl font-semibold text-gray-900 dark:text-white ${dancingScript.className}`}>
          <img
            style={{ width : "80px" , paddingRight : "10px"}}
            src={logo.src}
            alt="logo"
          />
          CraveFeed
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  onChange={(e) => { setEmail(e.target.value)}}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => { setPassword(e.target.value)}}
                />

              </div>
              <div className="flex items-start">
                <div className="ml-3 text-sm">
                <Checkbox onChange={(e) => { setIsChecked(e.target.checked)}}>
                    <span style={{ color : "#8f8f8f"}}>I accept the{" "}</span>
                    <a
                      href="#"
                      style={{ color: "#008AD8" }}
                    >
                      Terms and Conditions
                    </a>
                  </Checkbox>
                </div>
              </div>
              <button
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                style={{ backgroundColor : "#004cd8"}}
                onClick={() => { handleSignIn() }}
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  style={{ color : "#008AD8"}}
                >
                  Sign Up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
