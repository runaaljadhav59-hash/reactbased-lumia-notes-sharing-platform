import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import NoteDetail from './pages/NoteDetail';
import Profile from './pages/Profile';
import CreateNote from './pages/CreateNote';
import EditProfile from './pages/EditProfile';

// Minimal layout for the landing page (No Sidebar)
function LandingLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090b]">
      <Navbar />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}

// Full app layout for dashboard, profile, etc (With Sidebar)
function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090b]">
      <Navbar />
      <div className="flex flex-1 relative">
        <Sidebar />
        <main className="flex-1 lg:pl-[260px] pb-12 flex flex-col">
           {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingLayout><Home /></LandingLayout>} />
        
        <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
        <Route path="/explore" element={<AppLayout><Explore /></AppLayout>} />
        <Route path="/note/:id" element={<AppLayout><NoteDetail /></AppLayout>} />
        <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />
        
        <Route path="/create-note" element={<AppLayout><CreateNote /></AppLayout>} />
        <Route path="/edit-note/:id" element={<AppLayout><CreateNote /></AppLayout>} />
        <Route path="/edit-profile" element={<AppLayout><EditProfile /></AppLayout>} />
      </Routes>
    </Router>
  );
}
