# CORS Error Fix - IMPORTANT

## The Problem

You're accessing the app from: `https://spirit6t.github.io/molecular-genetic-pathology-curriculum/`

This causes CORS errors because Firebase Storage doesn't allow cross-origin requests from GitHub Pages.

## The Solution

**You MUST use the Firebase Hosting URL:**

### ✅ Use This URL:
**https://molecular-genetic-curriculum.web.app**

### ❌ Don't Use:
- https://spirit6t.github.io/molecular-genetic-pathology-curriculum/

## Why This Happens

Firebase Storage has CORS restrictions. When you access from GitHub Pages:
- The browser makes a cross-origin request to Firebase Storage
- Firebase Storage blocks it due to CORS policy
- You get the error: "blocked by CORS policy"

When you access from Firebase Hosting:
- Everything is on the same domain/firebase infrastructure
- CORS works properly
- Uploads succeed

## What To Do

1. **Bookmark the correct URL**: https://molecular-genetic-curriculum.web.app
2. **Update any links/bookmarks** to use the Firebase Hosting URL
3. **Use Firebase Hosting URL going forward**

The app is deployed and working on Firebase Hosting. GitHub Pages is not needed for this app since we're using Firebase Hosting.

## Alternative (Not Recommended)

If you absolutely must use GitHub Pages, you would need to:
- Use a different storage solution (like AWS S3 with CORS enabled)
- Or set up a proxy server
- But this is unnecessary since Firebase Hosting works perfectly

**Recommendation: Just use https://molecular-genetic-curriculum.web.app**

