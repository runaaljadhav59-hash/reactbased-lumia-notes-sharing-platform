import { NavLink } from 'react-router-dom';
import { Home, Compass, User, LayoutDashboard, Sparkles } from 'lucide-react';

function NavItem({ icon: Icon, label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-[14px] transition-all duration-200 group ${
          isActive
            ? 'text-white bg-[#18181b] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] border border-[#27272a]'
            : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#121214]'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon size={18} className={`transition-colors ${isActive ? 'text-violet-400' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-[260px] flex-shrink-0 flex-col bg-[#09090b] border-r border-[#18181b] z-40 fixed top-16 bottom-0 left-0">
      <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-none">
        
        <div className="px-2 mb-3 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
          Main Menu
        </div>
        
        <nav className="flex flex-col gap-1 mb-8">
          <NavItem icon={Home} label="Home" to="/" />
          <NavItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" />
          <NavItem icon={Compass} label="Explore" to="/explore" />
          <NavItem icon={User} label="Profile" to="/profile" />
        </nav>

        <div className="bg-gradient-to-br from-[#121214] to-[#0f0f11] rounded-[16px] p-5 border border-[#18181b] mt-auto">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-violet-400" />
            <h4 className="text-[13px] font-bold text-zinc-100">Lumina Pro</h4>
          </div>
          <p className="text-[12px] text-zinc-400 mb-4 leading-relaxed">
            Support the platform and unlock AI-powered note summaries.
          </p>
          <button className="w-full py-2 bg-white text-zinc-950 text-[12px] font-bold rounded-lg hover:bg-zinc-200 transition-colors active:scale-95 shadow-md">
            Upgrade
          </button>
        </div>
        
      </div>
    </aside>
  );
}
