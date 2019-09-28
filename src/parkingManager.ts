import {ParkingAble} from "./parkingAble";
import {Ticket} from "./ticket";
import {Car} from "./car";
import {exceptionMessages} from "./exceptionMessage";

export class ParkingManager {
  private parkingAbles: ParkingAble[] = []

  constructor(parkingAbles: ParkingAble[]) {
    this.parkingAbles = parkingAbles
  }

  park(car: Car):Ticket {
    const able = this.parkingAbles.find(parkingAble => parkingAble.hasSpace())

    if(able) {
      return able.park(car)
    }

    throw new Error(exceptionMessages.PARKING_MANAGER_PARK_FAIL)

  }

  pick(ticket: Ticket) {
    const able = this.parkingAbles.find(parkingAble => parkingAble.contains(ticket))

    if(able) {
      return able.pick(ticket)
    }

    throw new Error(exceptionMessages.PARKING_MANAGER_PICK_FAIL)
  }

}
