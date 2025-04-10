"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";

export function Calendar_molecule() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="text-black rounded-sm border border-[#E4E4E7]" //Colocar estilos :b
        />
    );
}
