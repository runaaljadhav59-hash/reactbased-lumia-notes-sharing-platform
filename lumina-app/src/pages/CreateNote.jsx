import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Edit3, Image as ImageIcon } from 'lucide-react';
import { useNotesStore } from '../store/useNotesStore';

export default function CreateNote() {
  const { id } = useParams(); // If ID exists, we are in Edit mode
  const navigate = useNavigate();
  const { notes, addNote, updateNote, currentUser } = useNotesStore();
  
  const isEditing = Boolean(id);
  const existingNote = isEditing ? notes.find(n => n.id === id) : null;

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [readingTime, setReadingTime] = useState('5 min read');
  
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load existing note data if editing
  useEffect(() => {
    if (isEditing && existingNote) {
      if (existingNote.authorId !== currentUser.id) {
         navigate('/explore'); // Unauthorized
         return;
      }
      setTitle(existingNote.title || '');
      setExcerpt(existingNote.excerpt || '');
      setContent(existingNote.content || '');
      setTags((existingNote.tags || []).join(', '));
      setReadingTime(existingNote.readingTime || '5 min read');
    }
  }, [isEditing, existingNote, currentUser, navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    setIsSaving(true);
    
    // Simulate network delay for premium feel
    await new Promise(resolve => setTimeout(resolve, 800));

    const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);
    
    if (isEditing) {
       updateNote(id, {
         title,
         excerpt: excerpt || content.substring(0, 100) + '...',
         content,
         tags: tagsArray,
         readingTime
       });
       navigate(`/note/${id}`, { state: { toast: 'Note updated successfully' }});
    } else {
       const newId = `note_${Date.now()}`;
       addNote({
         id: newId,
         title,
         excerpt: excerpt || content.substring(0, 100) + '...',
         content,
         tags: tagsArray,
         readingTime,
         authorId: currentUser.id,
         upvotes: 0,
         createdAt: Date.now(),
         createdAtText: 'Just now'
       });
       navigate(`/note/${newId}`, { state: { toast: 'Note published successfully' }});
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0 }}
      className="max-w-[1000px] mx-auto p-6 lg:p-12 min-h-full"
    >
      <div className="flex items-center justify-between mb-10">
         <Link to="/dashboard" className="inline-flex items-center gap-2 text-[13px] font-bold text-zinc-500 hover:text-white transition-colors group">
           <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
           Back to Dashboard
         </Link>
         
         <div className="flex bg-[#121214] border border-[#18181b] rounded-lg p-1">
             <button 
               onClick={() => setShowPreview(false)}
               className={`flex items-center gap-2 px-4 py-1.5 text-[12px] font-bold rounded-md shadow-sm transition-all ${
                  !showPreview ? 'bg-[#27272a] text-white' : 'text-zinc-500 hover:text-white'
               }`}
             >
               <Edit3 size={14} /> Write
             </button>
             <button 
               onClick={() => setShowPreview(true)}
               className={`flex items-center gap-2 px-4 py-1.5 text-[12px] font-bold rounded-md shadow-sm transition-all ${
                  showPreview ? 'bg-[#27272a] text-white' : 'text-zinc-500 hover:text-white'
               }`}
             >
               <Eye size={14} /> Preview
             </button>
          </div>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        
        {!showPreview ? (
          <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }}
             className="flex flex-col gap-6"
          >
            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-transparent text-4xl md:text-5xl font-extrabold tracking-tight text-white placeholder-zinc-700 outline-none border-none focus:ring-0 px-0"
              required
            />
            
            <input
              type="text"
              placeholder="Short excerpt or description..."
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
              className="w-full bg-transparent text-[17px] font-medium text-zinc-400 placeholder-zinc-600 outline-none border-none focus:ring-0 px-0"
            />

            <div className="flex flex-wrap gap-4 pt-4 border-t border-[#18181b]">
               <div className="flex-1 min-w-[200px]">
                  <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. React, Architecture, Backend"
                    value={tags}
                    onChange={e => setTags(e.target.value)}
                    className="w-full bg-[#0f0f11] border border-[#18181b] rounded-xl px-4 h-11 text-[13px] text-white placeholder-zinc-600 focus:border-violet-500/50 outline-none transition-colors"
                  />
               </div>
               <div className="w-[180px]">
                  <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Reading Time</label>
                  <input
                    type="text"
                    value={readingTime}
                    onChange={e => setReadingTime(e.target.value)}
                    className="w-full bg-[#0f0f11] border border-[#18181b] rounded-xl px-4 h-11 text-[13px] text-white outline-none focus:border-violet-500/50 transition-colors"
                  />
               </div>
            </div>

            <div className="relative mt-4">
               <textarea
                 placeholder="Write your note content here... (Supports paragraphs separated by periods for this demo)"
                 value={content}
                 onChange={e => setContent(e.target.value)}
                 className="w-full min-h-[400px] bg-[#0f0f11] border border-[#18181b] rounded-2xl p-6 text-[15px] leading-relaxed text-zinc-300 placeholder-zinc-600 focus:border-violet-500/50 outline-none transition-colors resize-y"
                 required
               />
               <button type="button" className="absolute bottom-4 right-4 p-2 bg-[#18181b] hover:bg-[#27272a] rounded-lg text-zinc-400 transition-colors">
                  <ImageIcon size={18} />
               </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }}
             className="min-h-[60vh] bg-[#0f0f11] border border-[#18181b] rounded-2xl p-8 lg:p-12 prose prose-invert max-w-none"
          >
             <h1 className="text-4xl font-extrabold text-white mb-6 leading-[1.15]">{title || 'Untitled Note'}</h1>
             <p className="text-[17px] text-zinc-400 font-medium mb-10">{excerpt}</p>
             
             <div className="text-zinc-300">
               {content ? content.split('. ').map((paragraph, i) => (
                 <p key={i} className="text-[16px] leading-[1.8] mb-6">
                   {paragraph}{i !== content.split('. ').length - 1 ? '.' : ''}
                 </p>
               )) : <p className="text-zinc-600 italic">No content written yet...</p>}
             </div>
          </motion.div>
        )}

        <div className="flex justify-end pt-6 border-t border-[#18181b]">
           <button 
             type="submit" 
             disabled={isSaving}
             className="flex items-center gap-2 h-11 px-8 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-all shadow-lg shadow-violet-600/20 active:scale-95 disabled:opacity-50"
           >
             {isSaving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
             ) : (
                <Save size={16} />
             )}
             <span>{isEditing ? 'Update Note' : 'Publish Note'}</span>
           </button>
        </div>

      </form>
    </motion.div>
  );
}
