import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function SavedJokes() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="bg-gray-800 min-h-screen flex flex-col items-center justify-center text-center text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Saved Jokes</h1>
        <p className="text-gray-400 mb-4">You need to be logged in to view your saved jokes.</p>
        <Link
          href="/login"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </Link>
      </main>
    );
  }

  const { data: savedJokes } = await supabase
    .from("saved_jokes")
    .select()
    .order("created_at", { ascending: false });

  return (
    <main className="bg-gray-800 min-h-screen flex flex-col items-center justify-center text-center text-white p-4">
      <h1 className="text-2xl font-bold mb-6">Saved Jokes 😄</h1>
      {savedJokes?.length === 0 ? (
        <p className="text-gray-400">No saved jokes yet. Go save some!</p>
      ) : (
        <ul className="space-y-3 max-w-xl w-full">
          {savedJokes?.map((j) => (
            <li key={j.id} className="bg-gray-700 rounded p-4 text-sm text-left">
              {j.joke}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}