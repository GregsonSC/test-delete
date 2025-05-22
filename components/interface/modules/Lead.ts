export interface Lead {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    clientAddress: string;
    description: string;
    state: "SEND"
    startDate: string;
    endDate: string;
    userId: "1",
    serviceId: "2",
    workTeamId: "5"
}
export interface ApiResponse<T> {
    success: boolean;
    data: T[];
    message: string;
    errors: string[];
    }