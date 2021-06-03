import { User } from "./user";

export interface ReservationRes {
    id: number;
    user: User;
    initial_hour: string;
    final_hour: string;
    vehicle_plate: string;
    vehicle_type: string;
    slot: number;
    document_number?: any;
    email?: any;
    status: string;
    is_cancelled: boolean;
}