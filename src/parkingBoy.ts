import {ParkingLot} from "./parkingLot";
import {Car} from "./car";
import {Ticket} from "./ticket";
import {exceptionMessages} from "./exceptionMessage";

interface Lots {

}

export class ParkingBoy {
  protected parkingLots: ParkingLot[] = []
  constructor(lots: ParkingLot[]) {
    this.parkingLots = lots
  }

  park(car: Car) {
    const lot: ParkingLot | undefined = this.parkingLots.find(lot => lot.hasSpace())
    if (lot) {
      return lot.park(car)
    }

    throw new Error(exceptionMessages.PARKING_BOY_HAS_NO_SPACED_PARKING_LOT)
  }

  pick(ticket: Ticket): Car {
    const lot = this.parkingLots.find(lot => lot.contains(ticket))

    if (!lot) {
      throw new Error(exceptionMessages.PARKING_LOT_HAS_NO_THIS_CAR)
    }
    const car = lot.pick(ticket)

    return car
  }
}
