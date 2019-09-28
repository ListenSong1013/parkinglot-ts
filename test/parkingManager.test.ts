import { ParkingManager } from '../src/parkingManager'
import { Car } from "../src/car";
import {Ticket} from "../src/ticket";
import {ParkingLot} from "../src/parkingLot";
import {exceptionMessages} from "../src/exceptionMessage";
import {ParkingBoy} from "../src/parkingBoy";
import {SuperParkingBoy} from "../src/superParkingBoy";

describe('test Parking Manager', () => {
  // Given 没有停车小弟，但停车场空车位数足够
  // When 停车
  // Then 停车成功，返回停车票
  it('should park success when no parking but has available space', () => {
    const lot = new ParkingLot(1)
    const parkingManage = new ParkingManager([lot])

    const ticket = parkingManage.park(new Car())

    expect(ticket).toBeTruthy()
  })

  // Given 没有停车小弟，但停车场空车位已满
  // When 停车
  // Then 停车失败

  it('should park fail when no parking but has no available space', () => {
    const lot = new ParkingLot(1)
    const parkingManage = new ParkingManager([lot])
    parkingManage.park(new Car())

    expect(() => parkingManage.park(new Car()))
      .toThrow(exceptionMessages.PARKING_MANAGER_PARK_FAIL)
  })

  // Given 我手下有停车小弟，并且他们管理的停车场有空位
  // When 停车
  // Then 停车成功，返回停车票
  it('should park success when no lot but boy has available space', () => {
    const parkingManage = new ParkingManager([
      new ParkingBoy([new ParkingLot(1)]),
      new SuperParkingBoy([new ParkingLot(1)]),
    ])

    const ticket1 = parkingManage.park(new Car())
    const ticket2 = parkingManage.park(new Car())

    expect(ticket1).toBeTruthy()
    expect(ticket2).toBeTruthy()
    expect(ticket1).not.toEqual(ticket2)
  })

  // Given 我手下有停车小弟，并且他们管理的停车场没有空位
  // When 停车
  // Then 停车失败
  it('should park fail when manage has no lot and boy has no available space', () => {
    const parkingManage = new ParkingManager([
      new ParkingBoy([new ParkingLot(1)]),
    ])

    parkingManage.park(new Car())

    expect(() => parkingManage.park(new Car()))
      .toThrowError(exceptionMessages.PARKING_MANAGER_PARK_FAIL)
  })

  // Given 没有停车小弟，停车场停了我的车
  // When 取车
  // Then 取车我的车
  it('should pick car success when has lot and has no boy', () => {
    const parkingManage = new ParkingManager([new ParkingLot(1)])
    const car = new Car()
    const ticket = parkingManage.park(car)

    const myCar = parkingManage.pick(ticket)
    expect(car).toBe(myCar)
  })

  // Given 有停车小弟，小弟的停车场停了我的车
  // When 取车
  // Then 取车我的车
  it('should pick car success when boy parked my car', () => {
    const parkingManage = new ParkingManager([
      new ParkingLot(1),
      new ParkingBoy([new ParkingLot(1)]),
    ])
    // 先在停车场停一辆
    parkingManage.park(new Car())

    // 再让停车小弟停一辆
    const car = new Car()
    const ticket = parkingManage.park(car)
    const myCar = parkingManage.pick(ticket)

    expect(car).toBe(myCar)
  })

  // Given 没有停车小弟，停车场停了我的车
  // When 用一张无效的票取车
  // Then 取车失败
  it('should pick fail when has no boy and has lot park my car use invalid ticket', () => {
    const parkingManage = new ParkingManager([new ParkingLot(1)])
    parkingManage.park(new Car())

    expect(() => parkingManage.pick(new Ticket())).toThrow(exceptionMessages.PARKING_MANAGER_PICK_FAIL)
  })

  // Given 有停车小弟，停车场停了我的车
  //   // When 用一张无效的票取车
  //   // Then 取车失败
  it('should pick fail when has no lot and has boy park my car use invalid ticket', () => {
    const parkingManage = new ParkingManager([
      new ParkingBoy([new ParkingLot(1)])
    ])
    parkingManage.park(new Car())

    expect(() => parkingManage.pick(new Ticket())).toThrow(exceptionMessages.PARKING_MANAGER_PICK_FAIL)
  })
})
