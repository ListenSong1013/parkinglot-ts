import { SmartParkingBoy } from '../src/smartParkingBoy'
import {ParkingLot} from "../src/parkingLot";
import {Car} from "../src/car";
import {exceptionMessages} from "../src/exceptionMessage";
import {Ticket} from "../src/ticket";

describe('Test SmartParkingBoy', () => {
  // Given 有一个停车场，该停车场有1个空车位
  // When 停1辆车
  // Then 返回一张停车票
  it('should return a ticket when smart parking boy have a spaced parking lot', () => {
    const smartParkingBoy = new SmartParkingBoy([new ParkingLot(1)])
    const car = new Car()
    const ticket = smartParkingBoy.park(car)

    expect(ticket).toBeTruthy()
  })

  // Given 有两个停车场，第一个空车位比第二个多
  // When 停1辆车
  // Then 车停在第一个停车场
  it('should park car in first lot when first lot have more spaces then second', () => {
    const lot1 =  new ParkingLot(2)
    const lot2 = new ParkingLot(1)
    const smartParkingBoy = new SmartParkingBoy([lot1, lot2])
    const car = new Car()
    const ticket = smartParkingBoy.park(car)

    expect(lot1.contains(ticket)).toBeTruthy()
  })

  // Given 有两个停车场，第二个空车位比第一个多
  // When 停1辆车
  // Then 车停在第二个停车场
  it('should park car in second lot when first lot have less spaces then second', () => {
    const lot1 =  new ParkingLot(1)
    const lot2 = new ParkingLot(2)
    const smartParkingBoy = new SmartParkingBoy([lot1, lot2])
    const car = new Car()
    const ticket = smartParkingBoy.park(car)

    expect(lot2.contains(ticket)).toBeTruthy()
  })

  // Given 有两个停车场，两个停车位一样多且足够
  // When 按顺序停多辆车
  // Then 车辆按顺序交替停在第一个、第二个停车场
  it('should park car by order when parking lot has the same space', () => {
    const lot1 =  new ParkingLot(2)
    const lot2 = new ParkingLot(2)
    const smartParkingBoy = new SmartParkingBoy([lot1, lot2])

    const car = new Car()
    const ticket = smartParkingBoy.park(car)
    expect(lot1.contains(ticket)).toBeTruthy()

    const anotherCar = new Car()
    const anotherTicket = smartParkingBoy.park(anotherCar)
    expect(lot2.contains(anotherTicket)).toBeTruthy()

  })

  // Given 有两个停车场，两个停车场车位都满了
  // When 停车
  // Then 停车失败
  it('should throw error when both lot is full', () => {
    const smartParkingBoy = new SmartParkingBoy([new ParkingLot(1), new ParkingLot(1)])
    smartParkingBoy.park(new Car())
    smartParkingBoy.park(new Car())

    expect(() => smartParkingBoy.park(new Car()))
      .toThrow(exceptionMessages.PARKING_BOY_HAS_NO_SPACED_PARKING_LOT)
  })

  // Given 停车场只停了我的车
  // When 用我的停车票取车
  // Then 取车我的车
  it('should pick my car when smart parking boy parked my car', () => {
    const smartParkingBoy = new SmartParkingBoy([new ParkingLot(2)])
    const car = new Car()
    const ticket = smartParkingBoy.park(car)
    const myCar = smartParkingBoy.pick(ticket)

    expect(car).toBe(myCar)
  })

  // Given 停车场停了多辆车，也有我的车
  // When 用我的停车票取车
  // Then 取出我的车
  it('should pick my car when parking boy parked multi cars', () => {
    const smartParkingBoy = new SmartParkingBoy([new ParkingLot(2)])
    smartParkingBoy.park(new Car())

    const car = new Car()
    const ticket = smartParkingBoy.park(car)
    const myCar = smartParkingBoy.pick(ticket)

    expect(car).toBe(myCar)
  })

  // Given 停了我的车的停车场
  // When 用一张无效的票取车
  // Then 取车失败
  it('should throw error when pick car by invalid ticket', () => {
    const smartParkingBoy = new SmartParkingBoy([new ParkingLot(2)])
    smartParkingBoy.park(new Car())

    const ticket = new Ticket()
    expect(() => smartParkingBoy.pick(ticket))
      .toThrow(exceptionMessages.PARKING_LOT_HAS_NO_THIS_CAR)
  })

  // Given 停了我的车的停车场
  // When 用同一张票取车两次
  // Then 第二次取车失败
  it('should throw error when pick my car twice', () => {
    const smartParkingBoy = new SmartParkingBoy([new ParkingLot(2)])
    const ticket = smartParkingBoy.park(new Car())
    smartParkingBoy.pick(ticket)

    expect(() => smartParkingBoy.pick(ticket))
      .toThrow(exceptionMessages.PARKING_LOT_HAS_NO_THIS_CAR)
  })

})
