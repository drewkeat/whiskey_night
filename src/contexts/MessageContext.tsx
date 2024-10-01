'use client'
import { Card, CardHeader, CardContent, Backdrop, Alert, Typography, AlertPropsColorOverrides, AlertProps, AlertColor } from '@mui/material'
import {createContext, useState, useEffect, useContext, ReactElement} from 'react'

type GlobalMessage = {
  title: string,
  content: string,
  type: 'success'|'error'|'warning'|'info'|string
}

interface MessageContextValue {
  message: string | GlobalMessage| undefined
  setMessage: (newMessage: string| GlobalMessage | undefined) => void
  acknowledgeMessage: () => void
}

const MessageContext = createContext<MessageContextValue>({
  message: undefined,
  setMessage: () => {},
  acknowledgeMessage: () => {}
})

export function MessageContextProvider({children}: {children: ReactElement}){
  const [message, setMessage] = useState<GlobalMessage| string | undefined>(undefined)
  const acknowledgeMessage = () => {
    setMessage(undefined)
  }
  return(
    <MessageContext.Provider value={{message, setMessage, acknowledgeMessage}}>
      {children}
    </MessageContext.Provider>
  )
}

export const useMessageContext = () => {
  const context = useContext(MessageContext)
  return context
}

export function MessageOverlay(){
  const {message, acknowledgeMessage} = useMessageContext()
  
  let title, content, type
  
  if(!message){
    return null
  }

  if(typeof message === "string"){
    title="Generic Message", content = message, type = "info"
  } else {
    ({title, content, type} = message);
  }

  content = content.split(' ').map(e => e[0].toUpperCase() + e.slice(1)).join(' ')

  return( 
    <Backdrop open sx={{zIndex:1000}} onClick={acknowledgeMessage}>
      <Card raised square={false} elevation={6} sx={{minWidth: "50vw"}}>
        <CardHeader title={title} sx={{textAlign: "center"}}/>
        <CardContent>
          <Alert severity={type as AlertColor} onClick={acknowledgeMessage}>
            <Typography variant='h6' align={'center'}>{content}</Typography>
          </Alert>
        </CardContent>
      </Card>
    </Backdrop>
  )
}