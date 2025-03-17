import type { ContactMessage } from "@/domain/models/contact-message";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function sendContactMessage(formData: ContactFormData): Promise<ContactMessage> {
  // In a real application, this would send data to an API
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const message: ContactMessage = {
        ...formData,
        createdAt: new Date(),
      };

      console.log("Contact message sent:", message);
      resolve(message);
    }, 1000);
  });
}
