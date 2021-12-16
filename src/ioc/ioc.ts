import { Container } from 'inversify'
import types from './types'
import HttpService, { IHttpService } from 'services/HttpService'
import RegisterService, { IRegisterService } from 'services/RegisterService'
import ResourceService, { IResourceService } from 'services/ResourceService'
import LandingStore from 'containers/Landing/Landing.store'
import RegisterStore from 'containers/Register/Register.store'
import ResourceStore from 'containers/Resource/Resource.store'
import ResourcesStore from 'containers/Resources/Resources.store'
import NotificationStore from 'containers/Notification/Notification.store'

const container = new Container()

container.bind<IHttpService>(types.IHttpService).to(HttpService).inSingletonScope()
container.bind<IRegisterService>(types.IRegisterService).to(RegisterService).inSingletonScope()
container.bind<IResourceService>(types.IResourceService).to(ResourceService).inSingletonScope()
container.bind<NotificationStore>(types.NotificationStore).to(NotificationStore).inSingletonScope()
container.bind<LandingStore>(types.LandingStore).to(LandingStore).inTransientScope()
container.bind<RegisterStore>(types.RegisterStore).to(RegisterStore).inTransientScope()
container.bind<ResourceStore>(types.ResourceStore).to(ResourceStore).inTransientScope()
container.bind<ResourcesStore>(types.ResourcesStore).to(ResourcesStore).inTransientScope()

export default container
