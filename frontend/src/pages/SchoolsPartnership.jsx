import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, School, Shield, Zap, Users, BookOpen, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

function SchoolsPartnership() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', schoolName: '',
    interestType: 'School Partnership',
    subject: 'Partnership Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', schoolName: '', interestType: 'School Partnership', subject: 'Partnership Inquiry', message: '' });
      }
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const partnershipModels = [
    {
      title: 'Full STEM Lab Partnership',
      desc: 'Complete end-to-end setup including lab infrastructure, hardware kits, teacher training, and ongoing curriculum support for the entire academic year.',
      features: ['Lab Setup & Civil Work', 'Hardware Kits for All Grades', 'Annual Teacher CBP', 'Monthly Progress Reports', 'Dedicated School Coordinator'],
      recommended: true
    },
    {
      title: 'Curriculum-Only Integration',
      desc: 'Use your existing computer lab infrastructure. We provide the curriculum framework, lesson plans, assessment rubrics, and remote teacher support.',
      features: ['Digital Curriculum Access', 'Lesson Plans & Rubrics', 'Online Teacher Support', 'Student Dashboard', 'Quarterly Webinars'],
      recommended: false
    },
    {
      title: 'After-School Club Model',
      desc: 'TechMinds-operated after-school robotics and coding clubs. Our trained facilitators conduct 2-3 sessions per week without disrupting regular timetables.',
      features: ['Trained TechMinds Facilitators', 'All Kits Provided', 'No Timetable Changes', 'Student Portfolios', 'Annual Exhibition Support'],
      recommended: false
    }
  ];

  return (
    <div className="py-12 space-y-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Schools Partnership</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base">
          Join 100+ progressive schools that have already integrated TechMinds STEM programs. Choose the partnership model that fits your institution best.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-brand-light to-brand mx-auto rounded-full mt-4"></div>
      </section>

      {/* Partnership Models */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {partnershipModels.map((model, idx) => (
          <div key={idx} className={`glass-panel rounded-3xl border overflow-hidden flex flex-col relative ${model.recommended ? 'border-brand dark:border-brand shadow-lg shadow-brand/10' : 'dark:border-darkbg-border'}`}>
            {model.recommended && (
              <div className="bg-gradient-to-r from-brand to-brand-dark text-white text-center py-2 text-xs font-extrabold uppercase tracking-widest">
                Most Popular
              </div>
            )}
            <div className="p-8 flex-1 flex flex-col space-y-6">
              <h3 className="text-xl font-bold">{model.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">{model.desc}</p>
              
              <div className="space-y-3 pt-4 border-t dark:border-darkbg-border">
                {model.features.map((feat, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <Link 
                to="#inquiry-form" 
                onClick={() => document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
                className={`mt-auto flex items-center justify-center space-x-2 h-12 rounded-xl font-bold text-sm transition-all ${model.recommended ? 'bg-gradient-to-r from-brand to-brand-dark text-white shadow-md hover:shadow-lg' : 'border dark:border-darkbg-border hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                <span>Get Started</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Why Partner With Us */}
      <section className="py-16 bg-slate-100 dark:bg-slate-900/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Why Schools Choose TechMinds</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Shield size={24} className="text-brand" />, title: 'Zero Risk Onboarding', desc: 'Free pilot program for 1 month before committing to annual contracts.' },
              { icon: <Zap size={24} className="text-amber-400" />, title: 'Rapid Deployment', desc: 'Fully operational STEM lab within 4 weeks of agreement signing.' },
              { icon: <Users size={24} className="text-emerald-400" />, title: 'Dedicated Coordinators', desc: 'Each partner school gets an assigned TechMinds relationship manager.' },
              { icon: <Award size={24} className="text-purple-400" />, title: 'Exhibition Support', desc: 'Annual inter-school science exhibitions and robotics competitions organized.' }
            ].map((item, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border dark:border-darkbg-border space-y-3 text-center">
                <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center mx-auto">{item.icon}</div>
                <h4 className="font-bold text-sm">{item.title}</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry-form" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border dark:border-darkbg-border shadow-lg">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl font-bold">Start Your Partnership Journey</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">Fill in your school details and we'll schedule a campus visit within 72 hours.</p>
          </div>

          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 size={48} className="mx-auto text-emerald-500" />
              <h3 className="text-xl font-bold">Partnership Request Submitted!</h3>
              <p className="text-sm text-slate-500">Our school partnerships team will contact you shortly.</p>
              <button onClick={() => setSubmitted(false)} className="mt-4 px-6 py-2 bg-brand text-white rounded-lg text-sm font-semibold">Submit Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-500">Your Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Principal / Coordinator name" className="w-full h-11 px-4 border dark:border-darkbg-border dark:bg-darkbg rounded-lg text-sm focus:outline-none focus:border-brand" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-500">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="school@example.com" className="w-full h-11 px-4 border dark:border-darkbg-border dark:bg-darkbg rounded-lg text-sm focus:outline-none focus:border-brand" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-500">Phone</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="w-full h-11 px-4 border dark:border-darkbg-border dark:bg-darkbg rounded-lg text-sm focus:outline-none focus:border-brand" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-500">School Name</label>
                  <input type="text" name="schoolName" value={formData.schoolName} onChange={handleChange} required placeholder="Institution name" className="w-full h-11 px-4 border dark:border-darkbg-border dark:bg-darkbg rounded-lg text-sm focus:outline-none focus:border-brand" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-500">Tell Us About Your Requirements</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} placeholder="Number of students, existing infrastructure, preferred grades..." className="w-full p-4 border dark:border-darkbg-border dark:bg-darkbg rounded-lg text-sm focus:outline-none focus:border-brand" />
              </div>
              <button type="submit" disabled={loading} className="w-full h-12 bg-gradient-to-r from-brand to-brand-dark text-white font-bold rounded-lg text-sm flex items-center justify-center shadow-md hover:shadow-lg transition-all disabled:opacity-50">
                {loading ? 'Submitting...' : 'Submit Partnership Request'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default SchoolsPartnership;
