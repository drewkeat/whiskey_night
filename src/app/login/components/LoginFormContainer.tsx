"use client"
import SignInForm from "./SignInForm"
import SignUpForm from "./SignUpForm"
import { useState } from "react"

function LoginFormContainer() {
  const [hasAccount, setHasAccount] = useState(true)

  if(hasAccount){
    return (
      <SignInForm switchForm={() => setHasAccount(!hasAccount)} />
    )
  } else {
    return (
      <SignUpForm switchForm={() => setHasAccount(!hasAccount)} />
    )
  }
}

export default LoginFormContainer