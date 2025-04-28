"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/presentation/atoms/button/button";
import { ArrowRight } from 'lucide-react';
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});
// !CH009 [UPDATE] Agregar endpoint para el newsletter
export function EmailForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const registerPromise = new Promise<{ message: string }>((resolve, reject) => {
      setTimeout(() => {
        resolve({ message: `¡Correo registrado: ${values.email}!` });
        // Para simular error, usa: reject(new Error("Hubo un error"));
      }, 2000);
    });

    await toast.promise(registerPromise, {
      loading: "Registrando tu correo...",
      success: (result) => result.message || "¡Registro exitoso!",
      error: (error) => error?.message || "Registro fallido. Intenta de nuevo.",
    });

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative w-full">
              <Input
                placeholder="Email"
                {...field}
                className="bg-white text-black w-full pr-12" 
              />
              <Button className="absolute inset-y-2 right-3 rounded-full m-0 p-3 w-3 h-3">
                <ArrowRight strokeWidth={5} color="white"  />
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
