export interface Benefit {
    id: number;
    title: string;
    description: string;
    serviceAreaId: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T[];
    message: string;
    errors: string[];
}
