export interface Service {
  id: string;
  title: string;
  description: string;
  slug: string;
  imageUrl?: string;
  features: string[];
  price?: {
    amount: number;
    currency: string;
    period?: string;
  };
}
