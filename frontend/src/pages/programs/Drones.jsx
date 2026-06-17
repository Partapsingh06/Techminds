import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Wind, Radio, Navigation, CheckCircle2, Award, Settings } from 'lucide-react';

function Drones() {
  const flightPrinciples = [
    { name: 'Quadcopter Aerodynamics', desc: 'Analyzing propeller lift forces, drag coefficients, and angular torque vectors adjustments.', icon: <Wind className="text-amber-400" size={24} /> },
    { name: 'Navigation Coordinates', desc: 'Writing flight coordinates, automatic hover loops, and altitude check telemetry.', icon: <Navigation className="text-cyan-400" size={24} /> },
    { name: 'Computer Vision camera', desc: 'Capturing live aerial feeds and executing python OpenCV bounding box target checks.', icon: <Eye className="text-pink-400" size={24} /> }
  ];

  const syllabus = [
    { level: 'Foundations (Grades 1-3)', title: 'Intro to Flight Physics', details: 'Understanding air currents, lift dynamics, balance centers, and building manual gliders.' },
    { level: 'Explorers (Grades 4-5)', title: 'Basic Rotors Controls', details: 'Adjusting motor speeds, balancing quadcopters, and understanding manual radio flight controls.' },
    { level: 'Innovators (Grades 6-7)', title: 'Sensors Telemetry Logging', details: 'Calibrating gyroscope sensors, logging barometric altitude levels, and circuit solder safety.' },
    { level: 'Engineers (Grades 8-9)', title: 'Python Dronekit Scripting', details: 'Writing basic Python commands for automated takeoff, static hover coordinates, and land routines.' },
    { level: 'Visionaries (Grades 10-12)', title: 'Autonomous Pathing & OpenCV', details: 'Plotting complex multi-point coordinates maps, obstacle avoids algorithms, and computer vision feeds tracking.' }
  ];

  return (
    <div className="py-12 space-y-16">
      {/* 1. Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-brand/10 rounded-3xl blur-3xl pointer-events-none"></div>
        
        <div className="relative glass-panel p-8 sm:p-12 rounded-3xl border dark:border-darkbg-border flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <Link to="/programs" className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-brand hover:underline">
              &larr; Back to Programs
            </Link>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold">
              <Radio size={14} />
              <span>Aviation & Telemetry Pathway</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Drone Aviation & Autonomous Quadcopters
            </h1>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
              Explore the skies programmatically. Our Drones syllabus takes students through lift mechanics, flight controller calibrations, python script controls, and aerial target analysis.
            </p>
          </div>
          
          <div className="w-full max-w-[320px] aspect-square bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-inner relative flex items-center justify-center border dark:border-slate-700">
            <img 
              src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80" 
              alt="Autonomous Drone Aviation" 
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        </div>
      </section>

      {/* 2. Core principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold">Drone Engineering Core Arenas</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Practical skills in flight physics, autonomous node coordinates, and aerial sensor processing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {flightPrinciples.map((p, idx) => (
            <div key={idx} className="glass-panel p-8 rounded-2xl border dark:border-darkbg-border hover-lift shadow-sm relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                {p.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{p.name}</h3>
              <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Syllabus path */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold">Drone Tech Syllabus Progression</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Step-by-step grade levels syllabus progression for quadcopter pilot automation.
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
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border dark:border-darkbg-border bg-gradient-to-tr from-amber-500/5 to-brand/5 text-center space-y-6">
          <Award size={40} className="mx-auto text-brand animate-pulse-slow" />
          <h2 className="text-2xl sm:text-3xl font-bold">Setup Drone Training Centers at Your School</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            We deliver visual aerodynamics drone sets supplies, indoor safety netting enclosures, python control shields, and complete certified teacher safety coaching.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/schools-partnership" className="px-6 py-3 bg-brand text-white rounded-xl text-sm font-bold shadow-md hover:opacity-90 transition-opacity">
              Request Aviation Lab Proposal
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

export default Drones;
