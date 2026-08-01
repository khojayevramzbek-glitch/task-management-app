import React from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Trash2, 
  Edit3, 
  AlertCircle, 
  ListTodo, 
  Tag, 
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TaskCard({ task, onUpdateTask, onDeleteTask, onEditTask, lang }) {
  const isDone = task.status === 'completed';

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#8b5cf6', '#a855f7', '#bef264', '#ec4899']
    });
  };

  const handleToggleComplete = (e) => {
    e.stopPropagation();
    const newStatus = isDone ? 'todo' : 'completed';
    onUpdateTask({ ...task, status: newStatus });
    if (!isDone) {
      triggerConfetti();
    }
  };

  const handleSubtaskToggle = (subtaskId) => {
    const updatedSubtasks = (task.subtasks || []).map(st => 
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    );
    
    // Auto mark task complete if all subtasks are done
    const allDone = updatedSubtasks.length > 0 && updatedSubtasks.every(st => st.completed);
    const newStatus = allDone ? 'completed' : (task.status === 'completed' ? 'in-progress' : task.status);

    onUpdateTask({ 
      ...task, 
      subtasks: updatedSubtasks,
      status: newStatus
    });

    if (allDone && !isDone) {
      triggerConfetti();
    }
  };

  const priorityColors = {
    urgent: 'bg-rose-500/15 border-rose-500/40 text-rose-400',
    high: 'bg-amber-500/15 border-amber-500/40 text-amber-400',
    medium: 'bg-purple-500/15 border-purple-500/40 text-purple-300',
    low: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400',
  };

  const priorityLabels = {
    uz: { urgent: 'Shoshilinch', high: 'Yuqori', medium: 'Oʻrtacha', low: 'Past' },
    en: { urgent: 'Urgent', high: 'High', medium: 'Medium', low: 'Low' }
  }[lang || 'uz'];

  const completedSubtasksCount = (task.subtasks || []).filter(st => st.completed).length;
  const totalSubtasks = (task.subtasks || []).length;
  const progressPercent = totalSubtasks > 0 ? Math.round((completedSubtasksCount / totalSubtasks) * 100) : (isDone ? 100 : 0);

  return (
    <div 
      className={`group relative bg-[#0f0c20]/80 backdrop-blur-md border ${isDone ? 'border-purple-900/40 opacity-75' : 'border-purple-500/20 hover:border-purple-500/50'} rounded-2xl p-5 shadow-xl transition-all duration-200 hover:shadow-purple-950/40`}
    >
      {/* Top row: Priority badge + Quick status toggle + Menu actions */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          {/* Priority pill */}
          <span className={`px-2.5 py-0.5 rounded-full border font-mono text-xs font-semibold ${priorityColors[task.priority] || priorityColors.medium}`}>
            {priorityLabels[task.priority] || task.priority}
          </span>

          {/* Tech/Category tag if present */}
          {task.category && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#1c1736] border border-[#342b61] font-mono text-xs text-purple-300">
              #{task.category}
            </span>
          )}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEditTask(task)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-purple-300 hover:bg-purple-900/30 transition-colors"
            title="Tahrirlash"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDeleteTask(task.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-900/30 transition-colors"
            title="O'chirish"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Task Main Content: Checkbox + Title */}
      <div className="flex items-start gap-3 mb-2">
        <button 
          onClick={handleToggleComplete}
          className="mt-1 flex-shrink-0 text-purple-400 hover:text-purple-300 transition-transform active:scale-90"
        >
          {isDone ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
          ) : (
            <Circle className="w-5 h-5 text-purple-400/60 hover:text-purple-400" />
          )}
        </button>

        <div className="flex-1">
          <h3 className={`text-base font-semibold leading-snug ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          )}
        </div>
      </div>

      {/* Subtasks Checklist */}
      {totalSubtasks > 0 && (
        <div className="mt-4 pt-3 border-t border-purple-900/30">
          <div className="flex items-center justify-between text-xs text-purple-300 mb-2">
            <span className="flex items-center gap-1">
              <ListTodo className="w-3.5 h-3.5 text-purple-400" />
              <span>Subtasklar ({completedSubtasksCount}/{totalSubtasks})</span>
            </span>
            <span className="font-mono text-purple-400">{progressPercent}%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#181333] h-1.5 rounded-full overflow-hidden mb-3">
            <div 
              className="bg-gradient-to-r from-purple-600 to-emerald-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="space-y-1.5">
            {task.subtasks.map((st) => (
              <div 
                key={st.id} 
                onClick={() => handleSubtaskToggle(st.id)}
                className="flex items-center gap-2 text-xs text-slate-300 hover:text-white cursor-pointer py-0.5 group/st"
              >
                <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${st.completed ? 'bg-purple-600 border-purple-500 text-white' : 'border-purple-500/40 group-hover/st:border-purple-400'}`}>
                  {st.completed && <CheckCircle2 className="w-3 h-3" />}
                </div>
                <span className={st.completed ? 'line-through text-slate-500' : ''}>
                  {st.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Footer: Due date & status change dropdown */}
      <div className="mt-4 pt-3 border-t border-purple-900/20 flex items-center justify-between text-xs text-slate-400">
        {task.dueDate ? (
          <span className="flex items-center gap-1 text-purple-300/80 font-mono">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>{task.dueDate}</span>
          </span>
        ) : (
          <span className="text-slate-600 italic">Muddat yo'q</span>
        )}

        {/* Status switcher */}
        <select 
          value={task.status}
          onChange={(e) => onUpdateTask({ ...task, status: e.target.value })}
          className="bg-[#171333] text-purple-200 border border-purple-800/50 rounded-md px-2 py-1 font-mono text-xs focus:outline-none focus:border-purple-500"
        >
          <option value="todo">Bajarilishi kerak</option>
          <option value="in-progress">Jarayonda</option>
          <option value="completed">Bajarildi</option>
        </select>
      </div>
    </div>
  );
}
