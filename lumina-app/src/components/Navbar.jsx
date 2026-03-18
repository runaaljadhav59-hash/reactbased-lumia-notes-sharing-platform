import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, PenSquare, ChevronRight, Loader2 } from 'lucide-react';
import { getCurrentUser, searchNotes } from '../services/noteService';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser().then(u => setUser(u));
  }, []);

  // Handle outside click for search dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Live Search Effect
  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const results = await searchNotes(query);
      setSuggestions(results.slice(0, 4)); // Only show top 4 suggestions
      setIsSearching(false);
      setShowDropdown(true);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && query.trim() !== '') {
       setShowDropdown(false);
       navigate(`/explore?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 h-16 w-full flex items-center justify-between px-6 lg:px-10 bg-[#09090b]/80 backdrop-blur-2xl border-b border-[#18181b] shadow-sm shadow-black/20">
      
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2 group shrink-0 w-[220px]">
        <div className="flex items-center justify-center w-8 h-8 rounded-[8px] bg-gradient-to-br from-violet-600 to-cyan-500 shadow-md group-hover:shadow-violet-500/25 transition-shadow">
          <span className="text-white font-black text-[14px] leading-none">L</span>
        </div>
        <span className="font-bold text-[18px] tracking-tight text-white">Lumina</span>
      </Link>

      {/* Global Search */}
      <div className="flex-1 max-w-xl mx-4 hidden md:block" ref={searchRef}>
        <div className="relative">
           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
             <Search size={16} className="text-zinc-500" />
           </div>
           
           <input
             type="text"
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             onKeyDown={handleSearchSubmit}
             onFocus={() => query.trim() !== '' && setShowDropdown(true)}
             placeholder="Search for programming notes... (Press Enter to view all)"
             className="w-full h-10 pl-11 pr-12 bg-[#0f0f11] focus:bg-[#121214] border border-[#18181b] focus:border-violet-500/50 rounded-xl transition-all duration-200 text-[13px] font-medium text-zinc-200 placeholder-zinc-500 shadow-inner outline-none"
           />

           <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
             {isSearching ? (
                <Loader2 size={14} className="animate-spin text-zinc-500" />
             ) : (
                <div className="px-2 py-0.5 rounded-md bg-[#18181b] border border-[#27272a] text-[10px] font-bold text-zinc-400 shadow-sm pointer-events-none">
                  CMD+K
                </div>
             )}
           </div>

           {/* Live Search Suggestions Dropdown */}
           <AnimatePresence>
             {showDropdown && (
               <motion.div 
                 initial={{ opacity: 0, y: 5 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: 5 }}
                 transition={{ duration: 0.15 }}
                 className="absolute top-12 left-0 right-0 bg-[#0f0f11] border border-[#27272a] rounded-xl shadow-2xl p-2 z-50"
               >
                 {suggestions.length > 0 ? (
                    <div className="flex flex-col">
                       {suggestions.map(note => (
                         <Link 
                           key={note.id} 
                           to={`/note/${note.id}`}
                           onClick={() => setShowDropdown(false)}
                           className="flex items-center justify-between p-3 rounded-lg hover:bg-[#18181b] group transition-colors"
                         >
                           <div className="flex flex-col min-w-0">
                              <span className="text-[13px] font-bold text-zinc-100 truncate group-hover:text-violet-400">{note.title}</span>
                              <span className="text-[11px] text-zinc-500 truncate">{note.excerpt}</span>
                           </div>
                           <ChevronRight size={14} className="text-zinc-600 group-hover:text-violet-400 shrink-0 ml-3" />
                         </Link>
                       ))}
                       <Link 
                         to={`/explore?q=${encodeURIComponent(query)}`} 
                         onClick={() => setShowDropdown(false)}
                         className="flex items-center justify-center p-2 mt-2 text-[11px] font-bold uppercase tracking-wider text-violet-400 hover:text-white bg-violet-500/10 hover:bg-violet-500/20 rounded-lg transition-colors"
                       >
                         View all results
                       </Link>
                    </div>
                 ) : (
                    <div className="p-4 text-center text-zinc-500 text-[13px]">
                       No notes found for "{query}"
                    </div>
                 )}
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center justify-end gap-5 shrink-0">
        <Link to="/explore" className="text-[13px] font-bold text-zinc-400 hover:text-white transition-colors hidden sm:block">
          Explore
        </Link>
        <Link to="/dashboard" className="text-[13px] font-bold text-zinc-400 hover:text-white transition-colors hidden sm:block">
          Dashboard
        </Link>
        
        <Link to="/create-note" className="hidden sm:flex items-center gap-2 px-4 h-9 bg-violet-600 hover:bg-violet-500 text-white text-[13px] font-bold rounded-lg shadow-lg shadow-violet-600/20 transition-all active:scale-95 ml-2">
          <PenSquare size={14} />
          <span>Write</span>
        </Link>

        <div className="w-px h-5 bg-zinc-800 ml-1" />

        <Link to="/profile" className="flex items-center gap-2 focus:outline-none group relative">
          {user ? (
            <img 
               src={user.avatar} 
               alt="Avatar" 
               className="w-9 h-9 rounded-full bg-zinc-800 border-2 border-transparent group-hover:border-violet-500 transition-all shadow-sm" 
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-[#18181b] animate-pulse" />
          )}
        </Link>
      </div>
    </header>
  );
}
