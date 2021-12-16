import React from 'react'
import { Button as BSButton, Spinner } from 'react-bootstrap'
import { ButtonVariant } from 'react-bootstrap/types'

type ButtonProps = {
  isLoading: boolean,
  children: string,
  type?: 'submit' | 'reset' | 'button' | undefined
  variant?: ButtonVariant
  disabled?: boolean
  onClick?: () => void
}

const Button = ({ isLoading, children, ...rest }: ButtonProps) => {
  return (
    <BSButton {...rest}>
      {isLoading ? (
        <Spinner animation="border" size="sm" />
      ) : (
        children
      )}
    </BSButton>
  )
}

export default Button
