import { getWhiskeyById, getAllWhiskeys } from "@/utils/supabase/queries";
import { notFound } from "next/navigation";
import {Database, Tables, Enums} from "@/types/supabase_types"

// This function generates the dynamic paths for static generation
export async function generateStaticParams() {
  const whiskeys = await getAllWhiskeys();

  // Ensure that whiskeys is an array and map to the required format
  const paths = whiskeys?.map((w) => ({
    whiskeyId: w.id.toString(), // Assuming w has an id property
  })) || [];

  return paths.map((path) => ({ params: path })); // Return in the required format
}

// The main component for the whiskey page
export default async function Whiskey({ params }: { params: { whiskeyId: string } }) {
  const whiskey: Tables<"whiskey"> | undefined = await getWhiskeyById(params.whiskeyId);

  if (!whiskey) {
    return notFound(); // Return a 404 page if whiskey not found
  }

  return (
    <div>
      <h1>{whiskey.name}</h1>
      {/* Render other whiskey details here */}
      <pre>{JSON.stringify(whiskey, null, 2)}</pre> {/* For debugging */}
    </div>
  );
}
