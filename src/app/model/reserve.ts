export interface Reserve {
    id: number,
    number_plate?: string,
    vehicle_type?: 'auto' | 'moto',
    initial_hour?: string,
    final_hour?: string,
    floor?: number,
    number?: number,
}