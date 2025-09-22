import React, { useState, useEffect } from 'react';
import './App.css';
import { curriculumTopics, resources, boardQuestions, projects, twoYearCurriculum } from './curriculumData';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [schedule, setSchedule] = useState([]);

  // Load saved schedule from localStorage
  useEffect(() => {
    const savedSchedule = localStorage.getItem('curriculumSchedule');
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule));
    }
  }, []);

  // Save schedule to localStorage
  const saveSchedule = (newSchedule) => {
    setSchedule(newSchedule);
    localStorage.setItem('curriculumSchedule', JSON.stringify(newSchedule));
  };

  const filteredTopics = selectedLevel === 'All'
    ? curriculumTopics
    : curriculumTopics.filter(topic => topic.level === selectedLevel);

  const addToSchedule = (topic, date, subtopic = null) => {
    const newItem = {
      id: Date.now(),
      topic: topic.topic,
      subtopic: subtopic,
      date: date,
      level: topic.level,
      duration: topic.duration,
      completed: false,
      completedSubtopics: []
    };
    saveSchedule([...schedule, newItem].sort((a, b) => new Date(a.date) - new Date(b.date)));
  };

  const toggleScheduleItem = (id) => {
    const updatedSchedule = schedule.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    saveSchedule(updatedSchedule);
  };

  const updateScheduleItemDate = (id, newDate) => {
    const updatedSchedule = schedule.map(item =>
      item.id === id ? { ...item, date: newDate } : item
    );
    saveSchedule(updatedSchedule.sort((a, b) => new Date(a.date) - new Date(b.date)));
  };

  const removeScheduleItem = (id) => {
    const updatedSchedule = schedule.filter(item => item.id !== id);
    saveSchedule(updatedSchedule);
  };

  const toggleSubtopic = (scheduleItemId, subtopic) => {
    const updatedSchedule = schedule.map(item => {
      if (item.id === scheduleItemId) {
        const completedSubtopics = item.completedSubtopics || [];
        const isCompleted = completedSubtopics.includes(subtopic);

        return {
          ...item,
          completedSubtopics: isCompleted
            ? completedSubtopics.filter(s => s !== subtopic)
            : [...completedSubtopics, subtopic]
        };
      }
      return item;
    });
    saveSchedule(updatedSchedule);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">MGP</span>
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">Molecular Genetic Pathology</h1>
                <p className="text-sm text-gray-500">Residency Curriculum Management System</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${currentView === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('curriculum')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${currentView === 'curriculum' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Curriculum
              </button>
              <button
                onClick={() => setCurrentView('schedule')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${currentView === 'schedule' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Schedule
              </button>
              <button
                onClick={() => setCurrentView('resources')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${currentView === 'resources' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Resources
              </button>
              <button
                onClick={() => setCurrentView('projects')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${currentView === 'projects' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Projects
              </button>
              <button
                onClick={() => setCurrentView('questions')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${currentView === 'questions' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Board Questions
              </button>
              <button
                onClick={() => setCurrentView('planner')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${currentView === 'planner' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'}`}
              >
                2-Year Planner
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && <DashboardView schedule={schedule} />}
        {currentView === 'curriculum' && <CurriculumView topics={filteredTopics} selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} addToSchedule={addToSchedule} />}
        {currentView === 'schedule' && <ScheduleView schedule={schedule} toggleScheduleItem={toggleScheduleItem} updateScheduleItemDate={updateScheduleItemDate} removeScheduleItem={removeScheduleItem} toggleSubtopic={toggleSubtopic} />}
        {currentView === 'resources' && <ResourcesView />}
        {currentView === 'projects' && <ProjectsView />}
        {currentView === 'questions' && <QuestionsView />}
        {currentView === 'planner' && <CurriculumPlannerView schedule={schedule} addToSchedule={addToSchedule} />}
      </main>
    </div>
  );
}

// Dashboard Component
function DashboardView({ schedule }) {
  const coreTopics = curriculumTopics.filter(t => t.level === 'Core').length;
  const advancedTopics = curriculumTopics.filter(t => t.level === 'Advanced Resident').length;
  const completedItems = schedule.filter(item => item.completed).length;
  const upcomingItems = schedule.filter(item => !item.completed && new Date(item.date) > new Date()).length;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Residency Curriculum Dashboard
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Track your progress through the 2-year Molecular Genetic Pathology curriculum
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-blue-600 text-2xl">📚</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Core Topics</h3>
              <p className="text-2xl font-bold text-blue-600">{coreTopics}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-purple-600 text-2xl">🎓</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Advanced Topics</h3>
              <p className="text-2xl font-bold text-purple-600">{advancedTopics}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-green-600 text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Completed</h3>
              <p className="text-2xl font-bold text-green-600">{completedItems}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <span className="text-orange-600 text-2xl">📅</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming</h3>
              <p className="text-2xl font-bold text-orange-600">{upcomingItems}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Curriculum Progress</h3>
        <div className="space-y-4">
          {curriculumTopics.map(topic => {
            const scheduledItems = schedule.filter(item => item.topic === topic.topic);
            const completedItems = scheduledItems.filter(item => item.completed);
            const progress = scheduledItems.length > 0 ? (completedItems.length / scheduledItems.length) * 100 : 0;

            return (
              <div key={topic.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{topic.topic}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${topic.level === 'Core' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                      {topic.level}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Curriculum Component
function CurriculumView({ topics, selectedLevel, setSelectedLevel, selectedTopic, setSelectedTopic, addToSchedule }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Curriculum Topics</h2>
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="All">All Levels</option>
          <option value="Core">Core Topics</option>
          <option value="Advanced Resident">Advanced Resident</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {topics.map(topic => (
          <div key={topic.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{topic.topic}</h3>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${topic.level === 'Core' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                    {topic.level}
                  </span>
                  <span className="text-sm text-gray-500">{topic.duration}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                {selectedTopic === topic.id ? 'Hide' : 'View'} Details
              </button>
            </div>

            {selectedTopic === topic.id && (
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Subtopics:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {topic.subtopics.map((subtopic, index) => (
                      <span key={index} className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {subtopic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      const date = prompt('Enter date for this topic (YYYY-MM-DD):');
                      if (date) addToSchedule(topic, date);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add to Schedule
                  </button>
                  <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                    View Resources
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Schedule Component
function ScheduleView({ schedule, toggleScheduleItem, updateScheduleItemDate, removeScheduleItem, toggleSubtopic }) {
  const [editingItem, setEditingItem] = useState(null);
  const [newDate, setNewDate] = useState('');

  const handleEditDate = (item) => {
    setEditingItem(item.id);
    setNewDate(item.date);
  };

  const handleSaveDate = () => {
    if (newDate && editingItem) {
      updateScheduleItemDate(editingItem, newDate);
      setEditingItem(null);
      setNewDate('');
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setNewDate('');
  };

  const getSubtopicsForTopic = (topicName) => {
    const topic = curriculumTopics.find(t => t.topic === topicName);
    return topic ? topic.subtopics : [];
  };

  const groupedSchedule = schedule.reduce((acc, item) => {
    // Parse the date properly to avoid timezone issues
    const [year, monthNum, day] = item.date.split('-').map(Number);
    const dateObj = new Date(year, monthNum - 1, day);
    const monthKey = dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!acc[monthKey]) acc[monthKey] = [];
    acc[monthKey].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Schedule</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add New Session
        </button>
      </div>

      {Object.keys(groupedSchedule).length === 0 ? (
        <div className="text-center py-12">
          <span className="text-6xl text-gray-300">📅</span>
          <h3 className="text-xl font-semibold text-gray-500 mt-4">No sessions scheduled</h3>
          <p className="text-gray-400">Add topics to your schedule from the Curriculum page</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedSchedule).map(([month, items]) => (
            <div key={month} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{month}</h3>
              <div className="space-y-3">
                {items.map(item => {
                  const subtopics = getSubtopicsForTopic(item.topic);
                  return (
                    <div key={item.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => toggleScheduleItem(item.id)}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-900">{item.topic}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              {editingItem === item.id ? (
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="date"
                                    value={newDate}
                                    onChange={(e) => setNewDate(e.target.value)}
                                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                                  />
                                  <button
                                    onClick={handleSaveDate}
                                    className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={handleCancelEdit}
                                    className="px-2 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <span
                                  className="cursor-pointer hover:text-blue-600"
                                  onClick={() => handleEditDate(item)}
                                  title="Click to edit date"
                                >
                                  {item.date}
                                </span>
                              )}
                              <span className={`px-2 py-1 rounded-full text-xs ${item.level === 'Core' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                                }`}>
                                {item.level}
                              </span>
                              <span>{item.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditDate(item)}
                            className="text-blue-600 hover:text-blue-700 text-sm"
                          >
                            Edit Date
                          </button>
                          <button
                            onClick={() => removeScheduleItem(item.id)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Subtopics Section */}
                      {subtopics.length > 0 && (
                        <div className="ml-9 mt-3">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="text-sm font-medium text-gray-700">Subtopics to discuss:</h5>
                            <span className="text-xs text-gray-500">
                              {item.completedSubtopics?.length || 0} / {subtopics.length} completed
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {subtopics.map((subtopic, index) => {
                              const isCompleted = item.completedSubtopics?.includes(subtopic) || false;
                              return (
                                <div
                                  key={index}
                                  className={`flex items-center space-x-2 text-xs px-2 py-1 rounded border transition-colors ${isCompleted
                                    ? 'bg-green-50 border-green-200 text-green-800'
                                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isCompleted}
                                    onChange={() => toggleSubtopic(item.id, subtopic)}
                                    className="w-3 h-3 text-green-600 rounded focus:ring-green-500"
                                  />
                                  <span className={isCompleted ? 'line-through' : ''}>
                                    {subtopic}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Resources Component
function ResourcesView() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newResource, setNewResource] = useState({
    type: 'book',
    title: '',
    author: '',
    publisher: '',
    edition: '',
    isbn: '',
    url: '',
    description: '',
    topics: []
  });
  const [resourceList, setResourceList] = useState(resources);

  const handleAddResource = () => {
    if (newResource.title.trim()) {
      const resource = {
        id: Date.now(),
        ...newResource,
        topics: newResource.topics.map(t => parseInt(t))
      };

      // Add to appropriate category
      const updatedResources = { ...resourceList };
      if (newResource.type === 'book') {
        updatedResources.books = [...updatedResources.books, resource];
      } else if (newResource.type === 'journal') {
        updatedResources.journals = [...updatedResources.journals, resource];
      } else if (newResource.type === 'link') {
        updatedResources.links = [...updatedResources.links, resource];
      }

      setResourceList(updatedResources);

      // Reset form
      setNewResource({
        type: 'book',
        title: '',
        author: '',
        publisher: '',
        edition: '',
        isbn: '',
        url: '',
        description: '',
        topics: []
      });
      setShowAddForm(false);
    } else {
      alert('Please fill in the required fields');
    }
  };

  const handleTopicToggle = (topicId) => {
    const topicIdStr = topicId.toString();
    const updatedTopics = newResource.topics.includes(topicIdStr)
      ? newResource.topics.filter(id => id !== topicIdStr)
      : [...newResource.topics, topicIdStr];
    setNewResource({ ...newResource, topics: updatedTopics });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Learning Resources</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showAddForm ? 'Cancel' : 'Add Resource'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Resource</h3>
          <div className="space-y-4">
            {/* Resource Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resource Type *</label>
              <select
                value={newResource.type}
                onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="book">Book</option>
                <option value="journal">Journal</option>
                <option value="link">Web Link</option>
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                value={newResource.title}
                onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter resource title..."
              />
            </div>

            {/* Author/Publisher */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {newResource.type === 'book' ? 'Author' : newResource.type === 'journal' ? 'Publisher' : 'Description'}
                </label>
                <input
                  type="text"
                  value={newResource.author}
                  onChange={(e) => setNewResource({ ...newResource, author: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={newResource.type === 'book' ? 'Author name' : newResource.type === 'journal' ? 'Publisher' : 'Brief description'}
                />
              </div>

              {newResource.type === 'book' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Publisher</label>
                  <input
                    type="text"
                    value={newResource.publisher}
                    onChange={(e) => setNewResource({ ...newResource, publisher: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Publisher name"
                  />
                </div>
              )}
            </div>

            {/* Edition/ISBN/URL */}
            {newResource.type === 'book' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Edition</label>
                  <input
                    type="text"
                    value={newResource.edition}
                    onChange={(e) => setNewResource({ ...newResource, edition: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 3rd Edition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ISBN</label>
                  <input
                    type="text"
                    value={newResource.isbn}
                    onChange={(e) => setNewResource({ ...newResource, isbn: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ISBN number"
                  />
                </div>
              </div>
            )}

            {newResource.type === 'journal' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Impact Factor</label>
                <input
                  type="text"
                  value={newResource.impactFactor || ''}
                  onChange={(e) => setNewResource({ ...newResource, impactFactor: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 4.1"
                />
              </div>
            )}

            {(newResource.type === 'link' || newResource.type === 'journal') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                <input
                  type="url"
                  value={newResource.url}
                  onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
            )}

            {/* Topics */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Related Topics</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {curriculumTopics.map(topic => (
                  <label key={topic.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newResource.topics.includes(topic.id.toString())}
                      onChange={() => handleTopicToggle(topic.id)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{topic.topic}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddResource}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Resource
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Books */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">📚 Textbooks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resourceList.books.map(book => (
            <div key={book.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-gray-900 mb-2">{book.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{book.author}</p>
              <p className="text-sm text-gray-500 mb-2">{book.publisher} - {book.edition}</p>
              <p className="text-xs text-blue-600">ISBN: {book.isbn}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Journals */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">📖 Journals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resourceList.journals.map(journal => (
            <div key={journal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-gray-900 mb-2">{journal.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{journal.publisher}</p>
              <p className="text-sm text-green-600 mb-2">Impact Factor: {journal.impactFactor}</p>
              {journal.url && (
                <a
                  href={journal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  Visit Journal →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">🔗 Useful Links</h3>
        <div className="space-y-3">
          {resourceList.links.map(link => (
            <div key={link.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold">
                {link.title} →
              </a>
              <p className="text-sm text-gray-600 mt-1">{link.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Projects Component
function ProjectsView() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    duration: '',
    topic: 1,
    subtopic: '',
    deliverables: [''],
    dueDate: ''
  });
  const [projectList, setProjectList] = useState(projects);

  const handleAddProject = () => {
    if (newProject.title.trim() && newProject.dueDate) {
      const project = {
        id: Date.now(),
        title: newProject.title,
        description: newProject.description,
        duration: newProject.duration,
        topic: newProject.topic,
        subtopic: newProject.subtopic,
        deliverables: newProject.deliverables.filter(d => d.trim()),
        dueDate: newProject.dueDate
      };

      setProjectList([...projectList, project]);

      // Reset form
      setNewProject({
        title: '',
        description: '',
        duration: '',
        topic: 1,
        subtopic: '',
        deliverables: [''],
        dueDate: ''
      });
      setShowAddForm(false);
    } else {
      alert('Please fill in the required fields (Title and Due Date)');
    }
  };

  const handleDeliverableChange = (index, value) => {
    const newDeliverables = [...newProject.deliverables];
    newDeliverables[index] = value;
    setNewProject({ ...newProject, deliverables: newDeliverables });
  };

  const addDeliverable = () => {
    setNewProject({ ...newProject, deliverables: [...newProject.deliverables, ''] });
  };

  const removeDeliverable = (index) => {
    const newDeliverables = newProject.deliverables.filter((_, i) => i !== index);
    setNewProject({ ...newProject, deliverables: newDeliverables });
  };

  const clearAllProjects = () => {
    if (window.confirm('Are you sure you want to clear all projects? This action cannot be undone.')) {
      setProjectList([]);
    }
  };

  const removeProject = (projectId) => {
    if (window.confirm('Are you sure you want to remove this project?')) {
      setProjectList(projectList.filter(project => project.id !== projectId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Assigned Projects</h2>
          <p className="text-sm text-gray-600 mt-1">{projectList.length} project{projectList.length !== 1 ? 's' : ''} assigned</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showAddForm ? 'Cancel' : 'Add New Project'}
          </button>
          {projectList.length > 0 && (
            <button
              onClick={clearAllProjects}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Clear All Projects
            </button>
          )}
        </div>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Project</h3>
          <div className="space-y-4">
            {/* Project Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Title *</label>
              <input
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter project title..."
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Describe the project..."
              />
            </div>

            {/* Duration and Due Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <input
                  type="text"
                  value={newProject.duration}
                  onChange={(e) => setNewProject({ ...newProject, duration: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 2 weeks"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
                <input
                  type="date"
                  value={newProject.dueDate}
                  onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Topic and Subtopic */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Related Topic</label>
                <select
                  value={newProject.topic}
                  onChange={(e) => setNewProject({ ...newProject, topic: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {curriculumTopics.map(topic => (
                    <option key={topic.id} value={topic.id}>{topic.topic}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtopic</label>
                <input
                  type="text"
                  value={newProject.subtopic}
                  onChange={(e) => setNewProject({ ...newProject, subtopic: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., PCR Optimization"
                />
              </div>
            </div>

            {/* Deliverables */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deliverables</label>
              <div className="space-y-2">
                {newProject.deliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={deliverable}
                      onChange={(e) => handleDeliverableChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Deliverable ${index + 1}`}
                    />
                    <button
                      onClick={() => removeDeliverable(index)}
                      className="px-2 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                      disabled={newProject.deliverables.length === 1}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={addDeliverable}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  Add Deliverable
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProject}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}

      {projectList.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-6xl text-gray-300">📋</span>
          <h3 className="text-xl font-semibold text-gray-500 mt-4">No projects assigned</h3>
          <p className="text-gray-400">Add your first project to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projectList.map(project => (
            <div key={project.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    Due: {new Date(project.dueDate).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => removeProject(project.id)}
                    className="text-red-600 hover:text-red-700 text-sm"
                    title="Remove project"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {project.description && (
                <p className="text-gray-600 mb-4">{project.description}</p>
              )}

              <div className="space-y-3">
                {project.deliverables.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Deliverables:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {project.deliverables.map((deliverable, index) => (
                        <li key={index}>{deliverable}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {project.duration && <span>Duration: {project.duration}</span>}
                    {project.subtopic && (
                      <span className="ml-2 text-blue-600">• {project.subtopic}</span>
                    )}
                  </div>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Start Project
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Questions Component
function QuestionsView() {
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
    topic: 1,
    subtopic: '',
    level: 'Core',
    difficulty: 'Medium'
  });

  const handleAnswerSelect = (questionId, answerIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    let total = 0;

    boardQuestions.forEach(question => {
      if (userAnswers[question.id] !== undefined) {
        total++;
        if (userAnswers[question.id] === question.correctAnswer) {
          correct++;
        }
      }
    });

    return { correct, total };
  };

  const handleAddQuestion = () => {
    if (newQuestion.question.trim() && newQuestion.options.every(opt => opt.trim())) {
      // In a real app, you'd save this to a database
      // For now, we'll just show a success message
      alert('Question added successfully! (Note: This is a demo - questions are not permanently saved)');

      // Reset form
      setNewQuestion({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: '',
        topic: 1,
        subtopic: '',
        level: 'Core',
        difficulty: 'Medium'
      });
      setShowAddForm(false);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...newQuestion.options];
    newOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: newOptions });
  };

  const score = calculateScore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Board Questions Bank</h2>
        <div className="flex space-x-4">
          {Object.keys(userAnswers).length > 0 && (
            <button
              onClick={() => setShowResults(!showResults)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              {showResults ? 'Hide' : 'Show'} Results ({score.correct}/{score.total})
            </button>
          )}
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            {showAddForm ? 'Cancel' : 'Add Question'}
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Generate Quiz
          </button>
        </div>
      </div>

      {showResults && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-900 mb-2">Quiz Results</h3>
          <p className="text-green-800">
            You answered {score.correct} out of {score.total} questions correctly
            ({score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%).
          </p>
        </div>
      )}

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Question</h3>
          <div className="space-y-4">
            {/* Question Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Question *</label>
              <textarea
                value={newQuestion.question}
                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={3}
                placeholder="Enter your question here..."
              />
            </div>

            {/* Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Answer Options *</label>
              <div className="space-y-2">
                {newQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-600 w-8">{String.fromCharCode(65 + index)})</span>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    />
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={newQuestion.correctAnswer === index}
                      onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: index })}
                      className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-500">Correct</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Explanation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Explanation</label>
              <textarea
                value={newQuestion.explanation}
                onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={2}
                placeholder="Explain why this is the correct answer..."
              />
            </div>

            {/* Topic and Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
                <select
                  value={newQuestion.topic}
                  onChange={(e) => setNewQuestion({ ...newQuestion, topic: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {curriculumTopics.map(topic => (
                    <option key={topic.id} value={topic.id}>{topic.topic}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                <select
                  value={newQuestion.level}
                  onChange={(e) => setNewQuestion({ ...newQuestion, level: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Core">Core</option>
                  <option value="Advanced Resident">Advanced Resident</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <select
                  value={newQuestion.difficulty}
                  onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Subtopic */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtopic</label>
              <input
                type="text"
                value={newQuestion.subtopic}
                onChange={(e) => setNewQuestion({ ...newQuestion, subtopic: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Hardy Weinberg Principle"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddQuestion}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Add Question
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {boardQuestions.map((question, index) => (
          <div key={question.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Question {index + 1}: {question.question}
              </h3>
              <div className="flex space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs ${question.level === 'Core' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                  {question.level}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                  {question.difficulty}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={optionIndex}
                    checked={userAnswers[question.id] === optionIndex}
                    onChange={() => handleAnswerSelect(question.id, optionIndex)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className={`text-sm ${showResults
                    ? optionIndex === question.correctAnswer
                      ? 'text-green-700 font-semibold'
                      : userAnswers[question.id] === optionIndex
                        ? 'text-red-700 font-semibold'
                        : 'text-gray-700'
                    : 'text-gray-700'
                    }`}>
                    {option}
                  </span>
                </label>
              ))}
            </div>

            {showResults && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
                <p className="text-blue-800 text-sm">{question.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Curriculum Planner Component
function CurriculumPlannerView({ schedule, addToSchedule }) {
  const [selectedYear, setSelectedYear] = useState('year1');
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [startDate, setStartDate] = useState('2024-01-01');
  const [forceUpdate, setForceUpdate] = useState(0);

  // Debug: Log when startDate changes
  useEffect(() => {
    console.log('Start date state changed to:', startDate);
    setForceUpdate(prev => prev + 1); // Force re-render
  }, [startDate]);

  const generateScheduleForMonth = (monthData, year, monthIndex) => {
    // Parse date as local time to avoid timezone issues
    const [startYear, startMonth] = startDate.split('-').map(Number);

    console.log('generateScheduleForMonth called with:', {
      startDate,
      startYear,
      startMonth,
      year,
      monthIndex,
      monthData: monthData.name
    });

    // Calculate the target year and month
    const targetYear = startYear + (year - 1);
    const targetMonth = startMonth + monthIndex;

    // Handle year overflow
    const finalYear = targetYear + Math.floor((targetMonth - 1) / 12);
    const finalMonth = ((targetMonth - 1) % 12) + 1;

    const firstDay = new Date(finalYear, finalMonth - 1, 1);
    const lastDay = new Date(finalYear, finalMonth, 0);

    console.log('Calculated dates:', {
      targetYear,
      targetMonth,
      finalYear,
      finalMonth,
      firstDay: firstDay.toISOString().split('T')[0],
      lastDay: lastDay.toISOString().split('T')[0]
    });

    return {
      month: monthData.name,
      year: finalYear,
      firstDay: firstDay.toISOString().split('T')[0],
      lastDay: lastDay.toISOString().split('T')[0],
      topics: monthData.topics,
      projects: monthData.projects,
      assessments: monthData.assessments
    };
  };

  const bulkScheduleMonth = (monthData, year, monthIndex) => {
    const scheduleData = generateScheduleForMonth(monthData, year, monthIndex);

    console.log('Scheduling for:', {
      monthData: monthData.name,
      year,
      monthIndex,
      startDate,
      calculatedFirstDay: scheduleData.firstDay
    });

    // Clear existing entries for this topic to avoid duplicates
    const filteredSchedule = schedule.filter(item => item.topic !== monthData.topics[0].topic);

    monthData.topics.forEach((topic, index) => {
      // Parse the calculated first day properly
      const [year, monthNum, day] = scheduleData.firstDay.split('-').map(Number);
      const sessionDate = new Date(year, monthNum - 1, day + (index * 7)); // Space sessions weekly

      console.log(`Scheduling topic ${index + 1}: ${topic.topic} for ${sessionDate.toISOString().split('T')[0]}`);

      const newItem = {
        id: Date.now() + index,
        topic: topic.topic,
        date: sessionDate.toISOString().split('T')[0],
        level: topic.level,
        duration: topic.duration,
        completed: false
      };

      filteredSchedule.push(newItem);
    });

    // Update the schedule
    const updatedSchedule = filteredSchedule.sort((a, b) => new Date(a.date) - new Date(b.date));
    localStorage.setItem('curriculumSchedule', JSON.stringify(updatedSchedule));
    window.location.reload(); // Refresh to update the UI

    // Show success message
    alert(`Successfully scheduled ${monthData.topics.length} topics for ${monthData.name}!`);
  };

  const currentYear = selectedYear === 'year1' ? twoYearCurriculum.year1 : twoYearCurriculum.year2;
  const yearNumber = selectedYear === 'year1' ? 1 : 2;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          2-Year Curriculum Planner
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive 24-month curriculum with monthly sessions, projects, and assessments
        </p>
      </div>

      {/* Year Selection */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setSelectedYear('year1')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${selectedYear === 'year1'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            Year 1 (Months 1-12)
          </button>
          <button
            onClick={() => setSelectedYear('year2')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${selectedYear === 'year2'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            Year 2 (Months 13-24)
          </button>
        </div>

        {/* Start Date Selection */}
        <div className="flex justify-center items-center space-x-4 mb-6">
          <label className="text-sm font-medium text-gray-700">Program Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              console.log('Start date changed to:', e.target.value);
              setStartDate(e.target.value);
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="text-sm text-gray-500">
            Current: {startDate}
          </div>
        </div>

        {/* Test Date Calculation */}
        <div key={forceUpdate} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-yellow-800 mb-2">Date Calculation Test (Update #{forceUpdate}):</h4>
          <p className="text-sm text-yellow-700">
            Current start date state: <strong>{startDate}</strong>
          </p>
          <p className="text-sm text-yellow-700">
            Month 1 (January) should be: <strong>{
              (() => {
                // Parse date as local time to avoid timezone issues
                const [year, month] = startDate.split('-').map(Number);
                const firstDay = new Date(year, month - 1, 1); // month - 1 because getMonth() is 0-based
                return firstDay.toISOString().split('T')[0];
              })()
            }</strong> (Start month: {(() => {
              const [year, month] = startDate.split('-').map(Number);
              return new Date(year, month - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            })()})
          </p>
          <p className="text-sm text-yellow-700">
            Month 2 (February) should be: <strong>{
              (() => {
                const [year, month] = startDate.split('-').map(Number);
                const firstDay = new Date(year, month, 1); // month (not month - 1) for next month
                return firstDay.toISOString().split('T')[0];
              })()
            }</strong>
          </p>
          <p className="text-sm text-yellow-700">
            Month 3 (March) should be: <strong>{
              (() => {
                const [year, month] = startDate.split('-').map(Number);
                const firstDay = new Date(year, month + 1, 1); // month + 1 for month after next
                return firstDay.toISOString().split('T')[0];
              })()
            }</strong>
          </p>
          <button
            onClick={() => {
              const startDateObj = new Date(startDate);
              console.log('Current startDate state:', startDate);
              console.log('Date object:', startDateObj);
              console.log('getMonth():', startDateObj.getMonth());
              console.log('getFullYear():', startDateObj.getFullYear());
              console.log('Month name:', startDateObj.toLocaleDateString('en-US', { month: 'long' }));
              console.log('Force update count:', forceUpdate);
            }}
            className="mt-2 px-3 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700"
          >
            Test State
          </button>
        </div>

        {/* Year Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {currentYear.map((month, index) => (
            <div
              key={month.month}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${selectedMonth === month.month
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              onClick={() => setSelectedMonth(selectedMonth === month.month ? null : month.month)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{month.name}</h3>
                <span className="text-sm text-gray-500">Month {month.month}</span>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  <strong>Topics:</strong> {month.topics.length}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Projects:</strong> {month.projects.length}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Assessments:</strong> {month.assessments.length}
                </div>
              </div>

              <div className="mt-3 flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    bulkScheduleMonth(month, yearNumber, index);
                  }}
                  className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                >
                  Schedule All
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Month Details */}
        {selectedMonth && (
          <div className="bg-gray-50 rounded-lg p-6">
            {(() => {
              const monthData = currentYear.find(m => m.month === selectedMonth);
              const scheduleData = generateScheduleForMonth(monthData, yearNumber, currentYear.findIndex(m => m.month === selectedMonth));

              return (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {monthData.name} - Month {monthData.month}
                    </h3>
                    <div className="text-sm text-gray-600">
                      {scheduleData.firstDay} to {scheduleData.lastDay}
                    </div>
                  </div>

                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Debug Info:</strong> Start Date: {startDate} | Year: {yearNumber} | Month Index: {currentYear.findIndex(m => m.month === selectedMonth)} | Calculated: {scheduleData.firstDay}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Topics */}
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <span className="text-blue-600 mr-2">📚</span>
                        Topics ({monthData.topics.length})
                      </h4>
                      <div className="space-y-3">
                        {monthData.topics.map((topic, index) => (
                          <div key={index} className="border-l-4 border-blue-500 pl-3">
                            <div className="font-medium text-gray-900">{topic.topic}</div>
                            <div className="text-sm text-gray-600">{topic.focus}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {topic.subtopics.slice(0, 3).join(', ')}
                              {topic.subtopics.length > 3 && '...'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Projects */}
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <span className="text-green-600 mr-2">🔬</span>
                        Projects ({monthData.projects.length})
                      </h4>
                      <div className="space-y-2">
                        {monthData.projects.map((project, index) => (
                          <div key={index} className="text-sm text-gray-700 bg-green-50 p-2 rounded">
                            {project}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Assessments */}
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <span className="text-purple-600 mr-2">📝</span>
                        Assessments ({monthData.assessments.length})
                      </h4>
                      <div className="space-y-2">
                        {monthData.assessments.map((assessment, index) => (
                          <div key={index} className="text-sm text-gray-700 bg-purple-50 p-2 rounded">
                            {assessment}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => bulkScheduleMonth(monthData, yearNumber, currentYear.findIndex(m => m.month === selectedMonth))}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Schedule All Topics for {monthData.name}
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Curriculum Progress Overview */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Curriculum Progress Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Year 1 Progress</h4>
            <div className="space-y-2">
              {twoYearCurriculum.year1.map((month, index) => {
                const scheduledCount = schedule.filter(item =>
                  month.topics.some(topic => topic.topic === item.topic)
                ).length;
                const totalCount = month.topics.length;
                const progress = totalCount > 0 ? (scheduledCount / totalCount) * 100 : 0;

                return (
                  <div key={month.month} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{month.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{scheduledCount}/{totalCount}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Year 2 Progress</h4>
            <div className="space-y-2">
              {twoYearCurriculum.year2.map((month, index) => {
                const scheduledCount = schedule.filter(item =>
                  month.topics.some(topic => topic.topic === item.topic)
                ).length;
                const totalCount = month.topics.length;
                const progress = totalCount > 0 ? (scheduledCount / totalCount) * 100 : 0;

                return (
                  <div key={month.month} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{month.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{scheduledCount}/{totalCount}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;