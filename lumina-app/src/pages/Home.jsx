import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PenTool, ArrowRight } from 'lucide-react';
import NoteCard from '../components/NoteCard';
import { notes } from '../data/notes';

export default function Home() {
  const featuredNotes = notes.slice(0, 3);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#09090b]"
    >
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden border-b border-[#18181b]">
        {/* Ambient meshes */}
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[11px] font-bold uppercase tracking-widest mb-8 shadow-[0_0_15px_rgba(139,92,246,0.15)]"
          >
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
            Lumina Editor v2.0 is live
          </motion.div>
          
          <motion.h1 
             initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, type: "spring" }}
             className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70"
          >
            Share knowledge. <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Learn faster.</span>
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, type: "spring" }}
            className="text-[17px] md:text-[20px] text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
          >
            The premier platform for engineers and designers to document architecture, share code snippets, and build a collective digital brain.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, type: "spring" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/dashboard" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 h-12 rounded-[12px] bg-white text-zinc-950 font-bold text-[15px] hover:bg-zinc-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-[0.98]">
               Start Writing <PenTool size={16} />
            </Link>
            <Link to="/explore" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 h-12 rounded-[12px] bg-[#121214] text-white font-bold text-[15px] border border-[#27272a] hover:bg-[#18181b] transition-colors active:scale-[0.98]">
               Explore Topics 
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Notes Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-3">Featured Insights</h2>
            <p className="text-[15px] text-zinc-500 max-w-xl leading-relaxed">
              Curated architectural deep-dives from top engineers in the network.
            </p>
          </div>
          <Link to="/explore" className="hidden md:flex items-center gap-2 text-[14px] font-bold text-violet-400 hover:text-violet-300 transition-colors">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredNotes.map(note => (
            <div key={note.id} className="h-full">
              <NoteCard note={note} />
            </div>
          ))}
        </div>
        
        <Link to="/explore" className="flex md:hidden items-center justify-center gap-2 text-[14px] font-bold text-violet-400 mt-8 hover:text-violet-300 transition-colors">
            View All Notes <ArrowRight size={16} />
        </Link>
      </section>

    </motion.div>
  );
}
