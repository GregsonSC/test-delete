import { useEffect, useState } from "react";
import { useFetch, endpoints } from "@/lib/services/endpoints";
import { ApiResponse, Event } from "@/components/interface/modules/Event";
import { toast } from "sonner";
import {Lead, ApiResponse as LeadApiResponse} from "@/components/interface/modules/Lead";



export const ContactUsViewModel = () => {
    const { fetchData } = useFetch();
    const [submissionStatus, setSubmissionStatus] = useState<string>("");

    const createLead = async (leadData: Lead) => {
        const payload: Lead = {
            clientName: leadData.clientName,
            clientEmail: leadData.clientEmail,
            clientPhone: leadData.clientPhone,
            clientAddress: leadData.clientAddress,
            description: leadData.description,
            state: "SEND",
            startDate: leadData.startDate,
            endDate: leadData.endDate,
            userId: 1,
            serviceId: 2,
            workTeamId: 5
        };

        const { response, status, errorLogs } = await fetchData<LeadApiResponse<Lead>>(
            endpoints.lead.createLead,
            "post",
            payload
        );

        if (status === 200 || status === 201) {
            if (response) {
                toast.success("Lead created successfully");
                return { success: true, message: "Lead created successfully" };
            } else {
                console.error("No data returned:", errorLogs);
                toast.error("Error creating lead");
                return { success: false, message: "Error creating lead" };
            }
        } else {
            console.error("HTTP error:", status, errorLogs);
            toast.error(`Error ${status}: Could not create lead`);
            return { success: false, message: `Error ${status}: Could not create lead` };
        }
    };

    const createCalendarEvent = async (event: Event) => {
        const payload = {
            name: event.name,
            phone: event.phone,
            email: event.email,
            address: event.address,
            service: event.service,
            about: event.about,
            timeStart: event.timeStart,
            timeFinish: event.timeFinish,
            isLoggedIn: event.isLoggedIn
        };

        const { response, status, errorLogs } = await fetchData(
            endpoints.contact_us.creatCalendarEvent,
            "post",
            payload
        );

        if (status === 200 || status === 201) {
            if (response) {
                setSubmissionStatus("success");
                toast.success("Your appointment has been scheduled successfully");
                return { 
                    success: true, 
                    message: "Appointment scheduled successfully",
                    status: status 
                };
            } else {
                console.error("No data returned:", errorLogs);
                setSubmissionStatus("error");
                toast.error("Error scheduling your appointment");
                return { 
                    success: false, 
                    message: "Error scheduling appointment",
                    status: status 
                };
            }
        }
        if (status === 409){
            setSubmissionStatus("error");
            toast.error("The selected time is already booked");
            return { 
                success: false, 
                message: "The selected time is already booked",
                status: status 
            };
        } else {
            console.error("HTTP error:", status, errorLogs);
            setSubmissionStatus("error");
            toast.error(`Error ${status}: Could not schedule appointment`);
            return { 
                success: false, 
                message: `Error ${status}: Could not schedule appointment`,
                status: status 
            };
        }
    };

    return { submissionStatus, createCalendarEvent, createLead };
};

export const GetHoursViewModel = (date: string, timeRange: string) => {
    // Extract date portion from ISO string (e.g., "2025-05-16" from "2025-05-16T05:00:00.000Z")
    const datePortion = date.split('T')[0];

    // Split time range into start and end times
    const [startTime, endTime] = timeRange.split(' - ');

    // Convert 12-hour format to 24-hour format
    const convertTo24Hour = (time12h: string) => {
        const [time, modifier] = time12h.split(/([APap][Mm])/);
        let [hours, minutes] = time.split(':');

        // Convert to 24-hour format
        if (hours === '12') {
            hours = modifier.toLowerCase() === 'am' ? '00' : '12';
        } else if (modifier.toLowerCase() === 'pm') {
            hours = (parseInt(hours, 10) + 12).toString();
        }

        // Ensure 2-digit format
        hours = hours.padStart(2, '0');
        if (!minutes) minutes = '00';

        return `${hours}:${minutes}:00`;
    };

    // Convert both times to 24h format
    const startTime24h = convertTo24Hour(startTime);
    const endTime24h = convertTo24Hour(endTime);

    // Create ISO strings with timezone offset
    const timeStart = `${datePortion}T${startTime24h}.000-05:00`;
    const timeFinish = `${datePortion}T${endTime24h}.000-05:00`;

    return { timeStart, timeFinish };
};
