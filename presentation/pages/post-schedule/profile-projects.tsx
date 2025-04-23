"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MainLayout } from "@/presentation/templates/main-layout";
import { DefaultToast } from "@/presentation/atoms/toast/default/default-toast";
import { BadgeCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import { ContactInfo } from "@/presentation/molecules/contact-info/contact-info";

export function PostSchedule() {
  return (
    useEffect(() => {
      const storedData = JSON.parse(sessionStorage.getItem("contactData") || "{}");
      // Convertimos el string de fecha a un objeto Date
      const meetingDate = new Date(storedData.date);
      // Formateamos la fecha para obtener solo el año, mes y día
      const formattedDate = meetingDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      });
      
      DefaultToast.title(
        "Your request has been received!",
        `Hello ${storedData.name}, your meeting is booked for ${formattedDate} between ${storedData.timeRange} in ${storedData.timezone} timezone. We will contact you soon to confirm the details. Thank you for choosing us!`
      );
      console.log("Información guardada en sessionStorage:", storedData);
    }, []),

    <MainLayout>
      <div className="">
        {/* Main Content */}
        <main className=" mx-auto px-4 text-center  mt-20">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center items-center">
            <BadgeCheck size={194}/>
          </div>

          {/* Title and Description */}
          <h1 className="text-7xl xl:text-8xl font-bold mb-9">We received your request!</h1>
          <p className="text-white max-w-[878px] mx-auto mb-16 font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper vitae lacus
            eu convallis. Phasellus ut lectus dolor. Vestibulum eleifend orci non dapibus tincidunt.
            Phasellus vitae magna tincidunt, aliquam velit sit amet, convallis ante. Nunc non
            commodo nisi.
          </p>

          {/* What's Next Section */}
          <h2 className="text-6xl font-bold mb-14">Whats Next?</h2>

          <div className=" mx-auto flex flex-col place-items-center space-y-4 mb-8 ">
            {/* Check Email Card */}
            <Card className="relative border border-white text-start items-center justify-center pl-28 pr-7 py-10 lg:w-[706px] lg:h-auto">
              <Image src="/images/post-schedule/Frame 22.png" alt="correct-badge" width={58} height={58} className="absolute left-7 top-1/2 transform -translate-y-8"/>
              <CardTitle className="text-xl">Check Your E-mail</CardTitle>
              <CardContent className="p-0 font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper vitae lacus eu convallis. Phasellus ut lectus dolor. Vestibulum eleifend orci non dapibus tincidunt. 
              </CardContent>
            </Card>

            {/* Create Account Card */}

            <Card className="relative border border-white text-start items-center justify-center pr-7 py-10 lg:w-[706px] lg:h-64">
              <Image src="/images/post-schedule/Frame 22.png" alt="correct-badge" width={58} height={58} className="absolute left-7 top-24 transform -translate-y-8"/>
              <CardTitle className="text-xl pl-28">Create An Account</CardTitle>
              <CardContent className="p-0 pl-28 font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper vitae lacus eu convallis. Phasellus ut lectus dolor. Vestibulum eleifend orci non dapibus tincidunt. 
              </CardContent>
              <CardFooter className="mt-10  place-content-center items-center flex gap-5 lg:pl-20">
                <Button className="rounded-full text-[#050A2B] font-bold md:text-2xl">Go to register</Button>
                <Button className="rounded-full text-white font-bold md:text-2xl bg-transparent border-2 border-[#99CC33]">Log In</Button>
              </CardFooter>
            </Card>
          </div>

          {/* Main Page Button */}
          <Link
            href="/"
            className="inline-block bg-[#98CD4B] text-[#050A2B] font-bold text-2xl px-8 py-3 rounded-full hover:bg-opacity-90 mb-20 mt-20"
          >
            Go To Main Page
          </Link>
        </main>

        {/* Project Goals Section */}
        <div className="xl:py-20">{ContactInfo(3)}</div>
      </div>
    </MainLayout>
  );
}
