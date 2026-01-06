# Vercel Storage Setup Guide

## Option 1: Vercel KV (Redis) - RECOMMENDED ⚡

**Best for:** Fast writes, key-value storage, form submissions

### Setup Steps:

1. **Install dependency:**
```bash
npm install @vercel/kv
```

2. **Create Vercel KV Database:**
   - Go to Vercel Dashboard → Your Project → Storage
   - Click "Create Database" → Select "KV"
   - Create the database

3. **Get Environment Variables:**
   - Vercel will automatically add these to your project:
     - `KV_REST_API_URL`
     - `KV_REST_API_TOKEN`
     - `KV_REST_API_READ_ONLY_TOKEN`

4. **The code is already updated!** The API route uses Vercel KV.

### How it works:
- Stores each submission with a unique key
- Maintains a list of all users
- Fast writes and reads
- Perfect for form submissions

### Retrieve data (optional):
```typescript
// Get all user IDs
const userIds = await kv.lrange("users:list", 0, -1)

// Get specific user
const user = await kv.get(`user:1234567890:email@example.com`)
```

---

## Option 2: Edge Config (Alternative)

**Best for:** Read-heavy config data, feature flags (NOT ideal for form submissions)

### Why not recommended:
- Optimized for reads, not writes
- Writes are slower and limited
- Better for configuration data

### If you still want to use it:

1. **Install dependency:**
```bash
npm install @vercel/edge-config
```

2. **Create Edge Config:**
   - Vercel Dashboard → Edge Config → Create
   - Get your connection string

3. **Update API route:**
```typescript
import { get } from '@vercel/edge-config'

// Reading is fast:
const value = await get('myKey')

// Writing requires Vercel API (not ideal for form submissions)
```

---

## Option 3: Vercel Blob Storage

**Best for:** Files, images, PDFs (NOT for structured data like emails)

### Use case example:
```typescript
import { put } from '@vercel/blob'

// Store a file
const blob = await put('filename.txt', file, {
  access: 'public',
})
```

---

## Recommendation

**Use Vercel KV** for form submissions because:
- ✅ Fast writes (perfect for form submissions)
- ✅ Low latency
- ✅ Simple key-value storage
- ✅ Easy to retrieve data
- ✅ Free tier available

---

## Environment Variables

Vercel automatically adds these when you create KV:
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

No manual setup needed! 🎉

---

## Testing

After deploying, test the API:
```bash
curl -X POST https://your-domain.vercel.app/api/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'
```

