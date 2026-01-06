# Database Setup Guide for Miless Website

## Current Setup
The API route is ready at `/app/api/submit/route.ts`. It currently logs submissions to the console. 

## Option 1: Vercel Postgres (Recommended)

### Setup Steps:
1. Go to your Vercel project dashboard
2. Navigate to Storage → Create Database → Postgres
3. Create a new database
4. Get your connection string from Vercel

### Install Dependencies:
```bash
npm install @vercel/postgres
```

### Update API Route:
```typescript
import { sql } from '@vercel/postgres'

// In your POST function:
await sql`
  INSERT INTO users (name, email, created_at) 
  VALUES (${name}, ${email}, NOW())
`
```

### Create Table:
Run this SQL in Vercel's database dashboard:
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Option 2: Supabase (Free Tier)

### Setup Steps:
1. Go to https://supabase.com
2. Create a new project
3. Get your project URL and anon key

### Install Dependencies:
```bash
npm install @supabase/supabase-js
```

### Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Update API Route:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// In your POST function:
const { data, error } = await supabase
  .from('users')
  .insert([{ name, email }])
```

### Create Table in Supabase:
```sql
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Option 3: MongoDB Atlas (Free Tier)

### Setup Steps:
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string

### Install Dependencies:
```bash
npm install mongodb
```

### Update API Route:
```typescript
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI!)

// In your POST function:
await client.connect()
const db = client.db('miless')
await db.collection('users').insertOne({ name, email, createdAt: new Date() })
await client.close()
```

---

## Option 4: Simple Email Service (No Database)

If you just want to receive emails, use a service like:
- **Formspree**: https://formspree.io
- **EmailJS**: https://www.emailjs.com
- **SendGrid**: https://sendgrid.com

---

## Environment Variables

Add these to Vercel:
1. Go to Project Settings → Environment Variables
2. Add your database connection strings/keys
3. Redeploy

---

## Testing

Test the API locally:
```bash
curl -X POST http://localhost:3000/api/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'
```

