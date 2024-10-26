import React from "react";
import {
  Container} from "@mui/material";

import {
  getWhiskey,
} from "@/utils/supabase/queries/serverQueries";
import WhiskeyDetailsCard from "./components/WhiskeyDetailsCard";

type Props = {
  params: { slug: string };
};

async function WhiskeyDetailsPage({ params }: Props) {
  const whiskey = await getWhiskey(decodeURI(params.slug));


  return (
    <Container sx={{ mt: 5 }}>
      <WhiskeyDetailsCard whiskey={whiskey}/>
    </Container>
  );
}

export default WhiskeyDetailsPage;
