import { useState } from "react";
import { useFetch } from "@/lib/services/endpoints";
import { endpoints } from "@/lib/services/endpoints";
import { ApiResponse, ServiceArea } from "@/components/interface/modules/ServiceArea";
import { Benefit } from "@/components/interface/modules/Benefit";


export const ServiceAreaViewModel = () => {
    const { fetchData } = useFetch();
    const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [benefits, setBenefits] = useState<Benefit[]>([]);

    const getServiceArea = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const { response, status, errorLogs } = await fetchData<ApiResponse<ServiceArea>>(
                endpoints.servicearea.getServiceArea(id.toString()),
                "get"
            );

            if (status === 200 && response && response.success) {
                const data = Array.isArray(response.data) ? response.data : [response.data];
                setServiceAreas(data);
            } else {
                const errorMessage =
                    errorLogs?.message ||
                    response?.message ||
                    `Failed to fetch service area (Status: ${status})`;
                console.log("errorMessage", errorMessage);
                setError(errorMessage);
                setServiceAreas([]);

            }
        } catch (err: any) {
            const errorMessage =
                err.message ||
                "An unexpected error occurred while fetching service area.";
            setError(errorMessage);
            setServiceAreas([]);
        } finally {
            setLoading(false);
        }
    };

    const getBenefitsForServiceArea = async (serviceAreaId: number) => {
        try {
            const { response, status } = await fetchData<ApiResponse<Benefit>>(
                endpoints.benefit.getBenefits,
                "get"
            );
            if (status === 200 && response && response.success) {
                const filtered = response.data.filter(
                    (benefit: Benefit) => benefit.serviceAreaId === serviceAreaId
                );
                setBenefits(filtered);
            } else {
                setBenefits([]);
            }
        } catch (err) {
            setBenefits([]);
        }
    };

    return {
        serviceAreas,
        getServiceArea,
        getBenefitsForServiceArea,
        benefits,
        loading,
        error
    };
};

export default ServiceAreaViewModel;
