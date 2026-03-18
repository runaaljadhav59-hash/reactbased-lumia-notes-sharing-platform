import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Camera, Save, X } from 'lucide-react';
import { useNotesStore } from '../store/useNotesStore';

export default function EditProfile() {
  const navigate = useNavigate();
  const { currentUser, updateProfile } = useNotesStore();
  
  const [name, setName] = useState(currentUser?.name || '');
  const [username, setUsername] = useState(currentUser?.username || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');
  
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    
    updateProfile({ name, username, bio, avatar });
    navigate('/profile', { state: { toast: 'Profile updated successfully' } });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0 }}
      className="max-w-[700px] mx-auto p-6 lg:p-12 min-h-full"
    >
      <div className="flex items-center justify-between mb-10">
         <h1 className="text-3xl font-bold tracking-tight text-white">Edit Profile</h1>
         <button onClick={() => navigate('/profile')} className="p-2 rounded-full hover:bg-[#18181b] text-zinc-400 transition-colors">
            <X size={20} />
         </button>
      </div>

      <form onSubmit={handleSave} className="bg-[#0f0f11] border border-[#18181b] rounded-[24px] p-8 lg:p-10 shadow-sm relative overflow-hidden">
        
        {/* Avatar Section */}
        <div className="flex flex-col sm:flex-row items-center gap-8 mb-10 border-b border-[#18181b] pb-10">
           <div className="relative group cursor-pointer">
              <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-[#121214] bg-[#09090b]" />
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <Camera size={24} className="text-white" />
              </div>
           </div>
           <div className="flex-1 w-full">
              <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Avatar URL Link</label>
              <input
                type="text"
                value={avatar}
                onChange={e => setAvatar(e.target.value)}
                className="w-full bg-zinc-950 border border-[#27272a] rounded-xl px-4 h-11 text-[13px] text-white focus:border-violet-500/50 outline-none transition-colors"
              />
           </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-zinc-950 border border-[#27272a] rounded-xl px-4 h-11 text-[13px] text-white focus:border-violet-500/50 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full bg-zinc-950 border border-[#27272a] rounded-xl px-4 h-11 text-[13px] text-white focus:border-violet-500/50 outline-none transition-colors"
                />
              </div>
           </div>

           <div>
              <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Bio</label>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                className="w-full min-h-[120px] bg-zinc-950 border border-[#27272a] rounded-xl p-4 text-[13px] text-zinc-300 focus:border-violet-500/50 outline-none transition-colors resize-y"
              />
           </div>
        </div>

        <div className="mt-10 flex justify-end">
           <button 
             type="submit" 
             disabled={isSaving}
             className="flex items-center gap-2 h-11 px-8 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-all shadow-lg shadow-violet-600/20 active:scale-95 disabled:opacity-50"
           >
             {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
             <span>Save Profile</span>
           </button>
        </div>
      </form>
    </motion.div>
  );
}
