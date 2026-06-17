import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, GraduationCap, Cpu, Phone, BookOpen, Layers, Image, Award, Users, ShieldAlert, ChevronRight } from 'lucide-react';

// Import Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Programs from './pages/Programs';
import SmartStudy from './pages/SmartStudy';
import StemLabs from './pages/StemLabs';
import RoboticsKits from './pages/RoboticsKits';
import TeacherTraining from './pages/TeacherTraining';
import SchoolsPartnership from './pages/SchoolsPartnership';
import Gallery from './pages/Gallery';
import ContactUs from './pages/ContactUs';
import AdminDashboard from './pages/AdminDashboard';

// Import Program Subpages
import Robotics from './pages/programs/Robotics';
import Coding from './pages/programs/Coding';
import AI from './pages/programs/AI';
import IoT from './pages/programs/IoT';
import ARVR from './pages/programs/ARVR';
import Drones from './pages/programs/Drones';

// Scroll to Top component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true; // Default to dark mode for premium look
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const root = window.document.body;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  // Nav links structure
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Curriculum', path: '/smart-study' },
    { name: 'STEM Labs', path: '/stem-labs' },
    { name: 'Robotics Kits', path: '/robotics-kits' },
    { name: 'Teacher Training', path: '/teacher-training' },
    { name: 'Partnerships', path: '/schools-partnership' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col transition-colors duration-300 dark:bg-darkbg dark:text-slate-100 bg-slate-50 text-slate-900 font-sans">
        
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 glass-panel border-b transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-brand-light to-brand flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform duration-200">
                  T
                </div>
                <div>
                  <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-brand-light to-brand bg-clip-text text-transparent">TechMinds</span>
                  <p className="text-[10px] tracking-wider text-slate-500 dark:text-slate-400 font-semibold uppercase leading-none mt-0.5">STEM Education</p>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center space-x-6">
                {navLinks.map((link) => (
                  <NavLink key={link.path} to={link.path}>
                    {link.name}
                  </NavLink>
                ))}
              </nav>

              {/* Quick Actions */}
              <div className="hidden lg:flex items-center space-x-4">
                {/* Theme Toggle */}
                <button 
                  onClick={toggleTheme} 
                  className="p-2.5 rounded-lg border dark:border-darkbg-border dark:hover:bg-slate-800 hover:bg-slate-200 transition-colors"
                  aria-label="Toggle Theme"
                >
                  {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-700" />}
                </button>

                {/* Dashboard Shortcut */}
                <Link 
                  to="/admin" 
                  className="flex items-center space-x-1.5 px-4 h-11 bg-gradient-to-r from-brand to-brand-dark text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity shadow-md"
                >
                  <Cpu size={16} />
                  <span>Admin Panel</span>
                </Link>
              </div>

              {/* Mobile menu controls */}
              <div className="flex items-center lg:hidden space-x-3">
                <button 
                  onClick={toggleTheme} 
                  className="p-2 rounded-lg border dark:border-darkbg-border"
                >
                  {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-700" />}
                </button>
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                  className="p-2 rounded-lg border dark:border-darkbg-border hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

            </div>
          </div>

          {/* Mobile Navigation Dropdown */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t dark:border-darkbg-border bg-white dark:bg-darkbg px-4 pt-2 pb-6 space-y-2 shadow-lg animate-fade-in-up">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-lg text-base font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t dark:border-darkbg-border">
                <Link 
                  to="/admin" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full py-3 bg-brand text-white rounded-lg font-semibold"
                >
                  <Cpu size={18} />
                  <span>Admin Portal</span>
                </Link>
              </div>
            </div>
          )}
        </header>

        {/* Page Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/robotics" element={<Robotics />} />
            <Route path="/programs/coding" element={<Coding />} />
            <Route path="/programs/ai" element={<AI />} />
            <Route path="/programs/iot" element={<IoT />} />
            <Route path="/programs/ar-vr" element={<ARVR />} />
            <Route path="/programs/drones" element={<Drones />} />
            <Route path="/smart-study" element={<SmartStudy />} />
            <Route path="/stem-labs" element={<StemLabs />} />
            <Route path="/robotics-kits" element={<RoboticsKits />} />
            <Route path="/teacher-training" element={<TeacherTraining />} />
            <Route path="/schools-partnership" element={<SchoolsPartnership />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-8 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            
            {/* Brand Block */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-lg bg-brand flex items-center justify-center text-white font-bold text-lg">
                  T
                </div>
                <span className="font-bold text-lg text-white tracking-tight">TechMinds</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Empowering schools with futuristic STEM, Robotics, Coding, and Artificial Intelligence curricula. Shaping next-generation creators.
              </p>
              <div className="flex items-center space-x-3 pt-2">
                {/* Social media icons simulation */}
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white cursor-pointer hover:bg-brand transition-colors">F</div>
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white cursor-pointer hover:bg-brand transition-colors">T</div>
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white cursor-pointer hover:bg-brand transition-colors">I</div>
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white cursor-pointer hover:bg-brand transition-colors">L</div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">Quick Nav</h3>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/about" className="hover:text-white transition-colors">About TechMinds</Link></li>
                <li><Link to="/programs" className="hover:text-white transition-colors">STEM Programs</Link></li>
                <li><Link to="/gallery" className="hover:text-white transition-colors">Lab Photo Gallery</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">STEM Offerings</h3>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/smart-study" className="hover:text-white transition-colors">Smart Study Curriculum</Link></li>
                <li><Link to="/stem-labs" className="hover:text-white transition-colors">School STEM Labs</Link></li>
                <li><Link to="/robotics-kits" className="hover:text-white transition-colors">Robotics Kits Catalogue</Link></li>
                <li><Link to="/teacher-training" className="hover:text-white transition-colors">Capacity Training (CBP)</Link></li>
              </ul>
            </div>

            {/* Contact Details */}
            <div>
              <h3 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">Headquarters</h3>
              <ul className="space-y-3.5 text-sm">
                <li className="flex items-start space-x-2">
                  <BookOpen size={16} className="text-brand mt-0.5 flex-shrink-0" />
                  <span>TechMinds STEM Hub, Block 4-B, Sector 62, Noida, UP, India</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone size={16} className="text-brand flex-shrink-0" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center space-x-2">
                  <GraduationCap size={16} className="text-brand flex-shrink-0" />
                  <span>info@techminds.com</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs">
            <p>&copy; {new Date().getFullYear()} TechMinds Education Private Limited. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <Link to="/admin" className="hover:text-white transition-colors">Admin Login</Link>
            </div>
          </div>
        </footer>

      </div>
    </Router>
  );
}

// NavLink desktop helper component
function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`relative py-2 text-sm font-semibold tracking-wide transition-colors hover:text-brand ${isActive ? 'text-brand' : 'text-slate-600 dark:text-slate-300'}`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-light to-brand rounded-full animate-pulse-slow"></span>
      )}
    </Link>
  );
}

export default App;
