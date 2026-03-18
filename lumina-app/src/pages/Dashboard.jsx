import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, Target, Zap, Clock, TrendingUp, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import { useNotesStore } from '../store/useNotesStore';
import { getFromLocalStorage } from '../services/localStorage';

function getGreeting(name) {
  const hour = new Date().getHours();
  if (hour < 5) return `Burning the midnight oil, ${name}`;
  if (hour < 12) return `Good morning, ${name}`;
  if (hour < 17) return `Good afternoon, ${name}`;
  if (hour < 21) return `Good evening, ${name}`;
  return `Good night, ${name}`;
}

export default function Dashboard() {
  const { notes, currentUser } = useNotesStore();
  
  // Computed Data from Global Store
  const yours = notes.filter(n => n.authorId === currentUser.id).sort((a, b) => b.createdAt - a.createdAt);
  const totalUpvotes = yours.reduce((sum, current) => sum + current.upvotes, 0);

  // Trending (Top upvoted across network)
  const trending = [...notes].sort((a, b) => b.upvotes - a.upvotes).slice(0, 3);

  // Recently Viewed (from locastorage simple tracking)
  const recentIds = getFromLocalStorage('RECENTLY_VIEWED') || [];
  const recent = recentIds.map(id => notes.find(n => n.id === id)).filter(Boolean).slice(0, 3);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, scale: 0.98 }}
      className="p-6 lg:p-10 max-w-[1400px] mx-auto min-h-full"
    >
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            {getGreeting(currentUser?.name || '')}
          </h1>
          <p className="text-[15px] font-medium text-zinc-400 max-w-xl leading-relaxed">
            Welcome to your command center. Access your drafts, create new knowledge, or review trending engineering insights.
          </p>
        </div>
        <Link 
          to="/create-note"
          className="flex items-center gap-2 h-11 px-8 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-[14px] font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all active:scale-95 whitespace-nowrap"
        >
          <PenTool size={16} /> Create Note
        </Link>
      </div>

      {/* Quick Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
        <div className="bg-[#0f0f11] border border-[#18181b] rounded-[20px] p-6 shadow-sm flex flex-col">
           <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 border border-emerald-500/20">
              <Zap size={16} className="text-emerald-400" />
           </div>
           <p className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Total Notes</p>
           <p className="text-2xl font-bold text-white tabular-nums">{yours.length > 0 ? yours.length : currentUser?.totalNotes}</p>
        </div>
        
        <div className="bg-[#0f0f11] border border-[#18181b] rounded-[20px] p-6 shadow-sm flex flex-col">
           <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4 border border-violet-500/20">
              <Target size={16} className="text-violet-400" />
           </div>
           <p className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Total Upvotes</p>
           <p className="text-2xl font-bold text-white tabular-nums">{totalUpvotes > 0 ? totalUpvotes : '—'}</p>
        </div>

        <Link to="/explore" className="lg:col-span-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[20px] p-8 flex flex-col justify-center relative overflow-hidden group shadow-xl shadow-indigo-500/10">
           <div className="absolute right-[-10%] top-[-50%] w-48 h-48 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
           <p className="text-white font-black text-[28px] mb-2 relative z-10 leading-tight">Explore the Lumina <br /> Knowledge Network</p>
           <p className="text-indigo-100 text-[14px] relative z-10 font-bold tracking-wide">Browse completely open-source engineering notes.</p>
        </Link>
      </div>

      <div className="flex flex-col gap-14">
         
         {/* Your Notes */}
         <section>
            <div className="flex items-center gap-3 mb-6 border-b border-[#18181b] pb-4">
              <BookOpen size={18} className="text-violet-400" />
              <h2 className="text-xl font-bold text-white">Your Notes</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                 {yours.slice(0, 3).map(note => <div key={note.id} className="h-full"><NoteCard note={note} /></div>)}
                 {yours.length === 0 && (
                    <div className="col-span-full py-16 text-center border-2 border-dashed border-[#18181b] rounded-2xl bg-[#0f0f11]">
                       <p className="text-zinc-500 font-bold text-[14px] mb-4">You haven't authored anything yet, {currentUser.name}.</p>
                       <Link to="/create-note" className="inline-flex items-center gap-2 h-10 px-6 bg-zinc-800 text-white rounded-lg text-[13px] font-bold hover:bg-zinc-700 transition-colors">Start your first note</Link>
                    </div>
                 )}
              </AnimatePresence>
            </div>
         </section>

         {/* Recently Viewed */}
         {recent.length > 0 && (
            <section>
               <div className="flex items-center gap-3 mb-6 border-b border-[#18181b] pb-4">
                 <Clock size={18} className="text-amber-400" />
                 <h2 className="text-xl font-bold text-white">Recently Viewed</h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {recent.map(note => <div key={note.id} className="h-full"><NoteCard note={note} /></div>)}
               </div>
            </section>
         )}

         {/* Trending Notes */}
         <section>
            <div className="flex items-center gap-3 mb-6 border-b border-[#18181b] pb-4">
              <TrendingUp size={18} className="text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Network Trending</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trending.map(note => <div key={note.id} className="h-full"><NoteCard note={note} /></div>)}
            </div>
         </section>

      </div>
    </motion.div>
  );
}
