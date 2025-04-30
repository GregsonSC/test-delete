"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Button } from "@/presentation/atoms/button/button";
import Link from "next/link";
import { Mail, Lock, Loader2 } from 'lucide-react';
import AuthViewModel from "./AuthViewModel";
import { toast } from "sonner";

const testimonials = [
  {
    quote:
      "Senavia transformed our online presence. Their team was professional, creative, and delivered beyond our expectations.",
    author: "Sarah Johnson",
    company: "Fashion Boutique Owner",
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
  const { login, loading } = AuthViewModel();
  
  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Add validation state for each field
  const [validations, setValidations] = useState({
    email: "",
    password: ""
  });
  
  // Add focus state tracking
  const [focusedField, setFocusedField] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create credentials object to match the LoginCredentials interface
    const credentials = {
      email,
      password
    };

    // Create a promise for the login process
    const loginPromise = login(credentials).then(result => {
      if (result && result.success) {
        // Clear form on success
        setEmail("");
        setPassword("");
        // Reset validation states
        setValidations({
          email: "",
          password: ""
        });
        return result; // Return successful result
      } else {
        // If the API returns success: false, throw an error to trigger the error toast
        throw new Error(result?.message || "Login failed");
      }
    });
    
    // Use toast.promise to handle all states
    toast.promise(loginPromise, {
      loading: "Logging in...",
      success: (result) => {
        return result.message || "Login successful!";
      },
      error: (error) => {
        return error?.message || "Login failed. Please check your credentials.";
      },
    });
  };

  // Handle input validation on change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    
    // Update the field value
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    
    // Validate the field
    if (value === '') {
      // Empty field - neutral state
      setValidations(prev => ({ ...prev, [field]: "" }));
    } else if (e.target.checkValidity()) {
      // Valid input
      setValidations(prev => ({ ...prev, [field]: "valid" }));
    } else {
      // Invalid input
      setValidations(prev => ({ ...prev, [field]: "invalid" }));
    }
  };

  // Get border style based on validation and focus state
  const getBorderStyle = (field: string) => {
    // When field is focused and empty, show green border
    if (focusedField === field && 
        (field === 'email' ? email === '' : 
         field === 'password' ? password === '' : false)) {
      return "border-[#99cc33] border-2";
    }
    
    // When field is focused and has invalid content, show red border
    if (focusedField === field && validations[field as keyof typeof validations] === "invalid") {
      return "border-red-500 border-2";
    }
    
    // When field is focused and has valid content, show green border
    if (focusedField === field) {
      return "border-[#99cc33] border-2";
    }
    
    // When field is not focused but has content
    if (validations[field as keyof typeof validations] === "valid") {
      return "border-[#99cc33] border-2";
    } else if (validations[field as keyof typeof validations] === "invalid") {
      return "border-red-500 border-2";
    }
    
    // Default state
    return "border-input";
  };

  return (
    <>
    {/* <Navbar/> */}
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
      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome back</h1>
            <p className="text-[#D3E8A9] text-lg">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center mb-9">

              <div className="relative w-80 h-10 mb-3 xl:w-[330px]">
                <div className="absolute inset-y-0 left-0 flex items-center pl-[13px] pointer-events-none">
                  <Mail color="#A2ABE7"/>
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className={`w-full rounded-lg bg-background pl-12 placeholder:text-[#A2ABE7] h-10 border ${getBorderStyle('email')} outline-none`}
                  value={email}
                  onChange={(e) => handleInputChange(e, 'email')}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  required
                />
              </div>

              <div className="relative w-80 h-10 xl:w-[330px]">
                <div className="absolute inset-y-0 left-0 flex items-center pl-[13px] pointer-events-none">
                  <Lock color="#A2ABE7"/>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className={`w-full rounded-lg bg-background pl-12 placeholder:text-[#A2ABE7] h-10 border ${getBorderStyle('password')} outline-none`}
                  value={password}
                  onChange={(e) => handleInputChange(e, 'password')}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  required
                  minLength={3}
                />
              </div>

            </div>
          
            <div className="px-16">
              <Button 
                type="submit"
                className="font-bold text-lg w-full bg-primary text-secondary rounded-full mb-3 transition-all duration-200 hover:bg-primary/90 hover:text-white hover:shadow-[0_0_15px_3px_rgba(255,255,255,0.75)] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Log In"
                )}
              </Button>
            </div>

            <div className="text-center text-xs font-medium">
              New to Senavia? Go to{" "}
              <Link href="/register" className="text-primary hover:underline">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
  