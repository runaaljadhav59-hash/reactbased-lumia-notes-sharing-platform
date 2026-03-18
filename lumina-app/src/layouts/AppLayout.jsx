import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Compass, BookMarked, Search, Command, 
  Plus, Bell, Sparkles, Library, Users, 
  Settings, FolderOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { currentUser } from '@/lib/mockData';

function TopHeader() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 lg:px-10 bg-zinc-950/80 backdrop-blur-2xl border-b border-white/[0.05] shadow-sm shadow-black/20">
      {/* Search Bar */}
      <div className="flex-1 max-w-2xl">
        <button className="w-full h-9 flex items-center justify-between gap-3 px-3 bg-[#111113] hover:bg-[#18181b] border border-[#27272a] hover:border-zinc-600 rounded-lg transition-all duration-200 text-zinc-400 group shadow-inner">
          <div className="flex items-center gap-2.5">
            <Search size={15} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            <span className="text-[13px] font-medium tracking-wide text-zinc-500 group-hover:text-zinc-300">Search knowledge base, tags, or authors...</span>
          </div>
          <div className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#1f1f22] border border-[#27272a] text-[10px] text-zinc-400 font-mono shadow-sm">
            <Command size={10} />
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-5 ml-6">
        
        {/* Live Users Pill (Subtle, professional) */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
           <span className="relative flex h-1.5 w-1.5">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
           </span>
           <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide">1,402 Online</span>
        </div>

        <button className="relative text-zinc-400 hover:text-white transition-colors focus:outline-none">
          <Bell size={18} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-violet-500 ring-[2.5px] ring-zinc-950" />
        </button>
        
        <button className="hidden sm:flex items-center gap-1.5 px-4 h-9 bg-white hover:bg-zinc-200 text-zinc-950 text-[13px] font-bold rounded-lg shadow-lg shadow-white/5 transition-all active:scale-95">
          <Plus size={15} />
          <span>Create</span>
        </button>

        <div className="w-px h-5 bg-zinc-800" />

        <button className="flex items-center gap-2 focus:outline-none group">
          <div className="relative">
            <img src={currentUser.avatar} alt="Avatar" className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 group-hover:border-violet-500/50 transition-colors shadow-sm" />
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
          </div>
        </button>
      </div>
    </header>
  );
}

function SidebarLink({ icon: Icon, label, to, badge }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center justify-between px-3 h-9 rounded-lg font-medium text-[13px] transition-all duration-200 group relative',
          isActive
            ? 'text-white bg-[#1f1f22] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] border border-[#27272a]'
            : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#18181b]'
        )
      }
    >
      {({ isActive }) => (
        <>
          <div className="flex items-center gap-3">
            <Icon size={16} className={cn('transition-colors', isActive ? 'text-violet-400' : 'text-zinc-500 group-hover:text-zinc-300')} />
            <span>{label}</span>
          </div>
          {badge && (
            <span className={cn('text-[10px] px-1.5 py-0.5 rounded font-bold transition-colors', isActive ? 'bg-violet-500/20 text-violet-300' : 'bg-[#27272a] text-zinc-400 group-hover:text-zinc-300')}>
              {badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

function FoldersList() {
  const folders = [
    { name: 'University Notes', icon: FolderOpen, color: 'text-zinc-500 group-hover:text-violet-400' },
    { name: 'System Design', icon: FolderOpen, color: 'text-zinc-500 group-hover:text-emerald-400' },
    { name: 'Personal Drafts', icon: FolderOpen, color: 'text-zinc-500 group-hover:text-cyan-400' },
  ];

  return (
    <div className="mt-8">
      <div className="px-3 mb-2 flex items-center justify-between text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
        <span>Notebooks</span>
        <button className="hover:text-zinc-300 transition-colors p-0.5 rounded-md hover:bg-zinc-800"><Plus size={14} /></button>
      </div>
      <div className="flex flex-col gap-0.5">
        {folders.map((f, i) => (
          <button key={i} className="flex items-center gap-3 px-3 h-8 text-[13px] font-medium text-zinc-400 hover:text-zinc-200 hover:bg-[#18181b] rounded-lg transition-colors group w-full text-left">
            <f.icon size={15} className={cn("transition-colors", f.color)} />
            <span className="truncate">{f.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AppLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#09090b] text-zinc-50 selection:bg-violet-500/30 font-sans overflow-hidden">
      
      {/* Precision Left Sidebar */}
      <aside className="w-[260px] flex-shrink-0 flex flex-col bg-[#0f0f11] border-r border-[#18181b] z-40">
        <div className="h-16 flex items-center px-6 border-b border-[#18181b]">
          <NavLink to="/dashboard" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-7 h-7 rounded-[6px] bg-gradient-to-b from-white to-zinc-300 shadow-md">
              <Sparkles size={14} className="text-zinc-950" />
            </div>
            <span className="font-bold text-[17px] tracking-tight text-white">
              Lumina
            </span>
          </NavLink>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-6 scrollbar-none">
          <nav className="flex flex-col gap-0.5">
            <SidebarLink icon={Home} label="Home & Feed" to="/dashboard" />
            <SidebarLink icon={Compass} label="Discover" to="/explore" badge="New" />
            <SidebarLink icon={Library} label="My Collection" to="/collection" />
            <SidebarLink icon={BookMarked} label="Reading List" to="/bookmarks" badge="12" />
            <SidebarLink icon={Users} label="Study Groups" to="/groups" />
          </nav>

          <FoldersList />

          <div className="mt-8">
            <div className="px-3 mb-3 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
              Popular Tags
            </div>
            <div className="flex flex-wrap gap-1.5 px-3">
              {['#React', '#SystemDesign', '#Rust', '#Algorithms'].map((tag) => (
                <span key={tag} className="text-[11px] font-bold text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer px-2.5 py-1 rounded-md transition-colors border border-transparent hover:border-zinc-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-[#18181b]">
           <button className="flex items-center gap-3 w-full px-3 h-9 text-[13px] font-medium text-zinc-400 hover:text-zinc-200 hover:bg-[#18181b] rounded-lg transition-colors group">
              <Settings size={16} className="text-zinc-500 group-hover:text-zinc-400 transition-colors" />
              <span>Settings</span>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#09090b]">
        <TopHeader />

        {/* Global smooth scroller */}
        <main className="flex-1 overflow-y-auto w-full scroll-smooth scrollbar-thin scrollbar-thumb-zinc-800 hover:scrollbar-thumb-zinc-700 scrollbar-track-transparent">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
