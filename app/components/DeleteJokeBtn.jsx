'use client';

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function DeleteJokeButton({ jokeId }) {
  const router = useRouter();

  const handleDelete = async () => {
    const supabase = createClient();
    const { error } = await supabase
      .from('saved_jokes')
      .delete()
      .eq('id', jokeId);

    if (!error) router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-600 hover:bg-red-500 text-gray-300 hover:text-white transition-colors text-xs font-bold"
      title="Delete joke"
    >
      ✕
    </button>
  );
}