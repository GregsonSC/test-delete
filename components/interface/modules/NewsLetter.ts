export interface Newsletter {
    email: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T[];
    message: string;
    errors: string[];
  }

