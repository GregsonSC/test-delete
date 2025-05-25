import { StudyCase, ApiResponse } from "@/components/interface/modules/StudyCase";
import { useFetch } from "@/lib/services/endpoints";
import { endpoints } from "@/lib/services/endpoints";
import { useEffect, useState } from "react";

export const StudyCaseViewModel = () => {
  const { fetchData } = useFetch();
  const [StudyCases, setStudyCases] = useState<StudyCase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllStudyCases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllStudyCases = async () => {
    setLoading(true);
    setError(null);
    try {
      const { response, status, errorLogs } = await fetchData<ApiResponse<StudyCase>>(
        endpoints.studycase.getCases,
        "get"
      );
      if (status === 200 && response && response.success) {
        setStudyCases(response.data);
      } else {
        const errorMessage =
          errorLogs?.message ||
          response?.message ||
          `Failed to fetch study cases (Status: ${status})`;
        setError(errorMessage);
        setStudyCases([]);
      }
    } catch (err: any) {
      const errorMessage =
        err.message || "An unexpected error occurred while fetching study cases.";
      setError(errorMessage);
      setStudyCases([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    StudyCases,
    loading,
    error,
  };
};

export default StudyCaseViewModel;
