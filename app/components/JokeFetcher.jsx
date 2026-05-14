'use client';

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function JokeFetcher({ userId }) {
  const [joke, setJoke] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchJoke = async () => {
    setSaved(false);
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: { Accept: 'application/json' }
    });
    const data = await response.json();
    setJoke(data.joke);
  };

  const saveJoke = async () => {
    if (!joke || !userId) return;
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from('saved_jokes')
      .insert({ joke, user_id: userId });
    if (!error) setSaved(true);
    setSaving(false);
  };

  useEffect(() => { fetchJoke(); }, []);

  return (
    <div>
      <p className="text-lg md:text-xl lg:text-2xl p-5">
        {joke || "Loading joke ..."}
      </p>
      <div className="flex gap-3 justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={fetchJoke}
        >
          Regenerate
        </button>

        {userId ? (
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            onClick={saveJoke}
            disabled={saving || saved}
          >
            {saved ? "Saved ✓" : saving ? "Saving..." : "Save Joke"}
          </button>
        ) : (
          <Link
            href="/login"
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
          >
            Login to Save
          </Link>
        )}
      </div>
    </div>
  );
}