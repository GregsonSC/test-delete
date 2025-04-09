"use client";
import { useState } from "react";
import { Calendar_molecule } from "@/presentation/molecules/calendar/calendar";
import { HourSelector } from "@/presentation/molecules/hour-selector/hour-selector";

export function Planner() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

    return (
        <div className="flex flex-col items-center">
            {/* Si no hay fecha seleccionada se muestra el calendario */}
            {!selectedDate ? (
                <Calendar_molecule
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                />
            ) : (
                // Una vez seleccionada la fecha se muestra únicamente el HourSelector
                <HourSelector onBack={() => setSelectedDate(undefined)} />
            )}
        </div>
    );
}