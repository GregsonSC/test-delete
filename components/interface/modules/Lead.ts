export interface Lead {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    clientAddress: string;
    description: string;
    state: "SEND"
    startDate: string;
    endDate: string;
    userId: number,
    serviceId: number,
    workTeamId: number
}
export interface ApiResponse<T> {
    success: boolean;
    data: T[];
    message: string;
    errors: string[];
    }