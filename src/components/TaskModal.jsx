import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, ListTodo, Calendar, Tag, AlertCircle } from 'lucide-react';

export default function TaskModal({ isOpen, onClose, onSave, taskToEdit, defaultStatus = 'todo', lang }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(defaultStatus);
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('React');
  const [dueDate, setDueDate] = useState('');
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtaskText, setNewSubtaskText] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || '');
      setDescription(taskToEdit.description || '');
      setStatus(taskToEdit.status || 'todo');
      setPriority(taskToEdit.priority || 'medium');
      setCategory(taskToEdit.category || 'React');
      setDueDate(taskToEdit.dueDate || '');
      setSubtasks(taskToEdit.subtasks || []);
    } else {
      setTitle('');
      setDescription('');
      setStatus(defaultStatus);
      setPriority('medium');
      setCategory('React');
      setDueDate(new Date().toISOString().split('T')[0]);
      setSubtasks([]);
    }
  }, [taskToEdit, defaultStatus, isOpen]);

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!newSubtaskText.trim()) return;
    setSubtasks([...subtasks, { id: Date.now().toString(), text: newSubtaskText.trim(), completed: false }]);
    setNewSubtaskText('');
  };

  const handleRemoveSubtask = (id) => {
    setSubtasks(subtasks.filter(st => st.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: taskToEdit ? taskToEdit.id : Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      category: category.trim(),
      dueDate,
      subtasks,
      createdAt: taskToEdit ? taskToEdit.createdAt : new Date().toISOString(),
    });

    onClose();
  };

  const t = {
    uz: {
      titleAdd: "Yangi Vazifa Yaratish",
      titleEdit: "Vazifani Tahrirlash",
      labelTitle: "Vazifa nomi",
      placeholderTitle: "Masalan: Next.js va Firebase bilan sinxronizatsiyani sozlash",
      labelDesc: "Tavsif / Izoh",
      placeholderDesc: "Vazifa bo'yicha batafsil ma'lumotlar...",
      labelStatus: "Holati",
      labelPriority: "Ustuvorlik",
      labelCategory: "Teg / Texnologiya",
      labelDueDate: "Bajarish muddati",
      labelSubtasks: "Subtasklar (Ichki vazifalar)",
      addSubtaskBtn: "Qo'shish",
      placeholderSubtask: "Yangi subtask qo'shing...",
      saveBtn: taskToEdit ? "Saqlash" : "Yaratish",
      cancelBtn: "Bekor qilish"
    },
    en: {
      titleAdd: "Create New Task",
      titleEdit: "Edit Task",
      labelTitle: "Task Title",
      placeholderTitle: "e.g. Configure Next.js and Firebase sync",
      labelDesc: "Description",
      placeholderDesc: "Detailed task notes...",
      labelStatus: "Status",
      labelPriority: "Priority",
      labelCategory: "Tag / Tech",
      labelDueDate: "Due Date",
      labelSubtasks: "Subtasks Checklist",
      addSubtaskBtn: "Add",
      placeholderSubtask: "Add subtask...",
      saveBtn: taskToEdit ? "Save Changes" : "Create Task",
      cancelBtn: "Cancel"
    }
  }[lang || 'uz'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0e0b1c] border border-purple-500/30 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-purple-900/30 flex items-center justify-between bg-[#130f26]">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ListTodo className="w-5 h-5 text-purple-400" />
            <span>{taskToEdit ? t.titleEdit : t.titleAdd}</span>
          </h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-purple-900/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-purple-300 uppercase tracking-wider mb-1.5">
              {t.labelTitle} *
            </label>
            <input 
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.placeholderTitle}
              className="w-full bg-[#16122d] border border-purple-800/40 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-purple-300 uppercase tracking-wider mb-1.5">
              {t.labelDesc}
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.placeholderDesc}
              className="w-full bg-[#16122d] border border-purple-800/40 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm resize-none"
            />
          </div>

          {/* Status & Priority Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-purple-300 uppercase tracking-wider mb-1.5">
                {t.labelStatus}
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#16122d] border border-purple-800/40 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="todo">Bajarilishi kerak</option>
                <option value="in-progress">Jarayonda</option>
                <option value="completed">Bajarildi</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-purple-300 uppercase tracking-wider mb-1.5">
                {t.labelPriority}
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-[#16122d] border border-purple-800/40 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="urgent">🔴 Urgent (Shoshilinch)</option>
                <option value="high">🟠 High (Yuqori)</option>
                <option value="medium">🟡 Medium (Oʻrtacha)</option>
                <option value="low">🟢 Low (Past)</option>
              </select>
            </div>
          </div>

          {/* Category Tag & Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-purple-300 uppercase tracking-wider mb-1.5">
                {t.labelCategory}
              </label>
              <input 
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Next.js, React, Firebase..."
                className="w-full bg-[#16122d] border border-purple-800/40 rounded-xl px-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-purple-300 uppercase tracking-wider mb-1.5">
                {t.labelDueDate}
              </label>
              <input 
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-[#16122d] border border-purple-800/40 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Subtasks Section */}
          <div className="pt-2">
            <label className="block text-xs font-semibold text-purple-300 uppercase tracking-wider mb-1.5">
              {t.labelSubtasks}
            </label>

            {/* Input + Button */}
            <div className="flex gap-2 mb-3">
              <input 
                type="text"
                value={newSubtaskText}
                onChange={(e) => setNewSubtaskText(e.target.value)}
                placeholder={t.placeholderSubtask}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSubtask(e); } }}
                className="flex-1 bg-[#16122d] border border-purple-800/40 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-xs"
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                className="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs rounded-xl transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.addSubtaskBtn}</span>
              </button>
            </div>

            {/* Subtasks List */}
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {subtasks.map((st) => (
                <div key={st.id} className="flex items-center justify-between bg-[#15102a] border border-purple-900/30 rounded-lg px-3 py-1.5 text-xs text-slate-200">
                  <span>{st.text}</span>
                  <button 
                    type="button"
                    onClick={() => handleRemoveSubtask(st.id)}
                    className="text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-purple-900/30 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-purple-800/40 text-slate-300 hover:bg-purple-900/20 text-xs font-medium transition-colors"
            >
              {t.cancelBtn}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-900/40 transition-colors"
            >
              {t.saveBtn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
