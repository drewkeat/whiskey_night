import { Typography, Container, List } from "@mui/material";
import { getWhiskeys } from "@/utils/supabase/queries/serverQueries";
import WhiskeyListingCard from "./components/WhiskeyListingCard";

export default async function WhiskeyList() {
  const {data: whiskeys, error} = await getWhiskeys()

  const listWhiskeys = async () => {
    if(error){
      throw error
    }
    return whiskeys.map((whiskey) => <WhiskeyListingCard key={whiskey.id} whiskey={whiskey} />)
  };

  return (
    <div>
      <Typography variant="h3" color="green" align="center">
        Whiskey List
      </Typography>
      <Container disableGutters>
        <List>{listWhiskeys()}</List>
      </Container>
    </div>
  );
}
