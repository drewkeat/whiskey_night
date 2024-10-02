import { Typography, Container, Box, Card, List, ListItem } from "@mui/material";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";

export default async function WhiskeyList() {
  const supabase = createClient();
  const { data: whiskeys, error } = await supabase.from("whiskey").select();
  if (error) {
    return error;
  }

  const listWhiskeys = async () => {
    return whiskeys.map((whiskey) => {
      let img;
      if (whiskey.whiskeyImg) {
        const { data } = supabase.storage
          .from("imgs")
          .getPublicUrl(whiskey.whiskeyImg);
        img = data.publicUrl;
      }
      return (
        <Card key={`whiskey-${whiskey.id}`} elevation={4}>
          <ListItem divider>
            {img && (
              <Box sx={{flexGrow: 1}}>
                <Image
                  alt={whiskey.name + "-image"}
                  src={img as string}
                  width={50}
                  height={50}
                />
              </Box>
            )}
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
