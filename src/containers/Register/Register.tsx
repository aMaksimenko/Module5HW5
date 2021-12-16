import React from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { types, useInjection } from 'ioc'
import Button from 'components/Button'
import RegisterStore from './Register.store'
import { observer } from 'mobx-react-lite'

const Register = observer(() => {
  const store = useInjection<RegisterStore>(types.RegisterStore)

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={4} md={6} xs>
          <Form onSubmit={store.onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={store.state['email']}
                onChange={store.onChange('email')}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={store.state['password']}
                onChange={store.onChange('password')}
              />
            </Form.Group>
            <Button variant="primary" type="submit" isLoading={store.isLoading}>
              Submit
            </Button>
            {!!store.token && (
              <p
                className="mt-3 mb-3"
                style={{ color: 'green', fontSize: 14, fontWeight: 700 }}
              >
                {`Success! Token is: ${store.token}`}
              </p>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  )
})

export default Register
