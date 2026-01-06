# Supabase Setup Guide for Miless Website

## Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: miless-website (or any name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait 2-3 minutes for setup to complete

## Step 2: Create Database Table

1. In your Supabase dashboard, go to **Table Editor**
2. Click **"New table"**
3. Configure:
   - **Name**: `users`
   - **Description**: "User form submissions"
4. Add columns:
   - `id` (auto-generated, type: `int8`, primary key)
   - `name` (type: `text`, nullable: `false`)
   - `email` (type: `text`, nullable: `false`, unique: `true`)
   - `created_at` (type: `timestamptz`, default: `now()`)
5. Click **"Save"**

### Or use SQL Editor:

Go to **SQL Editor** and run:

```sql
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to insert (for API)
CREATE POLICY "Allow service role to insert" ON users
  FOR INSERT
  TO service_role
  WITH CHECK (true);
```

## Step 3: Get API Keys

1. Go to **Project Settings** (gear icon)
2. Click **"API"** in the sidebar
3. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Service Role Key** (keep this secret! Never expose in client-side code)

## Step 4: Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:

   **For Production:**
   - `NEXT_PUBLIC_SUPABASE_URL` = Your Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` = Your Service Role Key

   **For Preview/Development (optional):**
   - Add the same variables for Preview and Development environments

4. Click **"Save"**

## Step 5: Add Environment Variables Locally

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Important:** Add `.env.local` to `.gitignore` (it should already be there)

## Step 6: Install Dependencies

```bash
npm install
```

## Step 7: Test

1. Start your dev server: `npm run dev`
2. Submit the form on your website
3. Check Supabase dashboard → **Table Editor** → `users` table
4. You should see the new entry!

## Viewing Your Data

- **Supabase Dashboard**: Go to Table Editor → `users` table
- **SQL Editor**: Run `SELECT * FROM users ORDER BY created_at DESC;`

## Security Notes

- ✅ Service Role Key is used server-side only (in API route)
- ✅ Row Level Security is enabled
- ✅ Email is unique (prevents duplicates)
- ✅ All data is encrypted at rest

## Troubleshooting

**Error: "Invalid API key"**
- Check that environment variables are set correctly in Vercel
- Make sure you're using the Service Role Key (not the anon key)

**Error: "relation does not exist"**
- Make sure you created the `users` table
- Check the table name matches exactly

**Error: "duplicate key value"**
- This is expected - the email is unique
- The API will return a 409 status code

## Next Steps

- Set up email notifications (optional)
- Add analytics dashboard
- Export data to CSV
- Set up automated backups

---

**Your API is ready!** Once you add the environment variables, form submissions will automatically be stored in Supabase. 🎉

