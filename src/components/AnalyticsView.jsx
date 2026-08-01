import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  Sparkles, 
  PieChart, 
  BarChart3, 
  Target,
  Zap
} from 'lucide-react';

export default function AnalyticsView({ tasks, lang }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const todo = tasks.filter(t => t.status === 'todo').length;

  const urgentCount = tasks.filter(t => t.priority === 'urgent').length;
  const highCount = tasks.filter(t => t.priority === 'high').length;
  const mediumCount = tasks.filter(t => t.priority === 'medium').length;
  const lowCount = tasks.filter(t => t.priority === 'low').length;

  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const t = {
    uz: {
      overview: "Boshqaruv va Statistika Paneli",
      subtitle: "Barcha vazifalaringiz bajarilishi hamda samaradorlik ko'rsatkichlari",
      completionRate: "Bajarilish Ko'rsatkichi",
      totalTasks: "Jami Vazifalar",
      completedTasks: "Bajarilgan",
      inProgressTasks: "Jarayonda",
      urgentTasks: "Shoshilinch",
      priorityBreakdown: "Ustuvorlik Bo'yicha Taqsimot",
      realtimeSyncHeading: "Real-Time Sync Holati",
      synced: "Barcha ma'lumotlar sinxronlangan (Local + Cloud Ready)",
      productivityScore: "Samaradorlik Balı",
      tipTitle: "Maslahat",
      tipText: "Vazifalarni kichik subtasklarga bo'lish ularni 40% tezroq bajarishga yordam beradi."
    },
    en: {
      overview: "Analytics & Stats Dashboard",
      subtitle: "Track your overall task completion and productivity performance",
      completionRate: "Completion Rate",
      totalTasks: "Total Tasks",
      completedTasks: "Completed",
      inProgressTasks: "In Progress",
      urgentTasks: "Urgent",
      priorityBreakdown: "Priority Breakdown",
      realtimeSyncHeading: "Real-Time Sync Status",
      synced: "All data synchronized (Local + Cloud Ready)",
      productivityScore: "Productivity Score",
      tipTitle: "Pro Tip",
      tipText: "Breaking tasks into smaller subtasks improves completion speed by 40%."
    }
  }[lang || 'uz'];

  return (
    <div className="space-y-8">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-purple-900/40 via-[#15102d] to-purple-950/40 border border-purple-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-6 top-6 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-300">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-wide">
            {t.overview}
          </h2>
        </div>
        <p className="text-slate-400 text-sm max-w-xl">
          {t.subtitle}
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Completion Rate */}
        <div className="bg-[#0e0c1f]/90 border border-purple-500/20 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
            <span>{t.completionRate}</span>
            <Target className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono mb-2">
            {rate}%
          </div>
          <div className="w-full bg-[#1b1638] h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-emerald-400 h-full transition-all duration-500" 
              style={{ width: `${rate}%` }}
            />
          </div>
        </div>

        {/* Card 2: Total Tasks */}
        <div className="bg-[#0e0c1f]/90 border border-purple-500/20 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
            <span>{t.totalTasks}</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono mb-1">
            {total}
          </div>
          <p className="text-xs text-slate-400">
            {todo} bajarilishi kutilmoqda
          </p>
        </div>

        {/* Card 3: Completed Tasks */}
        <div className="bg-[#0e0c1f]/90 border border-emerald-500/20 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
            <span>{t.completedTasks}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono mb-1">
            {completed}
          </div>
          <p className="text-xs text-slate-400">
            Muvaffaqiyatli yakunlandi
          </p>
        </div>

        {/* Card 4: Urgent Tasks */}
        <div className="bg-[#0e0c1f]/90 border border-rose-500/20 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
            <span>{t.urgentTasks}</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-extrabold text-rose-400 font-mono mb-1">
            {urgentCount}
          </div>
          <p className="text-xs text-slate-400">
            Diqqat talab etiladi
          </p>
        </div>
      </div>

      {/* Priority Breakdown & Sync Status Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Breakdown */}
        <div className="bg-[#0e0c1f]/90 border border-purple-500/20 rounded-2xl p-6 shadow-xl">
          <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-purple-400" />
            <span>{t.priorityBreakdown}</span>
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="text-rose-400 font-medium">Shoshilinch (Urgent)</span>
                <span className="font-mono">{urgentCount}</span>
              </div>
              <div className="w-full bg-[#191436] h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full" style={{ width: `${total ? (urgentCount/total)*100 : 0}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="text-amber-400 font-medium">Yuqori (High)</span>
                <span className="font-mono">{highCount}</span>
              </div>
              <div className="w-full bg-[#191436] h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full" style={{ width: `${total ? (highCount/total)*100 : 0}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="text-purple-300 font-medium">Oʻrtacha (Medium)</span>
                <span className="font-mono">{mediumCount}</span>
              </div>
              <div className="w-full bg-[#191436] h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full" style={{ width: `${total ? (mediumCount/total)*100 : 0}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="text-emerald-400 font-medium">Past (Low)</span>
                <span className="font-mono">{lowCount}</span>
              </div>
              <div className="w-full bg-[#191436] h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: `${total ? (lowCount/total)*100 : 0}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Sync & Tip */}
        <div className="space-y-6">
          <div className="bg-[#0e0c1f]/90 border border-purple-500/20 rounded-2xl p-6 shadow-xl relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_#34d399]" />
                <div className="absolute -inset-1 rounded-full border border-emerald-400/50 animate-ping" />
              </div>
              <h3 className="text-base font-semibold text-white">
                {t.realtimeSyncHeading}
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {t.synced}
            </p>
            <div className="bg-[#14102e] border border-purple-800/40 rounded-xl p-3 text-xs font-mono text-purple-300 flex items-center justify-between">
              <span>Status: ACTIVE</span>
              <span className="text-emerald-400">● SYNCED</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-slate-900/80 border border-purple-500/20 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4 text-purple-400" />
              <span>{t.tipTitle}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.tipText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
