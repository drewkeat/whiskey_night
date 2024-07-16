import { Typography } from "@mui/material";
import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getUsers = async() => {
  // Run inside `async` function
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
  return allUsers
}

export default async function WhiskeyList() {
  async function listUsers(){
    const users = await getUsers()
    return users.map(u => <li key={u.id}>{u.email} - {u.name}</li>)
  }
  return (
    <div>
      <Typography variant="h3" color="green" align="center">Whiskey List</Typography>
      <ul>{listUsers()}</ul>
    </div>
  )
}
