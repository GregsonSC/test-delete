import type { Service } from "@/domain/models/service";

// Mock data for services
const mockServices: Service[] = [
  {
    id: "1",
    title: "Web Development",
    description: "Custom websites and web applications tailored to your business needs.",
    slug: "web-development",
    imageUrl: "/placeholder.svg?height=200&width=400",
    features: [
      "Responsive design",
      "Content management system",
      "E-commerce functionality",
      "SEO optimization",
      "Performance optimization",
    ],
    price: {
      amount: 2500,
      currency: "USD",
      period: "project",
    },
  },
  {
    id: "2",
    title: "Digital Marketing",
    description: "Comprehensive digital marketing strategies to grow your online presence.",
    slug: "digital-marketing",
    imageUrl: "/placeholder.svg?height=200&width=400",
    features: [
      "Search engine optimization (SEO)",
      "Social media marketing",
      "Email marketing",
      "Content marketing",
      "Pay-per-click advertising",
    ],
    price: {
      amount: 1500,
      currency: "USD",
      period: "month",
    },
  },
  {
    id: "3",
    title: "UI/UX Design",
    description: "User-centered design solutions that enhance user experience and satisfaction.",
    slug: "ui-ux-design",
    imageUrl: "/placeholder.svg?height=200&width=400",
    features: [
      "User research",
      "Wireframing and prototyping",
      "Visual design",
      "Usability testing",
      "Design system creation",
    ],
    price: {
      amount: 3000,
      currency: "USD",
      period: "project",
    },
  },
  {
    id: "4",
    title: "Business Consulting",
    description:
      "Strategic business consulting to help you achieve your goals and overcome challenges.",
    slug: "business-consulting",
    imageUrl: "/placeholder.svg?height=200&width=400",
    features: [
      "Business strategy development",
      "Market analysis",
      "Process optimization",
      "Growth planning",
      "Performance measurement",
    ],
    price: {
      amount: 2000,
      currency: "USD",
      period: "month",
    },
  },
  {
    id: "5",
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    slug: "mobile-app-development",
    imageUrl: "/placeholder.svg?height=200&width=400",
    features: [
      "Native iOS development",
      "Native Android development",
      "Cross-platform development",
      "App store optimization",
      "Ongoing maintenance and support",
    ],
    price: {
      amount: 5000,
      currency: "USD",
      period: "project",
    },
  },
  {
    id: "6",
    title: "E-commerce Solutions",
    description: "End-to-end e-commerce solutions to help you sell products and services online.",
    slug: "e-commerce-solutions",
    imageUrl: "/placeholder.svg?height=200&width=400",
    features: [
      "Online store setup",
      "Payment gateway integration",
      "Inventory management",
      "Order fulfillment",
      "Customer relationship management",
    ],
    price: {
      amount: 4000,
      currency: "USD",
      period: "project",
    },
  },
];

// Function to get all services
export async function getServices(): Promise<Service[]> {
  // In a real application, this would fetch data from an API or database
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve(mockServices);
    }, 500);
  });
}

// Function to get a service by slug
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  // In a real application, this would fetch data from an API or database
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const service = mockServices.find((s) => s.slug === slug) || null;
      resolve(service);
    }, 500);
  });
}
