"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/presentation/atoms/button/button";
import Link from "next/link";
import { Navbar } from "@/presentation/organisms/navbar/navbar";
import { CircleUser,Phone,Mail,Lock   } from 'lucide-react';

const testimonials = [
  {
    quote:
      "Senavia transformed our online presence. Their team was professional, creative, and delivered beyond our expectations.",
    author: "Sarah Johnson",
    company: "Fashion Boutique Owner",
    image: "/placeholder.svg?height=400&width=600&text=Project+1",
  },
  {
    quote:
      "The ROI from our marketing campaign was incredible. Senavia truly understands how to generate qualified leads that convert.",
    author: "Michael Chen",
    company: "SaaS Startup Founder",
    image: "/placeholder.svg?height=400&width=600&text=Project+2",
  },
  {
    quote:
      "Working with Senavia on our rebrand was a game-changer. They captured our vision perfectly and translated it into a stunning brand identity.",
    author: "Jessica Martinez",
    company: "Marketing Director",
    image: "/placeholder.svg?height=400&width=600&text=Project+3",
  },
];

export function RegisterPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <Navbar/>
      <div className="flex min-h-screen bg-secondary">
        {/* Left side - Carousel */}
        <div className="hidden lg:block lg:w-1/2 relative bg-secondary-900">
          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1248] to-[#323A6E]"></div>
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold text-white">Success Stories</h2>
                <div className="w-12 h-1 bg-primary"></div>
              </div>
              <div className="space-y-2">
                <p className="text-white italic text-2xl mb-5">
                  "{testimonials[activeIndex].quote}"
                </p>
                <h4 className="font-semibold text-xl">
                  {testimonials[activeIndex].author}
                </h4>
                <p className="text-xl">{testimonials[activeIndex].company}</p>
              </div>
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === activeIndex ? "bg-primary" : "bg-gray-500"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>


      {/* Right side - Register form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome</h1>
            <p className="text-lg text-[#D3E8A9]">Fill the requested information to continue</p>
          </div>

          <div className=" items-center justify-center">

          <div className=" flex flex-col items-center justify-center mb-9">

            <div className="relative w-80 h-10 mb-3">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                <CircleUser color="#A2ABE7"/>
              </div>
              <Input
                id="full-name"
                type="full-name"
                placeholder="Full Name"
                className="w-full rounded-lg bg-background pl-10"
              />
            </div>

              <div className="relative w-80 h-10 mb-3">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <Phone color="#A2ABE7"/>
                </div>
                <Input id="phone" type="phone" placeholder="Phone Number" className="w-full rounded-lg bg-background pl-10"/>
              </div>

              <div className="relative w-80 h-10 mb-3">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <Mail color="#A2ABE7"/>
                </div>
                <Input id="email" type="email" placeholder="Email" className="w-full rounded-lg bg-background pl-10" />
              </div>

              <div className="relative w-80 h-10 mb-3">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <Lock color="#A2ABE7"/>
                </div>
                <Input id="password" type="password" placeholder="Password" className="w-full rounded-lg bg-background pl-10" />
              </div>

          </div>
          
          <div className="flex justify-center mb-9">
            <div className="flex items-center space-x-2">
              <Checkbox id="Newsletter" className="bg-white border-[#E5E7EB]" />
              {/* Asocia el label al checkbox para accesibilidad */}
              <Label htmlFor="Newsletter" className="text-sm">
                Subscribe to our Newsletter
              </Label>
            </div>
        </div>

        <Button
          className="text-bold text-lg w-full bg-primary text-secondary rounded-full mb-2 transition-all duration-200hover:bg-primary/90  hover:text-white hover:shadow-[0_0_15px_3px_rgba(255,255,255,0.75)]">
          Register
        </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
  
}
