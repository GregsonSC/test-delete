import {StudyCase, ApiResponse} from "@/components/interface/modules/StudyCase";
import { useFetch } from "@/lib/services/endpoints";
import { endpoints } from "@/lib/services/endpoints";
import { use, useEffect, useState } from "react";

export const StudyCaseViewModel = () => {
    const { fetchData } = useFetch();
    const [StudyCases, setStudyCases] = useState<StudyCase[]>([]);
    useEffect(() => {
        getAllStudyCases();
    }, []);
    const getAllStudyCases = async () => {
        const {response, status, errorLogs} = await fetchData(endpoints.studycase.getCases, "get");
        if (status === 200){
            if (response) {
                // Aquí response es StudyCase[]
                setStudyCases(response as unknown as StudyCase[]);
            } else {
                console.error("No hay datos:", errorLogs);
                alert("Error al cargar los casos de estudio");
            }
        } else {
            console.error("HTTP error:", status, errorLogs);
            alert("Error al cargar los posts del blog");
        }
    };
    return { StudyCases, };
};

export default StudyCaseViewModel;
