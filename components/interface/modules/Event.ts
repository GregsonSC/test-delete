export interface Event {
    name: string;
    phone: string;
    email: string;
    service: string;
    about: string;
    timeStart: string;
    timeFinish: string;
}
export interface ApiResponse<T> {
    success: boolean;
    data: T[];
    message: string;
    errors: string[];
  }
  