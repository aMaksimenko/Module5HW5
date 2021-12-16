import React from 'react'
import { Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap'
import Button from 'components/Button'
import { types, useInjection } from 'ioc'
import ResourceCard from 'components/ResourceCard'
import ResourceStore from './Resource.store'
import { observer } from 'mobx-react-lite'

const Resource = observer(() => {
  const store = useInjection<ResourceStore>(types.ResourceStore)

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={4} md={6} xs>
          <InputGroup className="mb-2">
            <FormControl
              type="number"
              value={store.input}
              onChange={store.onChange}
              isInvalid={!!store.error}
              placeholder="Enter userID here"
            />
            <Button
              disabled={!store.input}
              variant="primary"
              onClick={() => store.input && store.getResourceById(Number(store.input))}
              type="button"
              isLoading={store.isLoading}
            >
              Submit
            </Button>
          </InputGroup>
          {store.resource && <ResourceCard {...store.resource} />}
        </Col>
      </Row>
    </Container>
  )
})

export default Resource
