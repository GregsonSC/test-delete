import { useState } from "react";
import { useFetch } from "@/lib/services/endpoints";
import { endpoints } from "@/lib/services/endpoints";
import { ApiResponse, Newsletter } from "@/components/interface/modules/NewsLetter";

export const NewsletterViewModel = () => {
    const { fetchData } = useFetch();
    const [subscriptionStatus, setSubscriptionStatus] = useState<string>("");

    const subscribeToNewsletter = async (Newsletter: string) => {
        const payload = { email: Newsletter };
        const { response, status, errorLogs } = await fetchData(
            endpoints.newsletter.CreateNewsletter,
            "post",
            payload
        );
        if (status === 200 || status === 201) {
            if (response) {
                setSubscriptionStatus("success");
                return { success: true, message: "Email registered successfully" };
            } else {
                console.error("No data:", errorLogs);
                setSubscriptionStatus("error");
                return { success: false, message: "Error registering email" };
            }
        } else {
            console.error("HTTP error:", status, errorLogs);
            setSubscriptionStatus("error");
            return { success: false, message: `Error ${status}: Registration failed` };
        }
    }
    return { subscriptionStatus, subscribeToNewsletter };
};
