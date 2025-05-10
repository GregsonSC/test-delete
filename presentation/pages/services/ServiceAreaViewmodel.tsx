import { useEffect, useState } from "react";
import { useFetch } from "@/lib/services/endpoints";
import { endpoints } from "@/lib/services/endpoints";
import { ApiResponse, ServiceArea } from "@/components/interface/modules/ServiceArea";

const validCounty = ["MIAMI_DATE", "BROWARD", "WEST_PALM_BEACH"];

export const ServiceAreaViewModel = () => {
    const { fetchData } = useFetch();
    const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([]);

    useEffect(() => { getAllServicesAreas(); }, []);

    const getAllServicesAreas = async () => {
        const { response, status, errorLogs } = await fetchData(endpoints.servicearea.getServiceAreas, "get");
        if (status === 200) {
            if (response) { setServiceAreas(response as unknown as ServiceArea[]) }
            else { console.error("No hay datos:", errorLogs); alert("Error al cargar los servicios"); }
        } else {
            console.error("HTTP error:", status, errorLogs);
            alert("Error al cargar los servicios");
        }
    };


    const getServiceArea = async (id: string) => {
        const { response, status, errorLogs } = await fetchData(endpoints.servicearea.getServiceArea(id), "get");

        debugger

        if (status === 200) {
            if (response) { setServiceAreas(response as unknown as ServiceArea[]) }
        }
    }

    return { serviceAreas, getServiceArea };

};

export default ServiceAreaViewModel
// constantes moverlo alla
export { validCounty }