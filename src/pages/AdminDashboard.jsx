import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import { 
  FiFolder, FiCpu, FiMessageSquare, FiMail, FiBookOpen, 
  FiPlus, FiTrash2, FiEdit2, FiCheck, FiLogOut, FiHome, 
  FiUpload, FiBarChart2, FiGlobe, FiGithub, FiUser 
} from 'react-icons/fi';
import CursorGlow from '../components/CursorGlow.jsx';

const AdminDashboard = () => {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Data States
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  // Form toggles and states
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState('');
  const [uploading, setUploading] = useState(false);

  // Forms
  const [projectForm, setProjectForm] = useState({
    title: '', description: '', category: 'AI Automation', techStack: '', image: '', liveLink: '', githubLink: '', featured: false
  });
  const [serviceForm, setServiceForm] = useState({
    title: '', description: '', icon: 'FiCpu', category: 'core'
  });
  const [testimonialForm, setTestimonialForm] = useState({
    name: '', company: '', rating: 5, text: '', image: ''
  });
  const [blogForm, setBlogForm] = useState({
    title: '', summary: '', content: '', tags: '', image: '', author: 'AI Agency Lead'
  });

  // Load dashboard dataset
  const loadData = async () => {
    try {
      const [pRes, sRes, tRes, bRes, mRes, nRes] = await Promise.all([
        axios.get('/projects').catch(() => ({ data: [] })),
        axios.get('/services').catch(() => ({ data: [] })),
        axios.get('/testimonials').catch(() => ({ data: [] })),
        axios.get('/blogs').catch(() => ({ data: [] })),
        axios.get('/messages').catch(() => ({ data: [] })),
        axios.get('/newsletter').catch(() => ({ data: [] }))
      ]);

      setProjects(pRes.data);
      setServices(sRes.data);
      setTestimonials(tRes.data);
      setBlogs(bRes.data);
      setMessages(mRes.data);
      setSubscribers(nRes.data);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Image Upload helper
  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const res = await axios.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const url = res.data.url;
      
      if (type === 'project') setProjectForm(prev => ({ ...prev, image: url }));
      if (type === 'testimonial') setTestimonialForm(prev => ({ ...prev, image: url }));
      if (type === 'blog') setBlogForm(prev => ({ ...prev, image: url }));
      
      alert('Image uploaded successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to upload image. (Ensure server is online and accepts Multer uploads)');
    } finally {
      setUploading(false);
    }
  };

  // CRUD handlers: PROJECTS
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...projectForm,
      techStack: typeof projectForm.techStack === 'string' 
        ? projectForm.techStack.split(',').map(s => s.trim()) 
        : projectForm.techStack
    };

    try {
      if (editMode) {
        await axios.put(`/projects/${editId}`, payload);
      } else {
        await axios.post('/projects', payload);
      }
      loadData();
      resetProjectForm();
      alert(editMode ? 'Project updated!' : 'Project created!');
    } catch (err) {
      console.error(err);
      alert('Error saving project.');
    }
  };

  const editProject = (p) => {
    setEditMode(true);
    setEditId(p._id);
    setProjectForm({
      title: p.title,
      description: p.description,
      category: p.category,
      techStack: p.techStack.join(', '),
      image: p.image,
      liveLink: p.liveLink || '',
      githubLink: p.githubLink || '',
      featured: p.featured || false
    });
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Delete project?')) return;
    try {
      await axios.delete(`/projects/${id}`);
      loadData();
    } catch (err) {
      alert('Error deleting.');
    }
  };

  const resetProjectForm = () => {
    setProjectForm({ title: '', description: '', category: 'AI Automation', techStack: '', image: '', liveLink: '', githubLink: '', featured: false });
    setEditMode(false);
    setEditId('');
  };

  // CRUD handlers: SERVICES
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`/services/${editId}`, serviceForm);
      } else {
        await axios.post('/services', serviceForm);
      }
      loadData();
      resetServiceForm();
      alert('Service saved!');
    } catch (err) {
      alert('Error saving service.');
    }
  };

  const editService = (s) => {
    setEditMode(true);
    setEditId(s._id);
    setServiceForm({ title: s.title, description: s.description, icon: s.icon, category: s.category || 'core' });
  };

  const deleteService = async (id) => {
    if (!window.confirm('Delete service?')) return;
    try {
      await axios.delete(`/services/${id}`);
      loadData();
    } catch (err) {
      alert('Error deleting.');
    }
  };

  const resetServiceForm = () => {
    setServiceForm({ title: '', description: '', icon: 'FiCpu', category: 'core' });
    setEditMode(false);
    setEditId('');
  };

  // CRUD handlers: TESTIMONIALS
  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`/testimonials/${editId}`, testimonialForm);
      } else {
        await axios.post('/testimonials', testimonialForm);
      }
      loadData();
      resetTestimonialForm();
      alert('Testimonial saved!');
    } catch (err) {
      alert('Error saving testimonial.');
    }
  };

  const editTestimonial = (t) => {
    setEditMode(true);
    setEditId(t._id);
    setTestimonialForm({ name: t.name, company: t.company, rating: t.rating, text: t.text, image: t.image });
  };

  const deleteTestimonial = async (id) => {
    if (!window.confirm('Delete testimonial?')) return;
    try {
      await axios.delete(`/testimonials/${id}`);
      loadData();
    } catch (err) {
      alert('Error deleting.');
    }
  };

  const resetTestimonialForm = () => {
    setTestimonialForm({ name: '', company: '', rating: 5, text: '', image: '' });
    setEditMode(false);
    setEditId('');
  };

  // CRUD handlers: BLOGS
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...blogForm,
      tags: typeof blogForm.tags === 'string' 
        ? blogForm.tags.split(',').map(s => s.trim()) 
        : blogForm.tags
    };
    try {
      if (editMode) {
        await axios.put(`/blogs/${editId}`, payload);
      } else {
        await axios.post('/blogs', payload);
      }
      loadData();
      resetBlogForm();
      alert('Blog post saved!');
    } catch (err) {
      alert('Error saving blog.');
    }
  };

  const editBlog = (b) => {
    setEditMode(true);
    setEditId(b._id);
    setBlogForm({
      title: b.title,
      summary: b.summary,
      content: b.content,
      tags: b.tags.join(', '),
      image: b.image,
      author: b.author
    });
  };

  const deleteBlog = async (id) => {
    if (!window.confirm('Delete blog post?')) return;
    try {
      await axios.delete(`/blogs/${id}`);
      loadData();
    } catch (err) {
      alert('Error deleting.');
    }
  };

  const resetBlogForm = () => {
    setBlogForm({ title: '', summary: '', content: '', tags: '', image: '', author: 'AI Agency Lead' });
    setEditMode(false);
    setEditId('');
  };

  // Message Inbox Action handlers
  const markMessageRead = async (id) => {
    try {
      await axios.put(`/messages/${id}/read`);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Delete message lead?')) return;
    try {
      await axios.delete(`/messages/${id}`);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-white font-sans overflow-x-hidden">
      <CursorGlow />

      {/* Top Banner Dashboard Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-black/80 backdrop-blur border-b border-white/5 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-electricBlue to-electricPurple flex items-center justify-center font-bold text-white text-sm shadow-glow-blue">
              Æ
            </div>
            <span className="font-bold text-base tracking-wider uppercase">
              Aethera <span className="text-gray-500 font-light text-xs">Dashboard</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden sm:inline text-xs text-gray-400 font-medium">
              Connected as <span className="text-white font-bold">{user?.name || 'Administrator'}</span>
            </span>
            <a 
              href="/"
              className="text-gray-400 hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <FiHome /> View Site
            </a>
            <button
              onClick={logout}
              className="text-gray-400 hover:text-red-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Sidebar Nav Toggles */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          {[
            { id: 'overview', label: 'Analytics Overview', icon: FiBarChart2 },
            { id: 'projects', label: 'Manage Projects', icon: FiFolder },
            { id: 'services', label: 'Manage Services', icon: FiCpu },
            { id: 'testimonials', label: 'Testimonials', icon: FiMessageSquare },
            { id: 'blogs', label: 'Manage Blogs', icon: FiBookOpen },
            { id: 'messages', label: `Leads Inbox (${messages.filter(m => !m.read).length})`, icon: FiMail },
            { id: 'subscribers', label: 'Newsletter Log', icon: FiGlobe }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setEditMode(false);
                  setEditId('');
                }}
                className={`w-full px-5 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-3 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-electricBlue/10 to-electricPurple/10 border-l-2 border-electricBlue text-white bg-white/[0.01]'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                <Icon size={16} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Content Panel */}
        <div className="lg:col-span-9 glass-panel rounded-3xl p-8 border border-white/5 shadow-glass text-left">
          
          {/* Tab 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white mb-1">System Metrics & Analytics</h2>
                <p className="text-xs text-gray-500">Live counts of loaded documents in MongoDB databases</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: 'Active Projects', count: projects.length, icon: FiFolder, color: 'text-electricBlue' },
                  { label: 'Core Services', count: services.length, icon: FiCpu, color: 'text-electricPurple' },
                  { label: 'Testimonials', count: testimonials.length, icon: FiMessageSquare, color: 'text-emerald-400' },
                  { label: 'Published Blogs', count: blogs.length, icon: FiBookOpen, color: 'text-sky-400' },
                  { label: 'Received Messages', count: messages.length, icon: FiMail, color: 'text-yellow-400' },
                  { label: 'Newsletter List', count: subscribers.length, icon: FiGlobe, color: 'text-teal-400' }
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex items-center justify-between group hover:border-white/10 transition-all">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</span>
                        <span className="text-3xl font-extrabold text-white tracking-tight">{stat.count}</span>
                      </div>
                      <div className={`p-3.5 rounded-xl bg-white/[0.02] border border-white/10 ${stat.color}`}>
                        <Icon size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
                <h4 className="font-bold text-sm text-white mb-2">Technical Status Alert</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  The API server routes are listening locally. Ensure MongoDB services are active to execute CRUD operations in staging. Fallback configurations are enabled for initial client UI presentations.
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white mb-1">Portfolio Database</h2>
                  <p className="text-xs text-gray-500">Insert and edit case studies shown in the portfolio filter section</p>
                </div>
                {editMode && (
                  <button onClick={resetProjectForm} className="text-xs font-bold text-red-400 uppercase tracking-wider">Cancel Edit</button>
                )}
              </div>

              {/* Form block */}
              <form onSubmit={handleProjectSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white/[0.01] p-6 rounded-2xl border border-white/5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Project Title</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    placeholder="Enter project title"
                    className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-electricBlue/40"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="bg-black border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  >
                    <option value="AI Automation">AI Automation</option>
                    <option value="AI Agents">AI Agents</option>
                    <option value="Software Development">Software Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Description</label>
                  <input
                    type="text"
                    required
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    placeholder="Brief description of the work"
                    className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-electricBlue/40"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Tech Stack (comma-separated)</label>
                  <input
                    type="text"
                    required
                    value={projectForm.techStack}
                    onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                    placeholder="React, Express, OpenAI"
                    className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Project Cover Image</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      placeholder="Image URL or upload"
                      className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none flex-grow"
                    />
                    <label className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer text-xs font-semibold">
                      <FiUpload />
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, 'project')} 
                        disabled={uploading}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Live Demo Link</label>
                  <input
                    type="text"
                    value={projectForm.liveLink}
                    onChange={(e) => setProjectForm({ ...projectForm, liveLink: e.target.value })}
                    placeholder="https://live-link.com"
                    className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">GitHub Code Link</label>
                  <input
                    type="text"
                    value={projectForm.githubLink}
                    onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })}
                    placeholder="https://github.com/org/repo"
                    className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-3 sm:col-span-2 pt-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={projectForm.featured}
                    onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                    className="rounded bg-black border-white/5 w-4 h-4 text-electricBlue"
                  />
                  <label htmlFor="featured" className="text-xs text-gray-400 font-medium">Highlight / Feature this project on the Hero block</label>
                </div>
                <div className="sm:col-span-2">
                  <button 
                    type="submit" 
                    className="px-6 py-3 rounded-xl bg-electricBlue text-black font-bold text-xs uppercase tracking-wider"
                  >
                    {editMode ? 'Update Project' : 'Add Project'}
                  </button>
                </div>
              </form>

              {/* Items List */}
              <div className="flex flex-col gap-3">
                <h4 className="font-bold text-sm text-white">Existing Projects ({projects.length})</h4>
                <div className="flex flex-col gap-2 max-h-96 overflow-y-auto no-scrollbar">
                  {projects.map((p) => (
                    <div key={p._id} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5">
                      <div className="flex items-center gap-4">
                        <img src={p.image} className="w-12 h-12 rounded-lg object-cover bg-zinc-800" />
                        <div>
                          <div className="font-bold text-sm text-white">{p.title}</div>
                          <div className="text-[10px] text-gray-500 uppercase tracking-widest">{p.category}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => editProject(p)} className="p-2 text-gray-400 hover:text-white transition-colors"><FiEdit2 size={14} /></button>
                        <button onClick={() => deleteProject(p._id)} className="p-2 text-gray-400 hover:text-red-400 transition-colors"><FiTrash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: SERVICES */}
          {activeTab === 'services' && (
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white mb-1">Services List</h2>
                  <p className="text-xs text-gray-500">Define capabilities showcased in the custom grid component</p>
                </div>
                {editMode && (
                  <button onClick={resetServiceForm} className="text-xs font-bold text-red-400 uppercase tracking-wider">Cancel Edit</button>
                )}
              </div>

              <form onSubmit={handleServiceSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white/[0.01] p-6 rounded-2xl border border-white/5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Service Title</label>
                  <input
                    type="text"
                    required
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                    placeholder="Web Development, AI Agents..."
                    className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">React Icon Key</label>
                  <select
                    value={serviceForm.icon}
                    onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
                    className="bg-black border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  >
                    <option value="FiGlobe">FiGlobe (Websites)</option>
                    <option value="FiCode">FiCode (Software)</option>
                    <option value="FiCpu">FiCpu (AI/Processors)</option>
                    <option value="FiSmartphone">FiSmartphone (Mobile)</option>
                    <option value="FiLayers">FiLayers (Design)</option>
                    <option value="FiCloud">FiCloud (Cloud/Infra)</option>
                    <option value="FiShare2">FiShare2 (APIs)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Service Description</label>
                  <textarea
                    required
                    rows={3}
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                    placeholder="Explain deliverables, benefits, and metrics..."
                    className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none resize-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button 
                    type="submit" 
                    className="px-6 py-3 rounded-xl bg-electricPurple text-white font-bold text-xs uppercase tracking-wider"
                  >
                    {editMode ? 'Update Service' : 'Add Service'}
                  </button>
                </div>
              </form>

              <div className="flex flex-col gap-3">
                <h4 className="font-bold text-sm text-white">Existing Services ({services.length})</h4>
                <div className="flex flex-col gap-2 max-h-96 overflow-y-auto no-scrollbar">
                  {services.map((s) => (
                    <div key={s._id} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-electricBlue text-xs font-semibold">{s.icon}</div>
                        <div className="font-bold text-sm text-white">{s.title}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => editService(s)} className="p-2 text-gray-400 hover:text-white transition-colors"><FiEdit2 size={14} /></button>
                        <button onClick={() => deleteService(s._id)} className="p-2 text-gray-400 hover:text-red-400 transition-colors"><FiTrash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white mb-1">Client Reviews</h2>
                  <p className="text-xs text-gray-500">Insert reviews to update the testimonials carousel slider</p>
                </div>
                {editMode && (
                  <button onClick={resetTestimonialForm} className="text-xs font-bold text-red-400 uppercase tracking-wider">Cancel Edit</button>
                )}
              </div>

              <form onSubmit={handleTestimonialSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white/[0.01] p-6 rounded-2xl border border-white/5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Client Name</label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.name}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                    placeholder="Sarah Jenkins"
                    className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Company / Role</label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.company}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })}
                    placeholder="CEO at NexaTech"
                    className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Rating (1 to 5)</label>
                  <select
                    value={testimonialForm.rating}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })}
                    className="bg-black border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  >
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Client Image</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={testimonialForm.image}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, image: e.target.value })}
                      placeholder="Image URL or upload"
                      className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none flex-grow"
                    />
                    <label className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer text-xs font-semibold">
                      <FiUpload />
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, 'testimonial')} 
                        disabled={uploading}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Testimonial Quote</label>
                  <textarea
                    required
                    rows={3}
                    value={testimonialForm.text}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
                    placeholder="We loved working with them..."
                    className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none resize-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button 
                    type="submit" 
                    className="px-6 py-3 rounded-xl bg-electricBlue text-black font-bold text-xs uppercase tracking-wider"
                  >
                    {editMode ? 'Update Testimonial' : 'Add Testimonial'}
                  </button>
                </div>
              </form>

              <div className="flex flex-col gap-3">
                <h4 className="font-bold text-sm text-white">Existing Reviews ({testimonials.length})</h4>
                <div className="flex flex-col gap-2 max-h-96 overflow-y-auto no-scrollbar">
                  {testimonials.map((t) => (
                    <div key={t._id} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <img src={t.image} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <div className="font-bold text-sm text-white">{t.name}</div>
                          <div className="text-[10px] text-gray-500">{t.company} - {t.rating} Stars</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => editTestimonial(t)} className="p-2 text-gray-400 hover:text-white transition-colors"><FiEdit2 size={14} /></button>
                        <button onClick={() => deleteTestimonial(t._id)} className="p-2 text-gray-400 hover:text-red-400 transition-colors"><FiTrash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: BLOGS */}
          {activeTab === 'blogs' && (
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white mb-1">Company Blogs</h2>
                  <p className="text-xs text-gray-500">Publish or modify industry papers and announcements</p>
                </div>
                {editMode && (
                  <button onClick={resetBlogForm} className="text-xs font-bold text-red-400 uppercase tracking-wider">Cancel Edit</button>
                )}
              </div>

              <form onSubmit={handleBlogSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white/[0.01] p-6 rounded-2xl border border-white/5">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Blog Title</label>
                  <input
                    type="text"
                    required
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    placeholder="Future of Autonomous AI Agents"
                    className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Summary / Excerpt</label>
                  <input
                    type="text"
                    required
                    value={blogForm.summary}
                    onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                    placeholder="Discover why autonomous tools represent a shift..."
                    className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Cover Image</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={blogForm.image}
                      onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                      placeholder="Image URL or upload"
                      className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none flex-grow"
                    />
                    <label className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer text-xs font-semibold">
                      <FiUpload />
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, 'blog')} 
                        disabled={uploading}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Author Name</label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    placeholder="AI Agency Lead"
                    className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={blogForm.tags}
                    onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                    placeholder="Tech, AI, Automations"
                    className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Markdown Content</label>
                  <textarea
                    required
                    rows={6}
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    placeholder="## The era of algorithms..."
                    className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none resize-none font-mono"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button 
                    type="submit" 
                    className="px-6 py-3 rounded-xl bg-electricBlue text-black font-bold text-xs uppercase tracking-wider"
                  >
                    {editMode ? 'Update Blog' : 'Publish Blog'}
                  </button>
                </div>
              </form>

              <div className="flex flex-col gap-3">
                <h4 className="font-bold text-sm text-white">Existing Blogs ({blogs.length})</h4>
                <div className="flex flex-col gap-2 max-h-96 overflow-y-auto no-scrollbar">
                  {blogs.map((b) => (
                    <div key={b._id} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5">
                      <div>
                        <div className="font-bold text-sm text-white">{b.title}</div>
                        <div className="text-[10px] text-gray-500">By {b.author}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => editBlog(b)} className="p-2 text-gray-400 hover:text-white transition-colors"><FiEdit2 size={14} /></button>
                        <button onClick={() => deleteBlog(b._id)} className="p-2 text-gray-400 hover:text-red-400 transition-colors"><FiTrash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 6: MESSAGES INBOX */}
          {activeTab === 'messages' && (
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white mb-1">Inbound Leads Inbox</h2>
                <p className="text-xs text-gray-500">View message inquiries sent by prospective clients via the contact form</p>
              </div>

              <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto no-scrollbar">
                {messages.length === 0 ? (
                  <div className="text-center text-xs text-gray-500 py-10">No customer message inquiries found in database.</div>
                ) : (
                  messages.map((m) => (
                    <div 
                      key={m._id} 
                      className={`p-6 bg-white/[0.01] rounded-2xl border flex flex-col gap-4 transition-all ${
                        m.read ? 'border-white/5' : 'border-electricBlue bg-[#080d12]/20'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white">{m.name}</span>
                            {!m.read && (
                              <span className="text-[8px] font-bold uppercase bg-electricBlue text-black px-1.5 py-0.5 rounded">New Lead</span>
                            )}
                          </div>
                          <span className="text-xs text-gray-400 font-medium">{m.email} {m.phone ? `| ${m.phone}` : ''}</span>
                          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">{m.company || 'Private Person'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {!m.read && (
                            <button 
                              onClick={() => markMessageRead(m._id)}
                              className="p-2 rounded bg-white/5 border border-white/10 hover:border-emerald-500/20 text-gray-400 hover:text-emerald-400 transition-all"
                              title="Mark as Read"
                            >
                              <FiCheck size={14} />
                            </button>
                          )}
                          <button 
                            onClick={() => deleteMessage(m._id)}
                            className="p-2 rounded bg-white/5 border border-white/10 hover:border-red-500/20 text-gray-400 hover:text-red-400 transition-all"
                            title="Delete Lead"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="bg-black/30 border border-white/5 p-4 rounded-xl text-xs text-gray-300 leading-relaxed font-sans">
                        <div className="flex gap-4 border-b border-white/5 pb-2 mb-2 text-gray-500 text-[10px] uppercase font-bold">
                          <span>Service: <span className="text-white">{m.service || 'N/A'}</span></span>
                          <span>Budget: <span className="text-white">{m.budget || 'N/A'}</span></span>
                        </div>
                        {m.text}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Tab 7: NEWSLETTER SUBSCRIBERS */}
          {activeTab === 'subscribers' && (
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white mb-1">Newsletter Subscribers List</h2>
                <p className="text-xs text-gray-500">Collected email addresses for newsletter marketing distributions</p>
              </div>

              <div className="bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-white/[0.02] border-b border-white/5 text-gray-400 font-bold uppercase tracking-wider">
                      <th className="px-6 py-4">Index</th>
                      <th className="px-6 py-4">Email Address</th>
                      <th className="px-6 py-4">Subscribed Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-10 text-center text-gray-600">No subscribers logged in MongoDB</td>
                      </tr>
                    ) : (
                      subscribers.map((sub, index) => (
                        <tr key={sub._id} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                          <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                          <td className="px-6 py-4 font-semibold text-white">{sub.email}</td>
                          <td className="px-6 py-4 text-gray-500">{new Date(sub.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
