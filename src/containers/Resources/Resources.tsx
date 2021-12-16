import React, { useEffect } from 'react'
import ResourceCard from 'components/ResourceCard'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import Pagination from 'components/Pagination'
import { types, useInjection } from 'ioc'
import ResourcesStore from './Resources.store'
import { observer } from 'mobx-react-lite'

const Resources = observer(() => {
  const store = useInjection<ResourcesStore>(types.ResourcesStore)

  useEffect(() => {
    store.getResourcesByPage()
  }, [store, store.currentPage])

  return (
    <Container>
      <Row className="justify-content-center">
        {store.isLoading ? (
          <Spinner animation="border" />
        ) : (
          <>
            {store.resources?.map((resource, key) => (
              <Col key={key} sm={6} md={4} lg={3} xl={2} className="mb-2 mt-2">
                <ResourceCard  {...resource} />
              </Col>
            ))}
          </>
        )}

      </Row>
      <Pagination total={store.totalPages} active={store.currentPage} onChange={store.setCurrentPage} />
    </Container>
  )
})

export default Resources
