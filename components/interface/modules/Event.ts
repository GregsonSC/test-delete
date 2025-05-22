export interface Event {
    name: string;
    phone?: string;
    email: string;
    address?: string;
    service: string;
    about: string;
    timeStart: string;
    timeFinish: string;
    isLoggedIn?: boolean;
}
export interface ApiResponse<T> {
    success: boolean;
    data: T[];
    message: string;
    errors: string[];
  }