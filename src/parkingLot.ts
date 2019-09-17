import {ParkingAble} from "./parkingAble";
import {Car} from "./car";
import {Ticket} from "./ticket";

export class ParkingLot implements ParkingAble {
  park(car: Car): Ticket {
    const ticket = new Ticket()
    return ticket
  }

}
