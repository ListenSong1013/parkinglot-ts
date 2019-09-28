import { SuperParkingBoy } from '../src/superParkingBoy'
import { Car } from "../src/car";
import {ParkingLot} from "../src/parkingLot";
import {exceptionMessages} from "../src/exceptionMessage";

describe('Test SuperParkingBoy', () => {
  // Given 有一个停车场，该停车场有1个空车位
  // When 停1辆车
  // Then 返回一张停车票
  it('should return a ticket when parked my car', () => {
    const superParkingBoy = new SuperParkingBoy([new ParkingLot(2)])
    const ticket = superParkingBoy.park(new Car())

    expect(ticket).toBeTruthy()
  })

  // Given 有两个停车场，第一个空置率比第二个多
  // When 停1辆车
  // Then 车停在第一个停车场
  it('should park car in first lot when super parking boy park my car', () => {
    const lot1 =  new ParkingLot(3)
    const lot2 =  new ParkingLot(2)
    const superParkingBoy = new SuperParkingBoy([lot1, lot2])
    const ticket = superParkingBoy.park(new Car())

    expect(lot1.contains(ticket)).toBeTruthy()
  })

  // Given 有两个停车场，第二个空置率比第一个多
  // When 停1辆车
  // Then 车停在第二个停车场
  it('should park car in second lot when super parking boy park my car', () => {
    const lot1 =  new ParkingLot(5)
    const lot2 =  new ParkingLot(2)
    const superParkingBoy = new SuperParkingBoy([lot1, lot2])
    superParkingBoy.park(new Car)

    const ticket = superParkingBoy.park(new Car())

    expect(lot2.contains(ticket)).toBeTruthy()
  })

  // Given 有两个停车场，两个空置率一样
  // When 停1辆车
  // Then 车停在了第一个停车场
  it('should park car in first lot when vacancyRate is same', () => {
    const lot1 =  new ParkingLot(2)
    const lot2 =  new ParkingLot(2)
    const superParkingBoy = new SuperParkingBoy([lot1, lot2])
    const ticket = superParkingBoy.park(new Car())

    expect(lot1.contains(ticket)).toBeTruthy()
  })

  // Given 有两个停车场，两个停车场车位都满了
  // When 停车
  // Then 停车失败
  it('should throw error when both lot is full', () => {
    const superParkingBoy = new SuperParkingBoy([new ParkingLot(1), new ParkingLot(1)])
    superParkingBoy.park(new Car())
    superParkingBoy.park(new Car())

    expect(() => superParkingBoy.park(new Car()))
      .toThrow(exceptionMessages.PARKING_BOY_HAS_NO_SPACED_PARKING_LOT)
  })

  // Given 停车场只停了我的车
  // When 用我的停车票取车
  // Then 取车我的车
  //   ....

  // Given 停车场停了多辆车，也有我的车
  // When 用我的停车票取车
  // Then 取出我的车
  //   ...

  // Given 停了我的车的停车场
  // When 用一张无效的票取车
  // Then 取车失败
  //   ...

  // Given 停了我的车的停车场
  // When 用同一张票取车两次
  // Then 第二次取车失败
  //   ...
})
