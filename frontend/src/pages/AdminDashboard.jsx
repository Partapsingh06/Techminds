import React, { useState, useEffect } from 'react';
import { BarChart3, BookOpen, Users, School, Award, Image, MessageSquare, FileText, Settings, LogOut, Plus, Trash2, Edit, X, Eye, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const API_BASE = '/api';

function AdminDashboard() {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || '');
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [analytics, setAnalytics] = useState(null);

  // Data states
  const [courses, setCourses] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [queries, setQueries] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [schools, setSchools] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [gallery, setGallery] = useState([]);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [modalEntity, setModalEntity] = useState(''); // 'course', 'blog', etc.
  const [modalData, setModalData] = useState({});

  // Auth headers
  const authHeaders = () => ({ 'Authorization': `Bearer ${token}` });

  // Check token on mount
  useEffect(() => {
    if (token) {
      fetch(`${API_BASE}/auth/me`, { headers: authHeaders() })
        .then(res => {
          if (!res.ok) throw new Error('Invalid token');
          return res.json();
        })
        .then(data => setUser(data))
        .catch(() => {
          setToken('');
          localStorage.removeItem('admin_token');
        });
    }
  }, [token]);

  // Fetch data when authenticated
  useEffect(() => {
    if (user) {
      loadAllData();
    }
  }, [user, activeTab]);

  const loadAllData = async () => {
    try {
      const [analyticsRes, coursesRes, blogsRes, queriesRes, testimonialsRes, schoolsRes, trainingsRes, galleryRes] = await Promise.all([
        fetch(`${API_BASE}/analytics`, { headers: authHeaders() }),
        fetch(`${API_BASE}/courses`),
        fetch(`${API_BASE}/blogs`),
        fetch(`${API_BASE}/queries`, { headers: authHeaders() }),
        fetch(`${API_BASE}/testimonials`),
        fetch(`${API_BASE}/schools`),
        fetch(`${API_BASE}/training`),
        fetch(`${API_BASE}/gallery`)
      ]);
      if (analyticsRes.ok) setAnalytics(await analyticsRes.json());
      if (coursesRes.ok) setCourses(await coursesRes.json());
      if (blogsRes.ok) setBlogs(await blogsRes.json());
      if (queriesRes.ok) setQueries(await queriesRes.json());
      if (testimonialsRes.ok) setTestimonials(await testimonialsRes.json());
      if (schoolsRes.ok) setSchools(await schoolsRes.json());
      if (trainingsRes.ok) setTrainings(await trainingsRes.json());
      if (galleryRes.ok) setGallery(await galleryRes.json());
    } catch (err) { console.error('Data load error:', err); }
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('admin_token', data.token);
      } else {
        setLoginError(data.message || 'Login failed');
      }
    } catch (err) { setLoginError('Connection error'); }
    setLoginLoading(false);
  };

  const handleLogout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('admin_token');
  };

  // CRUD Helpers
  const handleDelete = async (entity, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${entity}?`)) return;
    const routeMap = { course: 'courses', blog: 'blogs', testimonial: 'testimonials', school: 'schools', training: 'training', gallery: 'gallery', query: 'queries' };
    try {
      const res = await fetch(`${API_BASE}/${routeMap[entity]}/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      if (res.ok) loadAllData();
      else alert('Delete failed');
    } catch (err) { alert('Error deleting'); }
  };

  const handleUpdateQueryStatus = async (id, status) => {
    try {
      await fetch(`${API_BASE}/queries/${id}`, {
        method: 'PUT',
        headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      loadAllData();
    } catch (err) { console.error(err); }
  };

  const openCreateModal = (entity) => {
    setModalEntity(entity);
    setModalMode('create');
    setModalData({});
    setModalOpen(true);
  };

  const openEditModal = (entity, data) => {
    setModalEntity(entity);
    setModalMode('edit');
    setModalData(data);
    setModalOpen(true);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    const routeMap = { course: 'courses', blog: 'blogs', testimonial: 'testimonials', school: 'schools', training: 'training', gallery: 'gallery' };
    const url = modalMode === 'edit' 
      ? `${API_BASE}/${routeMap[modalEntity]}/${modalData._id || modalData.id}`
      : `${API_BASE}/${routeMap[modalEntity]}`;
    const method = modalMode === 'edit' ? 'PUT' : 'POST';

    try {
      const formDataObj = new FormData();
      Object.entries(modalData).forEach(([key, val]) => {
        if (key === '_id' || key === 'id' || key === 'createdAt' || key === 'updatedAt' || key === '__v') return;
        if (val instanceof File) formDataObj.append(key, val);
        else if (Array.isArray(val)) formDataObj.append(key, JSON.stringify(val));
        else if (val !== undefined && val !== null) formDataObj.append(key, val);
      });

      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataObj
      });
      if (res.ok) {
        setModalOpen(false);
        loadAllData();
      } else {
        const data = await res.json();
        alert(data.message || 'Operation failed');
      }
    } catch (err) { alert('Error: ' + err.message); }
  };

  // ============= LOGIN SCREEN =============
  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-3xl border dark:border-darkbg-border shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand to-brand-dark flex items-center justify-center text-white font-extrabold text-2xl mx-auto shadow-lg">T</div>
            <h1 className="text-2xl font-extrabold">Admin Portal</h1>
            <p className="text-xs text-slate-500">Sign in to manage TechMinds STEM platform</p>
          </div>

          {loginError && (
            <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs font-semibold">
              <AlertCircle size={16} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-slate-500">Email</label>
              <input type="email" value={loginForm.email} onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} required placeholder="admin@techminds.com" className="w-full h-12 px-4 border dark:border-darkbg-border dark:bg-darkbg rounded-xl text-sm focus:outline-none focus:border-brand" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-slate-500">Password</label>
              <input type="password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} required placeholder="Enter password" className="w-full h-12 px-4 border dark:border-darkbg-border dark:bg-darkbg rounded-xl text-sm focus:outline-none focus:border-brand" />
            </div>
            <button type="submit" disabled={loginLoading} className="w-full h-12 bg-gradient-to-r from-brand to-brand-dark text-white font-bold rounded-xl text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50">
              {loginLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
          <p className="text-center text-[10px] text-slate-500">Default: admin@techminds.com / admin123</p>
        </div>
      </div>
    );
  }

  // ============= DASHBOARD =============
  const sidebarTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={18} /> },
    { id: 'courses', label: 'Courses', icon: <BookOpen size={18} /> },
    { id: 'blogs', label: 'Blogs', icon: <FileText size={18} /> },
    { id: 'queries', label: 'Inquiries', icon: <MessageSquare size={18} /> },
    { id: 'testimonials', label: 'Testimonials', icon: <Award size={18} /> },
    { id: 'schools', label: 'Schools', icon: <School size={18} /> },
    { id: 'trainings', label: 'Training', icon: <Users size={18} /> },
    { id: 'gallery', label: 'Gallery', icon: <Image size={18} /> },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 glass-panel border-r dark:border-darkbg-border p-4 lg:p-6 flex-shrink-0">
        <div className="flex items-center space-x-3 mb-8 pb-6 border-b dark:border-darkbg-border">
          <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center text-white font-bold text-lg">T</div>
          <div>
            <p className="font-bold text-sm">{user.name}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Admin</p>
          </div>
        </div>

        <nav className="flex lg:flex-col flex-wrap gap-1">
          {sidebarTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold w-full text-left transition-all ${activeTab === tab.id ? 'bg-brand text-white shadow-md' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </nav>

        <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 mt-6 rounded-xl text-sm font-semibold w-full text-left text-red-500 hover:bg-red-500/10 transition-colors">
          <LogOut size={18} />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        
        {/* ===== DASHBOARD TAB ===== */}
        {activeTab === 'dashboard' && analytics && (
          <div className="space-y-8">
            <h2 className="text-2xl font-extrabold">Dashboard Overview</h2>
            
            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Students', value: analytics.counts.students, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                { label: 'Partner Schools', value: analytics.counts.schools, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                { label: 'STEM Courses', value: analytics.counts.courses, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                { label: 'Certified Teachers', value: analytics.counts.teachers, color: 'text-amber-400', bg: 'bg-amber-500/10' },
                { label: 'Blog Posts', value: analytics.counts.blogs, color: 'text-pink-400', bg: 'bg-pink-500/10' },
                { label: 'Inquiries', value: analytics.counts.inquiries, color: 'text-red-400', bg: 'bg-red-500/10' },
                { label: 'Testimonials', value: analytics.counts.testimonials, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
                { label: 'Training Programs', value: analytics.counts.trainings, color: 'text-teal-400', bg: 'bg-teal-500/10' }
              ].map((stat, idx) => (
                <div key={idx} className="glass-panel p-5 rounded-2xl border dark:border-darkbg-border space-y-2">
                  <p className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Chart */}
            {analytics.chartData && (
              <div className="glass-panel p-6 rounded-2xl border dark:border-darkbg-border">
                <h3 className="text-sm font-bold mb-4">Inquiry Activity (Last 7 Days)</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={analytics.chartData}>
                    <defs>
                      <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0070f3" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0070f3" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip contentStyle={{ background: '#161F30', border: '1px solid #22324D', borderRadius: '12px', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="queries" stroke="#0070f3" strokeWidth={2} fillOpacity={1} fill="url(#colorQueries)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Recent Queries */}
            {analytics.recentQueries && analytics.recentQueries.length > 0 && (
              <div className="glass-panel p-6 rounded-2xl border dark:border-darkbg-border">
                <h3 className="text-sm font-bold mb-4">Recent Inquiries</h3>
                <div className="space-y-3">
                  {analytics.recentQueries.map((q, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-xs">
                          {(q.name || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-xs">{q.name}</p>
                          <p className="text-[10px] text-slate-500">{q.interestType} · {q.email}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${q.status === 'New' ? 'bg-blue-500/10 text-blue-500' : q.status === 'In Progress' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                        {q.status || 'New'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'dashboard' && !analytics && (
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold">Dashboard Overview</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[1,2,3,4].map(n => <div key={n} className="h-24 rounded-2xl animate-shimmer"></div>)}
            </div>
          </div>
        )}

        {/* ===== COURSES TAB ===== */}
        {activeTab === 'courses' && (
          <DataTable
            title="STEM Courses"
            data={courses}
            columns={['title', 'grade', 'category']}
            entity="course"
            onAdd={() => openCreateModal('course')}
            onEdit={(item) => openEditModal('course', item)}
            onDelete={(id) => handleDelete('course', id)}
          />
        )}

        {/* ===== BLOGS TAB ===== */}
        {activeTab === 'blogs' && (
          <DataTable
            title="Blog Posts"
            data={blogs}
            columns={['title', 'category', 'author']}
            entity="blog"
            onAdd={() => openCreateModal('blog')}
            onEdit={(item) => openEditModal('blog', item)}
            onDelete={(id) => handleDelete('blog', id)}
          />
        )}

        {/* ===== QUERIES TAB ===== */}
        {activeTab === 'queries' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold">Contact Inquiries</h2>
              <span className="text-xs text-slate-500">{queries.length} total</span>
            </div>
            
            {queries.length === 0 ? (
              <div className="text-center py-16 glass-panel rounded-2xl border dark:border-darkbg-border space-y-2">
                <MessageSquare size={40} className="mx-auto text-slate-400" />
                <p className="text-sm font-bold">No inquiries yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {queries.map((q) => (
                  <div key={q._id || q.id} className="glass-panel p-5 rounded-2xl border dark:border-darkbg-border space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-sm">{q.name}</h4>
                        <p className="text-[10px] text-slate-500">{q.email} · {q.phone || 'No phone'}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <select
                          value={q.status || 'New'}
                          onChange={(e) => handleUpdateQueryStatus(q._id || q.id, e.target.value)}
                          className="text-[10px] px-2 py-1 rounded-lg border dark:border-darkbg-border dark:bg-darkbg font-bold"
                        >
                          <option value="New">New</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                        <button onClick={() => handleDelete('query', q._id || q.id)} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
                      {q.schoolName && <p><span className="font-bold text-slate-500">School:</span> {q.schoolName}</p>}
                      <p><span className="font-bold text-slate-500">Type:</span> {q.interestType}</p>
                      {q.subject && <p><span className="font-bold text-slate-500">Subject:</span> {q.subject}</p>}
                      <p className="pt-1 border-t dark:border-darkbg-border mt-2">{q.message}</p>
                    </div>
                    <p className="text-[10px] text-slate-400 flex items-center space-x-1">
                      <Clock size={10} />
                      <span>{q.createdAt ? new Date(q.createdAt).toLocaleString() : 'N/A'}</span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== TESTIMONIALS TAB ===== */}
        {activeTab === 'testimonials' && (
          <DataTable
            title="Testimonials"
            data={testimonials}
            columns={['name', 'role', 'school']}
            entity="testimonial"
            onAdd={() => openCreateModal('testimonial')}
            onEdit={(item) => openEditModal('testimonial', item)}
            onDelete={(id) => handleDelete('testimonial', id)}
          />
        )}

        {/* ===== SCHOOLS TAB ===== */}
        {activeTab === 'schools' && (
          <DataTable
            title="Partner Schools"
            data={schools}
            columns={['name', 'location', 'status']}
            entity="school"
            onAdd={() => openCreateModal('school')}
            onEdit={(item) => openEditModal('school', item)}
            onDelete={(id) => handleDelete('school', id)}
          />
        )}

        {/* ===== TRAININGS TAB ===== */}
        {activeTab === 'trainings' && (
          <DataTable
            title="Training Programs"
            data={trainings}
            columns={['title', 'duration', 'targetAudience']}
            entity="training"
            onAdd={() => openCreateModal('training')}
            onEdit={(item) => openEditModal('training', item)}
            onDelete={(id) => handleDelete('training', id)}
          />
        )}

        {/* ===== GALLERY TAB ===== */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold">Gallery Images</h2>
              <button onClick={() => openCreateModal('gallery')} className="flex items-center space-x-2 px-4 py-2.5 bg-brand text-white rounded-xl text-xs font-bold shadow-md hover:bg-brand-dark transition-colors">
                <Plus size={14} />
                <span>Upload Image</span>
              </button>
            </div>
            
            {gallery.length === 0 ? (
              <div className="text-center py-16 glass-panel rounded-2xl border dark:border-darkbg-border space-y-2">
                <Image size={40} className="mx-auto text-slate-400" />
                <p className="text-sm font-bold">No gallery images</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {gallery.map((img) => (
                  <div key={img._id || img.id} className="relative group aspect-square bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden">
                    <img src={img.image} alt={img.title || 'Gallery'} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <button onClick={() => handleDelete('gallery', img._id || img.id)} className="p-2 bg-red-500 text-white rounded-lg text-xs">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-white text-[10px] font-bold truncate">{img.title}</p>
                      <p className="text-white/60 text-[9px]">{img.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* ===== MODAL ===== */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setModalOpen(false)}>
          <div className="w-full max-w-lg max-h-[85vh] overflow-y-auto glass-panel rounded-3xl border dark:border-darkbg-border shadow-2xl p-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold capitalize">{modalMode === 'edit' ? `Edit ${modalEntity}` : `Create ${modalEntity}`}</h3>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"><X size={18} /></button>
            </div>

            <form onSubmit={handleModalSubmit} className="space-y-4">
              {modalEntity === 'course' && (
                <>
                  <ModalInput label="Title" name="title" value={modalData.title || ''} onChange={v => setModalData({...modalData, title: v})} />
                  <div className="grid grid-cols-2 gap-4">
                    <ModalSelect label="Grade" name="grade" value={modalData.grade || '1-3'} options={['1-3','4-5','6-7','8-9','10-12']} onChange={v => setModalData({...modalData, grade: v})} />
                    <ModalSelect label="Category" name="category" value={modalData.category || 'Robotics'} options={['Robotics','Coding','AI','IoT','AR/VR','Drone']} onChange={v => setModalData({...modalData, category: v})} />
                  </div>
                  <ModalTextarea label="Description" name="description" value={modalData.description || ''} onChange={v => setModalData({...modalData, description: v})} />
                  <ModalFile label="Image" onChange={f => setModalData({...modalData, image: f})} />
                </>
              )}
              {modalEntity === 'blog' && (
                <>
                  <ModalInput label="Title" name="title" value={modalData.title || ''} onChange={v => setModalData({...modalData, title: v})} />
                  <div className="grid grid-cols-2 gap-4">
                    <ModalInput label="Category" name="category" value={modalData.category || ''} onChange={v => setModalData({...modalData, category: v})} />
                    <ModalInput label="Author" name="author" value={modalData.author || 'TechMinds Admin'} onChange={v => setModalData({...modalData, author: v})} />
                  </div>
                  <ModalTextarea label="Summary" name="summary" value={modalData.summary || ''} onChange={v => setModalData({...modalData, summary: v})} rows={2} />
                  <ModalTextarea label="Content" name="content" value={modalData.content || ''} onChange={v => setModalData({...modalData, content: v})} rows={6} />
                  <ModalFile label="Image" onChange={f => setModalData({...modalData, image: f})} />
                </>
              )}
              {modalEntity === 'testimonial' && (
                <>
                  <ModalInput label="Name" name="name" value={modalData.name || ''} onChange={v => setModalData({...modalData, name: v})} />
                  <div className="grid grid-cols-2 gap-4">
                    <ModalInput label="Role" name="role" value={modalData.role || ''} onChange={v => setModalData({...modalData, role: v})} />
                    <ModalInput label="School" name="school" value={modalData.school || ''} onChange={v => setModalData({...modalData, school: v})} />
                  </div>
                  <ModalTextarea label="Testimonial Text" name="text" value={modalData.text || ''} onChange={v => setModalData({...modalData, text: v})} />
                  <ModalFile label="Avatar" onChange={f => setModalData({...modalData, avatar: f})} />
                </>
              )}
              {modalEntity === 'school' && (
                <>
                  <ModalInput label="School Name" name="name" value={modalData.name || ''} onChange={v => setModalData({...modalData, name: v})} />
                  <ModalInput label="Location" name="location" value={modalData.location || ''} onChange={v => setModalData({...modalData, location: v})} />
                  <ModalSelect label="Status" name="status" value={modalData.status || 'Active'} options={['Active','Inactive']} onChange={v => setModalData({...modalData, status: v})} />
                  <ModalFile label="School Logo" onChange={f => setModalData({...modalData, logo: f})} />
                </>
              )}
              {modalEntity === 'training' && (
                <>
                  <ModalInput label="Title" name="title" value={modalData.title || ''} onChange={v => setModalData({...modalData, title: v})} />
                  <div className="grid grid-cols-2 gap-4">
                    <ModalInput label="Duration" name="duration" value={modalData.duration || ''} onChange={v => setModalData({...modalData, duration: v})} />
                    <ModalInput label="Target Audience" name="targetAudience" value={modalData.targetAudience || ''} onChange={v => setModalData({...modalData, targetAudience: v})} />
                  </div>
                  <ModalTextarea label="Description" name="description" value={modalData.description || ''} onChange={v => setModalData({...modalData, description: v})} />
                  <ModalFile label="Image" onChange={f => setModalData({...modalData, image: f})} />
                </>
              )}
              {modalEntity === 'gallery' && (
                <>
                  <ModalInput label="Title" name="title" value={modalData.title || ''} onChange={v => setModalData({...modalData, title: v})} />
                  <ModalSelect label="Category" name="category" value={modalData.category || 'General'} options={['General','STEM Labs','Events','Robotics Kits']} onChange={v => setModalData({...modalData, category: v})} />
                  <ModalFile label="Image *" onChange={f => setModalData({...modalData, image: f})} required />
                </>
              )}
              <button type="submit" className="w-full h-11 bg-brand text-white font-bold rounded-xl text-sm shadow-md hover:bg-brand-dark transition-colors">
                {modalMode === 'edit' ? 'Save Changes' : 'Create'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== Reusable Sub-Components =====

function DataTable({ title, data, columns, entity, onAdd, onEdit, onDelete }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold">{title}</h2>
        <button onClick={onAdd} className="flex items-center space-x-2 px-4 py-2.5 bg-brand text-white rounded-xl text-xs font-bold shadow-md hover:bg-brand-dark transition-colors">
          <Plus size={14} />
          <span>Add New</span>
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-16 glass-panel rounded-2xl border dark:border-darkbg-border space-y-2">
          <BookOpen size={40} className="mx-auto text-slate-400" />
          <p className="text-sm font-bold">No {title.toLowerCase()} yet</p>
          <p className="text-[10px] text-slate-500">Click "Add New" to create your first entry.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border dark:border-darkbg-border">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-extrabold">#</th>
                {columns.map((col) => (
                  <th key={col} className="px-5 py-3 font-extrabold">{col.replace(/([A-Z])/g, ' $1').trim()}</th>
                ))}
                <th className="px-5 py-3 font-extrabold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-darkbg-border">
              {data.map((item, idx) => (
                <tr key={item._id || item.id || idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-5 py-3 font-semibold text-slate-500 text-xs">{idx + 1}</td>
                  {columns.map((col) => (
                    <td key={col} className="px-5 py-3 text-xs max-w-[200px] truncate">{item[col] || '—'}</td>
                  ))}
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button onClick={() => onEdit(item)} className="p-1.5 text-brand hover:bg-brand/10 rounded-lg transition-colors"><Edit size={14} /></button>
                      <button onClick={() => onDelete(item._id || item.id)} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ModalInput({ label, name, value, onChange, ...rest }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">{label}</label>
      <input type="text" name={name} value={value} onChange={e => onChange(e.target.value)} className="w-full h-10 px-3 border dark:border-darkbg-border dark:bg-darkbg rounded-lg text-sm focus:outline-none focus:border-brand" {...rest} />
    </div>
  );
}

function ModalTextarea({ label, name, value, onChange, rows = 3 }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">{label}</label>
      <textarea name={name} value={value} onChange={e => onChange(e.target.value)} rows={rows} className="w-full p-3 border dark:border-darkbg-border dark:bg-darkbg rounded-lg text-sm focus:outline-none focus:border-brand" />
    </div>
  );
}

function ModalSelect({ label, name, value, options, onChange }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">{label}</label>
      <select name={name} value={value} onChange={e => onChange(e.target.value)} className="w-full h-10 px-3 border dark:border-darkbg-border dark:bg-darkbg rounded-lg text-sm focus:outline-none focus:border-brand">
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function ModalFile({ label, onChange, required = false }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">{label}</label>
      <input type="file" accept="image/*" required={required} onChange={e => { if (e.target.files[0]) onChange(e.target.files[0]); }} className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand/10 file:text-brand hover:file:bg-brand/20 cursor-pointer" />
    </div>
  );
}

export default AdminDashboard;
