# Enable Firebase Storage - Step by Step

## The Problem
You don't see the storage bucket because Firebase Storage hasn't been enabled yet.

## Solution: Enable Firebase Storage

### Step 1: Enable Storage in Firebase Console

1. **Go to Firebase Console Storage:**
   - Open: https://console.firebase.google.com/project/molecular-genetic-curriculum/storage

2. **Click "Get Started"**
   - You should see a button that says "Get Started" or "Create bucket"

3. **Choose Storage Mode:**
   - Select **"Start in test mode"** (for development)
   - OR **"Start in production mode"** if you want stricter rules (requires authentication)

4. **Select Location:**
   - Choose a location closest to your users
   - Common options: `us-central`, `us-east1`, `europe-west`, `asia-southeast1`
   - This cannot be changed later, so choose carefully

5. **Click "Done"**
   - Firebase will create the storage bucket (this takes 30-60 seconds)

### Step 2: Verify Storage is Enabled

After clicking "Done", you should see:
- The Storage dashboard
- A folder structure (initially empty)
- Tabs: Files, Rules, Usage

### Step 3: Set Storage Security Rules

1. Click on the **"Rules"** tab in Storage
2. Replace the default rules with:

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

### Step 4: Find Your Bucket in Google Cloud Console

After Storage is enabled:

1. Go to: https://console.cloud.google.com/storage/browser?project=molecular-genetic-curriculum
2. You should now see a bucket named: `molecular-genetic-curriculum.firebasestorage.app`
3. If you don't see it, wait 1-2 minutes and refresh

### Step 5: Configure CORS (For GitHub Pages)

Once you can see the bucket:

1. Click on the bucket name: `molecular-genetic-curriculum.firebasestorage.app`
2. Go to **"Configuration"** tab
3. Scroll to **"CORS configuration"**
4. Click **"Edit CORS configuration"**
5. Paste this:

```json
[
  {
    "origin": ["https://spirit6t.github.io", "http://localhost:3000"],
    "method": ["GET", "HEAD", "PUT", "POST", "DELETE", "OPTIONS"],
    "responseHeader": ["Content-Type", "Authorization", "x-goog-resumable", "x-goog-upload-command", "x-goog-upload-offset", "x-goog-upload-status"],
    "maxAgeSeconds": 3600
  }
]
```

6. Click **"Save"**

### Troubleshooting

**If you don't see "Get Started" button:**
- Storage might already be enabled
- Check if you see any folders or files in the Storage dashboard
- Try refreshing the page

**If you get an error when enabling:**
- Make sure you have proper permissions in the Firebase project
- Check that the Firebase project is active
- Try in a different browser or incognito mode

**After enabling, if bucket still doesn't appear in Google Cloud:**
- Wait 2-3 minutes (bucket creation takes time)
- Make sure you're in the correct Google Cloud project
- Check that you have access to Google Cloud Console

