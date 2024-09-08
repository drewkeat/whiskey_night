'use client'
import { Button } from '@mui/material'

type Props = {}

export default function ErrorButton({}: Props) {
  const l = null
  const throwError = () => {
     throw new Error("Error thrown")
  }

  return (
    <Button variant='contained' color='warning' onClick={throwError}>Throw Error</Button>
  )
}