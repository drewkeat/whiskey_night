"use client";
import { Tables } from "@/types/supabase_types";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getWhiskeys = async () => {
  const res = await supabase.from("whiskeys").select();
  return res;
};

export const getWhiskeyImg = async (whiskey: Tables<"whiskeys">) => {
  if (whiskey.whiskeyImg) {
    const { data: img } = supabase.storage.from("imgs").getPublicUrl(
      whiskey.whiskeyImg,
    );
    return img.publicUrl
  }
  return "";
};
