import { useEffect, useState } from "react";
import { useFetch } from "@/lib/services/endpoints";
import { endpoints } from "@/lib/services/endpoints";
import { PortfolioItem, PortfolioApiResponse } from "@/components/interface/modules/Portfolio"; // Importo la nueva interfaz

export const PortfolioViewModel = () => {
  const { fetchData } = useFetch();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageInfo, setPageInfo] = useState<{
    offset: number;
    productsPerPage: number;
    totalProducts: number;
  } | null>(null);

  useEffect(() => {
    getAllPortfolioItems();
  }, []);

  const getAllPortfolioItems = async () => {
    setLoading(true);
    setError(null);
    try {
      // Ahora esperamos PortfolioApiResponse
      const { response, status, errorLogs } = await fetchData<PortfolioApiResponse>(
        endpoints.portfolio.getProducts,
        "get"
      );

      console.log("Portfolio Fetch Status:", status);
      console.log("Portfolio Fetch Response:", response);
      console.log("Portfolio Fetch Error Logs:", errorLogs);

      if (status === 200 && response && response.success) {
        // Seteo los items y la info de paginación
        setPortfolioItems(response.data);
        setPageInfo(response.page);
      } else {
        const errorMessage =
          errorLogs?.message ||
          response?.message ||
          `Failed to fetch portfolio items (Status: ${status})`;
        console.error("API/HTTP Error:", errorMessage);
        setError(errorMessage);
        setPortfolioItems([]);
        setPageInfo(null);
      }
    } catch (err: any) {
      console.error("Error during portfolio fetch:", err);
      const errorMessage =
        err.message || "An unexpected error occurred while fetching portfolio items.";
      setError(errorMessage);
      setPortfolioItems([]);
      setPageInfo(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    portfolioItems,
    loading,
    error,
    pageInfo,
  };
};

export default PortfolioViewModel;
