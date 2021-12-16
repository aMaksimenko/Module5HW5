import React from 'react'
import { Card } from 'react-bootstrap'
import { type Resource } from 'models/Resource'

const ResourceCard = ({
    name,
    year,
    color,
    pantone_value
  }: Resource
) => {
  return (
    <Card>
      <Card.Body>
        <div style={{ height: 100, background: color }} className="mb-2 rounded-2" />
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {`${pantone_value}, ${year}`}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ResourceCard
