import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { types } from 'ioc'
import { IHttpService } from 'services/HttpService'

export interface IResourceService {
  getById: (id: number) => Promise<any>
  getByPage: (page: number) => Promise<any>
}

@injectable()
export default class ResourceService implements IResourceService {
  @inject(types.IHttpService)
  private readonly _httpService!: IHttpService

  public readonly getById = (id: number) => this._httpService.sendAsync({
    path: `resources/${id}`,
    method: 'GET'
  })

  public readonly getByPage = (page: number) => this._httpService.sendAsync({
    path: `resource?page=${page}`,
    method: 'GET'
  })
}


