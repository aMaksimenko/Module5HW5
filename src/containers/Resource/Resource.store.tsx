import { inject, injectable } from 'inversify'
import { types } from 'ioc'
import { IResourceService } from 'services/ResourceService'
import { Resource as ResourceType } from 'models/Resource'
import { ChangeEvent } from 'react'
import { makeAutoObservable } from 'mobx'
import NotificationStore from '../Notification/Notification.store'

@injectable()
export default class ResourceStore {
  @inject(types.IResourceService)
  private readonly _resourceService!: IResourceService
  @inject(types.NotificationStore)
  private readonly _notificationStore!: NotificationStore
  public input: string = ''
  public resource: ResourceType | null = null
  public error: string = ''
  public isLoading: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  public getResourceById = async (id: number) => {
    this.isLoading = true

    try {
      const res = await this._resourceService.getById(id)
      this.resource = res.data
    } catch (e) {
      if (e instanceof Error) {
        this._notificationStore.add(e.message)
        this.error = e.message
      }
    }

    this.isLoading = false
  }

  public onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (!!this.error) {
      this.error = ''
    }
    this.input = ev.target.value
  }
}
