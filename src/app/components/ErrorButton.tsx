'use client'
import { Button } from '@mui/material'
import React from 'react'

type Props = {}

export default function ErrorButton({}: Props) {
  const throwError = () => {
    throw new Error("Error thrown")
  }
  return (
    <Button variant='contained' color='warning' onClick={throwError}>Throw Error</Button>
  )
}