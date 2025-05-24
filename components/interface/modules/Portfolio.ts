/**
 * Interface representing a single portfolio item.
 */
export interface Tag {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductTag {
  product_id: number;
  tag_id: number;
  tag: Tag;
}

export interface PortfolioItem {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  siteUrl: string;
  createdAt: string;
  updatedAt: string;
  ProductTag: ProductTag[];
}

/**
 * Interface for the API response containing portfolio items.
 * Assuming a similar structure to the Blog API response.
 */
export interface PortfolioApiResponse {
  success: boolean;
  message: string;
  data: PortfolioItem[];
  errors?: string[];
  page: {
    offset: number;
    productsPerPage: number;
    totalProducts: number;
  };
}
