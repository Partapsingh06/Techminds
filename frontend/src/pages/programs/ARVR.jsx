import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Box, Compass, Eye, CheckCircle2, Award, Settings } from 'lucide-react';

function ARVR() {
  const categories = [
    { name: '3D Spatial Modeling', desc: 'Understanding axes coordinates, rendering geometry polygons, and styling textures.', icon: <Box className="text-purple-400" size={24} /> },
    { name: 'Physics Simulations', desc: 'Programming virtual gravity engines, bounce elasticity parameters, and forces vectors.', icon: <Compass className="text-cyan-400" size={24} /> },
    { name: 'Augmented Projections', desc: 'Linking virtual objects overlays onto physical cards and markers targets cameras.', icon: <Eye className="text-pink-400" size={24} /> }
  ];

  const syllabus = [
    { level: 'Foundations (Grades 1-3)', title: 'Intro to Spatial Logic', details: 'Navigating 3D grids, modeling basic shapes blocks, and basic symmetry coordinates.' },
    { level: 'Explorers (Grades 4-5)', title: '3D Shapes & Textures', details: 'Importing models mesh files, coloring surfaces, and building simple virtual room spaces.' },
    { level: 'Innovators (Grades 6-7)', title: 'Virtual Physics Labs', details: 'Coding gravity vectors, collisions triggers, elastic bounce rebounds, and friction values.' },
    { level: 'Engineers (Grades 8-9)', title: 'Augmented Reality Projections', details: 'Integrating target card markers, mapping 3D structures on cameras, and mobile simulator tests.' },
    { level: 'Visionaries (Grades 10-12)', title: 'Interactive VR Environments', details: 'Designing complete visual science simulators, solar system orbits models, and full headset deployments.' }
  ];

  return (
    <div className="py-12 space-y-16">
      {/* 1. Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-brand/10 rounded-3xl blur-3xl pointer-events-none"></div>
        
        <div className="relative glass-panel p-8 sm:p-12 rounded-3xl border dark:border-darkbg-border flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <Link to="/programs" className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-brand hover:underline">
              &larr; Back to Programs
            </Link>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold">
              <Layers size={14} />
              <span>Spatial Design Pathway</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              AR & VR Spatial Technologies
            </h1>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
              Step into three-dimensional creation. Our AR/VR syllabus teaches students the mathematics of spatial rendering, coordinate physics engines, and virtual laboratory designs.
            </p>
          </div>
          
          <div className="w-full max-w-[320px] aspect-square bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-inner relative flex items-center justify-center border dark:border-slate-700">
            <img 
              src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=600&q=80" 
              alt="AR VR Headset Simulation" 
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        </div>
      </section>

      {/* 2. Concept grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold">Immersive Creation Pillars</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Practical skills in spatial geometry, virtual laboratory variables, and real-time interactive triggers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((c, idx) => (
            <div key={idx} className="glass-panel p-8 rounded-2xl border dark:border-darkbg-border hover-lift shadow-sm relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                {c.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{c.name}</h3>
              <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-400 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Syllabus path */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold">AR/VR Grade Syllabus Progression</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Step-by-step grade syllabus paths for interactive laboratory models design.
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
              <Settings className="text-slate-400 flex-shrink-0 hidden sm:block" size={24} />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Onboarding CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border dark:border-darkbg-border bg-gradient-to-tr from-purple-500/5 to-brand/5 text-center space-y-6">
          <Award size={40} className="mx-auto text-brand animate-pulse-slow" />
          <h2 className="text-2xl sm:text-3xl font-bold">Deploy 3D & VR Lab Ecosystems</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            We deliver visual design modeling licenses, school virtual library assets, mobile markers setups, and comprehensive certified teacher training.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/schools-partnership" className="px-6 py-3 bg-brand text-white rounded-xl text-sm font-bold shadow-md hover:opacity-90 transition-opacity">
              Request Immersive Lab Setup Proposal
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

export default ARVR;
