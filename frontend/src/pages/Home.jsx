import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Code, Brain, Radio, Layers, Eye, ShieldCheck, Award, GraduationCap, ChevronLeft, ChevronRight, CheckCircle2, MessageSquare, ArrowRight, Activity, Users, School, BookOpen } from 'lucide-react';

function Home() {
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    schoolName: '',
    interestType: 'School Partnership',
    subject: 'Request for STEM Lab details',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [schools, setSchools] = useState([]);
  const [activeGradeTab, setActiveGradeTab] = useState('1-3');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Animated counters
  const [stats, setStats] = useState({ students: 0, schools: 0, courses: 0, teachers: 0 });

  useEffect(() => {
    // Fetch data from api
    fetch('https://techminds-backend.onrender.com/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(e => console.log('Err fetching courses:', e));

    fetch('https://techminds-backend.onrender.com/api/testimonials')
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(e => console.log('Err fetching testimonials:', e));

    fetch('https://techminds-backend.onrender.com/api/schools')
      .then(res => res.json())
      .then(data => setSchools(data))
      .catch(e => console.log('Err fetching schools:', e));
  }, []);

  // Rolling counters effect
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 50;
    const intervalTime = duration / steps;
    let step = 0;

    const targetStats = {
      students: 1500,
      schools: 120,
      courses: 15,
      teachers: 75
    };

    const timer = setInterval(() => {
      step++;
      setStats({
        students: Math.floor((targetStats.students / steps) * step),
        schools: Math.floor((targetStats.schools / steps) * step),
        courses: Math.floor((targetStats.courses / steps) * step),
        teachers: Math.floor((targetStats.teachers / steps) * step)
      });

      if (step >= steps) {
        setStats(targetStats);
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitInquiry = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://techminds-backend.onrender.com/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (response.ok) {
        setInquirySubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          schoolName: '',
          interestType: 'School Partnership',
          subject: 'Request for STEM Lab details',
          message: ''
        });
      } else {
        alert(result.message || 'Submission failed');
      }
    } catch (err) {
      alert('Error connecting to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const domainCards = [
    { name: 'Robotics', icon: <Cpu className="text-cyan-400" size={32} />, desc: 'Structural engineering, microcontrollers, and sensory motor control scripts.', path: '/programs/robotics' },
    { name: 'Coding', icon: <Code className="text-indigo-400" size={32} />, desc: 'Logical flow algorithms, variables, and game architectures.', path: '/programs/coding' },
    { name: 'Artificial Intelligence', icon: <Brain className="text-pink-400" size={32} />, desc: 'Machine Learning models, facial expressions recognition, and neural nets.', path: '/programs/ai' },
    { name: 'IoT (Internet of Things)', icon: <Radio className="text-emerald-400" size={32} />, desc: 'Smart environment relays, automation sensors, and connectivity boards.', path: '/programs/iot' },
    { name: 'AR / VR Technology', icon: <Layers className="text-purple-400" size={32} />, desc: 'Virtual laboratories, spatial model creation, and interactive physics.', path: '/programs/ar-vr' },
    { name: 'Drone Tech', icon: <Eye className="text-amber-400" size={32} />, desc: 'Quadcopter flight path parameters, payload mechanics, and drone physics.', path: '/programs/drones' }
  ];

  const grades = [
    { id: '1-3', title: 'Foundations (Grades 1–3)', desc: 'Cultivating curiosity and sensory building. Visual coding blocks and mechanical gearing mechanisms.', skills: ['Visual Spatial Thinking', 'Pattern Coding', 'Basic Mechanical Gears'] },
    { id: '4-5', title: 'Explorers (Grades 4–5)', desc: 'Developing block algorithms. Creative animation pathways and conditional circuit behaviors.', skills: ['Conditionals & Logic Loops', 'Friction & Force Physics', 'Interactive Storytelling'] },
    { id: '6-7', title: 'Innovators (Grades 6–7)', desc: 'Physical electronics. Setting up circuit boards, reading sensors, and building functional IoT prototypes.', skills: ['Sensors Integration', 'Breadboarding & Voltages', 'Basic Scripting'] },
    { id: '8-9', title: 'Engineers (Grades 8–9)', desc: 'Textual code control. Programming custom Python code for multi-sensor modular vehicles and automation.', skills: ['Python Programming', 'Autonomous Pathing', 'Logic Troubleshooting'] },
    { id: '10-12', title: 'Visionaries (Grades 10–12)', desc: 'Advanced computational research. Aerodynamics quadcopters, computer vision routing, and basic neural nets.', skills: ['Computer Vision (OpenCV)', 'Machine Learning Models', 'Aerospace Avionics'] }
  ];

  const nextTestimonial = () => {
    if (testimonials.length > 0) {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }
  };

  const prevTestimonial = () => {
    if (testimonials.length > 0) {
      setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  return (
    <div className="relative overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-slate-900 dark:via-darkbg dark:to-darkbg bg-gradient-to-b from-slate-100 to-white text-slate-900 dark:text-white transition-colors duration-300">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#2c3b59_1px,transparent_1px)] [background-size:24px_24px] opacity-10 dark:opacity-25 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/20 dark:border-brand/40 text-brand text-xs font-bold uppercase tracking-wider">
              <Activity size={12} className="animate-pulse" />
              <span>Futuristic K-12 STEM Curriculum</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Future-Ready Learning for <span className="bg-gradient-to-r from-brand-light to-brand bg-clip-text text-transparent">Every Student</span>
            </h1>
            
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Equip your school with top-tier Robotics, Coding, IoT, Artificial Intelligence, and Smart Laboratories. Fully customized lesson plans aligned with major educational boards.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link to="/schools-partnership" className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 h-14 bg-gradient-to-r from-brand to-brand-dark text-white rounded-xl font-bold shadow-lg hover:shadow-brand/25 hover:translate-y-[-2px] transition-all duration-200">
                <span>Partner Your School</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/programs" className="w-full sm:w-auto flex items-center justify-center px-8 h-14 border dark:border-darkbg-border dark:hover:bg-slate-800 hover:bg-slate-100 rounded-xl font-semibold transition-colors duration-200">
                Explore Programs
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="w-full aspect-square max-w-[460px] mx-auto rounded-3xl bg-gradient-to-tr from-brand/20 to-purple-500/20 border border-brand/10 dark:border-slate-800 relative flex items-center justify-center neon-glow-cyan">
              {/* Dynamic decorative shapes */}
              <div className="absolute top-8 left-8 w-16 h-16 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand animate-bounce" style={{ animationDuration: '4s' }}>
                <Cpu size={28} />
              </div>
              <div className="absolute bottom-12 right-6 w-20 h-20 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 animate-spin-slow">
                <Code size={32} />
              </div>
              
              {/* Central vector-like graphic element */}
              <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-brand to-purple-600 flex items-center justify-center relative shadow-2xl">
                <div className="w-[96%] h-[96%] rounded-full bg-white dark:bg-darkbg flex flex-col items-center justify-center text-center p-6">
                  <GraduationCap size={72} className="text-brand mb-2 animate-pulse-slow" />
                  <span className="font-extrabold text-2xl">TechMinds Lab</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-semibold">Ready for Deployment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STEM Domains Cards */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Futuristic STEM Technologies We Cover</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Our modular training guides introduce students to physical engineering and logical scripting systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {domainCards.map((card, idx) => (
            <Link 
              key={idx} 
              to={card.path} 
              className="glass-panel p-8 rounded-2xl border dark:border-darkbg-border hover-lift shadow-sm hover:shadow-md transition-all relative overflow-hidden block group text-left"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-tr from-brand/5 to-brand/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform"></div>
              <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 transition-colors group-hover:bg-brand/10">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-brand transition-colors">{card.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{card.desc}</p>
              <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-wider text-brand group-hover:text-brand-light transition-colors">
                <span>Learn More</span>
                <ArrowRight size={14} className="ml-1.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Statistics Counter */}
      <section className="py-16 bg-slate-900 text-white relative transition-colors">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10">
          <div className="space-y-1">
            <p className="text-4xl sm:text-5xl font-extrabold text-brand-light">{stats.students}+</p>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold uppercase tracking-wider">Students Trained</p>
          </div>
          <div className="space-y-1">
            <p className="text-4xl sm:text-5xl font-extrabold text-brand-light">{stats.schools}+</p>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold uppercase tracking-wider">Partner Schools</p>
          </div>
          <div className="space-y-1">
            <p className="text-4xl sm:text-5xl font-extrabold text-brand-light">{stats.courses}+</p>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold uppercase tracking-wider">Premium Curriculums</p>
          </div>
          <div className="space-y-1">
            <p className="text-4xl sm:text-5xl font-extrabold text-brand-light">{stats.teachers}+</p>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold uppercase tracking-wider">Certified Educators</p>
          </div>
        </div>
      </section>

      {/* 4. Why Choose TechMinds */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <div className="inline-flex px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-wider">
            Why TechMinds
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Empowering Schools with Complete STEM Ecosystems</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We don’t just sell boxes or software – we partner with your institution to build a thriving culture of hardware hacking, code literacy, and scientific inquiry.
          </p>

          <div className="space-y-4 pt-2">
            {[
              { title: 'End-to-End Execution', desc: 'From physical laboratory remodeling to teacher guides and kits procurement.' },
              { title: 'Affiliated STEM Syllabus', desc: 'Curriculum structured to match CBSE, ICSE, and international board standards.' },
              { title: 'Active Teacher Mentoring', desc: 'Frequent Capacity Building Workshops (CBP) with certification.' },
              { title: 'Modular Hardware Kits', desc: 'Robust child-friendly robotics units and custom shields designed to last.' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <CheckCircle2 className="text-emerald-500 mt-1 flex-shrink-0" size={18} />
                <div>
                  <h4 className="font-bold text-base">{item.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative glass-panel p-8 rounded-3xl border dark:border-darkbg-border flex flex-col justify-center space-y-6 min-h-[400px]">
          <div className="absolute -top-12 -left-12 w-24 h-24 bg-brand/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center space-x-4 border-b dark:border-slate-800 pb-6">
            <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
              <Award size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">STEM Certification</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Trusted by 100+ school managements</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm italic leading-relaxed text-slate-600 dark:text-slate-300">
              "Establishing the TechMinds Lab has dramatically increased school admissions. Parents are ecstatic to see their kids building sensor circuits rather than just scrolling screen apps."
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center text-xs">V</div>
              <div>
                <p className="text-xs font-bold">Vikas Singhania</p>
                <p className="text-[10px] text-slate-500">Board Trustee, Greenfield Academics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Programs by Grade (Tabbed UI) */}
      <section className="py-24 bg-slate-100 dark:bg-slate-900/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Targeted STEM Pathways by Grade</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Select your school grades to preview our specialized curriculum modules and physical kit setups.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {grades.map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveGradeTab(g.id)}
                className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${activeGradeTab === g.id ? 'bg-brand text-white shadow-md' : 'bg-white dark:bg-darkbg hover:bg-slate-200 dark:hover:bg-slate-800'}`}
              >
                Grade {g.id}
              </button>
            ))}
          </div>

          {/* Active Tab Panel */}
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border dark:border-darkbg-border max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fade-in-up">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-wider font-extrabold text-brand bg-brand/10 px-3 py-1 rounded-full">Pathway Profile</span>
              <h3 className="text-2xl font-bold">{grades.find(g => g.id === activeGradeTab).title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {grades.find(g => g.id === activeGradeTab).desc}
              </p>
              
              <div className="space-y-3">
                <p className="text-xs font-extrabold uppercase text-slate-500 tracking-wider">Key Skills Learnt:</p>
                {grades.find(g => g.id === activeGradeTab).skills.map((skill, i) => (
                  <div key={i} className="flex items-center space-x-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 size={16} className="text-brand flex-shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link to="/programs" className="inline-flex items-center space-x-1.5 text-sm font-bold text-brand hover:underline">
                  <span>View Details Syllabus</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="w-full aspect-video md:aspect-square bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden relative border dark:border-slate-700 shadow-inner flex items-center justify-center">
              {/* Dynamic decorative icon placeholder representing lab setups */}
              <div className="text-center p-6 space-y-3">
                <GraduationCap size={48} className="mx-auto text-slate-400 animate-pulse-slow" />
                <p className="text-xs text-slate-500 font-semibold">Modular Kit Setup & Interactive Lessons Included</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. School Partners Carousel / Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-8">Trusted by Progressive Boarding & Day Schools</h3>
        
        {schools.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-items-center opacity-70">
            {schools.map((school) => (
              <div key={school._id || school.id} className="p-4 glass-panel border dark:border-darkbg-border rounded-xl w-full max-w-[200px] hover:opacity-100 transition-opacity">
                {school.logo ? (
                  <img src={school.logo} alt={school.name} className="h-12 object-contain mx-auto filter dark:invert" />
                ) : (
                  <div className="h-12 flex items-center justify-center text-xs font-extrabold uppercase">{school.name}</div>
                )}
                <p className="text-[10px] text-slate-500 font-semibold mt-2">{school.location}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 dark:opacity-40">
            <span className="font-extrabold text-sm sm:text-base tracking-wider">PINEGROVE SCHOOL</span>
            <span className="font-extrabold text-sm sm:text-base tracking-wider">HERITAGE ACADEMY</span>
            <span className="font-extrabold text-sm sm:text-base tracking-wider">ST. XAVIER HIGH</span>
            <span className="font-extrabold text-sm sm:text-base tracking-wider">DPS INTERNATIONAL</span>
          </div>
        )}
      </section>

      {/* 7. Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-24 bg-slate-900 text-white transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative">
            <MessageSquare size={48} className="mx-auto text-brand-light opacity-30" />
            
            <p className="text-lg sm:text-xl md:text-2xl font-light italic leading-relaxed">
              "{testimonials[activeTestimonial].text}"
            </p>

            <div>
              <p className="font-bold text-base text-brand-light">{testimonials[activeTestimonial].name}</p>
              <p className="text-xs text-slate-400">{testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].school}</p>
            </div>

            {/* Testimonials nav keys */}
            <div className="flex items-center justify-center space-x-3 pt-4">
              <button onClick={prevTestimonial} className="p-2 rounded-lg bg-slate-800 hover:bg-brand transition-colors text-white">
                <ChevronLeft size={18} />
              </button>
              <button onClick={nextTestimonial} className="p-2 rounded-lg bg-slate-800 hover:bg-brand transition-colors text-white">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 8. Quick Inquiry Contact Form */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5 space-y-6">
          <span className="text-xs uppercase tracking-wider font-extrabold text-brand bg-brand/10 px-3 py-1 rounded-full">School Partnerships</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to Set Up Your Robotics & AI Lab?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Fill in details about your institution, and our STEM development managers will schedule a physical inspection session and layout a proposal.
          </p>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-10 h-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center">
              <GraduationCap size={20} />
            </div>
            <div>
              <p className="font-bold">Affiliation Ready</p>
              <p className="text-xs text-slate-500">Board certified curriculum catalogs.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border dark:border-darkbg-border shadow-lg">
          {inquirySubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-bold">Inquiry Sent Successfully!</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Thank you for your interest. A TechMinds educational advisor will review your data and email you shortly.
              </p>
              <button 
                onClick={() => setInquirySubmitted(false)}
                className="mt-4 px-6 py-2 bg-brand text-white rounded-lg text-sm font-semibold"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitInquiry} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-500">Contact Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Principal Anita Sharma"
                    className="w-full h-11 px-4 border dark:border-darkbg-border dark:bg-darkbg rounded-lg text-sm focus:outline-none focus:border-brand"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-500">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. principal@school.com"
                    className="w-full h-11 px-4 border dark:border-darkbg-border dark:bg-darkbg rounded-lg text-sm focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-500">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +91 98765 XXXXX"
                    className="w-full h-11 px-4 border dark:border-darkbg-border dark:bg-darkbg rounded-lg text-sm focus:outline-none focus:border-brand"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-500">School Name</label>
                  <input
                    type="text"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleInputChange}
                    placeholder="e.g. St. Xavier High School"
                    className="w-full h-11 px-4 border dark:border-darkbg-border dark:bg-darkbg rounded-lg text-sm focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-500">Nature of Inquiry</label>
                  <select
                    name="interestType"
                    value={formData.interestType}
                    onChange={handleInputChange}
                    className="w-full h-11 px-4 border dark:border-darkbg-border dark:bg-darkbg rounded-lg text-sm focus:outline-none focus:border-brand"
                  >
                    <option value="School Partnership">School Partnership Setup</option>
                    <option value="STEM Laboratory Setup">STEM Laboratory Setup</option>
                    <option value="Teacher Training Cohorts">Teacher Training Cohorts</option>
                    <option value="Robotics Kits Supplies">Robotics Kits Supplies</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-500">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief outline"
                    className="w-full h-11 px-4 border dark:border-darkbg-border dark:bg-darkbg rounded-lg text-sm focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-500">Message Details</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Outline your school lab expectations or requirements..."
                  className="w-full p-4 border dark:border-darkbg-border dark:bg-darkbg rounded-lg text-sm focus:outline-none focus:border-brand"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-brand text-white font-bold rounded-lg text-sm flex items-center justify-center space-x-2 shadow-md hover:bg-brand-dark transition-colors disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Send Inquiry Request'}
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}

export default Home;
