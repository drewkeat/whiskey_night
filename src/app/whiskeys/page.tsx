import { Typography, Container, Box, Card, List, ListItem } from "@mui/material";
import Image from "next/image";
import { getWhiskeys, getWhiskeyImg } from "@/utils/supabase/queries";
import { ImageNotSupportedOutlined } from "@mui/icons-material";

export default async function WhiskeyList() {
  const {data: whiskeys, error} = await getWhiskeys()

  const listWhiskeys = async () => {
    if(error){
      throw error
    }
    return whiskeys.map((whiskey) => {
      let img;
      if (whiskey.whiskeyImg) {
        img = getWhiskeyImg(whiskey)
      }
      return (
        <Card key={`whiskey-${whiskey.id}`} elevation={4}>
          <ListItem divider>
            {img ? (
              <Box sx={{flexGrow: 1}}>
                <Image
                  alt={whiskey.name + "-image"}
                  src={img}
                  width={50}
                  height={50}
                />
              </Box>
            ) : (<Box sx={{flexGrow: 1}}><ImageNotSupportedOutlined sx={{width: "50px", height: "50px"}}/></Box>)}
            <Typography>{whiskey.name}</Typography>
          </ListItem>
        </Card>
      );
    });
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
