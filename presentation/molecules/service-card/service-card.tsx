"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/presentation/atoms/button/button";
import type { ServiceCardProps } from "./service-card-types";
import Image from "next/image";

export function ServiceCard({
  title,
  description,
  imageUrl,
  ctaText = "Learn More",
  onCtaClick,
}: ServiceCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl || "/placeholder.svg?height=200&width=400"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button onClick={onCtaClick}>{ctaText}</Button>
      </CardFooter>
    </Card>
  );
}
