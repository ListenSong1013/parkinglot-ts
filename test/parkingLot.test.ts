import { ParkingLot } from "../src/parkingLot";
import {Car} from "../src/car";
import {Ticket} from "../src/ticket";
import {exceptionMessages} from "../src/exceptionMessage";

describe('Test ParkingLot', () => {
  // Given 有1个空车位的停车场
  // When 停1辆车
  // Then 返回一张停车票
  it('should return a ticket when park a car', () => {
    const parkingLot = new ParkingLot(3)
    const car = new Car()
    let ticket = parkingLot.park(car)
    expect(ticket).toBeTruthy()
  })

  // Given 有多个空车位的停车场
  // When 连续停多辆车
  // Then 返回不同的停车票
  it('should return different ticket when park multi cars', () => {
    const parkingLot = new ParkingLot(3)
    const car = new Car()
    let ticket = parkingLot.park(car)
    expect(ticket).toBeTruthy()

    const anotherCar = new Car()
    let anotherTicket = parkingLot.park(anotherCar)
    expect(anotherTicket).toBeTruthy()

    expect(ticket).not.toEqual(anotherTicket)
  })

  // Given 一个没有空车位的停车场
  // When 停车
  // Then 停车失败
  it('should catch error when parkingLot has no space', () => {
    const parkingLot = new ParkingLot(1)
    const car = new Car()
    let ticket = parkingLot.park(car)
    expect(ticket).toBeTruthy()

    const anotherCar = new Car()
    expect(() => parkingLot.park(anotherCar)).toThrow()

  })

  // Given 一个只停了我的车的停车场
  // When 用停车票取车
  // Then 取出我的车
  it('should pick my car when parkingLot parked my car', () => {
    const parkingLot = new ParkingLot(3)
    const car = new Car()
    let ticket = parkingLot.park(car)

    const myCar = parkingLot.pick(ticket)
    expect(myCar).toBe(car)
  })

  // Given 一个停了多个车且包括我的车的停车场
  // When 用我的停车停车票取车
  // Then 取出我的车
  it('should pick my car when parkingLot parked multi cars', () => {
    const parkingLot = new ParkingLot(3)
    const car = new Car()
    let ticket = parkingLot.park(car)

    const anotherCar = new Car()
    parkingLot.park(anotherCar)

    const myCar = parkingLot.pick(ticket)
    expect(myCar).toBe(car)
  })

  // Given 一个停了我的车的停车场
  // When 用一张无效的票取车
  // Then 取车失败
  it('should throw error when pick my car by invalid ticket', () => {
    const parkingLot = new ParkingLot(3)
    const car = new Car()
    let ticket = parkingLot.park(car)

    const invalidTicket = new Ticket()
    expect(() => parkingLot.pick(invalidTicket)).toThrow(exceptionMessages.PARKING_LOT_HAS_NO_THIS_CAR)
  })

  // Given 一个停了我的车的停车场
  // When 用同一张票取车两次
  // Then 第二次取车失败
  it('should throw error when pick my car by used ticket', () => {
    const parkingLot = new ParkingLot(3)
    const car = new Car()
    let ticket = parkingLot.park(car)
    parkingLot.pick(ticket)

    expect(() => parkingLot.pick(ticket)).toThrow(exceptionMessages.PARKING_LOT_HAS_NO_THIS_CAR)
  })

})
