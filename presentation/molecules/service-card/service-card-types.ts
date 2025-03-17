export interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}
