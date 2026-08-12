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
