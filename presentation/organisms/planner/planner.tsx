"use client";

import { useState } from "react";
import { Calendar_molecule } from "@/presentation/molecules/calendar/calendar";
import { HourSelector } from "@/presentation/molecules/hour-selector/hour-selector";

interface HourSelection {
    timezone: string;
    hour: string;
}

interface PlannerProps {
    onDateSelected?: (date: Date) => void;
    onHourSelected?: (selection: HourSelection) => void;
}

export function Planner({ onDateSelected, onHourSelected }: PlannerProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [hourSelection, setHourSelection] = useState<HourSelection | null>(null);

    return (
        <div className="flex flex-col items-center">
            {/* Si no hay fecha seleccionada se muestra el calendario */}
            {!selectedDate ? (
                <Calendar_molecule
                    selectedDate={selectedDate}
                    onDateChange={(date) => {
                        console.log("Date selected:", date);
                        setSelectedDate(date);
                        if (onDateSelected && date) {
                            onDateSelected(date);
                        }
                    }}
                />
            ) : (
                /* Una vez seleccionada la fecha se muestra únicamente el HourSelector */
                <HourSelector
                    onBack={() => setSelectedDate(undefined)}
                    onSelectionChange={(selection) => {
                        setHourSelection(selection);
                        console.log("Selection stored in Planner:", selection);
                        if (onHourSelected) {
                            onHourSelected(selection);
                        }
                    }}
                />
            )}
        </div>
    );
}
