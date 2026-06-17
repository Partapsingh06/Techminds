import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Cpu, Database, Eye, CheckCircle2, Award, ArrowRight } from 'lucide-react';

function AI() {
  const models = [
    { name: 'Computer Vision (CV)', desc: 'Analyzing video feeds, processing frame coordinates, tracking motion, and detecting facial expression states in real-time.', icon: <Eye className="text-cyan-400" size={24} /> },
    { name: 'Dataset & Classification', desc: 'Understanding supervised learning, creating image labels directories, and training basic decision logic trees.', icon: <Database className="text-pink-400" size={24} /> },
    { name: 'Neural Network Logic', desc: 'Demystifying weights, layers, nodes, inputs, and deep predictive architectures through simple visual simulator tools.', icon: <Brain className="text-indigo-400" size={24} /> }
  ];

  const syllabus = [
    { level: 'Foundations (Grades 1-3)', title: 'Pattern Recognition', details: 'Introduction to simple pattern grouping, basic shapes sort rules, and conditional visual triggers.' },
    { level: 'Explorers (Grades 4-5)', title: 'Speech & Text Models', details: 'Integrating pre-trained audio classifications, voice commands trigger scripts, and basic chatbots.' },
    { level: 'Innovators (Grades 6-7)', title: 'Image Classification Labs', details: 'Labeling image folders, compiling custom model libraries (Teachable Machine), and sorting sensor telemetry.' },
    { level: 'Engineers (Grades 8-9)', title: 'Python Computer Vision & AI', details: 'Introduction to OpenCV algorithms, processing live webcams, tracking lines, and bounding-box detection.' },
    { level: 'Visionaries (Grades 10-12)', title: 'Autonomous Decision Systems', details: 'Pathfinding nodes, sensor fusion arrays routing, custom models testing, and model deployment on Raspberry Pi controllers.' }
  ];

  return (
    <div className="py-12 space-y-16">
      {/* 1. Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-brand/10 rounded-3xl blur-3xl pointer-events-none"></div>
        
        <div className="relative glass-panel p-8 sm:p-12 rounded-3xl border dark:border-darkbg-border flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <Link to="/programs" className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-brand hover:underline">
              &larr; Back to Programs
            </Link>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold">
              <Brain size={14} />
              <span>Computational Cognition Pathway</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Artificial Intelligence & Machine Learning
            </h1>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
              Establish conceptual literacy in artificial intelligence. Students learn to classify datasets, train computer vision trackers, inspect neural network structures, and evaluate model ethics.
            </p>
          </div>
          
          <div className="w-full max-w-[320px] aspect-square bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-inner relative flex items-center justify-center border dark:border-slate-700">
            <img 
              src="https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&w=600&q=80" 
              alt="AI Coding Lab" 
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        </div>
      </section>

      {/* 2. Core Concepts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold">Key AI/ML Core Arenas</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Demystifying complex data pipelines through interactive, hands-on mechanical and block modules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {models.map((m, idx) => (
            <div key={idx} className="glass-panel p-8 rounded-2xl border dark:border-darkbg-border hover-lift shadow-sm relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                {m.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{m.name}</h3>
              <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-400 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Timeline progression */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold">Grade-wise AI Pathway</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Curriculum pathways structured for age-appropriate learning blocks.
          </p>
        </div>

        <div className="space-y-6">
          {syllabus.map((s, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border dark:border-darkbg-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover-lift">
              <div className="space-y-1 max-w-xl">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand">{s.level}</span>
                <h3 className="text-base sm:text-lg font-bold">{s.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{s.details}</p>
              </div>
              <Cpu className="text-slate-400 flex-shrink-0 hidden sm:block" size={24} />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Onboarding CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border dark:border-darkbg-border bg-gradient-to-tr from-pink-500/5 to-brand/5 text-center space-y-6">
          <Award size={40} className="mx-auto text-brand animate-pulse-slow" />
          <h2 className="text-2xl sm:text-3xl font-bold">Bring AI & Data Science Classrooms to Your Campus</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            From visual dataset model generators, Python programming interfaces, up to board-accredited training certification programs for your school staff.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/schools-partnership" className="px-6 py-3 bg-brand text-white rounded-xl text-sm font-bold shadow-md hover:opacity-90 transition-opacity">
              Request AI Lab Proposal
            </Link>
            <Link to="/contact" className="px-6 py-3 border dark:border-darkbg-border hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-sm font-semibold transition-colors">
              Contact TechMinds Specialist
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AI;
