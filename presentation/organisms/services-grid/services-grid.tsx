"use client";

import { useEffect, useState } from "react";
import { ServiceCard } from "@/presentation/molecules/service-card/service-card";
import { getServices } from "@/data/repositories/service-repository";
import type { Service } from "@/domain/models/service";

export function ServicesGrid() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error("Error loading services:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadServices();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-72 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          title={service.title}
          description={service.description}
          imageUrl={service.imageUrl}
          onCtaClick={() => (window.location.href = `/services/${service.slug}`)}
        />
      ))}
    </div>
  );
}
