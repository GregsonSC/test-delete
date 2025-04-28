"use client";
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";

interface CalendarMoleculeProps {
    selectedDate?: Date;
    onDateChange: (date: Date | undefined) => void;
}

export function Calendar_molecule({
    selectedDate,
    onDateChange,
}: CalendarMoleculeProps) {
    return (
        <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateChange}
            className="text-black rounded-sm border border-[#E4E4E7]"
            classNames={{
                day_today: "bg-[#04081E] text-white",
                day_selected: "bg-[#04081E] text-white",
                cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-none [&:has([aria-selected])]:text-white",
            }}
        />
    );
}