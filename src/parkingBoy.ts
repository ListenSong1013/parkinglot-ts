import {ParkingLot} from "./parkingLot";
import {Car} from "./car";
import {Ticket} from "./ticket";
import {exceptionMessages} from "./exceptionMessage";

interface Lots {

}

export class ParkingBoy {
  private parkingLots: ParkingLot[] = []
  constructor(lots: number[]) {
    for(const i of lots) {
      this.parkingLots.push(new ParkingLot(i))
    }
  }

  park(car: Car) {
    const lot: ParkingLot | undefined = this.parkingLots.find(lot => lot.hasSpace())

    if (lot) {
      return lot.park(car)
    }

    throw new Error(exceptionMessages.PARKING_BOY_HAS_NO_SPACED_PARKING_LOT)
  }

  pick(ticket: Ticket): Car {
    const lot = this.parkingLots.find(lot => lot.getLotId() === ticket.lotId)
    if (!lot) {
      throw new Error(exceptionMessages.PARKING_LOT_NOT_EXIST)
    }
    const car = lot.pick(ticket)

    return car
  }
}
