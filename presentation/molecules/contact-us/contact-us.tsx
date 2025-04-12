"use client"
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/presentation/atoms/button/button";
import { Calendar_molecule } from "@/presentation/molecules/calendar/calendar";
import { CircleUser, Phone, Mail, Circle  } from 'lucide-react';
import { Planner } from "@/presentation/organisms/planner/planner";
const userName = "Name";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Type a valid name" })
    .max(50, { message: "Type a valid name" }),
  phone: z
    .string()
    .min(1, { message: "Enter a valid number" })
    .max(15, { message: "Enter a valid number" }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

interface ContactUsProps {
  isLoggedIn: boolean;
}

export function ContactUs({ isLoggedIn }: ContactUsProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    alert("registered appointment");
    form.reset();
  }

  return (
    <Card className="bg-white w-full border-0 flex flex-col items-center justify-center md:w-[778px] md:justify-start md:items-start md:pt-14 md:pb-12">
      <CardHeader>
        <CardTitle className="text-[#0A1248] font-bold text-5xl text-wrap ml-10 mb-2">
          Let’s <span className="block md:inline">Connect</span>
        </CardTitle>
        <CardDescription className="text-[#0A1248] font-normal text-base ml-10 mr-5 text-wrap">
          We are here to help you grow and achieve your business goals!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:items-center">
          {/* Bloque del formulario o del perfil */}
          <div className="md:ml-12 justify-center md:flex-row md:flex md:gap-2 ">
            {isLoggedIn ? (
              <Card className="bg-white border border-[#E4E4E7] mb-3 md:pt-11 md:w-96 md:h-[306px]">
                <CardHeader>
                  <CardTitle className="text-[#0A1248] font-normal text-base">My profile</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-row">
                  <div className="w-16 h-16 mr-3 rounded-full bg-gradient-to-r from-[#8ECF0A] via-[#39cac0] to-[#8ECF0A] flex items-center justify-center transition-all group-hover:shadow-[0_0_15px_rgba(142,207,10,0.7)]"></div>
                  <div className="flex flex-col text-left justify-center">
                    <span className="font-normal text-[#060B20]">{userName}</span>
                    <span className="text-sm text-gray-500">user@example.com</span>
                  </div>
                </CardContent>
                <CardFooter className="pb-3 pl-3">
                  <Button className="rounded-full text-xs bg-[#0A1248] text-white hover:bg-[#04081e]">
                    Log in with another profile
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} id="contact-form" className="md:justify-center md:items-center ">
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative w-full">
                            <input
                              {...field}
                              placeholder="Full Name"
                              className="text-[#0A1248] bg-[#EBEDF2] mb-5 rounded-sm placeholder-[#0A1248] placeholder-opacity-60 py-3 px-4 pl-10 text-lg md:py-2 md:text-sm md:pr-24 md:pl-10 md:mb-12 md:mt-12 md:mr-12"
                            />
                            <CircleUser 
                              color="#0A1248" 
                              className="absolute inset-y-4 md:inset-y-14 left-2 opacity-60" 
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="phone"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative w-full">
                            <input
                              {...field}
                              placeholder="Phone Number"
                              className="text-[#0A1248] bg-[#EBEDF2] mb-5 rounded-sm placeholder-[#0A1248] placeholder-opacity-60 py-3 px-4 pl-10 text-lg md:py-2 md:text-sm md:pr-24 md:pl-10 md:mb-12 md:mr-12"
                              type="tel"
                            />
                            <Phone
                              color="#0A1248" 
                              className="absolute inset-y-4 md:inset-y-2 left-2 opacity-60"
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative w-full">
                            <input
                              {...field}
                              placeholder="Email"
                              className="text-[#0A1248] bg-[#EBEDF2] mb-5 rounded-sm placeholder-[#0A1248] placeholder-opacity-60 py-3 px-4 pl-10 text-lg md:py-2 md:text-sm md:pr-24 md:pl-10 md:mb-12 md:mr-12"
                              type="email"
                            />
                            <Mail 
                              color="#0A1248" 
                              className="absolute inset-y-4 md:inset-y-2 left-2 opacity-60"
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {Object.keys(form.formState.errors).length > 0 && (
                    <div className="mt-4 text-red-600">
                      {Object.entries(form.formState.errors).map(([field, error]) => (
                        <p key={field}>{error?.message}</p>
                      ))}
                    </div>
                  )}
                </form>
              </Form>
            )}
            <div className="">
              <Planner/>
            </div>
          </div>
          <div className="">
            <Button type="submit" form="contact-form" className="rounded-full bg-secondary text-white mt-5 text-base px-6 py-5 font-normal hover:bg-[#04081e]">
              Schedule event
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
