"use client"
import SignInForm from "./SignInForm"
import SignUpForm from "./SignUpForm"
import { useState } from "react"

function LoginFormContainer() {
  const [hasAccount, setHasAccount] = useState(true)

  return (
    <div>
      <div>LoginForm</div>
      {hasAccount ? <SignInForm switchForm={() => setHasAccount(!hasAccount)} /> : <SignUpForm switchForm={() => setHasAccount(!hasAccount)} />}
    </div>
  )
}

export default LoginFormContainer