interface StudyCase {
    id: number;
    title: string;
    resume: string;
    videoUrl: string;
}

export type { StudyCase };

export interface ApiResponse<T> {
    success: boolean;
    data: T[];
    message: string;
    errors: string[];
    }