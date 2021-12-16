import { inject, injectable } from 'inversify'
import { types } from 'ioc'
import { IResourceService } from 'services/ResourceService'
import { Resource as ResourceType } from 'models/Resource'
import { makeAutoObservable } from 'mobx'
import NotificationStore from 'containers/Notification/Notification.store'

@injectable()
export default class ResourcesStore {
  @inject(types.IResourceService)
  private readonly _resourceService!: IResourceService
  @inject(types.NotificationStore)
  private readonly _notificationStore!: NotificationStore
  public resources: ResourceType[] | null = null
  public totalPages: number = 0
  public currentPage: number = 1
  public isLoading: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  public setCurrentPage = (val: number) => {
    this.currentPage = val
  }

  public getResourcesByPage = async () => {
    this.isLoading = true

    try {
      const res = await this._resourceService.getByPage(this.currentPage)
      this.resources = res.data
      this.totalPages = res.total_pages
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
        this._notificationStore.add(e.message)
      }
    }

    this.isLoading = false
  }
}
