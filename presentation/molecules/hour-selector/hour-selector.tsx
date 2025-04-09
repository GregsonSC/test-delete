"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/presentation/atoms/button/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { schedules } from "@/components/const/schedules"
import { ChevronLeft } from 'lucide-react';

interface HourSelection {
    timezone: string
    hour: string}

interface HourSelectorProps {
    onBack: () => void;}

export function HourSelector({ onBack }: HourSelectorProps) {
    const [selection, setSelection] = useState<HourSelection>({ timezone: "", hour: "" })

    return (
        <Card className="bg-white w-72 h-auto border-[#E4E4E7]">
            <CardHeader className="items-start text-center p-0 ">
                <Button className="bg-white w-3 h-6 mt-4 ml-2" onClick={onBack}><ChevronLeft strokeWidth={3}/></Button>
            </CardHeader>
            <CardContent className="flex flex-col text-center items-center">
                <CardTitle className="font-medium text-base text-secondary mb-5">Select an hour for the call</CardTitle>
                <div>
                    <Select>
                        <SelectTrigger className=" rounded-full bg-transparent text-[#636A9C] border-[#636A9C] h-7 w-60 mb-2">
                            <SelectValue placeholder="Select a timezone" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>United States</SelectLabel>
                                <SelectItem value="UTC-05:00">
                                    Eastern Standard Time (UTC-05:00)
                                </SelectItem>
                                <SelectItem value="UTC-06:00">
                                    Central Standard Time (UTC-06:00)
                                </SelectItem>
                                <SelectItem value="UTC-07:00">
                                    Mountain Standard Time (UTC-07:00)
                                </SelectItem>
                                <SelectItem value="UTC-08:00">
                                    Pacific Standard Time (UTC-08:00)
                                </SelectItem>
                                <SelectItem value="UTC-09:00">
                                    Alaska Standard Time (UTC-09:00)
                                </SelectItem>
                                <SelectItem value="UTC-10:00">
                                    Hawaii Standard Time (UTC-10:00)
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>

                    </Select>
                </div>
                <div className="h-44 mb-5">
                    <ScrollArea className="w-full h-full">
                        <div className="flex flex-col space-y-2 p-4">
                            {schedules.map((hour) => (
                            <Button
                                key={hour}
                                variant={selection.hour === hour ? "default" : "outline"}
                                onClick={() => setSelection((prev) => ({ ...prev, hour: hour }))}
                                className={`rounded-full h-7 w-60 border-0 ${
                                    selection.hour === hour? "bg-[#D3E8A9] text-black text-lg" // estilo cuando se presiona el botón
                                      : "bg-[#EBEDF2] text-[#636A9C] text-lg" // estilo por defecto
                                  }`}
                            >
                                {hour}
                            </Button>
                            ))}
                        </div>
                    </ScrollArea>
                </div>  
                <Button className = "rounded-full bg-primary font-semibold h-8 text-lg">Confirm Date</Button>
            </CardContent>

    
        </Card>
    )
}