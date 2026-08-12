# Nilesh Kumar Portfolio

A responsive, static portfolio created from Nilesh Kumar's resume. It requires no build step and is ready for Vercel.

## Run locally

Open `index.html` directly, or serve the folder:

```powershell
python -m http.server 4173
```

Then visit `http://localhost:4173`.

## Publish

Create a new GitHub repository named `nilesh-portfolio`, then from this folder run:

```powershell
git init
git add .
git commit -m "Create Nilesh Kumar portfolio"
git branch -M main
git remote add origin https://github.com/NileshKumar906/nilesh-portfolio.git
git push -u origin main
```

In Vercel, select **Add New → Project**, import the GitHub repository, and click **Deploy**. Vercel detects this static site automatically.

## Enable contact messages

The contact form uses a Vercel serverless function and Resend to send email safely. It never exposes your key in the browser.

1. Create a free account at [Resend](https://resend.com) and create an API key.
2. In Vercel, open your project → **Settings** → **Environment Variables**.
3. Add `RESEND_API_KEY` with your Resend API key for Production, Preview, and Development.
4. Redeploy the project.

The default setup emails `nileshkumar3291@gmail.com`. Resend's test sender works only when sending to the email used for your Resend account. For messages from your own domain, add and verify it in Resend, then also set `CONTACT_FROM_EMAIL` in Vercel, for example `Portfolio <hello@yourdomain.com>`.
