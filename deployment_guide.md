# Cloudflare Pages Deployment Guide

This guide provides step-by-step instructions for deploying the Institutional School project to Cloudflare Pages.

## Prerequisites
1.  **GitHub / GitLab Account**: Your code must be pushed to a repository.
2.  **Cloudflare Account**: Sign up for free at [dash.cloudflare.com](https://dash.cloudflare.com/).
3.  **Turso Database**: Your database should be active with valid credentials.

## Step 1: Push Code to Repository
1. Initialize Git (if not already done): `git init`
2. Add files: `git add .`
3. Commit: `git commit -m "Initial commit"`
4. Push to your Git provider (GitHub/GitLab).

## Step 2: Connect to Cloudflare Pages
1. Log in to the Cloudflare Dashboard.
2. Navigate to **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
3. Select your repository and click **Begin setup**.

## Step 3: Configure Build Settings
Configure the build settings as follows:
- **Framework preset**: `Astro`
- **Build command**: `npm run build`
- **Build output directory**: `dist`

## Step 4: Configure Environment Variables
Before clicking "Save and Deploy", scroll down to **Environment variables (advanced)** and add the following keys exactly as they appear in your `.env` file:
- `TURSO_DATABASE_URL`: `libsql://<your-db-url>.turso.io`
- `TURSO_AUTH_TOKEN`: `<your-auth-token>`

*Ensure these match your remote Turso database credentials.*

## Step 5: Deploy
1. Click **Save and Deploy**.
2. Cloudflare will install dependencies, build the Astro project, and deploy the SSR worker.
3. Wait for the success message. Your site is now live!

## Troubleshooting
- **Build Fails**: Check the build logs in Cloudflare. Ensure your Node.js version is compatible (v18+ recommended).
- **Data Not Loading (500 Error)**: Double-check your environment variables in the Cloudflare Pages settings. Ensure `TURSO_DATABASE_URL` uses the `libsql://` or `https://` protocol, NOT `file:`.
