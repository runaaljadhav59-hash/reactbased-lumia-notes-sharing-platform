import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-[#18181b] bg-[#09090b] py-8 lg:py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4 group">
            <div className="flex items-center justify-center w-6 h-6 rounded bg-gradient-to-br from-violet-600 to-cyan-500 shadow-md">
              <span className="text-white font-black text-[12px] leading-none">L</span>
            </div>
            <span className="font-bold text-[16px] tracking-tight text-white">Lumina</span>
          </Link>
          <p className="text-[13px] text-zinc-500 max-w-sm leading-relaxed mb-6">
            The intelligent knowledge base for engineers. Compose technical notes, share systems architecture, and build your digital brain.
          </p>
          <p className="text-[12px] font-medium text-zinc-600">
            © {new Date().getFullYear()} Lumina. All rights reserved.
          </p>
        </div>
        
        <div>
           <h4 className="text-[12px] font-bold text-zinc-100 uppercase tracking-widest mb-4">Platform</h4>
           <ul className="flex flex-col gap-2">
              <li><Link to="/explore" className="text-[13px] font-medium text-zinc-500 hover:text-violet-400 transition-colors">Explore</Link></li>
              <li><Link to="/dashboard" className="text-[13px] font-medium text-zinc-500 hover:text-violet-400 transition-colors">Dashboard</Link></li>
              <li><Link to="/profile" className="text-[13px] font-medium text-zinc-500 hover:text-violet-400 transition-colors">Profile</Link></li>
           </ul>
        </div>

        <div>
           <h4 className="text-[12px] font-bold text-zinc-100 uppercase tracking-widest mb-4">Legal</h4>
           <ul className="flex flex-col gap-2">
              <li><a href="#" className="text-[13px] font-medium text-zinc-500 hover:text-violet-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-[13px] font-medium text-zinc-500 hover:text-violet-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-[13px] font-medium text-zinc-500 hover:text-violet-400 transition-colors">Contact</a></li>
           </ul>
        </div>
      </div>
    </footer>
  );
}
