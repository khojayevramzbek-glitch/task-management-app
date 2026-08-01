import React, { useState, useEffect } from 'react';
import ProjectShowcaseCard from './components/ProjectShowcaseCard';
import TaskCard from './components/TaskCard';
import KanbanBoard from './components/KanbanBoard';
import AnalyticsView from './components/AnalyticsView';
import TaskModal from './components/TaskModal';
import { 
  Plus, 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  BarChart3, 
  Sparkles, 
  Globe, 
  RefreshCw,
  Github,
  Zap,
  CheckCircle2
} from 'lucide-react';

const INITIAL_TASKS = [
  {
    id: '1',
    title: 'Next.js va Firebase bilan Real-Time Sync sozlash',
    description: 'Foydalanuvchi ma\'lumotlarini zudlik bilan bulut bilan sinxronlashtirish va Firestore listener-larni ulash.',
    status: 'in-progress',
    priority: 'urgent',
    category: 'Firebase',
    dueDate: '2026-08-05',
    subtasks: [
      { id: 'st1', text: 'Firebase Config faylini sozlash', completed: true },
      { id: 'st2', text: 'Realtime database listener ulash', completed: true },
      { id: 'st3', text: 'Offline cache sinxronizatsiyasi', completed: false }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Zamonaviy UI/UX Glassmorphism dizayni',
    description: 'To\'q binafsha rangli (dark neon theme) va yaltiroq indikatorli kartalar dizaynini tayyorlash.',
    status: 'completed',
    priority: 'high',
    category: 'Tailwind',
    dueDate: '2026-08-02',
    subtasks: [
      { id: 'st4', text: 'Color Palette va CSS variables belgilash', completed: true },
      { id: 'st5', text: 'Hover va Pulse animatsiyalarini qo\'shish', completed: true }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'React State va Task CRUD operatsiyalari',
    description: 'Vazifalarni yaratish, tahrirlash, o\'chirish va filtr funksiyalarini to\'liq sinovdan o\'tkazish.',
    status: 'todo',
    priority: 'medium',
    category: 'React',
    dueDate: '2026-08-10',
    subtasks: [
      { id: 'st6', text: 'Modal oynasi validatsiyasi', completed: false },
      { id: 'st7', text: 'LocalStorage saqlash mexanizmi', completed: true }
    ],
    createdAt: new Date().toISOString()
  }
];

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('task_app_tasks_v2');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [activeTab, setActiveTab] = useState('kanban'); // 'kanban', 'list', 'analytics', 'card'
  const [lang, setLang] = useState('uz'); // 'uz' | 'en'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [defaultModalStatus, setDefaultModalStatus] = useState('todo');

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncToast, setSyncToast] = useState(false);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('task_app_tasks_v2', JSON.stringify(tasks));
  }, [tasks]);

  // Simulate real-time sync
  const triggerManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncToast(true);
      setTimeout(() => setSyncToast(false), 3000);
    }, 1200);
  };

  // Task Operations
  const handleSaveTask = (savedTask) => {
    if (taskToEdit) {
      setTasks(tasks.map(t => t.id === savedTask.id ? savedTask : t));
    } else {
      setTasks([savedTask, ...tasks]);
    }
    triggerManualSync();
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    triggerManualSync();
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    triggerManualSync();
  };

  const handleOpenAddModal = (status = 'todo') => {
    setTaskToEdit(null);
    setDefaultModalStatus(status);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  // Filter tasks
  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'all' || t.priority === filterPriority;
    const matchesCategory = filterCategory === 'all' || t.category === filterCategory;

    return matchesSearch && matchesPriority && matchesCategory;
  });

  const categories = Array.from(new Set(tasks.map(t => t.category).filter(Boolean)));

  const t = {
    uz: {
      appName: "Task Management App",
      badge: "Real-time sync",
      searchPlaceholder: "Vazifalardan qidirish...",
      tabKanban: "Kanban Taxtasi",
      tabList: "Ro'yxat",
      tabAnalytics: "Statistika",
      tabCardShowcase: "Loyiha Kartasi (02)",
      addTask: "Yangi Vazifa",
      allPriorities: "Barcha ustuvorliklar",
      allCategories: "Barcha teglar",
      noTasksFound: "Mos keluvchi vazifalar topilmadi",
      clearSearch: "Qidiruvni tozalash",
      syncMessage: "Bulut bilan real-vaqtda sinxronlashtirildi!"
    },
    en: {
      appName: "Task Management App",
      badge: "Real-time sync",
      searchPlaceholder: "Search tasks...",
      tabKanban: "Kanban Board",
      tabList: "List View",
      tabAnalytics: "Analytics",
      tabCardShowcase: "Project Card (02)",
      addTask: "New Task",
      allPriorities: "All Priorities",
      allCategories: "All Tags",
      noTasksFound: "No matching tasks found",
      clearSearch: "Clear Search",
      syncMessage: "Real-time synchronized with cloud!"
    }
  }[lang];

  return (
    <div className="min-h-screen flex flex-col pb-16">
      {/* Top Banner & Header */}
      <header className="sticky top-0 z-40 bg-[#080612]/90 backdrop-blur-xl border-b border-purple-900/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo & Sync Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-900/50">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span>{t.appName}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-900/50 border border-purple-600/40 text-purple-300 font-mono">
                    v2.0
                  </span>
                </h1>
                <p className="text-xs text-purple-400/80 font-mono flex items-center gap-1.5 mt-0.5">
                  <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                  <span>{isSyncing ? 'Sinxronlanmoqda...' : t.badge}</span>
                </p>
              </div>
            </div>

            {/* Language switch button (mobile view) */}
            <div className="md:hidden flex items-center gap-2">
              <button 
                onClick={() => setLang(lang === 'uz' ? 'en' : 'uz')}
                className="px-2.5 py-1 rounded-lg bg-[#181333] border border-purple-800/40 text-xs font-mono text-purple-300 flex items-center gap-1"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang.toUpperCase()}</span>
              </button>
            </div>
          </div>

          {/* Search Bar & Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px] sm:min-w-[280px]">
              <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-[#120f28] border border-purple-800/40 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Manual Sync Trigger */}
            <button
              onClick={triggerManualSync}
              className="p-2 rounded-xl bg-[#14102d] border border-purple-800/40 text-purple-300 hover:text-white hover:border-purple-500 transition-all active:scale-95"
              title="Real-time Sync trigger"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-purple-400' : ''}`} />
            </button>

            {/* Language Switcher */}
            <button 
              onClick={() => setLang(lang === 'uz' ? 'en' : 'uz')}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#14102d] border border-purple-800/40 text-xs font-mono text-purple-300 hover:border-purple-500 transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <span>{lang === 'uz' ? "O'zbekcha" : 'English'}</span>
            </button>

            {/* Primary Add Task Button */}
            <button
              onClick={() => handleOpenAddModal('todo')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-purple-900/40 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>{t.addTask}</span>
            </button>
          </div>
        </div>

        {/* View Tabs Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between overflow-x-auto border-t border-purple-900/20 py-2">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('kanban')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ${activeTab === 'kanban' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-purple-300 hover:bg-purple-950/40'}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{t.tabKanban}</span>
            </button>

            <button
              onClick={() => setActiveTab('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ${activeTab === 'list' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-purple-300 hover:bg-purple-950/40'}`}
            >
              <List className="w-3.5 h-3.5" />
              <span>{t.tabList}</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ${activeTab === 'analytics' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-purple-300 hover:bg-purple-950/40'}`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{t.tabAnalytics}</span>
            </button>

            <button
              onClick={() => setActiveTab('card')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all border border-purple-500/30 ${activeTab === 'card' ? 'bg-purple-950 text-purple-200 border-purple-500 shadow-md' : 'text-purple-300 hover:bg-purple-900/30'}`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>{t.tabCardShowcase}</span>
            </button>
          </div>

          {/* Priority & Category Dropdown Filters */}
          <div className="hidden sm:flex items-center gap-2">
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="bg-[#120f28] border border-purple-800/40 rounded-lg px-2.5 py-1 text-xs text-purple-300 focus:outline-none"
            >
              <option value="all">{t.allPriorities}</option>
              <option value="urgent">🔴 Urgent</option>
              <option value="high">🟠 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>

            {categories.length > 0 && (
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-[#120f28] border border-purple-800/40 rounded-lg px-2.5 py-1 text-xs text-purple-300 focus:outline-none"
              >
                <option value="all">{t.allCategories}</option>
                {categories.map((c, i) => (
                  <option key={i} value={c}>#{c}</option>
                ))}
              </select>
            )}
          </div>
        </div>
      </header>

      {/* Real-time Sync Toast Notification */}
      {syncToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-purple-900/90 border border-purple-500 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-medium">{t.syncMessage}</span>
        </div>
      )}

      {/* Main App Workspace Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 flex-1 w-full">
        {/* Tab 1: Kanban Board View */}
        {activeTab === 'kanban' && (
          <KanbanBoard
            tasks={filteredTasks}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleOpenEditModal}
            onAddTask={handleOpenAddModal}
            lang={lang}
          />
        )}

        {/* Tab 2: List View */}
        {activeTab === 'list' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-16 bg-[#0f0c20]/60 border border-dashed border-purple-900/30 rounded-2xl">
                <p className="text-slate-400 text-sm mb-4">{t.noTasksFound}</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-xl bg-purple-900/40 border border-purple-700/40 text-purple-300 text-xs font-medium"
                >
                  {t.clearSearch}
                </button>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={handleOpenEditModal}
                  lang={lang}
                />
              ))
            )}
          </div>
        )}

        {/* Tab 3: Analytics View */}
        {activeTab === 'analytics' && (
          <AnalyticsView tasks={tasks} lang={lang} />
        )}

        {/* Tab 4: Showcase Card matching exact screenshot */}
        {activeTab === 'card' && (
          <div className="py-6 flex flex-col items-center justify-center">
            <ProjectShowcaseCard
              lang={lang}
              onLaunchApp={() => setActiveTab('kanban')}
            />
          </div>
        )}
      </main>

      {/* Task Edit / Create Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
        defaultStatus={defaultModalStatus}
        lang={lang}
      />
    </div>
  );
}
