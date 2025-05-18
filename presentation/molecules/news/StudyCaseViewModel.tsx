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
        await fetchData(endpoints.studycase.getCases, "get").then(
            ({ response, status, errorLogs }) => {
              console.log("errorLogs:", errorLogs);   
              const apiResponse = response as ApiResponse<StudyCase>;
              if (status === 200) {
                if (apiResponse.success) {
                  console.log("Success:", apiResponse.data);
                  setStudyCases(apiResponse.data);
                } else {
                  console.error("Error:", apiResponse.message);
                  alert("Error al cargar los casos de estudio");
                }
                if (apiResponse.errors && apiResponse.errors.length > 0) {
                  console.error("Validation errors:", apiResponse.errors);
                  alert("Errores de validación al cargar los casos de estudio");
                }
              }
            }
          );
    };
    return { StudyCases, };
};

export default StudyCaseViewModel;
