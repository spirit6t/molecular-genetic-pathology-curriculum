# GitHub Workflow for Board Questions

This guide explains how to store and sync your board questions using GitHub.

## Quick Start

### 1. Push Your Current Changes to GitHub

```bash
# Push your committed changes to GitHub
git push origin main
```

### 2. Daily Workflow

#### Adding/Editing Questions
1. Open the app at `http://localhost:3000`
2. Navigate to **Board Questions**
3. Add or edit questions using the UI
4. Click **📤 Export** to download `customQuestions.json`
5. Move the downloaded file to your repository's `data/` folder
6. Commit and push:
   ```bash
   git add data/customQuestions.json
   git commit -m "Update board questions - added [topic] questions"
   git push origin main
   ```

#### Getting Questions from GitHub
1. Pull latest changes:
   ```bash
   git pull origin main
   ```
2. In the app, click **📥 Import** 
3. Select `data/customQuestions.json` from your repository
4. Questions are now in your browser's localStorage

## Complete Git Commands Reference

### First Time Setup (if not done already)

```bash
# Check your git configuration
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify remote repository
git remote -v
```

### Regular Workflow Commands

```bash
# 1. Check what changed
git status

# 2. See detailed changes
git diff

# 3. Add specific files
git add data/customQuestions.json
# OR add all changed files
git add .

# 4. Commit with descriptive message
git commit -m "Your descriptive message here"

# 5. Push to GitHub
git push origin main

# 6. Pull latest from GitHub
git pull origin main
```

### Working with Branches (Optional - for advanced users)

```bash
# Create a new branch for big changes
git checkout -b feature/add-genetics-questions

# Make your changes, then commit
git add data/customQuestions.json
git commit -m "Add 50 genetics questions"

# Push branch to GitHub
git push origin feature/add-genetics-questions

# Merge back to main (after review)
git checkout main
git merge feature/add-genetics-questions
git push origin main
```

## Team Collaboration

### Sharing Questions with Team Members

1. **Team Member A** adds questions:
   - Adds/edits questions in the app
   - Exports to `data/customQuestions.json`
   - Commits and pushes to GitHub
   ```bash
   git add data/customQuestions.json
   git commit -m "Add cardiovascular genetics questions"
   git push origin main
   ```

2. **Team Member B** gets the questions:
   - Pull changes from GitHub
   ```bash
   git pull origin main
   ```
   - Import `data/customQuestions.json` in the app

### Avoiding Conflicts

If two people edit questions at the same time:

1. **Before starting work**, always pull first:
   ```bash
   git pull origin main
   ```

2. **If you get a merge conflict**:
   ```bash
   # Git will mark the conflict in the file
   # Open data/customQuestions.json and look for:
   # <<<<<<< HEAD
   # your changes
   # =======
   # their changes
   # >>>>>>> main
   
   # Choose which version to keep or combine them
   # Then:
   git add data/customQuestions.json
   git commit -m "Resolve merge conflict in board questions"
   git push origin main
   ```

3. **Best Practice**: Use different branches for different topics
   ```bash
   git checkout -b genetics-questions
   # work on genetics questions
   git checkout -b cardiology-questions
   # work on cardiology questions
   ```

## Automation Tips

### Quick Export Script

Create a script to export and commit in one step:

**Windows (export-questions.bat):**
```batch
@echo off
echo Exporting questions from browser...
echo Please click Export in the app, then press any key after saving
pause
git add data\customQuestions.json
git commit -m "Update board questions - %date%"
git push origin main
echo Done!
```

**Mac/Linux (export-questions.sh):**
```bash
#!/bin/bash
echo "Exporting questions from browser..."
echo "Please click Export in the app, then press any key after saving"
read -p "Press enter to continue..."
git add data/customQuestions.json
git commit -m "Update board questions - $(date)"
git push origin main
echo "Done!"
```

## Troubleshooting

### Problem: "Your branch is behind 'origin/main'"
**Solution:**
```bash
git pull origin main
```

### Problem: "Permission denied (publickey)"
**Solution:** Set up SSH key or use HTTPS
```bash
# Check current remote
git remote -v

# Change to HTTPS if needed
git remote set-url origin https://github.com/yourusername/molecular-genetic-pathology-curriculum.git
```

### Problem: "Merge conflict in data/customQuestions.json"
**Solution:** 
1. Open `data/customQuestions.json`
2. Find conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
3. Keep both sets of questions (it's an array, so you can combine them)
4. Remove conflict markers
5. Commit the resolved file

### Problem: Accidentally committed wrong file
**Solution:**
```bash
# Undo last commit but keep changes
git reset --soft HEAD~1

# OR remove file from staging
git reset HEAD <file>
```

## Best Practices

1. **Commit Often**: Small, frequent commits are better than large ones
2. **Descriptive Messages**: Write clear commit messages
   - ✅ Good: "Add 10 molecular genetics questions for Core level"
   - ❌ Bad: "update"
3. **Pull Before Push**: Always pull before starting work
4. **Export Regularly**: Export after every session of adding questions
5. **Backup**: GitHub is your backup - push frequently!

## GitHub Web Interface

You can also view and edit files directly on GitHub:

1. Go to `https://github.com/yourusername/molecular-genetic-pathology-curriculum`
2. Navigate to `data/customQuestions.json`
3. Click the pencil icon to edit
4. Make changes and commit directly on GitHub
5. In your local app, run `git pull` to get the changes

## Questions?

- Check git status: `git status`
- See commit history: `git log --oneline`
- View remote repository: `git remote -v`
- Get help: `git help <command>`

