import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { types } from 'ioc'
import { IHttpService } from 'services/HttpService'

type registerAsyncProps = {
  email?: string,
  password?: string
}

export interface IRegisterService {
  register: ({ email, password }: registerAsyncProps) => Promise<any>
}

@injectable()
export default class RegisterService implements IRegisterService {
  @inject(types.IHttpService)
  private readonly _httpService!: IHttpService

  public readonly register = ({
    email,
    password
  }: registerAsyncProps) => this._httpService.sendAsync({
    path: 'register',
    method: 'post',
    data: { email, password }
  })
}


