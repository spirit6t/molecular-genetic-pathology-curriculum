# Fix Firebase Storage for GitHub Pages

Since you're using GitHub Pages (`https://spirit6t.github.io`), we need to configure Firebase Storage CORS to allow cross-origin requests.

## Option 1: Configure CORS via Google Cloud Console (Recommended)

1. Go to [Google Cloud Console](https://console.cloud.google.com/storage/browser?project=molecular-genetic-curriculum)

2. Select your Firebase Storage bucket (usually named `molecular-genetic-curriculum.firebasestorage.app`)

3. Click on the **"Configuration"** tab

4. Scroll to **"CORS configuration"**

5. Click **"Edit CORS configuration"**

6. Paste this configuration:

```json
[
  {
    "origin": ["https://spirit6t.github.io", "http://localhost:3000", "https://molecular-genetic-curriculum.web.app"],
    "method": ["GET", "HEAD", "PUT", "POST", "DELETE"],
    "responseHeader": ["Content-Type", "Authorization", "x-goog-resumable"],
    "maxAgeSeconds": 3600
  }
]
```

7. Click **"Save"**

## Option 2: Use gcloud CLI (Alternative)

If you have gcloud CLI installed:

```bash
# Install gcloud if needed
# Then run:
gcloud storage buckets update gs://molecular-genetic-curriculum.firebasestorage.app --cors-file=cors.json
```

## Option 3: Alternative - Use Cloud Functions Proxy (More Complex)

If CORS configuration doesn't work, we can create a Cloud Function to proxy uploads, but this is more complex.

## After Configuring CORS

1. Clear your browser cache
2. Refresh the GitHub Pages site
3. Try uploading an image again
4. It should work!

## Important Notes

- Make sure Firebase Storage is enabled in Firebase Console first
- Make sure Storage rules allow read/write access
- CORS changes may take a few minutes to propagate

