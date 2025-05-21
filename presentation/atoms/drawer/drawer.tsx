"use client";

import * as React from "react";
import { Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthViewModel from "@/presentation/pages/auth/AuthViewModel";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/presentation/atoms/button/button";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  profileName?: string;
  email?: string;
  phone?: string;
}

export function ProfileDrawer({
  isOpen,
  onClose,
  profileName = "Profile Name",
  email = "example@gmail.com",
  phone = "+00 0000000000",
}: ProfileDrawerProps) {
  const router = useRouter();
  const { logout, loading } = AuthViewModel();
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="right">
      <DrawerContent className="h-full w-[320px] right-0 left-auto fixed rounded-none bg-white">
        <div className="flex flex-col items-center justify-between h-full py-8">
          <DrawerHeader className="flex flex-col items-center relative">
            <div className="w-40 h-40 rounded-full bg-gradient-to-r from-[#8ECF0A] via-[#39cac0] to-[#8ECF0A] mb-4"></div>
            <DrawerClose asChild>
              <Button
                size="icon"
                className="absolute top-20 -left-20 h-8 w-8 rounded-full bg-[#99cc33] text-white hover:bg-[#99cc33] shadow-md flex items-center justify-center"
                onClick={onClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
                <span className="sr-only">Close</span>
              </Button>
            </DrawerClose>
            <DrawerTitle className="text-2xl font-semibold mb-1 text-black">
              {profileName}
            </DrawerTitle>
            <div className="flex flex-col items-center text-sm text-black">
              <div className="flex items-center gap-1 mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-1 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>{phone}</span>
              </div>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-black hover:bg-gray-200 rounded-full py-2 px-6 text-lg font-semibold justify-start text-left transition-colors w-full mt-6"
                onClick={() => {
                  if (currentPath === "/dashboard") {
                    onClose();
                  } else {
                    router.push("/dashboard");
                  }
                }}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="9" />
                  <rect x="14" y="3" width="7" height="5" />
                  <rect x="14" y="12" width="7" height="9" />
                  <rect x="3" y="16" width="7" height="5" />
                </svg>
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-black hover:bg-gray-200 rounded-full py-2 px-6 text-lg font-semibold justify-start text-left transition-colors w-full"
                onClick={() => {
                  if (currentPath === "/profile-settings") {
                    onClose();
                  } else {
                    router.push("/profile-settings");
                  }
                }}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          </DrawerHeader>

          <div className="flex flex-col items-center gap-4 mt-auto">
            <Button
              onClick={async () => {
                const result = await logout();
                if (result?.success) {
                  window.location.href = "/login";
                }
              }}
              disabled={loading}
              className="flex items-center gap-2 text-white hover:text-white rounded-full py-2 px-6 text-lg font-semibold justify-center shadow-md transition-colors bg-gradient-to-r from-[#8ECF0A] to-[#2EBAC6] hover:brightness-90"
              style={{ background: "linear-gradient(135deg, #8ECF0A 0%, #2EBAC6 100%)" }}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                <LogOut className="h-5 w-5" />
              )}
              Log Out
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
