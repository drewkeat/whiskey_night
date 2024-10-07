import React from "react";
import Image from "next/image";
import { Box, Card, Divider, CardContent, Typography, Slider } from "@mui/material";

import {
  getWhiskey,
  getWhiskeyImg,
} from "@/utils/supabase/queries/serverQueries";

type Props = {
  params: { slug: string };
};

async function WhiskeyDetailsPage({ params }: Props) {
  const whiskey = await getWhiskey(decodeURI(params.slug));
  const whiskeyImage = getWhiskeyImg(whiskey);

  return (
    <Box >
      <Card elevation={8}>
        <Typography variant="h4" textAlign={"center"}>
          {whiskey.name}
        </Typography>
        <Divider variant="fullWidth" />
        <Box sx={{ display: "flex" }}>
          <Typography variant="subtitle1" flexGrow={1}>
            Distillery: {whiskey.distillery}
          </Typography>
          <Typography variant="subtitle1">Type: {whiskey.type}</Typography>
        </Box>
        {whiskeyImage && (
          <Box display={"flex"} justifyContent={"center"} position={"relative"}>
            <Image
              src={whiskeyImage}
              height={100}
              width={100}
              alt={whiskey.name + "-image"}
            />
          </Box>
        )}
        <Box sx={{ display: "flex", flexWrap: "wrap", padding: 0 }}>
          <Typography variant="subtitle1" flexGrow={1}>
            ABV: {whiskey.abv}
          </Typography>
          <Typography variant="subtitle1" textAlign={"end"}>
            Age: {whiskey.age}
          </Typography>
          <Typography variant="subtitle1" width={"100%"}>
            Cask Type: {whiskey.caskType}
          </Typography>
          <Typography variant="subtitle1" width={"100%"}>
            Location: {whiskey.location}
          </Typography>
        </Box>
        <Divider variant="fullWidth" />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {whiskey.description}
          </Typography>
        </CardContent>
        <CardContent sx={{display: 'flex', flex: 'wrap'}}>
          {JSON.stringify(whiskey.flavorProfile)}
        </CardContent>
      </Card>
    </Box>
  );
}

export default WhiskeyDetailsPage;
