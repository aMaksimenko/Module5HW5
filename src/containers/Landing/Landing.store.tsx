import { injectable } from 'inversify'
import { makeAutoObservable } from 'mobx'

@injectable()
export default class LandingStore {
  public currentTab: number = 0

  constructor() {
    makeAutoObservable(this)
  }

  public setCurrentTab = (index: number): void => {
    this.currentTab = index || 0
  }
}
