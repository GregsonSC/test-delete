import { useEffect, useState } from "react";
import { useFetch } from "@/lib/services/endpoints";
import { endpoints } from "@/lib/services/endpoints";
import { PortfolioItem } from "@/components/interface/modules/Portfolio"; // Only PortfolioItem is needed now

export const PortfolioViewModel = () => {
    const { fetchData } = useFetch();
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getAllPortfolioItems();
    }, []);

    const getAllPortfolioItems = async () => {
        setLoading(true);
        setError(null);
        try {
            // Expect a direct array of PortfolioItem
            const { response, status, errorLogs } = await fetchData<PortfolioItem[]>(
                endpoints.portfolio.getProducts, // Make sure this endpoint exists
                "get"
            );

            console.log("Portfolio Fetch Status:", status);
            console.log("Portfolio Fetch Response:", response);
            console.log("Portfolio Fetch Error Logs:", errorLogs);

            // Check if the status is successful (e.g., 200 OK)
            if (status === 200 && response) {
                // Directly set the response array to state
                console.log("Success: Portfolio items loaded", response);
                setPortfolioItems(response);
            } else {
                // Handle non-200 status codes or empty response
                const errorMessage = errorLogs?.message || `Failed to fetch portfolio items (Status: ${status})`;
                console.error("API/HTTP Error:", errorMessage);
                setError(errorMessage);
                setPortfolioItems([]); // Clear any previous items on error
                // Optionally show an alert or toast notification
                // alert(errorMessage);
            }
        } catch (err: any) {
            // Handle fetch exceptions
            console.error("Error during portfolio fetch:", err);
            const errorMessage = err.message || "An unexpected error occurred while fetching portfolio items.";
            setError(errorMessage);
            setPortfolioItems([]); // Clear any previous items on error
            // Optionally show an alert or toast notification
            // alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return {
        portfolioItems,
        loading,
        error,
    };
};

export default PortfolioViewModel;