import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ThumbsUp, Clock, ArrowUpRight, Trash2, Edit } from 'lucide-react';
import { useNotesStore } from '../store/useNotesStore';
import { useState } from 'react';

export default function NoteCard({ note, hideAuthor = false }) {
  const { currentUser, deleteNote } = useNotesStore();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  
  const isAuthor = currentUser?.id === note.authorId || currentUser?.id === note.author?.id;
  const authorAvatar = note.author?.avatar || (isAuthor ? currentUser.avatar : 'https://api.dicebear.com/7.x/notionists/svg?seed=Unknown');
  const authorName = note.author?.name || (isAuthor ? currentUser.name : 'Unknown Author');

  const handleDelete = (e) => {
     e.preventDefault();
     e.stopPropagation();
     setShowConfirm(true);
  };

  const confirmDelete = (e) => {
     e.preventDefault();
     e.stopPropagation();
     deleteNote(note.id);
     setShowConfirm(false);
  };

  const cancelDelete = (e) => {
     e.preventDefault();
     e.stopPropagation();
     setShowConfirm(false);
  };

  const handleEdit = (e) => {
     e.preventDefault();
     e.stopPropagation();
     navigate(`/edit-note/${note.id}`);
  };

  return (
    <Link to={`/note/${note.id}`} className="block h-full relative">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="group flex flex-col h-full rounded-[20px] p-6 bg-[#0f0f11] border border-zinc-800/80 hover:bg-[#121214] hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300 relative overflow-hidden"
      >
        {/* Author info & Actions */}
        <div className="flex items-start justify-between mb-4">
          {!hideAuthor ? (
             <div className="flex items-center gap-3">
               <img 
                 src={authorAvatar} 
                 alt={authorName} 
                 className="w-8 h-8 rounded-full bg-zinc-800 ring-1 ring-white/10" 
               />
               <div className="flex flex-col">
                 <span className="text-[13px] font-semibold text-zinc-200 group-hover:text-white transition-colors leading-none mb-1">{authorName}</span>
                 <span className="text-[11px] text-zinc-500 font-medium leading-none">{note.createdAtText}</span>
               </div>
             </div>
          ) : (
             <span className="text-[11px] text-zinc-500 font-medium">{note.createdAtText}</span>
          )}

          {isAuthor && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={handleEdit}
                className="p-2 rounded-lg text-zinc-500 hover:text-violet-400 hover:bg-[#18181b] transition-colors"
              >
                <Edit size={14} />
              </button>
              <button 
                onClick={handleDelete}
                className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-[#18181b] transition-colors"
                title="Delete note"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Note Content */}
        <div className="flex-1 mb-6">
          <h3 className="text-[18px] font-bold text-zinc-100 group-hover:text-violet-100 transition-colors leading-snug mb-2 line-clamp-2">
            {note.title}
          </h3>
          <p className="text-[14px] text-zinc-400/90 leading-relaxed line-clamp-3">
            {note.excerpt}
          </p>
        </div>

        {/* Note Footer: Tags & Stats */}
        <div className="pt-5 border-t border-zinc-800/60 flex items-end justify-between mt-auto">
          <div className="flex flex-wrap gap-1.5 flex-1 pr-4">
            {(note.tags || []).slice(0, 3).map((tag, i) => (
              <span key={i} className="text-[11px] font-medium px-2 py-1 rounded-md bg-[#18181b] text-zinc-400 border border-zinc-800 group-hover:border-zinc-700/80 transition-colors">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center gap-4 text-zinc-500 shrink-0">
            <div className="flex items-center gap-1.5 text-[12px] font-semibold group-hover:text-zinc-300 transition-colors">
              <Clock size={13} className="group-hover:text-cyan-400 opacity-70 transition-colors" /> 
              <span>{note.readingTime?.split(' ')[0] || '5'}m</span>
            </div>
            <div className="flex items-center gap-1 text-[12px] font-semibold text-violet-400/70 group-hover:text-violet-400 transition-colors bg-violet-500/10 px-2 py-1 rounded-md">
              <ArrowUpRight size={13} /> 
              <span>{note.upvotes || 0}</span>
            </div>
          </div>
        </div>

        {/* Deletion Confirmation Overlay */}
        <AnimatePresence>
          {showConfirm && (
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="absolute inset-0 bg-[#0f0f11]/95 backdrop-blur-sm z-10 flex items-center justify-center p-6 flex-col text-center"
             >
                <h4 className="text-[15px] font-bold text-white mb-2">Delete Note?</h4>
                <p className="text-[12px] text-zinc-400 mb-6">This action cannot be undone.</p>
                <div className="flex gap-3">
                   <button 
                     onClick={cancelDelete}
                     className="px-4 py-2 rounded-lg bg-[#18181b] text-[12px] font-bold hover:bg-[#27272a] text-zinc-300 transition-colors outline-none"
                   >
                     Cancel
                   </button>
                   <button 
                     onClick={confirmDelete}
                     className="px-4 py-2 rounded-lg bg-red-500/20 text-red-500 border border-red-500/20 text-[12px] font-bold hover:bg-red-500 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all outline-none"
                   >
                     Confirm
                   </button>
                </div>
             </motion.div>
          )}
        </AnimatePresence>

      </motion.article>
    </Link>
  );
}
