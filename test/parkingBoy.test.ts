import { ParkingBoy } from "../src/parkingBoy";
import {Car} from "../src/car";
import {Ticket} from "../src/ticket"
import {exceptionMessages} from "../src/exceptionMessage";

describe('test ParkingBoy', () => {
  // Given 有一个停车场，该停车场有1个空车位
  // When 停1辆车
  // Then 返回一张停车票
  it('should return a ticket when a parkingLot has a space', () => {
    const parkingBoy = new ParkingBoy([1])
    const car = new Car()
    const ticket = parkingBoy.park(car)

    expect(ticket).toBeTruthy()
  })

  // Given 有两个停车场，第一个有足够多空车位
  // When 连续多辆车
  // Then 两辆车都停在第一个停车场
  it('should parked in first parkingLot when first parkingLot has enough spaces', () => {
    const parkingBoy = new ParkingBoy([3])
    const car = new Car()
    const ticket = parkingBoy.park(car)
    expect(ticket).toBeTruthy()

    const anotherCar = new Car()
    const anotherTicket = parkingBoy.park(anotherCar)
    expect(anotherTicket).toBeTruthy()
  })

  // Given 有两个停车场，每个都只有适量的空车位位
  // When 连续多辆车
  // Then 多辆车按顺序分别停在两个停车场上
  it('should parked cars by order when parked multi cars', () => {
    const parkingBoy = new ParkingBoy([1,3])
    const car = new Car()
    const ticket = parkingBoy.park(car)
    expect(ticket).toBeTruthy()

    const anotherCar = new Car()
    const anotherTicket = parkingBoy.park(anotherCar)
    expect(anotherTicket).toBeTruthy()

    expect(ticket.lotId).not.toBe(anotherTicket.lotId)

  })

  // Given 有两个停车场，第一个满了，第二个有足够的空车位
  // When 连续多辆车
  // Then 多辆车都停在第二个停车场上
  it('should parked cars in second lot when first lot has no space', () => {
    const parkingBoy = new ParkingBoy([0,3])
    const car = new Car()
    const ticket = parkingBoy.park(car)
    expect(ticket).toBeTruthy()

    const anotherCar = new Car()
    const anotherTicket = parkingBoy.park(anotherCar)
    expect(anotherTicket).toBeTruthy()

    expect(ticket.lotId).toBe(anotherTicket.lotId)

  })

  // Given 有两个停车场，两个停车场车位都满了
  // When 停车
  // Then 停车失败
  it('should throw error when all lot has no space', () => {
    const parkingBoy = new ParkingBoy([0,1])
    const car = new Car()
    const ticket = parkingBoy.park(car)
    expect(ticket).toBeTruthy()

    const anotherCar = new Car()
    expect(() => parkingBoy.park(anotherCar)).toThrow(exceptionMessages.PARKING_BOY_HAS_NO_SPACED_PARKING_LOT)
  })

  // Given 停车场只停了我的车
  // When 用我的停车票取车
  // Then 取车我的车
  it('should pick my car when parkingBoy parked my car', () => {
    const parkingBoy = new ParkingBoy([1,1])
    const car = new Car()
    const ticket = parkingBoy.park(car)

    const myCar = parkingBoy.pick(ticket)
    expect(car).toBe(myCar)
  })

  // Given 停车场停了多辆车，也有我的车
  // When 用我的停车票取车
  // Then 取出我的车
  it('should pick my car when parkingBoy parked multi car', () => {
    const parkingBoy = new ParkingBoy([1,1])
    const car = new Car()
    const anotherCar = new Car()
    parkingBoy.park(anotherCar)
    const ticket = parkingBoy.park(car)

    const myCar = parkingBoy.pick(ticket)
    expect(car).toBe(myCar)
  })

  // Given 停了我的车的停车场
  // When 用一张无效的票取车
  // Then 取车失败
  it('should throw error when pick my car by invalid ticket', () => {
    const parkingBoy = new ParkingBoy([1,1])
    const car = new Car()
    parkingBoy.park(car)

    const ticket = new Ticket()
    expect(() => parkingBoy.pick(ticket)).toThrow(exceptionMessages.PARKING_LOT_NOT_EXIST)
  })

  // Given 停了我的车的停车场
  // When 用同一张票取车两次
  // Then 第二次取车失败
  it('should throw error when pick my car twice by only one ticket', () => {
    const parkingBoy = new ParkingBoy([1,1])
    const car = new Car()

    const ticket = parkingBoy.park(car)
    parkingBoy.pick(ticket)
    expect(() => parkingBoy.pick(ticket)).toThrow(exceptionMessages.PARKING_LOT_HAS_NO_THIS_CAR)
  })
})
