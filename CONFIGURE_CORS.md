# Configure CORS for Firebase Storage - Alternative Methods

Since CORS configuration might not be visible in Google Cloud Console UI for Firebase Storage buckets, here are alternative methods:

## Method 1: Using gcloud CLI (Recommended)

### Step 1: Install Google Cloud SDK

If you don't have gcloud CLI installed:

**Windows:**
1. Download from: https://cloud.google.com/sdk/docs/install
2. Run the installer
3. Restart your terminal

**Or use Git Bash:**
```bash
# Check if gcloud is installed
gcloud --version
```

### Step 2: Authenticate

```bash
gcloud auth login
gcloud config set project molecular-genetic-curriculum
```

### Step 3: Configure CORS

Make sure you're in the project root directory (where `cors.json` is located), then run:

```bash
gcloud storage buckets update gs://molecular-genetic-curriculum.firebasestorage.app --cors-file=cors.json
```

If that doesn't work, try:

```bash
gsutil cors set cors.json gs://molecular-genetic-curriculum.firebasestorage.app
```

## Method 2: Using Google Cloud Console API

1. Go to: https://console.cloud.google.com/storage/browser?project=molecular-genetic-curriculum
2. Click on your bucket
3. Look for "Configuration" or "Settings" tab
4. If CORS isn't visible, try the gcloud CLI method above

## Method 3: Using Firebase Console (If Available)

Some Firebase projects show CORS settings directly in Firebase Console:
1. Go to: https://console.firebase.google.com/project/molecular-genetic-curriculum/storage
2. Look for "Settings" or "Configuration" options
3. Check if CORS is listed there

## Method 4: Alternative Solution - Use Firebase Hosting Instead

If CORS configuration is too complex, consider using Firebase Hosting:
- Your app is already deployed to: https://molecular-genetic-curriculum.web.app
- Firebase Hosting doesn't have CORS issues with Storage
- Simply use that URL instead of GitHub Pages

## Verify CORS is Set

After configuring, verify with:

```bash
gcloud storage buckets describe gs://molecular-genetic-curriculum.firebasestorage.app --format="value(cors)"
```

Or:

```bash
gsutil cors get gs://molecular-genetic-curriculum.firebasestorage.app
```

## Troubleshooting

**If gcloud command fails:**
- Make sure you're authenticated: `gcloud auth login`
- Make sure project is set: `gcloud config set project molecular-genetic-curriculum`
- Check bucket name is correct

**If bucket name is different:**
- Check in Firebase Console → Storage → Files tab
- The bucket URL will be shown there
- Or check in Google Cloud Console storage browser

