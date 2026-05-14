import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function NavBar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center w-full">
        <ul className="flex space-x-4 justify-center items-center">
          <li>
            <Link className="hover:text-blue-500" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:text-blue-500" href="/saved-jokes">
              Saved Jokes
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-gray-400">{user.email}</span>
              <form action="/auth/logout" method="POST">
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-3 rounded"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-3 rounded"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}