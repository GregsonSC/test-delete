import { useState } from "react";
import { useFetch } from "@/lib/services/endpoints";
import { endpoints } from "@/lib/services/endpoints";
import { ApiResponse, ServiceArea } from "@/components/interface/modules/ServiceArea";

export const ServiceAreaViewModel = () => {
    const { fetchData } = useFetch();
    const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([]);

    const getServiceArea = async (id: string) => {
        const { response, status, errorLogs } = await fetchData(endpoints.servicearea.getServiceArea(id), "get");
        if (status === 200) {
            if (response) {
                // Handle response as a single object and convert to array
                const serviceAreaData = Array.isArray(response) ? response : [response];
                setServiceAreas(serviceAreaData as ServiceArea[]);
            }
            else { console.error("No hay datos:", errorLogs); alert("Error al cargar el servicio"); }
        } else {
            console.error("HTTP error:", status, errorLogs);
            alert("Error al cargar el servicio");
        }
    }

    return { serviceAreas, getServiceArea };
};

export default ServiceAreaViewModel
