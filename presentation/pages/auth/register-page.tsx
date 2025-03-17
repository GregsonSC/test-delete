"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/presentation/atoms/button/button";
import { Facebook, Github, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/presentation/atoms/logo/logo";

const projects = [
  {
    title: "E-Commerce Redesign",
    description:
      "Increased conversion rate by 150% and average order value by 30% through strategic UX improvements.",
    image: "/placeholder.svg?height=400&width=600&text=E-Commerce",
  },
  {
    title: "SaaS Platform UI",
    description: "Designed and developed a modern interface for a cloud-based software solution.",
    image: "/placeholder.svg?height=400&width=600&text=SaaS+UI",
  },
  {
    title: "Mobile App Development",
    description:
      "Created a cross-platform mobile application with React Native for a fitness brand.",
    image: "/placeholder.svg?height=400&width=600&text=Mobile+App",
  },
];

export function RegisterPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % projects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-secondary">
      {/* Left side - Carousel */}
      <div className="hidden lg:block lg:w-1/2 relative bg-secondary-900">
        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-secondary/80 z-10"></div>

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={projects[activeIndex].image || "/placeholder.svg"}
            alt="Background"
            fill
            className="object-cover transition-opacity duration-1000"
          />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between z-20 p-12">
          <div>
            <Logo />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white">Our Projects</h2>
              <div className="w-12 h-1 bg-primary"></div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">{projects[activeIndex].title}</h3>
              <p className="text-gray-300">{projects[activeIndex].description}</p>
            </div>

            <div className="flex space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-primary" : "bg-gray-500"}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-300">
            © {new Date().getFullYear()} Senavia Corp. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right side - Register form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="lg:hidden mb-8">
            <Logo />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create an account</h1>
            <p className="text-muted-foreground">Sign up to get started with Senavia</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" placeholder="••••••••" />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button className="w-full bg-primary text-secondary hover:bg-primary/90">
              Register
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-secondary text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="w-full">
                <Github className="h-4 w-4 mr-2" />
                Github
              </Button>
              <Button variant="outline" className="w-full">
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button variant="outline" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Google
              </Button>
            </div>

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
  );
}
