import { ReservationRes } from "./reservation-res";

export interface SlotRes {
  id: number;
  place_code: string;
  reservation?: ReservationRes;
  status: 'Ocupado' | 'Disponible';
}