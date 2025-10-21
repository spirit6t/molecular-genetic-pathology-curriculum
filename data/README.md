# Custom Board Questions Data

This directory stores your custom board questions in JSON format for version control via GitHub.

## Files

- `customQuestions.json` - Your custom board questions that can be shared across devices and team members

## How to Use

### Export Questions from the App
1. Navigate to "Board Questions" in the app
2. Click the **📤 Export** button
3. This downloads `customQuestions.json` with all your custom questions
4. Save this file to the `data/` directory in your repository

### Import Questions into the App
1. Click the **📥 Import** button in the Board Questions view
2. Select your `customQuestions.json` file
3. Questions will be imported and saved to localStorage

### Sync with GitHub

After exporting questions, commit and push to GitHub:

```bash
# Add the questions file
git add data/customQuestions.json

# Commit with a descriptive message
git commit -m "Update custom board questions"

# Push to GitHub
git push origin main
```

### Share with Team Members

Team members can:
1. Pull latest changes: `git pull origin main`
2. Import `data/customQuestions.json` using the Import button
3. Add/edit questions locally
4. Export and commit back to the repository

## Question Format

Each question in the JSON file has this structure:

```json
{
  "id": 1234567890,
  "question": "Your question text",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0,
  "explanation": "Explanation of the correct answer",
  "topic": 1,
  "subtopic": "Specific subtopic",
  "level": "Core",
  "difficulty": "Medium",
  "isCustom": true,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

