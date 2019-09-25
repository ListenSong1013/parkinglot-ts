import {ParkingAble} from "./parkingAble";
import {Car} from "./car";
import {Ticket} from "./ticket";
import { exceptionMessages } from "./exceptionMessage";

interface Cars {
  [propName: string]: Car
}

export class ParkingLot implements ParkingAble {
  private space: number
  private cars: Cars

  constructor(space: number) {
    this.space = space
    this.cars = {}
  }

  park(car: Car): Ticket {
    const ticket = new Ticket()
    if (Object.keys(this.cars).length >= this.space) {
      throw new Error(exceptionMessages.PARKING_LOT_HAS_NO_SPACE)
    }
    this.cars[ticket.id] = car
    return ticket
  }

  pick(ticket: Ticket): Car {
    const car: Car | undefined = this.cars[ticket.id]
    if (car) {
      delete this.cars[ticket.id]
      return car
    }

    throw new Error(exceptionMessages.PARKING_LOT_HAS_NO_THIS_CAR)
  }

}
