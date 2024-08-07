import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const initialURLs = [
  "https://distiller.com/spirits/michter-s-20-year-kentucky-straight-bourbon-2021-release",
  "https://distiller.com/spirits/teeling-single-grain-whiskey",
];

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SERVICE_ROLE
);

const runScrape = async (url) => {
  const reqBody = JSON.stringify({
    url: url,
  });

  const { data, error } = await supabase.functions.invoke("scrape-whiskey", {
    body: reqBody,
  });
  if (error) {
    console.error(error);
    return;
  }
  console.log("Data generated", data);
  return data;
};

initialURLs.forEach(async (url) => await runScrape(url));
