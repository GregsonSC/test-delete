"use client"
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getCookie } from "cookies-next";
import { decodeJwt } from "jose";
import { UserData } from "@/components/interface/modules/Auth";
import { usePathname } from "next/navigation";

interface UserContextProps {
    user: UserData | null;
    isLoggedIn: boolean;
    setUser: (user: UserData | null) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const UserContext = createContext<UserContextProps>({
    user: null,
    isLoggedIn: false,
    setUser: () => { },
    setIsLoggedIn: () => { },
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Remove the useEffect that checks the cookie

    return (
        <UserContext.Provider value={{ user, isLoggedIn, setUser, setIsLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);