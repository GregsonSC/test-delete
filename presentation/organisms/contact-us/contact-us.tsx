"use client"
import React, { use, useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { CircleUser, Phone, Mail, ConciergeBell, MessageSquareText, Loader2, MapPinned, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Button } from "@/presentation/atoms/button/button";
import { Planner } from "@/presentation/organisms/planner/planner";
import { ContactUsViewModel, GetHoursViewModel } from "./contact-usViewmodel";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/components/ui/use-toast";
import AuthViewModel from "@/presentation/pages/auth/AuthViewModel"; // Import AuthViewModel

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
  address: z
    .string()
    .min(1, { message: "Enter a valid address" })
    .max(100, { message: "Enter a valid address" }),
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



export function ContactUs() {
  const { logout: authLogout } = AuthViewModel();
  const { toast } = useToast();
  const { user, isLoggedIn, setUser, setIsLoggedIn } = useUser(); // <-- Use context
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [hourSelection, setHourSelection] = useState<{ timezone: string; hour: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { createCalendarEvent, createLead } = ContactUsViewModel();
  const [isLoggingOut, setIsLoggingOut] = useState(false);



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      service: "",
      about: "",
      timezone: "",
      timeRange: "",
      date: undefined,
    },
  });


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      if (isLoggedIn && !values.timeRange) {
        toast({
          title: "Time Range Required",
          description: "Please select a time range to schedule your event.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      // Obtener timeStart y timeFinish formateados correctamente
      const { timeStart, timeFinish } = GetHoursViewModel(values.date.toISOString(), values.timeRange);

      // Guardar toda la información en sessionStorage
      const contactData = {
        name: values.name,
        phone: values.phone,
        email: values.email,
        service: values.service,
        about: values.about,
        timezone: values.timezone,
        date: values.date.toISOString(),
        timeRange: values.timeRange,
        timeStart: timeStart,
        timeFinish: timeFinish,
      };

      sessionStorage.setItem("contactData", JSON.stringify(contactData));

      if (isLoggedIn) {
        try {
          // Crear el objeto con el formato esperado por la API
          const eventData = {
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            address: user?.address || '',
            service: values.service,
            about: values.about,
            timeStart: timeStart,
            timeFinish: timeFinish,
            isLoggedIn: isLoggedIn
          };

          // Enviar al API utilizando el ViewModel
          const eventResult = await createCalendarEvent(eventData);

          if (eventResult.success && (eventResult.status === 200 || eventResult.status === 201)) {
            // Solo crear el lead si el evento del calendario fue exitoso
            await createLead({
              clientName: user?.name || '',
              clientEmail: user?.email || '',
              clientPhone: user?.phone || '35577744414',
              clientAddress: user?.address || 'Rr. ekspresit, Tirana',
              description: values.about,
              startDate: timeStart,
              endDate: timeFinish,
              state: "SEND",
              userId: 1,
              serviceId: 2,
              workTeamId: 5
            });

            router.push("/post-schedule");
            form.reset();
          }
        } catch (error) {
          console.error("Error al enviar datos al API:", error);
          toast({
            title: "Error",
            description: "Hubo un problema al procesar tu solicitud. Por favor, intenta nuevamente.",
            variant: "destructive"
          });
        }
      } else {
        try {
          // Crear el objeto con el formato esperado por la API
          const eventData = {
            name: values.name,
            phone: values.phone,
            email: values.email,
            address: values.address,
            service: values.service,
            about: values.about,
            timeStart: timeStart,
            timeFinish: timeFinish,
            isLoggedIn: isLoggedIn
          };

          // Enviar al API utilizando el ViewModel
          const eventResult = await createCalendarEvent(eventData);

          if (eventResult.success && (eventResult.status === 200 || eventResult.status === 201)) {
            // Solo crear el lead si el evento del calendario fue exitoso
            await createLead({
              clientName: values.name,
              clientEmail: values.email,
              clientPhone: values.phone,
              clientAddress: values.address,
              description: values.about,
              startDate: timeStart,
              endDate: timeFinish,
              state: "SEND",
              userId: 1,
              serviceId: 2,
              workTeamId: 5
            });

            router.push("/post-schedule");
            form.reset();
          }
        } catch (error) {
          console.error("Error al enviar datos al API:", error);
          toast({
            title: "Error",
            description: "Hubo un problema al procesar tu solicitud. Por favor, intenta nuevamente.",
            variant: "destructive"
          });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="bg-white w-full border-0 flex flex-col items-center justify-center md:w-[778px] md:justify-start md:items-start md:pt-14 md:pb-12">
      <CardHeader>
        <CardTitle className="text-[#0A1248] font-bold text-5xl text-wrap ml-10 mb-2">
          Let's <span className="block md:inline">Connect</span>
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
              <div>
                <Card className="bg-white border border-[#E4E4E7] mb-3 md:pt-11 md:w-96 md:h-[306px] md:mt-5">
                  <CardHeader>
                    <CardTitle className="text-[#0A1248] font-normal text-base">
                      My profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-row">
                    <div className="w-16 h-16 mr-3 rounded-full bg-gradient-to-r from-[#8ECF0A] via-[#39cac0] to-[#8ECF0A] flex items-center justify-center transition-all group-hover:shadow-[0_0_15px_rgba(142,207,10,0.7)]"></div>
                    <div className="flex flex-col text-left justify-center">
                      <span className="font-normal text-[#060B20]">{user?.name}</span>
                      <span className="text-sm text-gray-500">{user?.email}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pb-3 pl-3">
                    <Button
                      className="rounded-full text-xs bg-[#0A1248] text-white hover:bg-[#04081e] disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={async () => {
                        try {
                          setIsLoggingOut(true);
                          await authLogout();
                          router.push('/login');
                        } catch (error) {
                          toast({
                            title: "Error",
                            description: "No se pudo cerrar la sesión correctamente",
                            variant: "destructive"
                          });
                        } finally {
                          setIsLoggingOut(false);
                        }
                      }}
                      disabled={isLoggingOut}
                    >
                      {isLoggingOut ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Logging out...
                        </>
                      ) : (
                        'Log in with another profile'
                      )}
                    </Button>
                  </CardFooter>
                </Card>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    id="contact-form"
                    className="md:justify-center md:items-center mr-4"
                  >
                    <FormField
                      name="service"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative md:w-96">
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
                              <ConciergeBell color="#0A1248" className="absolute inset-y-3 md:inset-y-2 left-2" />
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
                          <div className="w-full h-36 bg-[#EBEDF2] px-0 pt-2 mt-2 rounded-sm">
                            <Label htmlFor="about" className="px-2 mb-1 mt-0 flex text-center font-normal items-center text-[#636A9C] text-xl md:text-sm ">
                              <MessageSquareText className="mr-2" color="#0A1248" />
                              Tell us about your project
                            </Label>
                            <FormControl>
                              <textarea
                                {...field}
                                id="about"
                                className="w-[96%] m-auto flex rounded-sm bg-white text-[#0A1248] py-2 px-8 text-lg md:text-sm placeholder-[#636A9C] md:h-[100px] h-24 resize-none overflow-auto"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                placeholder="Describe your project..."
                              />
                            </FormControl>
                          </div>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
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
                              className="absolute top-3 md:top-[30px] left-2 "
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
                              color="#0A1248"
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
                              color="#0A1248"
                              className="absolute top-3 md:top-2 left-2"
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="address"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative w-[320px]">
                            <input
                              {...field}
                              placeholder="address"
                              className="md:text-sm text-lg   text-[#636A9C] bg-[#EBEDF2] rounded-sm placeholder-[#636A9C] py-2 px-4 pl-10 w-full mb-2"
                              type="address"
                            />
                            <MapPinned
                              color="#0A1248"
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
                            <ConciergeBell color="#0A1248" className="absolute inset-y-3 md:inset-y-2 left-2" />
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
                        <div className="w-full h-36 bg-[#EBEDF2] px-0 pt-2 mt-2 rounded-sm">
                          <Label htmlFor="about" className="px-2 mb-1 mt-0 flex text-center font-normal items-center text-[#636A9C] text-xl md:text-sm ">
                            <MessageSquareText className="mr-2" color="#0A1248" />
                            Tell us about your project
                          </Label>
                          <FormControl>
                            <textarea
                              {...field}
                              id="about"
                              className="w-[96%] m-auto flex rounded-sm bg-white text-[#0A1248] py-2 px-8 text-lg md:text-sm placeholder-[#636A9C] md:h-[100px] h-24 resize-none overflow-auto"
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
              className="rounded-full bg-secondary text-white mt-5 text-base px-6 py-5 font-normal hover:bg-[#04081e] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
              onClick={() => {
                if (isLoggedIn) {
                  // Si está logueado, usar los datos del usuario
                  const userData = {
                    name: user?.name || '',
                    email: user?.email || '',
                    phone: user?.phone || '',
                    address: user?.address || '',
                    service: form.getValues('service'),
                    about: form.getValues('about'),
                    date: form.getValues('date'),
                    timeRange: form.getValues('timeRange'),
                    timezone: form.getValues('timezone')
                  };
                  onSubmit(userData as any);
                }
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Schedule event'
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
