import {sortBy} from 'lodash'

import { Car } from './car'
import {ParkingBoy} from "./parkingBoy";
import {exceptionMessages} from "./exceptionMessage";

export class SmartParkingBoy extends ParkingBoy {

  park(car: Car) {

    const lot = sortBy(this.parkingLots, lot => -lot.availableSpace())
      .find(lot => lot.hasSpace())

    if (lot) {
      return lot.park(car)
    }

    throw new Error(exceptionMessages.PARKING_BOY_HAS_NO_SPACED_PARKING_LOT)
  }
}
