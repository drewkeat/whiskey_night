import React from "react";
import Image from "next/image";
import {
  Box,
  Container,
  Card,
  Divider,
  CardContent,
  Typography,
  Slider,
  Stack
} from "@mui/material";

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

  const buildProfile = () => {
    if (whiskey.flavorProfile) {
      const options = Object.entries(whiskey.flavorProfile);
      return options.map((o, i) => {
        return (
          <Box height={100} key={whiskey.id + "-" + o[0]+i}>
            <Slider
              defaultValue={o[1]}
              orientation="vertical"
              step={5}
              marks
              min={0}
              max={100}
              name="read-only"
              disabled
              sx={{color: 'secondary.main', '& .Mui-disabled': {color: 'primary.main'}, width: 2}}
              />
              <Typography sx={{transform: {xs: "rotate(90deg) translate(.5rem, -1rem)", md: "none"}}}>{o[0]}</Typography>
          </Box>
        );
      });
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Card elevation={8} sx={{paddingBottom: 5}}>
        <Typography
          variant="h4"
          bgcolor={"secondary.main"}
          color={"secondary.contrastText"}
          padding={1}
          textAlign={"center"}
          sx={{ ":hover": { backgroundColor: "secondary.light" } }}
        >
          {whiskey.name}
        </Typography>
        <Divider variant="fullWidth" />
        <CardContent>
          <Box sx={{ display: "flex" }}>
            <Box flexGrow={1}>
              <Typography variant="subtitle1">
                Distillery:
                <Typography
                  variant="subtitle1"
                  component={"span"}
                  fontStyle={"italic"}
                >
                  {" " + whiskey.distillery}
                </Typography>
              </Typography>
              <Typography variant="subtitle1" width={"100%"}>
                Location:{" "}
                <Typography
                  variant="subtitle1"
                  component={"span"}
                  fontStyle={"italic"}
                >
                  {" " + whiskey.location}
                </Typography>
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1">
                Type:{" "}
                <Typography
                  variant="subtitle1"
                  component={"span"}
                  fontStyle={"italic"}
                >
                  {" " + whiskey.type}
                </Typography>
              </Typography>
              <Typography variant="subtitle1" flexGrow={1}>
                ABV:
                <Typography
                  variant="subtitle1"
                  component={"span"}
                  fontStyle={"italic"}
                >
                  {" " + whiskey.abv}
                </Typography>
              </Typography>
            </Box>
          </Box>
          {whiskeyImage && (
            <Box
              display={"flex"}
              justifyContent={"center"}
              position={"relative"}
            >
              <Image
                src={whiskeyImage}
                height={150}
                width={150}
                alt={whiskey.name + "-image"}
              />
            </Box>
          )}
          <Box sx={{ display: "flex", flexWrap: "wrap", padding: 0 }}>
            <Typography variant="subtitle1" flexGrow={1}>
              Cask Type:
              <Typography
                variant="subtitle1"
                component={"span"}
                fontStyle={"italic"}
              >
                {" " + whiskey.caskType}
              </Typography>
            </Typography>
            <Typography variant="subtitle1" textAlign={"end"}>
              Age:
              <Typography
                variant="subtitle1"
                component={"span"}
                fontStyle={"italic"}
              >
                {" " + whiskey.age}
              </Typography>
            </Typography>
          </Box>
        </CardContent>
        <Divider variant="fullWidth" />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {whiskey.description}
          </Typography>
        </CardContent>
        <CardContent
          sx={{
            display: {md: "flex"} ,
            justifyContent: "center"
          }}
        >
          <Stack
            direction={"row"}
            spacing={1}
            minHeight={"fit-content"}
            paddingBottom={1}
            sx={{
              "& > *": {
                flexShrink: 0,
                width: { xs: "4%", md: "auto" }
              }
            }}
          >
            {buildProfile()}
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

export default WhiskeyDetailsPage;
