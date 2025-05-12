/**
 * Interface representing a single portfolio item.
 */
export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  success: boolean;
}

/**
 * Interface for the API response containing portfolio items.
 * Assuming a similar structure to the Blog API response.
 */
export interface PortfolioApiResponse<T> {
  success: boolean;
  message: string;
  data: T[]; // Array of portfolio items
  errors?: string[];
}