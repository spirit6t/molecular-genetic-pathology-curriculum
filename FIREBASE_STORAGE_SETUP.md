# Firebase Storage Setup Guide

## Issue: Images not uploading

If you see "Uploading..." but nothing happens, Firebase Storage is likely not enabled.

## Step-by-Step Setup:

### 1. Enable Firebase Storage

1. Go to: https://console.firebase.google.com/project/molecular-genetic-curriculum/storage
2. Click **"Get Started"** or **"Create bucket"**
3. Choose **"Start in test mode"** (for development)
4. Select a **location** closest to your users
5. Click **"Done"**

### 2. Set Storage Security Rules

After enabling Storage:

1. In Firebase Console, go to **Storage** → **Rules** tab
2. Replace the rules with:

```javascript
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

### 3. Deploy Storage Rules (Optional)

From your terminal:
```bash
firebase deploy --only storage
```

### 4. Where to Find Images in Firebase

Images are stored in **TWO places**:

1. **Firebase Storage** (the actual image files):
   - Go to: https://console.firebase.google.com/project/molecular-genetic-curriculum/storage
   - Look in the `images/` folder
   - This is where the actual image files are stored

2. **Firestore Database** (image metadata):
   - Go to: https://console.firebase.google.com/project/molecular-genetic-curriculum/firestore
   - Look for the `imageBank` collection
   - This contains metadata: topic, subtopic, description, source, downloadURL

### 5. Test the Upload

1. Open your app: https://molecular-genetic-curriculum.web.app
2. Go to Resources → Image Bank tab
3. Click "Upload Image"
4. Select an image file
5. Fill in topic and other fields
6. Click "Upload Image"
7. Check browser console (F12) for any errors
8. Check Firebase Storage and Firestore to verify the upload

### Troubleshooting

**If upload still fails:**

1. Open browser console (F12 → Console tab)
2. Try uploading an image
3. Look for error messages (they should now be detailed)
4. Common errors:
   - `storage/unauthorized` → Storage rules need to allow write
   - `storage/invalid-argument` → Storage not enabled
   - Network errors → Check internet connection

**If you see "Uploading..." forever:**

- Check browser console for errors
- Verify Storage is enabled in Firebase Console
- Check Storage rules allow write access
- Try refreshing the page

