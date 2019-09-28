import {sortBy} from 'lodash'

import {Car} from "./car";
import { Ticket } from "./ticket";
import {ParkingBoy} from "./parkingBoy";
import {exceptionMessages} from "./exceptionMessage";

export class SuperParkingBoy extends ParkingBoy {
  park(car: Car): Ticket {
    const lot = sortBy(this.parkingLots, lot => -lot.vacancyRate())
      .find(lot => lot.hasSpace())

    if (lot) {
      return lot.park(car)
    }

    throw new Error(exceptionMessages.PARKING_BOY_HAS_NO_SPACED_PARKING_LOT)
  }
}
