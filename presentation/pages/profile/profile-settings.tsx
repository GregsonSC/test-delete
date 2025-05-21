"use client";

import React, { useState } from "react";
import { Button } from "@/presentation/atoms/button/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MainLayout } from "@/presentation/templates/main-layout";
import { ProfileDrawer } from "@/presentation/atoms/drawer/drawer";

export function ProfileSettings() {
  /*  const [isDrawerOpen, setIsDrawerOpen] = useState(false); */

  return (
    <MainLayout>
      <div className="bg-gray-100 p-4 sm:p-8 mt-[70px] sm:mt-[60px] lg:mt-0">
        <div className="mx-auto w-full bg-white rounded-lg shadow-md p-6 sm:p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Account Info</h1>
            {/*  <Button
              variant="secondary"
              className="rounded-full bg-[#34374a] text-white hover:bg-[#2a2d3d] hover:shadow-[0_0_15px_rgba(52,55,74,0.5)] px-5 py-1 sm:mr-8 font-bold text-[14px] h-8 transition-all flex items-center justify-center"
              onClick={() => setIsDrawerOpen(true)}
            >
              Close Settings
            </Button> */}
          </div>

          {/* My Profile Section */}
          <section className="mb-6 flex-shrink-0">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">My Profile</h2>
            <div className="bg-gray-50 rounded-lg px-7 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 bg-gradient-to-r from-[#abd45a] via-[#39cac0] to-[#abd45a]">
                  <AvatarImage src="https://via.placeholder.com/150" alt="User Avatar" />
                  <AvatarFallback className="text-white font-bold">U</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-800">Name</p>
                  <p className="text-sm text-gray-500">email@example.com</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="rounded-full bg-[#abd45a] text-white border-0 hover:bg-[#9bc04e] hover:text-white hover:shadow-[0_0_15px_rgba(171,212,90,0.7)] px-5 py-1 font-bold text-[14px] h-8 transition-all flex items-center justify-center"
              >
                Change Profile Image
              </Button>
            </div>
          </section>

          {/* Account Details Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-3 flex-shrink-0">
              Account Details
            </h2>
            <div className="space-y-3">
              {/* Email Row */}
              <div className="bg-gray-50 rounded-lg px-7 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-md">
                <div className="text-center sm:text-left">
                  <p className="font-medium text-gray-800">Email</p>
                  <p className="text-sm text-gray-500">email@example.com</p>
                </div>
              </div>

              {/* Password Row */}
              <div className="bg-gray-50 rounded-lg px-7 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-md">
                <div className="text-center sm:text-left">
                  <p className="font-medium text-gray-800">Password</p>
                  <p className="text-sm text-gray-500">**********</p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-full bg-[#abd45a] text-white border-0 hover:bg-[#9bc04e] hover:text-white hover:shadow-[0_0_15px_rgba(171,212,90,0.7)] px-5 py-1 font-bold text-[14px] h-8 transition-all flex items-center justify-center"
                >
                  Change
                </Button>
              </div>

              {/* Name Row */}
              <div className="bg-gray-50 rounded-lg px-7 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-md">
                <div className="text-center sm:text-left">
                  <p className="font-medium text-gray-800">Name</p>
                  <p className="text-sm text-gray-500">User name</p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-full bg-[#abd45a] text-white border-0 hover:bg-[#9bc04e] hover:text-white hover:shadow-[0_0_15px_rgba(171,212,90,0.7)] px-5 py-1 font-bold text-[14px] h-8 transition-all flex items-center justify-center"
                >
                  Change
                </Button>
              </div>

              {/* Newsletter Preferences Row */}
              <div className="bg-gray-50 rounded-lg px-7 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-md">
                <div className="text-center sm:text-left">
                  <p className="font-medium text-gray-800">Newsletter Preferences</p>
                  <p className="text-sm text-gray-500">Active</p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-full bg-[#9bc04e] text-white border-0 hover:bg-[#9bc04e] hover:text-white hover:shadow-[0_0_15px_rgba(171,212,90,0.7)] px-5 py-1 font-bold text-[14px] h-8 transition-all flex items-center justify-center"
                >
                  Change
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Profile Drawer */}
      {/* <ProfileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        profileName="Profile Name"
        email="example@gmail.com"
        phone="+00 0000000000"
      /> */}
    </MainLayout>
  );
}

export default ProfileSettings;
