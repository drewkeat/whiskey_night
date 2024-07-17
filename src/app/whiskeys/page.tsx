import { Typography, Container } from "@mui/material";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function WhiskeyList() {
  async function listWhiskeys(){
    try {
      const whiskeys = await prisma.whiskey.findMany()
      return whiskeys.map(w => <li key={w.id}><a href={w.whiskyLink}>{w.name}</a></li>)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div>
      <Typography variant="h3" color="green" align="center">Whiskey List</Typography>
      <Container maxWidth="md">
        <ul>
          {listWhiskeys()}
        </ul>
      </Container>
    </div>
  )
}
