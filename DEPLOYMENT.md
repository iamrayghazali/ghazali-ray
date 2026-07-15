# Deploying to Vercel (free) + ghazaliray.com

This repo has two apps:

- `frontend/` — Vite + React static site
- `backend/` — Express API (contact form → **EmailJS**, server-side)

You'll create **two Vercel projects** from the same GitHub repo, each pointed at
a different subfolder, then attach your domain. Everything fits the free
**Hobby** plan.

Email is sent from the **backend** using EmailJS's REST API. The EmailJS
**private key** stays on the server and never ships to the browser; the frontend
just POSTs to `/contact` as before.

---

## 0. Prerequisites (one-time)

### a) Push this repo to GitHub (if it isn't already).

### b) Set up EmailJS → https://dashboard.emailjs.com

1. Create an account (free tier: 200 emails/month).
2. **Email Services** → *Add New Service* (e.g. connect your Gmail). Copy the
   **Service ID** (looks like `service_xxxxxxx`).
3. **Email Templates** → *Create New Template*. In the template:
   - Set **To Email** to your inbox: `ghazali.raydan@gmail.com`.
   - Set **Reply To** to `{{reply_to}}` (so you can reply to the visitor).
   - Set the **Subject** to `{{subject}}`.
   - In the body, use the variables the backend sends: `{{from}}` (the visitor's
     email — also available as `{{from_email}}`), `{{message}}`, and `{{time}}`
     (send time, UTC). Example body:
     ```
     New message from {{from}} ({{time}})

     {{message}}
     ```
   - Save and copy the **Template ID** (`template_xxxxxxx`).
4. **Account → General**: copy your **Public Key** and **Private Key**.
5. **Account → Security**: enable **“Allow EmailJS API for non-browser
   applications.”** ⚠️ Required — server-side sending fails with 403 without it.

### c) Vercel account → https://vercel.com (sign in with GitHub).

There's a chicken-and-egg with URLs (each app needs the other's URL). Order:
**deploy backend → deploy frontend → attach domain → point backend at the domain.**

---

## 1. Deploy the backend

1. Vercel dashboard → **Add New… → Project** → import this GitHub repo.
2. **Root Directory**: click *Edit* → select **`backend`**. ⚠️ Most important
   step — without it Vercel builds the wrong folder.
3. Framework Preset: **Other** (Vercel auto-detects the `api/` function).
4. **Environment Variables** (Settings → Environment Variables):

   | Key                   | Value                                              |
   |-----------------------|----------------------------------------------------|
   | `EMAILJS_SERVICE_ID`  | `service_xxxxxxx`                                  |
   | `EMAILJS_TEMPLATE_ID` | `template_xxxxxxx`                                 |
   | `EMAILJS_PUBLIC_KEY`  | your public key                                    |
   | `EMAILJS_PRIVATE_KEY` | your private key (secret)                          |
   | `FRONTEND_URL`        | `http://localhost:5173` *(temporary — fixed in step 4)* |

5. **Deploy.** Copy the backend URL, e.g. `https://ghazali-ray-backend.vercel.app`.
6. Verify: open `https://<backend-url>/health` → `{"status":"ok"}`.

> How it works: `backend/vercel.json` rewrites every request to
> `backend/api/index.js`, which exports the Express app — a serverless function,
> nothing to keep running.

---

## 2. Deploy the frontend

1. Vercel dashboard → **Add New… → Project** → import the **same** repo again.
2. **Root Directory**: select **`frontend`**.
3. Framework Preset: **Vite** (auto-detected; build `npm run build`, output `dist`).
4. **Environment Variables**:

   | Key            | Value                                                       |
   |----------------|-------------------------------------------------------------|
   | `VITE_API_URL` | your backend URL from step 1 (no trailing slash)            |

   > `VITE_*` vars are baked in **at build time** — change it later ⇒ redeploy.

5. **Deploy.** Copy the frontend URL, e.g. `https://ray-ghazali.vercel.app`.

> `frontend/vercel.json` rewrites all routes to `index.html` so React Router
> deep links (like `/contact`) work on refresh.

---

## 3. Attach your domain — ghazaliray.com

Point the domain at the **frontend** project (your site). Optionally give the
backend a subdomain too.

### Frontend on the apex + www

1. Frontend project → **Settings → Domains → Add** → enter `ghazaliray.com`.
   Add `www.ghazaliray.com` too; Vercel will offer to redirect www → apex (accept).
2. Vercel shows the DNS records to create. Go to **wherever you bought the
   domain** (your registrar's DNS settings) and add them:

   | Type    | Name / Host | Value                        |
   |---------|-------------|------------------------------|
   | `A`     | `@`         | `76.76.21.21`                |
   | `CNAME` | `www`       | `cname.vercel-dns.com`       |

   *(Vercel displays the exact values — use whatever it shows. Alternatively,
   change your registrar's **nameservers** to Vercel's and let it manage DNS.)*
3. Wait for DNS to propagate (minutes to a couple hours). Vercel auto-issues an
   HTTPS certificate once it verifies — the domain flips to **Valid**.

### (Optional) Backend on api.ghazaliray.com

1. Backend project → Settings → Domains → Add `api.ghazaliray.com`.
2. At your registrar add: `CNAME` `api` → `cname.vercel-dns.com`.
3. Set the frontend's `VITE_API_URL` to `https://api.ghazaliray.com` and
   **redeploy the frontend**. (If you skip this, the `.vercel.app` backend URL
   keeps working fine.)

---

## 4. Connect them (fix CORS) — do this last

The backend only accepts requests from the origin(s) in `FRONTEND_URL`.

1. Backend project → Settings → Environment Variables → set **`FRONTEND_URL`** to
   your real site origins, comma-separated, **no trailing slash**:
   ```
   https://ghazaliray.com,https://www.ghazaliray.com
   ```
2. Backend → Deployments → **Redeploy** (env changes need a redeploy).

Now open https://ghazaliray.com and send a test message — it should land in your
inbox, and hitting **Reply** answers the visitor.

---

## Free-tier caveat: rate limiting

The backend's per-IP **cooldown (2h)** and **rate limit (5 / 15 min)** are stored
**in memory**. On Vercel each serverless invocation may run in a fresh instance,
so this state is **best-effort** — EmailJS's own monthly cap is the real backstop.

If you want the limits strictly enforced, either:

- **Deploy the backend to [Render](https://render.com)** (free): it runs the
  Express server as one long-lived process, so the in-memory limits work exactly
  as written. Downside: free instances sleep after 15 min idle (~30–50s cold
  start). Setup: New → Web Service → root dir `backend`, build `npm install`,
  start `npm start`, add the same env vars. No code changes needed.
- **Add a shared store** (e.g. Upstash Redis free tier) behind the limiter and
  cooldown. More setup; usually overkill for a portfolio.

---

## Local development

```bash
# backend
cd backend
cp .env.example .env      # fill in the EMAILJS_* values
npm install
npm run dev               # http://localhost:8080

# frontend (separate terminal)
cd frontend
cp .env.example .env      # VITE_API_URL=http://localhost:8080
npm install
npm run dev               # http://localhost:5173
```

## Running tests

```bash
cd backend  && npm test   # Node test runner: validation, EmailJS mailer, API
cd frontend && npm test   # Vitest: validateEmail + ContactForm
```

## Redeploys

Both projects auto-deploy on every push to the connected branch. Set the
production branch in Vercel → Settings → Git.
