import { Car } from "./car";
import { Ticket } from "./ticket"

export interface ParkingAble {
  park(car: Car): Ticket

  pick(ticket: Ticket): Car

}
