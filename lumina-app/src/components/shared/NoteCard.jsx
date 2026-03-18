import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, BookmarkPlus, ArrowRight, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { memo, useRef } from 'react';

/**
 * TrendingNoteCard — Perfected. 
 * Features a Notion-style gradient cover header, absolute pixel-perfection,
 * and a subtle glass container inner shadow.
 */
export const TrendingNoteCard = memo(function TrendingNoteCard({ note }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={cn(
        'group relative flex-shrink-0 w-[420px] rounded-[24px]',
        'bg-[#0f0f11] border border-zinc-800/80 shadow-md',
        'hover:shadow-2xl hover:shadow-violet-500/10 hover:border-violet-500/30',
        'transition-all duration-300 cursor-pointer overflow-hidden flex flex-col'
      )}
    >
      {/* Notion-style Gradient Cover */}
      <div className={cn('h-24 w-full bg-gradient-to-r', note.coverGradient)} />
      
      {/* Decorative inner glow over the whole card */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/20 pointer-events-none rounded-[24px]" />

      <div className="px-6 pb-6 pt-5 flex flex-col flex-1 relative z-10">
        
        {/* Floating Category Badge (Half-overlapping the cover image) */}
        <div className="absolute -top-4 right-6 backdrop-blur-md bg-zinc-950/60 font-semibold px-3 py-1 rounded-full text-[10px] tracking-widest uppercase border border-zinc-700/50 shadow-sm text-zinc-300">
          {note.timeAgo}
        </div>
        
        <div className="mb-2">
           <span className={cn('inline-block text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mb-3', note.category.color)}>
             {note.category.name}
           </span>
        </div>

        {/* Content */}
        <div className="mb-6 flex-1">
          <h3 className="text-[20px] font-bold text-zinc-50 group-hover:text-white transition-colors leading-[1.3] tracking-tight mb-2.5 line-clamp-2">
            {note.title}
          </h3>
          <p className="text-[14px] text-zinc-400/90 leading-relaxed line-clamp-3">
            {note.contentPreview}
          </p>
        </div>

        {/* Footer: Divider + Stats */}
        <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img 
               src={note.author.avatar} 
               alt={note.author.name} 
               className="w-8 h-8 rounded-full ring-2 ring-zinc-900 bg-zinc-800" 
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-zinc-200 leading-none mb-1">{note.author.name}</span>
              <span className="text-[11px] text-zinc-500 leading-none">{note.author.role}</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 text-zinc-500">
            <motion.div 
               key={note.stats.upvotes}
               initial={{ scale: 1.2, color: '#a78bfa' }}
               animate={{ scale: 1, color: '#71717a' }}
               transition={{ duration: 0.4 }}
               className="flex items-center gap-1.5 group-hover:text-violet-400 transition-colors"
            >
              <ThumbsUp size={15} className="fill-current opacity-20 group-hover:opacity-100 transition-opacity" />
              <span className="text-xs font-bold tabular-nums">{note.stats.upvotes.toLocaleString()}</span>
            </motion.div>
            <div className="flex items-center gap-1.5 group-hover:text-amber-400 transition-colors">
              <MessageSquare size={15} className="fill-current opacity-20 group-hover:opacity-100 transition-opacity" />
              <span className="text-xs font-bold tabular-nums">{note.stats.comments.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

/**
 * FeedNoteCard — Perfected.
 * Sleeker structure. More emphasis on typography and tags.
 */
export const FeedNoteCard = memo(function FeedNoteCard({ note }) {
  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'group relative flex flex-col rounded-[20px] p-5 lg:p-6',
        'bg-[#121214] border border-zinc-800/60 shadow-sm',
        'hover:bg-[#18181b] hover:border-zinc-700 hover:shadow-xl hover:shadow-black/40',
        'transition-all duration-300 cursor-pointer h-full'
      )}
    >
      <div className="absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/5 pointer-events-none" />

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img src={note.author.avatar} alt={note.author.name} className="w-9 h-9 rounded-full bg-zinc-800 ring-1 ring-zinc-700/50" />
          <div className="flex flex-col">
             <span className="text-sm font-semibold text-zinc-200 group-hover:text-zinc-100 transition-colors leading-none mb-1.5">
               {note.author.name}
             </span>
             <span className="text-[11px] text-zinc-500 leading-none flex items-center gap-1.5">
               {note.timeAgo} • {note.readTime}
             </span>
          </div>
        </div>
        <button className="text-zinc-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500">
          <BookmarkPlus size={18} />
        </button>
      </div>

      <div className="flex gap-3 mb-3">
         <div className="mt-1 flex-shrink-0 text-zinc-600 group-hover:text-violet-500/50 transition-colors">
            <FileText size={18} />
         </div>
         <div>
            <h3 className="text-[17px] font-bold text-zinc-100 group-hover:text-violet-100 transition-colors leading-snug mb-2">
               {note.title}
            </h3>
            <p className="text-[14px] text-zinc-400/80 line-clamp-3 leading-relaxed">
               {note.contentPreview}
            </p>
         </div>
      </div>

      <div className="mt-auto pt-5 flex items-end justify-between">
        <div className="flex flex-wrap gap-1.5">
          {note.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[11px] font-medium px-2 py-1 rounded-md bg-[#1f1f22] text-zinc-400 border border-[#27272a] group-hover:border-zinc-700/80 transition-colors">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-4 text-zinc-500">
          <motion.div 
             key={note.stats.upvotes}
             initial={{ scale: 1.2, color: '#a78bfa' }}
             animate={{ scale: 1, color: '#71717a' }}
             className="flex items-center gap-1.5 text-xs font-semibold group-hover:text-zinc-300 transition-colors"
          >
            <ThumbsUp size={14} className="group-hover:text-violet-400 transition-colors" /> 
            <span className="tabular-nums">{note.stats.upvotes.toLocaleString()}</span>
          </motion.div>
          <div className="flex items-center gap-1.5 text-xs font-semibold group-hover:text-zinc-300 transition-colors">
            <MessageSquare size={14} className="group-hover:text-cyan-400 transition-colors" /> 
            <span className="tabular-nums">{note.stats.comments.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
    </motion.article>
  );
});
