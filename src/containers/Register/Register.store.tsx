import { inject, injectable } from 'inversify'
import { makeAutoObservable } from 'mobx'
import { types } from 'ioc'
import { IRegisterService } from 'services/RegisterService'
import { ChangeEvent, FormEvent } from 'react'
import NotificationStore from 'containers/Notification/Notification.store'

type stateProps = { email: string, password: string }

@injectable()
export default class RegisterStore {
  @inject(types.IRegisterService)
  private readonly _registerService!: IRegisterService
  @inject(types.NotificationStore)
  private readonly _notificationStore!: NotificationStore
  public state: stateProps = { email: '', password: '' }
  public error: string = ''
  public token: string = ''
  public isLoading: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  public onChange = (field: string) => (ev: ChangeEvent<HTMLInputElement>) => {
    this.state = {
      ...this.state,
      [field]: ev.target.value
    }

    if (!!this.error) {
      this.error = ''
    }
  }

  public onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    this.token = ''
    this.isLoading = true
    try {
      const res = await this._registerService.register(this.state)
      this.token = res.token
    } catch (e) {
      if (e instanceof Error) {
        this._notificationStore.add(e.message)
        this.error = e.message
      }
    }
    this.isLoading = false
  }
}
