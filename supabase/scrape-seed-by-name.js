import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const initialBottles = [
  "Teeling Single Grain",
  "Dewars  15 year Blended Scotch ",
  "Nikka Coffey Single Grain",
  "Defiant Single Malt",
  "The Family Jones Ella Jones (rye)",
  "Bulleit 10 year Rye",
  "High West American Prairie ",
  "High West Double Rye",
  "High West Rendezvous Rye",
  "Michter's Bourbon ",
  "Koval Bourbon",
  "Koval Rye",
  "Koval Four Grain",
  "Belle Meade Sherry Cask Finish",
  "Belle Meade XO Cognac Cask Finish",
  "Belle Meade Madeira Cask Finish",
  "Hogback High Rye Bourbon",
  "Woods Alpine Rye",
  "Penelope Bourbon Barrel Strength",
  "Lagavulin Single Malt Scotch Whiskey - 11 Year Old Nick Offerman Guinness Cask Finish",
  "Short Stack Straight Rye Whiskey",
  "Breckenridge  Blue & Orange",
  "Molly Brown High Rye Bourbon",
  "Uncle Nearest 1884 Small Batch Whiskey",
  "Rowan's Creek Bourbon Whiskey",
  "Spirit Hound Straight Malt Whiskey",
  "Rittenhouse Rye and Mile High Spirits ",
  "Tenjaku  Pure Malt",
  "Kamaki Intense Single Malt"
];

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SERVICE_ROLE,
)

const runScrape = async (term) => {
  term = JSON.stringify(term);
  const {data, error} = (await supabase.functions.invoke('scrape-search', {body: term}))
  if(error){
    console.log(error)
    return
  }
  console.log("created data", data)
};

await Promise.all(initialBottles.map(async (bottle) => {
  console.log("Running scrape for " + bottle);
  await runScrape(bottle);
}));

