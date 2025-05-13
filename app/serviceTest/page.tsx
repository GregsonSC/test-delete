"use client"	
import { ServiceAreaViewModel } from "@/presentation/pages/services/ServiceAreaViewmodel";
import { useEffect, useState } from "react";
import { ServiceArea } from "@/components/interface/modules/ServiceArea";

export default function ServiceTest() {
    const { serviceAreas, getServiceArea } = ServiceAreaViewModel();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                await getServiceArea("1");
                setIsLoading(false);
            } catch (error) {
                console.error("Error loading service area:", error);
                setIsLoading(false);
            }
        };
          
        if (serviceAreas.length === 0) {
            loadData();
        } else {
            setIsLoading(false);
        }
        console.log(serviceAreas);
    }, [serviceAreas, getServiceArea]);

    return (
        <div>
            <h1 className="text-8xl font-bold">Service Test</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <p>{serviceAreas[0]?.MainTitle}</p>
            )}
        </div>
    )
}
