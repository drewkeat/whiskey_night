import { getWhiskeyById, getAllWhiskeys } from "@/utils/supabase/queries";
import { notFound } from "next/navigation";

export async function getStaticPaths() {
  const whiskeys = await getAllWhiskeys();

  // Ensure that whiskeys is an array and map to the required format
  const paths = whiskeys?.map((w) => ({
    params: { whiskeyId: w.id.toString() }, // Assuming w has an id property
  })) || [];

  return { paths, fallback: false }; // Set fallback to true if you want to handle new IDs
}

export async function getStaticProps({ params }: { params: { whiskeyId: string } }) {
  const whiskey = await getWhiskeyById(params.whiskeyId);

  if (!whiskey) {
    return { notFound: true }; // Return notFound for a 404 page
  }

  return {
    props: {
      whiskey,
    },
  };
}

type WhiskeyProps = {
  whiskey: any; // Define the type according to your whiskey structure
};

export default function Whiskey({ whiskey }: WhiskeyProps) {
  return <>{JSON.stringify(whiskey)}</>; // Render the whiskey data as needed
}
