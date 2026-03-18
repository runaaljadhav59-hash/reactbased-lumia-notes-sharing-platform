import { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ThumbsUp, MessageSquare, Edit3, BookmarkPlus, CheckCircle2 } from 'lucide-react';
import { useNotesStore } from '../store/useNotesStore';
import { getFromLocalStorage, saveToLocalStorage } from '../services/localStorage';

export default function NoteDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { notes, currentUser, upvoteNote } = useNotesStore();
  
  // Find note synchronously via store
  const note = notes.find(n => n.id === id);
  const isAuthor = note && currentUser?.id === note.authorId;
  const authorAvatar = note?.author?.avatar || (isAuthor ? currentUser?.avatar : 'https://api.dicebear.com/7.x/notionists/svg?seed=Unknown');
  const authorName = note?.author?.name || (isAuthor ? currentUser?.name : 'Unknown Author');

  const [toastMessage, setToastMessage] = useState(location.state?.toast || '');
  const [hasVotedLocally, setHasVotedLocally] = useState(false);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
         setToastMessage('');
         // Clean up history state so it doesn't pop up again on refresh
         window.history.replaceState({}, document.title);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  useEffect(() => {
    if (note) {
      // Add to recently viewed in localStorage independently
      const recent = getFromLocalStorage('RECENTLY_VIEWED') || [];
      const updatedRecent = [id, ...recent.filter(item => item !== id)].slice(0, 5);
      saveToLocalStorage('RECENTLY_VIEWED', updatedRecent);

      const voted = getFromLocalStorage('UPVOTED_NOTES') || [];
      if (voted.includes(id)) {
         setHasVotedLocally(true);
      }
    }
  }, [id, note]);

  const handleUpvote = () => {
     if (hasVotedLocally) return;
     
     upvoteNote(id);
     
     const voted = getFromLocalStorage('UPVOTED_NOTES') || [];
     saveToLocalStorage('UPVOTED_NOTES', [...voted, id]);
     
     setHasVotedLocally(true);
     setToastMessage('Upvoted successfully!');
  };

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
        <h2 className="text-2xl font-bold mb-4">Note not found</h2>
        <Link to="/dashboard" className="text-violet-400 hover:text-white font-bold flex items-center gap-2 px-6 h-10 border border-[#27272a] rounded-lg transition-colors">
          <ArrowLeft size={16} /> Returns to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="max-w-[900px] mx-auto p-6 lg:p-12 min-h-full relative"
    >
      <div className="flex items-center justify-between mb-10">
         <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-[13px] font-bold text-zinc-500 hover:text-white transition-colors group">
           <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
           Go Back
         </button>
         
         {isAuthor && (
            <Link to={`/edit-note/${id}`} className="inline-flex items-center gap-2 text-[13px] font-bold text-violet-400 bg-violet-500/10 hover:bg-violet-500/20 px-4 py-2 rounded-lg transition-colors border border-violet-500/20">
               <Edit3 size={14} /> Edit This Note
            </Link>
         )}
      </div>

      <header className="mb-10">
        <div className="flex flex-wrap gap-2 mb-6">
          {(note.tags || []).map(tag => (
            <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-md bg-[#18181b] border border-[#27272a] text-zinc-300 tracking-wide uppercase">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
          {note.title}
        </h1>
        
        <p className="text-[17px] text-zinc-400 leading-relaxed font-medium mb-8">
          {note.excerpt}
        </p>

        <div className="flex items-center justify-between border-y border-[#18181b] py-6">
           <div className="flex items-center gap-4">
              <img src={authorAvatar} alt="Author" className="w-12 h-12 rounded-full border border-[#27272a] bg-zinc-800" />
              <div>
                 <div className="text-[14px] font-bold text-white mb-0.5">{authorName}</div>
                 <div className="text-[12px] text-zinc-500 flex items-center gap-2 font-medium uppercase tracking-wider">
                    {note.createdAtText} <span className="w-1 h-1 rounded-full bg-zinc-700" /> {note.readingTime || '5 min read'}
                 </div>
              </div>
           </div>
           <div className="flex items-center gap-2">
              <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-[#0f0f11] hover:bg-[#18181b] border border-[#18181b] hover:border-zinc-700 text-zinc-400 hover:text-white transition-all">
                <BookmarkPlus size={16} />
              </button>
           </div>
        </div>
      </header>

      {/* Main Reading Area */}
      <div className="prose prose-invert max-w-none text-zinc-300 mb-16">
        {note.content?.split('. ').map((paragraph, i) => (
          <p key={i} className="text-[16px] leading-[1.8] mb-6 font-normal">
            {paragraph}{i !== note.content.split('. ').length - 1 ? '.' : ''}
          </p>
        ))}
      </div>

      <div className="flex items-center justify-end gap-6 border-t border-[#18181b] pt-10 pb-10">
        <span className="text-zinc-500 text-[14px] font-bold mr-auto">Did you find this helpful?</span>
        <button className="flex items-center gap-3 h-12 px-6 rounded-full bg-[#121214] border border-[#27272a] hover:bg-[#18181b] text-zinc-300 font-bold transition-all active:scale-95">
           <MessageSquare size={18} /> 
           <span>Comment</span>
        </button>
        <motion.button 
           whileTap={{ scale: 0.92 }}
           onClick={handleUpvote}
           disabled={hasVotedLocally || isAuthor}
           className={`flex items-center gap-3 h-12 px-6 rounded-full font-bold transition-all shadow-lg ${
             hasVotedLocally
               ? 'bg-[#18181b] text-violet-400 border border-[#27272a] shadow-none'
               : isAuthor 
                 ? 'bg-[#18181b] text-zinc-600 cursor-not-allowed border border-[#27272a] shadow-none'
                 : 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/20 group'
           }`}
        >
           <ThumbsUp size={18} className={!hasVotedLocally && !isAuthor ? "group-hover:-translate-y-0.5 transition-transform" : "fill-current"} /> 
           <span>{hasVotedLocally ? 'Upvoted' : 'Upvote'} ({note.upvotes})</span>
        </motion.button>
      </div>

      {/* Floating Toast Notification via Location State or Local Action */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
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
