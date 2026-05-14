# 😄 Dad Jokes App

A fun Next.js web app that fetches random dad jokes and lets logged-in users save their favorites. Authentication is handled via Supabase magic links (passwordless email login).

---

## 🚀 Features

- Random dad joke generator
- Magic link authentication (no password needed)
- Save favorite jokes (logged-in users only)
- View all saved jokes on a dedicated page
- Navbar shows login/logout state automatically
- Guests can browse jokes but must log in to save them

---

## 🧰 Tech Stack & Dependencies

| Library | Purpose |
|---|---|
| [Next.js 14](https://nextjs.org/) | React framework (App Router) |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [@supabase/supabase-js](https://supabase.com/docs/reference/javascript) | Supabase JS client |
| [@supabase/ssr](https://supabase.com/docs/guides/auth/server-side/nextjs) | Supabase server-side rendering helpers |
| [icanhazdadjoke API](https://icanhazdadjoke.com/api) | Free dad jokes API (no key needed) |

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/dad-jokes.git
cd dad-jokes
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Supabase packages

```bash
npm install @supabase/supabase-js @supabase/ssr
```

---

## 🔧 Supabase Setup

### 1. Create a Supabase project

- Go to [supabase.com](https://supabase.com) and sign in
- Click **New Project** and give it a name
- Wait for the project to be ready

### 2. Get your API credentials

- Go to **Project Settings → API**
- Copy your **Project URL** and **anon public** key

### 3. Create the `.env.local` file

Create a `.env.local` file in the project root (same level as `package.json`):

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

> ⚠️ Never commit this file. It is already listed in `.gitignore`.

### 4. Create the database table

In your Supabase dashboard, go to **SQL Editor** and run the following:

```sql
create table saved_jokes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  joke text not null,
  created_at timestamp default now()
);

-- Enable Row Level Security
alter table saved_jokes enable row level security;

-- Only allow users to access their own jokes
create policy "Users can manage their own jokes"
on saved_jokes for all
using (auth.uid() = user_id);
```

### 5. Configure allowed redirect URLs

- In Supabase go to **Authentication → URL Configuration**
- Under **Redirect URLs**, add:
  - `http://localhost:3000/**` (for local development)
  - `https://your-production-domain.com/**` (when you deploy)

### 6. (Optional) Increase email rate limit

By default Supabase allows only 3 magic link emails per hour during development.

- Go to **Authentication → Rate Limits**
- Increase the **Emails sent per hour** value

---

## 📁 Project Structure

```
dad-jokes/
├── app/
│   ├── auth/
│   │   ├── callback/
│   │   │   └── route.js        # Handles magic link redirect
│   │   └── logout/
│   │       └── route.js        # Handles sign out
│   ├── components/
│   │   ├── JokeFetcher.js      # Joke display + save button
│   │   └── NavBar.js           # Navigation + login/logout state
│   ├── login/
│   │   └── page.js             # Magic link login form
│   ├── saved-jokes/
│   │   └── page.js             # Saved jokes page (auth required)
│   ├── layout.js               # Root layout (includes NavBar)
│   └── page.js                 # Home page
├── utils/
│   └── supabase/
│       ├── client.js           # Browser Supabase client
│       └── server.js           # Server Supabase client
├── middleware.js                # Keeps session cookies fresh
├── .env.local                  # Your secret keys (not committed)
└── package.json
```

---

## ▶️ Running the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Authentication Flow

```
User visits app
      ↓
Guests can browse jokes freely
      ↓
Click "Login to Save" or "Login" in navbar
      ↓
Enter email → Supabase sends a magic link
      ↓
User clicks the link in their email
      ↓
/auth/callback exchanges the code for a session
      ↓
Redirected to homepage, now logged in ✅
      ↓
Can save jokes and view /saved-jokes
```

---

## 📄 License

MIT