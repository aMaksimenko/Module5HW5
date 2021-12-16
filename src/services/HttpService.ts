import { injectable } from 'inversify'

type sendAsyncProps = {
  path: string
  method: string
  data?: unknown
}

export interface IHttpService {
  sendAsync: ({ path, method, data }: sendAsyncProps) => Promise<any>
}

@injectable()
export default class HttpService implements IHttpService {
  private readonly baseUrl = process.env.REACT_APP_BASE_API_URL

  private readonly handleResponse = async (response: Response) => {
    if (!response.ok) {
      const message = await response.json()
      throw Error(message.error || 'Request error')
    }
    return response.json()
  }

  public readonly sendAsync = async ({ path, method, data }: sendAsyncProps) => {
    const requestOptions = {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: !!data ? JSON.stringify(data) : undefined
    }
    return await fetch(`${this.baseUrl}${path}`, requestOptions).then(this.handleResponse)
  }
}



