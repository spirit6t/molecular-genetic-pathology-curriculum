# Firebase Setup Instructions for Molecular Genetic Pathology Curriculum

This guide will help you set up Firebase for your board questions database.

## 🚀 Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Get started"**
3. Enter project name: `molecular-genetic-pathology-curriculum`
4. Click **Continue**
5. Turn off Google Analytics (optional)
6. Click **Create project**
7. Wait for Firebase to initialize (30-60 seconds)

## 📱 Step 2: Add Web App to Firebase

1. In your Firebase project dashboard, click the **Web icon** (`</>`)
2. Register your app:
   - App nickname: `molecular-genetic-pathology-curriculum`
   - Firebase Hosting: Check "Also set up Firebase Hosting" (optional)
3. Click **Register app**
4. Copy the `firebaseConfig` object that appears

## 🔧 Step 3: Configure Firestore Database

1. In Firebase Console, click **Firestore Database** in the left sidebar
2. Click **"Create database"**
3. Select **"Start in test mode"** (for now)
4. Choose your Firebase project location (closest to your users)
5. Click **Enable**

### Firestore Security Rules

Update your Firestore rules to allow read/write access:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /boardQuestions/{document=**} {
      allow read: if true;  // Anyone can read
      allow write: if true;  // Anyone can write (change this later!)
    }
  }
}
```

Click **Publish** when done.

## 🔑 Step 4: Update Firebase Configuration in Your App

1. Open `src/firebase.js` in your project
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",  // Your actual API key
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

Save the file.

## ✅ Step 5: Test Firebase Connection

1. Start your development server: `npm start`
2. Navigate to **Board Questions** in your app
3. Click **"Add Question"** and create a test question
4. If it works, you'll see your question appear
5. Check Firebase Console → Firestore Database to verify your question is stored

## 🔒 Step 6: Secure Your Database (Optional but Recommended)

For production, update your Firestore security rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /boardQuestions/{document=**} {
      allow read: if true;  // Anyone can read
      allow create: if request.auth != null;  // Only authenticated users can create
      allow update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
```

## 📊 Firebase Features Enabled

✅ **Firestore** - Cloud database for storing board questions  
✅ **Real-time sync** - Questions sync automatically across devices  
✅ **Offline support** - Works offline, syncs when connection returns  
✅ **Scalable** - Handles thousands of questions  
✅ **Secure** - Firebase handles all security  

## 🔄 Migration from localStorage

If you have questions in localStorage:

1. Export them using the **📤 Export** button
2. They will be automatically backed up in Firebase
3. Future questions will be saved to both localStorage (for offline) AND Firebase (for cloud backup)

## 🚨 Troubleshooting

### "Firebase: Error (auth/invalid-api-key)"
- Check that you copied the correct config values from Firebase Console
- Make sure there are no extra spaces or quotes

### "Firebase: Error (permission-denied)"
- Check your Firestore security rules
- Make sure your rules allow read/write access

### "Failed to load questions"
- Check your internet connection
- Open browser console (F12) to see detailed error
- Make sure Firestore is enabled in Firebase Console

## 🎯 Next Steps

1. ✅ Complete the setup above
2. ✅ Test creating a question in the app
3. ✅ Check Firebase Console to verify questions are being saved
4. ✅ Deploy your app: `npm run deploy`
5. ✅ Your questions will now sync across all devices!

## 📚 Firebase Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Quick Start](https://firebase.google.com/docs/firestore/quickstart)
- [Firebase YouTube Channel](https://www.youtube.com/user/Firebase)

## 💡 Benefits of Firebase

- ✅ Questions stored securely in the cloud
- ✅ Access from any device, anywhere
- ✅ Real-time synchronization
- ✅ No more manual import/export needed
- ✅ Automatic backups
- ✅ Can share questions with other users (future feature)

