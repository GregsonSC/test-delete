"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MainLayout } from "@/presentation/templates/main-layout";
import { DefaultToast } from "@/presentation/atoms/toast/default/default-toast";

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
      <div className="min-h-screen">
        {/* Main Content */}
        <main className="container mx-auto px-4 text-center mt-20">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="inline-block p-4 bg-white bg-opacity-10 rounded-full">
              <svg
                className="w-16 h-16 text-[#98CD4B]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Title and Description */}
          <h1 className="text-5xl font-bold mb-6">We received your request!</h1>
          <p className="text-gray-300 max-w-2xl mx-auto mb-16">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper vitae lacus
            eu convallis. Phasellus ut lectus dolor. Vestibulum eleifend orci non dapibus tincidunt.
            Phasellus vitae magna tincidunt, aliquam velit sit amet, convallis ante. Nunc non
            commodo nisi.
          </p>

          {/* What's Next Section */}
          <h2 className="text-4xl font-bold mb-8">Whats Next?</h2>

          <div className="max-w-2xl mx-auto space-y-4 mb-8">
            {/* Check Email Card */}
            <div className="bg-[#1E2128] p-6 rounded-lg text-left flex items-start gap-4">
              <div className="bg-[#98CD4B] p-2 rounded-lg">
                <svg
                  className="w-6 h-6 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">Check Your E-mail</h3>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper vitae
                  lacus eu convallis.
                </p>
              </div>
            </div>

            {/* Create Account Card */}
            <div className="bg-[#1E2128] p-6 rounded-lg text-left flex items-start gap-4">
              <div className="bg-[#98CD4B] p-2 rounded-lg">
                <svg
                  className="w-6 h-6 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">Create An Account</h3>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper vitae
                  lacus eu convallis.
                </p>
                <div className="mt-4 flex gap-4">
                  <Link
                    href="/register"
                    className="bg-[#98CD4B] text-black px-6 py-2 rounded-full hover:bg-opacity-90"
                  >
                    Go to Register
                  </Link>
                  <Link
                    href="/login"
                    className="bg-transparent border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black"
                  >
                    Log In
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Page Button */}
          <Link
            href="/"
            className="inline-block bg-[#98CD4B] text-black px-8 py-3 rounded-full hover:bg-opacity-90 mb-20"
          >
            Go To Main Page
          </Link>
        </main>
        {/* Project Goals Section */}
        <div className="bg-[#4CD4A1] text-black w-full relative py-6 px-4 my-28">
          <div className="flex items-center justify-between w-full ">
            <div className="w-[100px] h-[100px]">
              <div className="absolute bg-white w-[400px] h-[400px] rounded-full top-[-50%] left-[50px]"></div>
            </div>
            <div className="w-2/3 text-right">
              <h2 className="text-4xl font-bold mb-4">Let's talk About Your Project Goals!</h2>
              <p className="mb-6">
                Connect with one of our digital experts at Senavia to see how we can assist you in
                achieving your business objectives.
              </p>
              <a
                href="tel:(954)706-4084"
                className="inline-block bg-[#1A1D24] text-white px-6 py-3 rounded-full hover:bg-opacity-90"
              >
                (954) 706-4084
              </a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
