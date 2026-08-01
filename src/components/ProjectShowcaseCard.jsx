import React, { useState } from 'react';
import { Github, ExternalLink, Sparkles, CheckCircle2, RefreshCw, Zap } from 'lucide-react';

export default function ProjectShowcaseCard({ onLaunchApp, lang }) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const t = {
    uz: {
      number: "02",
      title: "Task Management App",
      description: "Kundalik vazifalarni yaratish, tahrirlash va boshqarish imkonini beruvchi veb-ilova. Zamonaviy UI/UX va real-time sync.",
      tags: ["Next.js", "React", "Tailwind", "Firebase"],
      githubBtn: "View on GitHub",
      launchBtn: "Ilovani Ochish",
      syncStatus: "Real-time sync faol",
      feature1: "Zamonaviy UI/UX dizayn",
      feature2: "Kanban & Ro'yxat ko'rinishlari",
      feature3: "Bajarilish statistikasi",
    },
    en: {
      number: "02",
      title: "Task Management App",
      description: "Web application allowing creating, editing, and managing daily tasks. Modern UI/UX and real-time sync.",
      tags: ["Next.js", "React", "Tailwind", "Firebase"],
      githubBtn: "View on GitHub",
      launchBtn: "Launch App",
      syncStatus: "Real-time sync active",
      feature1: "Modern UI/UX design",
      feature2: "Kanban & List views",
      feature3: "Completion statistics",
    }
  }[lang || 'uz'];

  return (
    <div className="w-full max-w-xl mx-auto p-2">
      {/* Visual replica of the exact card from the image */}
      <div 
        className="relative bg-[#0d0b18] border border-[#2b244d] hover:border-[#8b5cf6]/50 rounded-[28px] p-8 sm:p-10 shadow-2xl transition-all duration-300 group overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow overlay effect on hover */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl group-hover:bg-purple-600/20 transition-all duration-500 pointer-events-none" />
        
        {/* Header row: Number on left, Circle badge with dot on right */}
        <div className="flex items-start justify-between mb-8">
          <span className="font-mono text-[#5c5480] text-lg font-semibold tracking-wider">
            {t.number}
          </span>

          {/* Top-right glowing circle badge from the image */}
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#48377d] bg-[#16122d] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105">
              <div className="w-2.5 h-2.5 rounded-full bg-[#bef264] shadow-[0_0_12px_2px_#bef264]" />
            </div>
            {/* Soft pulsing outer aura */}
            <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-ping opacity-30 pointer-events-none" />
          </div>
        </div>

        {/* Card Title */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
          {t.title}
        </h2>

        {/* Card Description */}
        <p className="text-[#a199c7] text-base sm:text-lg leading-relaxed mb-8 max-w-md font-normal">
          {t.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {t.tags.map((tag, i) => (
            <span 
              key={i}
              className="px-4 py-1.5 rounded-full bg-[#181432] border border-[#2e2759] text-[#d6cefc] font-mono text-sm font-medium tracking-wide shadow-sm hover:border-[#8b5cf6] transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {/* GitHub / Demo Link Button matching the purple pill button in screenshot */}
          <button
            onClick={() => onLaunchApp && onLaunchApp()}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#351e6d] hover:bg-[#482894] border border-[#5d35bc] text-white font-medium text-sm sm:text-base shadow-lg shadow-purple-950/50 hover:shadow-purple-700/30 transition-all duration-200 active:scale-95 group/btn"
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5 text-purple-200 group-hover/btn:rotate-12 transition-transform" />
            <span>{t.githubBtn} ↗</span>
          </button>

          {/* Interactive Live Demo Trigger */}
          <button
            onClick={() => onLaunchApp && onLaunchApp()}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#1c183a] hover:bg-[#282252] border border-[#3b3273] text-purple-300 font-medium text-sm sm:text-base transition-colors"
          >
            <Zap className="w-4 h-4 text-purple-400 fill-purple-400/20" />
            <span>{t.launchBtn}</span>
          </button>
        </div>

        {/* Interactive Feature Checklist at the bottom */}
        <div className="mt-8 pt-6 border-t border-[#1e193e] flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#7d73ac]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
            <span>{t.feature1}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
            <span>{t.feature2}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>{t.feature3}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
