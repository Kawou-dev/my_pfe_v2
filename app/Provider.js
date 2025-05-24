"use client";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const AuthProvider = ({ children }) => {
  return <SessionProvider>
    {children}
    <div>
       <Toaster />
    </div>
    </SessionProvider>;
};

export default AuthProvider;
