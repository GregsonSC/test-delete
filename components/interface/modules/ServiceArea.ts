interface ServiceArea {
    name: string;
    description: string;
    active: boolean;
    county: string;
    heroImageUrl: string;
    testimonialEmbed: string;
    mainTitle: string;
    subTitle: string;
    service_id: number;
    service: any[];
    createAt: string;
    updatedAt: string;
    benefit: string;
    benefitsImageUrl: string;
    id: string;
}
export interface ApiResponse<T> {
    success: boolean;
    data: T[];
    message: string;
    errors: string[];
  }

export type { ServiceArea };
  