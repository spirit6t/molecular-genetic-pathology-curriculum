# Setup Instructions for GitHub Pages + Firebase Storage

## Step 1: Enable Firebase Storage

1. Go to: https://console.firebase.google.com/project/molecular-genetic-curriculum/storage
2. Click **"Get Started"**
3. Choose **"Start in test mode"**
4. Select a location
5. Click **"Done"**

## Step 2: Set Storage Security Rules

1. In Firebase Console, go to **Storage** → **Rules** tab
2. Use these rules:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /images/{imageId} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

3. Click **"Publish"**

## Step 3: Configure CORS for GitHub Pages

Firebase Storage needs CORS configured to work from GitHub Pages.

### Method A: Using Google Cloud Console (Easiest)

1. Go to: https://console.cloud.google.com/storage/browser?project=molecular-genetic-curriculum
2. Find your storage bucket (should be named like `molecular-genetic-curriculum.firebasestorage.app`)
3. Click on the bucket name
4. Go to the **"Configuration"** tab
5. Scroll to **"CORS configuration"** section
6. Click **"Edit CORS configuration"**
7. Paste this JSON:

```json
[
  {
    "origin": ["https://spirit6t.github.io", "http://localhost:3000", "https://molecular-genetic-curriculum.web.app"],
    "method": ["GET", "HEAD", "PUT", "POST", "DELETE", "OPTIONS"],
    "responseHeader": ["Content-Type", "Authorization", "x-goog-resumable", "x-goog-upload-command", "x-goog-upload-offset", "x-goog-upload-status"],
    "maxAgeSeconds": 3600
  }
]
```

8. Click **"Save"**
9. Wait 1-2 minutes for changes to propagate

### Method B: Using gcloud CLI

If you have gcloud CLI installed:

```bash
gcloud storage buckets update gs://molecular-genetic-curriculum.firebasestorage.app --cors-file=cors.json
```

## Step 4: Verify It Works

1. Clear browser cache
2. Go to: https://spirit6t.github.io/molecular-genetic-pathology-curriculum/
3. Navigate to Resources → Image Bank
4. Try uploading an image
5. Check browser console (F12) for any errors

## Troubleshooting

**If you still get CORS errors:**
- Wait 2-3 minutes after configuring CORS (changes take time)
- Clear browser cache completely
- Try in incognito/private mode
- Verify the bucket name in Google Cloud Console matches your Firebase project

**If Storage bucket isn't visible:**
- Make sure Storage is enabled in Firebase Console first
- The bucket name will be: `[project-id].firebasestorage.app`

## Important Notes

- CORS configuration applies at the bucket level, not through Firebase rules
- Storage rules control WHO can access, CORS controls WHERE requests come from
- Changes to CORS may take a few minutes to propagate globally

