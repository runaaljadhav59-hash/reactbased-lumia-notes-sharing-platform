import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Filter, SortAsc, SearchX } from 'lucide-react';
import NoteCard from '../components/NoteCard';
import { useNotesStore } from '../store/useNotesStore';
import { seedTags } from '../data/mockDatabase';

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const { notes } = useNotesStore();

  const [activeSort, setActiveSort] = useState('Trending');
  const [activeTags, setActiveTags] = useState([]);

  // Compute filtered and sorted notes synchronously
  const processedNotes = useMemo(() => {
    let filtered = [...notes];
    
    // 1. Text Search filtering
    if (queryParam) {
       const term = queryParam.toLowerCase();
       filtered = filtered.filter(n => 
         (n.title?.toLowerCase() || '').includes(term) ||
         (n.excerpt?.toLowerCase() || '').includes(term) ||
         (n.tags || []).some(t => t.toLowerCase().includes(term))
       );
    }
    
    // 2. Tag multi-select filtering
    if (activeTags.length > 0) {
       filtered = filtered.filter(n => n.tags?.some(tag => activeTags.includes(tag)));
    }

    // 3. Sorting
    filtered.sort((a, b) => {
       if (activeSort === 'Newest') return b.createdAt - a.createdAt;
       if (activeSort === 'Most Upvoted') return b.upvotes - a.upvotes;
       // Default Trending alg: upvotes relative to time (simulated)
       return (b.upvotes + (b.createdAt / 100000000)) - (a.upvotes + (a.createdAt / 100000000));
    });

    return filtered;
  }, [notes, queryParam, activeTags, activeSort]);

  const toggleTag = (tag) => {
    if (tag === 'All') {
       setActiveTags([]);
       return;
    }
    setActiveTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="p-6 lg:p-10 max-w-[1400px] mx-auto min-h-full"
    >
      <div className="mb-10 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
          Explore Insights {queryParam && <span className="text-violet-400">"{queryParam}"</span>}
        </h1>
        <p className="text-[15px] font-medium text-zinc-400 leading-relaxed">
         {queryParam ? 'Search results across the entire Lumina global knowledge base.' : 'Discover the collective knowledge of the network. Browse through completely open-source, community-voted engineering notes.'}
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 border-b border-[#18181b] pb-6">
        
        {/* Scrollable Tag Filters */}
        <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto scrollbar-none pb-2 md:pb-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0f0f11] border border-[#18181b] shrink-0">
             <Filter size={14} className="text-zinc-500" />
          </div>
          <div className="flex items-center gap-2">
             <button
                onClick={() => toggleTag('All')}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all shrink-0 ${
                   activeTags.length === 0
                   ? 'bg-white text-zinc-950 shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                   : 'bg-[#0f0f11] text-zinc-400 border border-[#18181b] hover:border-zinc-700 hover:text-white'
                }`}
             >
                All Setup
             </button>
            {seedTags.slice(1, 8).map(tag => {
              const isActive = activeTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all shrink-0 ${
                  isActive
                    ? 'bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] border-violet-500' 
                    : 'bg-[#0f0f11] text-zinc-400 border border-[#18181b] hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sorting Dropdown Simulation */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0f0f11] border border-[#18181b]">
             <SortAsc size={14} className="text-zinc-500" />
          </div>
          <div className="flex bg-[#121214] border border-[#18181b] rounded-lg p-1">
             {['Trending', 'Most Upvoted', 'Newest'].map(sort => (
                <button 
                  key={sort}
                  onClick={() => setActiveSort(sort)}
                  className={`px-4 py-1.5 text-[12px] font-bold rounded-md shadow-sm transition-all ${
                     activeSort === sort ? 'bg-[#27272a] text-white' : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  {sort}
                </button>
             ))}
          </div>
        </div>
      </div>

      {/* Grid of Notes matched synchronously */}
      <AnimatePresence mode="wait">
         {processedNotes.length > 0 ? (
             <motion.div 
                key="results"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
             >
                {processedNotes.map(note => (
                  <div key={note.id} className="h-full">
                     <NoteCard note={note} />
                  </div>
                ))}
            </motion.div>
         ) : (
             <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="w-full min-h-[50vh] flex flex-col items-center justify-center text-center"
             >
                <div className="w-16 h-16 rounded-full bg-[#18181b] flex items-center justify-center mb-6">
                   <SearchX size={24} className="text-zinc-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No notes found</h3>
                <p className="text-[14px] text-zinc-500 max-w-sm leading-relaxed mb-6">
                   We couldn't find anything matching your current filters or search terms.
                </p>
                <button 
                  onClick={() => { setSearchParams({}); setActiveTags([]); }}
                  className="px-6 h-10 rounded-lg bg-white text-zinc-950 text-[13px] font-bold hover:bg-zinc-200 transition-colors"
                >
                   Clear all filters
                </button>
             </motion.div>
         )}
      </AnimatePresence>
    </motion.div>
  );
}
