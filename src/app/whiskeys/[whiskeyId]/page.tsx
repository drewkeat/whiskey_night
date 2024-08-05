import { getWhiskeyById, getAllWhiskeys } from "@/utils/supabase/queries";
import { notFound } from "next/navigation";
// import { Database, Tables } from "@/types/supabase_types";
export async function getStaticParams() {
  const whiskeys = await getAllWhiskeys()
  return whiskeys?.map((w) => ({ whiskeyId: w }));
}

type whiskeyProps = {
  params: { whiskeyId: string };
};

export default async function Whiskey({ params }: whiskeyProps) {
  console.log(params);
  if (params.whiskeyId) {
    const whiskey = await getWhiskeyById(params.whiskeyId);
    if (!whiskey){
      return notFound()
    }
    return <>{JSON.stringify(whiskey)}</>;
  }
}
