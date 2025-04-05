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
import  Link from "next/link";

const userName = "Name";

const formSchema = z.object({
    name: z.string().min(2).max(50),
    phone: z.number().max(15, { message: "Please enter a valid phone number." }),
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
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    alert("registered appointment");
    form.reset();
  }

  return (
    <Card className="bg-white w-full border-0 flex flex-col items-center justify-center xl:w-[778px] xl:justify-start xl:items-start xl:pt-14 xl:pb-12">
  <CardHeader>
    <CardTitle className="text-[#0A1248] font-bold text-5xl text-wrap ml-10 mb-2">
      Let’s <span className="block md:inline">Connect</span>
    </CardTitle>
    <CardDescription className="text-[#0A1248] font-normal text-base ml-10 mr-5 text-wrap">
      We are here to help you grow and achieve your business goals!
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="flex flex-col xl:items-center">
      {/* Bloque del formulario o del perfil */}
      <div className="xl:ml-12 justify-center xl:flex-row xl:flex xl:gap-2 ">
        {isLoggedIn ? (
          <Card className="bg-white border border-[#E4E4E7] mb-3 xl:pt-11 xl:w-96 xl:h-[306px]">
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
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        {...field}
                        placeholder="Full Name"
                        className="bg-[#EBEDF2] mb-5 rounded-sm placeholder-[#0A1248] placeholder-opacity-55 py-3 px-4 text-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        {...field}
                        placeholder="Phone Number"
                        className="bg-[#EBEDF2] mb-5 rounded-sm placeholder-[#0A1248] placeholder-opacity-55 py-3 px-4 text-lg"
                        type="tel"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        {...field}
                        placeholder="Email"
                        className="bg-[#EBEDF2] mb-5 rounded-sm placeholder-[#0A1248] placeholder-opacity-55 py-3 px-4 text-lg"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )}
        <div className="">
        <Calendar_molecule />
        </div>
      </div>
      <div className="">
        <Button className="rounded-full bg-secondary text-white mt-5 text-base px-6 py-5 font-normal hover:bg-[#04081e]">
          Schedule event
        </Button>
      </div>
    </div>
  </CardContent>
</Card>
  );
}
