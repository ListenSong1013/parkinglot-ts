export class Ticket {
  id: string
  private _lotId: string = ''
  constructor() {
    this.id = Math.random().toString()
  }

  get lotId() {
    return this._lotId
  }

  set lotId(lotId: string) {
    this._lotId = lotId
  }
}
