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

export function LoginPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
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
            src={testimonials[activeIndex].image || "/placeholder.svg"}
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
              <h2 className="text-3xl font-bold text-white">Success Stories</h2>
              <div className="w-12 h-1 bg-primary"></div>
            </div>

            <blockquote className="text-xl italic text-white">
              "{testimonials[activeIndex].quote}"
            </blockquote>

            <div>
              <div className="font-semibold text-white">{testimonials[activeIndex].author}</div>
              <div className="text-gray-300">{testimonials[activeIndex].company}</div>
            </div>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
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

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="lg:hidden mb-8">
            <Logo />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm">
                Remember me
              </Label>
            </div>

            <Button className="w-full bg-primary text-secondary hover:bg-primary/90">Log In</Button>

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
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
