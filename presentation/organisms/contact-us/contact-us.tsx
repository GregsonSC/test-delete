"use client"
import React from "react";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/presentation/atoms/button/button";
import { CircleUser, Phone, Mail, ConciergeBell, MessageSquareText } from "lucide-react";
import { Planner } from "@/presentation/organisms/planner/planner";
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  email: z
    .string()
    .email({ message: "Please enter a valid email address." }),
  service: z
    .string()
    .nonempty({ message: "Please select a service." }),
  about: z
    .string()
    .nonempty({ message: "Please tell us about your project." }),
  timezone: z.string().nonempty({ message: "Timezone is required" }),
  date: z.date({ required_error: "Date is required" }),
  timeRange: z.string().nonempty({ message: "Time range is required" }),
});

interface ContactUsProps {
  isLoggedIn: boolean;
}

// !CH010 [ADD] funcionamiento del endpoint del calendario para citas
export function ContactUs({ isLoggedIn }: ContactUsProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "",
      about: "",
      timezone: "",
      timeRange: "",
      date: undefined,
    },
  });

  useEffect(() => {
    const storedData = sessionStorage.getItem("contactData");
    if (storedData) {
      console.log("Información guardada en sessionStorage:", JSON.parse(storedData));
    } else {
      console.log("No hay información en sessionStorage");
    }
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [hourSelection, setHourSelection] = useState<{ timezone: string; hour: string } | null>(null);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    sessionStorage.setItem(
      "contactData",
      JSON.stringify({
        name: values.name,
        phone: values.phone,
        email: values.email,
        service: values.service,
        about: values.about,
        timezone: values.timezone,
        date: values.date.toISOString(),
        timeRange: values.timeRange,
      })
    );
    router.push("/post-schedule");
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
          <div className="md:ml-12 justify-center md:flex-row md:flex md:gap-2 align-center">
            {isLoggedIn ? (
              <Card className="bg-white border border-[#E4E4E7] mb-3 md:pt-11 md:w-96 md:h-[306px]">
                <CardHeader>
                  <CardTitle className="text-[#0A1248] font-normal text-base">
                    My profile
                  </CardTitle>
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
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  id="contact-form"
                  className="md:justify-center md:items-center mr-4"
                >
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative w-[320px]">
                            <input
                              {...field}
                              placeholder="Full Name"
                              className="md:text-sm text-lg  md:mt-6 text-[#636A9C] bg-[#EBEDF2] rounded-sm placeholder-[#636A9C] py-2 px-4 pl-10 w-full mb-2"
                            />
                            <CircleUser
                              color="#0A1248"
                              className="absolute top-4 md:top-[30px] left-2 opacity-60"
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
                          <div className="relative w-[320px]">
                            <input
                              {...field}
                              placeholder="Phone Number"
                              className="md:text-sm text-lg   text-[#636A9C] bg-[#EBEDF2] rounded-sm placeholder-[#636A9C] py-2 px-4 pl-10 w-full mb-2"
                              type="tel"
                            />
                            <Phone
                              color="#636A9C"
                              className="absolute top-2  left-2"
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
                          <div className="relative w-[320px]">
                            <input
                              {...field}
                              placeholder="Email"
                              className="md:text-sm text-lg   text-[#636A9C] bg-[#EBEDF2] rounded-sm placeholder-[#636A9C] py-2 px-4 pl-10 w-full mb-2"
                              type="email"
                            />
                            <Mail
                              color="#636A9C"
                              className="absolute top-2 left-2"
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="service"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative md:w-[320px]">
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <SelectTrigger className="text-[#636A9C] bg-[#EBEDF2] border-0 mb-5 rounded-sm placeholder-[#636A9C] py-6 pl-10 md:py-0 text-lg md:text-sm md:pl-10 md:mb-1">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="Web Design">
                                    Web Design
                                  </SelectItem>
                                  <SelectItem value="Digital Marketing">
                                    Digital Marketing
                                  </SelectItem>
                                  <SelectItem value="Graphic Design">
                                    Graphic Design
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <ConciergeBell color="#636A9C" className="absolute inset-y-3 md:inset-y-2 left-2" />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="about"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <div className="w-full h-36 bg-[#EBEDF2] px-0 pt-2 rounded-sm">
                          <Label htmlFor="about" className="px-2 mb-1 mt-0 flex text-center font-normal items-center text-[#636A9C] text-xl md:text-sm ">
                            <MessageSquareText className="mr-2" color="#636A9C" />
                            Tell us about your project
                          </Label>
                          <FormControl>
                            <textarea
                              {...field}
                              id="about"
                              className="w-[96%] m-auto flex rounded-sm bg-white text-[#636A9C] py-2 px-8 text-lg md:text-sm placeholder-[#636A9C] md:h-[100px] h-24 resize-none overflow-auto"
                              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                              placeholder="Describe your project..."
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />


                  {Object.keys(form.formState.errors).length > 0 && (
                    <div className="mt-4 text-red-600">
                      {Object.entries(form.formState.errors).map(
                        ([field, error]) => (
                          <p key={field}>{error?.message}</p>
                        )
                      )}
                    </div>
                  )}
                </form>
              </Form>
            )}
            <div className="mt-5">
              <Planner
                onDateSelected={(date: Date) => {
                  setSelectedDate(date);
                  form.setValue("date", date);
                }}
                onHourSelected={(selection: { timezone: string; hour: string }) => {
                  setHourSelection(selection);
                  // Guardamos tanto la zona horaria como el rango de horas
                  form.setValue("timezone", selection.timezone);
                  form.setValue("timeRange", selection.hour);
                }}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              form="contact-form"
              className="rounded-full bg-secondary text-white mt-5 text-base px-6 py-5 font-normal hover:bg-[#04081e]"
            >
              Schedule event
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

