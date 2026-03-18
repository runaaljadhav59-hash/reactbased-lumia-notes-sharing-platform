import { motion, AnimatePresence } from 'framer-motion';
import { Settings, UserPlus, Activity, Users, CheckCircle2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import { useNotesStore } from '../store/useNotesStore';
import { useEffect, useState } from 'react';

export default function Profile() {
  const { notes, currentUser } = useNotesStore();
  const location = useLocation();

  const authorNotes = notes.filter(n => n.authorId === currentUser.id).sort((a,b) => b.createdAt - a.createdAt);
  const totalUpvotes = authorNotes.reduce((sum, n) => sum + (n.upvotes || 0), 0);

  const [toastMessage, setToastMessage] = useState(location.state?.toast || '');

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
         setToastMessage('');
         window.history.replaceState({}, document.title);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-full"
    >
      <div className="border-b border-[#18181b] bg-[#0f0f11] pt-16 pb-12 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-start md:items-center gap-10">
           <div className="relative shrink-0">
             <div className="absolute inset-0 bg-violet-600 rounded-full blur-[50px] opacity-20" />
             <img 
               src={currentUser?.avatar} 
               alt="Avatar" 
               className="w-36 h-36 rounded-full border-[5px] border-[#121214] bg-[#09090b] shadow-2xl relative z-10" 
             />
             <div className="absolute bottom-2 right-4 w-6 h-6 bg-emerald-500 rounded-full border-4 border-[#121214] z-20" />
           </div>

           <div className="flex-1 max-w-2xl">
              <h1 className="text-4xl font-extrabold tracking-tight text-white mb-1">
                {currentUser?.name || 'Your Profile'}
              </h1>
              <p className="text-[14px] text-zinc-500 font-bold mb-5 uppercase tracking-widest">
                @{currentUser?.username || 'user'}
              </p>
              
              <p className="text-[16px] text-zinc-300 mb-8 leading-relaxed font-medium">
                {currentUser?.bio || 'Passionate about engineering and sharing knowledge.'}
              </p>

              <div className="flex flex-wrap items-center gap-8">
                 <div className="flex flex-col">
                    <span className="text-3xl font-black text-white tabular-nums">{authorNotes.length}</span>
                    <span className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Published</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-3xl font-black text-white tabular-nums">{totalUpvotes.toLocaleString()}</span>
                    <span className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Network Upvotes</span>
                 </div>
                 <div className="flex flex-col hidden sm:flex">
                    <span className="text-3xl font-black text-white tabular-nums">{(currentUser?.followers || 0).toLocaleString()}</span>
                    <span className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Followers</span>
                 </div>
              </div>
           </div>

           <div className="flex flex-col gap-3 w-full md:w-auto mt-6 md:mt-0">
              <Link 
                 to="/edit-profile" 
                 className="flex items-center justify-center gap-2 h-11 px-8 rounded-xl bg-white text-zinc-950 font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 transition-all"
              >
                 <Settings size={16} /> Edit Profile
              </Link>
           </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto p-6 lg:p-10">
         <div className="flex items-center gap-8 border-b border-[#18181b] mb-10 overflow-x-auto scrollbar-none">
            <button className="text-[14px] font-bold text-white border-b-2 border-white pb-4 flex items-center gap-2 shrink-0">
               <Activity size={16} className="text-violet-400" /> Created Notes
            </button>
            <button className="text-[14px] font-bold text-zinc-500 hover:text-white pb-4 transition-colors shrink-0">
               Saved Intel
            </button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {authorNotes.map(note => (
                 <div key={note.id} className="h-full">
                   <NoteCard note={note} hideAuthor={true} />
                 </div>
              ))}
            </AnimatePresence>
            
            {authorNotes.length === 0 && (
                <div className="col-span-full py-16 text-center border border-dashed border-[#27272a] rounded-[24px]">
                   <p className="text-zinc-500 font-medium text-[15px] mb-4">You have no published notes yet.</p>
                   <Link to="/create-note" className="text-violet-400 font-bold bg-violet-500/10 px-6 py-2 rounded-lg inline-flex items-center hover:bg-violet-500/20 transition-colors">Launch your first note</Link>
                </div>
            )}
         </div>
      </div>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 right-10 z-50 flex items-center gap-3 bg-zinc-900 border border-zinc-800 shadow-2xl px-5 py-4 rounded-2xl"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
               <CheckCircle2 size={16} className="text-emerald-400" />
            </div>
            <span className="text-[14px] font-bold text-white pr-2">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
