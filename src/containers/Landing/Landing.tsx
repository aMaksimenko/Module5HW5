import React, { Suspense } from 'react'
import { Container, Spinner, Tab, Tabs } from 'react-bootstrap'
import { types, useInjection } from 'ioc'
import LandingStore from './Landing.store'
import { observer } from 'mobx-react-lite'

const components = [
  {
    title: 'Resource',
    component: React.lazy(() => import('containers/Resource'))
  },
  {
    title: 'Resource List',
    component: React.lazy(() => import('containers/Resources'))
  },
  {
    title: 'Register',
    component: React.lazy(() => import('containers/Register'))
  }
]

const Landing = observer(() => {
  const store = useInjection<LandingStore>(types.LandingStore)

  return (
    <Suspense fallback={<Spinner animation="border" />}>
      <Container className="pt-4 pb-4">
        <Tabs
          activeKey={store.currentTab}
          onSelect={(k) => store.setCurrentTab(Number(k))}
          className="mb-3"
        >
          {components.map((component, index) => (
            <Tab key={index} eventKey={index} title={component.title}>
              {store.currentTab === index && React.createElement(component.component)}
            </Tab>
          ))}
        </Tabs>
      </Container>
    </Suspense>
  )
})

export default Landing
