import React from 'react';
import TaskCard from './TaskCard';
import { Plus, ListTodo, Clock, CheckCircle2 } from 'lucide-react';

export default function KanbanBoard({ tasks, onUpdateTask, onDeleteTask, onEditTask, onAddTask, lang }) {
  const columns = [
    {
      id: 'todo',
      title: lang === 'en' ? 'To Do' : 'Bajarilishi Kerak',
      icon: ListTodo,
      color: 'from-purple-500/20 to-purple-900/10 border-purple-500/30',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      count: tasks.filter(t => t.status === 'todo').length,
    },
    {
      id: 'in-progress',
      title: lang === 'en' ? 'In Progress' : 'Jarayonda',
      icon: Clock,
      color: 'from-amber-500/20 to-amber-900/10 border-amber-500/30',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      count: tasks.filter(t => t.status === 'in-progress').length,
    },
    {
      id: 'completed',
      title: lang === 'en' ? 'Completed' : 'Bajarildi',
      icon: CheckCircle2,
      color: 'from-emerald-500/20 to-emerald-900/10 border-emerald-500/30',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      count: tasks.filter(t => t.status === 'completed').length,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((col) => {
        const ColumnIcon = col.icon;
        const colTasks = tasks.filter(t => t.status === col.id);

        return (
          <div 
            key={col.id}
            className={`bg-[#0b0917]/90 border ${col.color} rounded-2xl p-4 flex flex-col min-h-[500px] shadow-lg`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-purple-900/20">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-800/40">
                  <ColumnIcon className="w-4 h-4 text-purple-300" />
                </div>
                <h3 className="font-semibold text-white text-base">
                  {col.title}
                </h3>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full border font-mono text-xs font-bold ${col.badgeColor}`}>
                {col.count}
              </span>
            </div>

            {/* Quick add button inside column */}
            <button
              onClick={() => onAddTask(col.id)}
              className="w-full py-2.5 mb-4 rounded-xl border border-dashed border-purple-700/40 hover:border-purple-500 text-purple-300 hover:bg-purple-900/20 text-xs font-medium flex items-center justify-center gap-2 transition-all group"
            >
              <Plus className="w-4 h-4 text-purple-400 group-hover:rotate-90 transition-transform" />
              <span>{lang === 'en' ? 'Add Task' : 'Vazifa Qo\'shish'}</span>
            </button>

            {/* Tasks list */}
            <div className="flex-1 space-y-4 overflow-y-auto max-h-[700px] pr-1">
              {colTasks.length === 0 ? (
                <div className="h-40 border border-dashed border-purple-900/30 rounded-xl flex items-center justify-center text-xs text-slate-500 italic">
                  {lang === 'en' ? 'No tasks here' : 'Vazifa mavjud emas'}
                </div>
              ) : (
                colTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onUpdateTask={onUpdateTask}
                    onDeleteTask={onDeleteTask}
                    onEditTask={onEditTask}
                    lang={lang}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
