# 🧬 Molecular Genetic Pathology Curriculum

A comprehensive React-based curriculum management application designed for molecular genetic pathology education and training. This application provides a structured 2-year curriculum with interactive scheduling, project management, question banks, and learning resources.

## ✨ Features

### 📚 **2-Year Curriculum Planner**
- **24-Month Timeline**: Complete curriculum spanning 2 years with monthly topics
- **Interactive Scheduling**: Drag-and-drop scheduling with custom start dates
- **Progress Tracking**: Visual progress indicators and completion status
- **Subtopic Management**: Detailed subtopic tracking with checkboxes

### 📅 **Smart Scheduling System**
- **Flexible Start Dates**: Choose any program start date
- **Monthly Planning**: Schedule topics for specific months
- **Date Management**: Edit and update scheduled dates
- **Bulk Operations**: Schedule entire months at once

### 📋 **Project Management**
- **Dynamic Projects**: Add, edit, and remove projects
- **Due Date Tracking**: Set and monitor project deadlines
- **Deliverables**: Track multiple project deliverables
- **Topic Association**: Link projects to curriculum topics

### ❓ **Question Bank System**
- **Board Questions**: Comprehensive question database
- **Multiple Choice**: A, B, C, D format questions
- **Difficulty Levels**: Easy, Medium, Hard classifications
- **Topic Filtering**: Questions organized by curriculum topics
- **Add Questions**: Create and add new questions dynamically

### 📖 **Learning Resources**
- **Textbooks**: Comprehensive textbook database with ISBN tracking
- **Journals**: Key journals with impact factors and direct links
- **Web Resources**: Curated links to useful online resources
- **Resource Management**: Add new resources with topic associations

### 🎯 **Interactive Features**
- **Real-time Updates**: Live data synchronization
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, intuitive interface with Tailwind CSS
- **Local Storage**: Data persistence across sessions

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/spirit6t/molecular-genetic-pathology-curriculum.git
   cd molecular-genetic-pathology-curriculum
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## 📖 Usage Guide

### Setting Up Your Curriculum

1. **Choose Start Date**: Navigate to "2-Year Planner" and select your program start date
2. **Schedule Topics**: Use "Schedule All" to populate a month or schedule individual topics
3. **Track Progress**: Check off subtopics as you complete them
4. **Manage Projects**: Add projects with due dates and deliverables

### Adding Questions

1. Go to "Questions" tab
2. Click "Add New Question"
3. Fill in question details, options, and correct answer
4. Select topic and difficulty level
5. Click "Add Question"

### Managing Resources

1. Navigate to "Resources" tab
2. Click "Add Resource"
3. Choose resource type (Book/Journal/Link)
4. Fill in relevant details
5. Associate with curriculum topics

## 🏗️ Technical Architecture

### Frontend Stack
- **React 19**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Framer Motion**: Smooth animations
- **React Hook Form**: Form management
- **React Hot Toast**: Notifications

### Key Components
- `App.js`: Main application component with routing
- `curriculumData.js`: Curriculum data and structure
- `Dashboard`: Overview and statistics
- `CurriculumView`: Topic browsing and management
- `ScheduleView`: Calendar and scheduling interface
- `ProjectsView`: Project management
- `QuestionsView`: Question bank interface
- `ResourcesView`: Learning resources management

### Data Structure
- **Topics**: Curriculum topics with subtopics and metadata
- **Schedule**: Time-based topic assignments
- **Projects**: Project definitions with deliverables
- **Questions**: Question bank with multiple choice format
- **Resources**: Books, journals, and web links

## 🎨 Customization

### Adding New Topics
Edit `src/curriculumData.js` to add new curriculum topics:

```javascript
{
  id: 8,
  topic: "Your New Topic",
  level: "Core",
  duration: "2 weeks",
  focus: "Topic description",
  subtopics: ["Subtopic 1", "Subtopic 2"]
}
```

### Modifying Curriculum Timeline
Update the `twoYearCurriculum` object in `curriculumData.js` to modify the 2-year timeline.

### Styling
The app uses Tailwind CSS. Modify `src/index.css` or component classes for custom styling.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Medical education community for curriculum insights
- React and open-source community for excellent tools
- Molecular genetic pathology educators for domain expertise

## 📞 Support

For questions, issues, or contributions, please:
- Open an issue on GitHub
- Contact the maintainers
- Check the documentation

---

**Built with ❤️ for medical education**

*Last updated: December 2024*