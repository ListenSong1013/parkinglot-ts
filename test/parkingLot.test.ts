import { ParkingLot } from "../src/parkingLot";
import {Car} from "../src/car";

describe('Test ParkingLot', () => {
  it('should return a ticket when park a car', () => {
    const parkingLot = new ParkingLot()
    const car = new Car()
    let ticket = parkingLot.park(car)
    expect(ticket).toBeTruthy()
  })

})
