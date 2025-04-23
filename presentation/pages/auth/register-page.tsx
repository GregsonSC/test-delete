"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/presentation/atoms/button/button";
import Link from "next/link";
import { Navbar } from "@/presentation/organisms/navbar/navbar";
import { CircleUser, Phone, Mail, Lock, Loader2 } from "lucide-react";
import AuthViewModel from "./AuthViewModel";
import { AuthUser } from "@/components/interface/modules/Auth";
import { toast } from "sonner";

const testimonials = [
  {
    quote:
      "Senavia transformed our online presence. Their team was professional, creative, and delivered beyond our expectations.",
    author: "Sarah Johnson",
    company: "Fashion Boutique Owner"
  },
  {
    quote:
      "The ROI from our marketing campaign was incredible. Senavia truly understands how to generate qualified leads that convert.",
    author: "Michael Chen",
    company: "SaaS Startup Founder"
  },
  {
    quote:
      "Working with Senavia on our rebrand was a game-changer. They captured our vision perfectly and translated it into a stunning brand identity.",
    author: "Jessica Martinez",
    company: "Marketing Director"
  },
];

export function RegisterPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { register, loading } = AuthViewModel(); // Remove error from destructuring

  // State for form inputs
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userData: AuthUser = {
      name,
      email,
      password,
      phone,
      imageUrl: "",
      roleId: 1,
    };

    // Create a promise for the registration process
    const registerPromise = register(userData).then(result => {
      if (result && result.success) {
        // Clear form on success
        setName("");
        setPhone("");
        setEmail("");
        setPassword("");
        // Reset validation states to return borders to normal
        setValidations({
          name: "",
          phone: "",
          email: "",
          password: ""
        });
        return result; // Return successful result
      } else {
        // If the API returns success: false, throw an error to trigger the error toast
        throw new Error(result?.message || "Registration failed");
      }
    });
    
    // Use toast.promise to handle all states
    toast.promise(registerPromise, {
      loading: "Creating your account...",
      success: (result) => {
        return result.message || "Registration successful!";
      },
      error: (error) => {
        return error?.message || "Registration failed. Please try again.";
      },
    });
  };

  // Add validation state for each field
  const [validations, setValidations] = useState({
    name: "",
    phone: "",
    email: "",
    password: ""
  });
  
  // Add focus state tracking
  const [focusedField, setFocusedField] = useState("");

  // Handle input validation on change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    
    // Update the field value
    if (field === 'name') setName(value);
    if (field === 'phone') setPhone(value);
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
        (field === 'name' ? name === '' : 
         field === 'phone' ? phone === '' : 
         field === 'email' ? email === '' : 
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
      <Navbar />
      <div className="flex min-h-screen bg-secondary">
        {/* Left side - Carousel */}
        <div className="hidden lg:block lg:w-1/2 relative bg-secondary-900">
          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1248] to-[#323A6E]"></div>
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold text-white">
                  Success Stories
                </h2>
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
              <p className="text-lg text-[#D3E8A9]">
                Fill the requested information to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} >
              <div className="flex flex-col items-center justify-center mb-9">

                <div className="relative w-80 h-10 mb-3 xl:w-[330px]">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-[13px] pointer-events-none">
                    <CircleUser color="#A2ABE7" />
                  </div>
                  <input
                    id="full-name"
                    type="text"
                    placeholder="Full Name"
                    className={`w-full rounded-lg bg-background pl-12 placeholder:text-[#A2ABE7] h-10 border ${getBorderStyle('name')} outline-none`}
                    value={name}
                    onChange={(e) => handleInputChange(e, 'name')}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField('')}
                    required
                    minLength={3}
                  />
                </div>

                <div className="relative w-80 h-10 mb-3 xl:w-[330px]">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-[13px] pointer-events-none">
                    <Phone color="#A2ABE7" />
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Phone Number"
                    className={`w-full rounded-lg bg-background pl-12 placeholder:text-[#A2ABE7] h-10 border ${getBorderStyle('phone')} outline-none`}
                    value={phone}
                    onChange={(e) => handleInputChange(e, 'phone')}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField('')}
                    required
                    pattern="[0-9]{10,15}"
                  />
                </div>

                <div className="relative w-80 h-10 mb-3 xl:w-[330px]">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-[13px] pointer-events-none">
                    <Mail color="#A2ABE7" />
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

                <div className="relative w-80 h-10 mb-3 xl:w-[330px]">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-[13px] pointer-events-none">
                    <Lock color="#A2ABE7" />
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
                    minLength={8}
                  />
                </div>
              </div>

              <div className="flex justify-center mb-9">
                <div className="flex items-center space-x-2">
                  <Checkbox id="Newsletter" className="bg-white border-[#E5E7EB]" />
                  <Label htmlFor="Newsletter" className="text-sm">
                    Subscribe to our Newsletter
                  </Label>
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
                    "Register"
                  )}
                </Button>
              </div>

              <div className="text-center text-xs font-medium">
                Already have an account? Go to{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Log In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
