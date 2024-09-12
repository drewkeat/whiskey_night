'use client'
import React, { createContext, useState, useEffect, useContext } from 'react'
import { supabaseClient } from '@/utils/supabase/client'
import { usePathname } from 'next/navigation'
import { User } from '@supabase/supabase-js'

type AuthContext={
  user: User | undefined,
  setUser: (user?: User | undefined) => void
}

const AuthContext = createContext<AuthContext | undefined>(undefined)

type Props = {
  children: React.ReactNode
}

async function getUser(){
  const {data: {user}, error} = await supabaseClient.auth.getUser()
  if(error) throw error
  return user
}

export default function AuthContextProvider({children}: Props) {
  const [user, setUser] = useState<User>()
  const pathname = usePathname()
  useEffect(() => {
    if(pathname !== "/login"){
      (async() => {
        const data = await getUser()
        if(data) setUser(data)
      })()
    }
  }, [pathname])
  
  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  const context = useContext(AuthContext)
  if(!context) throw new Error("Auth Context must be used within the Provider")
  return context
}