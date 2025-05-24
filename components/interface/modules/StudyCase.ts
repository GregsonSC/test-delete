export interface StudyCase {
    id: number;
    title: string;
    resume: string;
    videoUrl: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface ApiResponse<T> {
    success: boolean;
    data: T[];
    message: string;
    errors: string[];
  }