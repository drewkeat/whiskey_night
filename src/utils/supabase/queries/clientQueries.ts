"use client";
import { Tables } from "@/types/supabase_types";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getWhiskeys = async () => {
  const res = await supabase.from("whiskey").select();
  return res;
};

export const getWhiskeyImg = async (whiskey: Tables<"whiskey">) => {
  if (whiskey.whiskeyImg) {
    const { data: img } = supabase.storage.from("imgs").getPublicUrl(
      whiskey.whiskeyImg,
    );
    return img.publicUrl
  }
  return "";
};
