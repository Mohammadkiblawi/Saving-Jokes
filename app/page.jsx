import JokeFetcher from "./components/JokeFetcher";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: savedJokes } = await supabase
    .from("saved_jokes")
    .select()
    .order("created_at", { ascending: false });

  return (
    <main className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-center text-white p-6">
      {/* Joke fetcher with save button */}
      <JokeFetcher userId={user?.id} />
    </main>
  );
}
