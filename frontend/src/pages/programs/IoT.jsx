import React from 'react';
import { Link } from 'react-router-dom';
import { Radio, Wifi, Database, Power, CheckCircle2, Award, Settings } from 'lucide-react';

function IoT() {
  const hardware = [
    { name: 'Wifi Microcontrollers', desc: 'ESP32 & NodeMCU modules, programming webserver nodes and direct telemetry streams.', icon: <Wifi className="text-emerald-400" size={24} /> },
    { name: 'Relays & Actuators', desc: 'Solenoids, electrical relays, digital switches, and programmatic motor triggers.', icon: <Power className="text-amber-400" size={24} /> },
    { name: 'Telemetry Feeds', desc: 'Creating dashboard streams, logging data logs, and writing web triggers.', icon: <Database className="text-brand-light" size={24} /> }
  ];

  const syllabus = [
    { level: 'Foundations (Grades 1-3)', title: 'Intro to Smart Circuits', details: 'Basic loops, battery snaps, simple light sensors, and digital alarm sound loops.' },
    { level: 'Explorers (Grades 4-5)', title: 'Sensors Input Routing', details: 'Building block logic sensors, checking temperature sensors, and setting servo motor triggers.' },
    { level: 'Innovators (Grades 6-7)', title: 'Arduino Breadboard wiring', details: 'Diving into electronics breadboards, digital/analogue signals, and Arduino IDE setup.' },
    { level: 'Engineers (Grades 8-9)', title: 'Internet of Things Relays', details: 'Wiring ESP32 microcontrollers, setting up local wifi nodes, and sending automated sensor emails.' },
    { level: 'Visionaries (Grades 10-12)', title: 'Smart Cities Prototypes', details: 'Automated streetlights grids, smart agricultural soil monitoring sensors, and home-security alarms.' }
  ];

  return (
    <div className="py-12 space-y-16">
      {/* 1. Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-brand/10 rounded-3xl blur-3xl pointer-events-none"></div>
        
        <div className="relative glass-panel p-8 sm:p-12 rounded-3xl border dark:border-darkbg-border flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <Link to="/programs" className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-brand hover:underline">
              &larr; Back to Programs
            </Link>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold">
              <Radio size={14} />
              <span>Sensors & Automation Pathway</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Internet of Things (IoT) & Smart Systems
            </h1>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
              Connect everyday physical systems to global internet networks. Students construct smart home arrays, soil moisture regulators, and programmatic local telemetry servers.
            </p>
          </div>
          
          <div className="w-full max-w-[320px] aspect-square bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-inner relative flex items-center justify-center border dark:border-slate-700">
            <img 
              src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80" 
              alt="IoT Laboratory Starter Kit" 
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        </div>
      </section>

      {/* 2. Hardware highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold">IoT Smart Core Concepts</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Practical skills in physical electrical circuits, network telemetry streams, and cloud dashboards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hardware.map((item, idx) => (
            <div key={idx} className="glass-panel p-8 rounded-2xl border dark:border-darkbg-border hover-lift shadow-sm relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{item.name}</h3>
              <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Syllabus levels */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold">Smart IoT Syllabus Progression</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Step-by-step grade levels structured for physical laboratory wiring.
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
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border dark:border-darkbg-border bg-gradient-to-tr from-emerald-500/5 to-brand/5 text-center space-y-6">
          <Award size={40} className="mx-auto text-brand animate-pulse-slow" />
          <h2 className="text-2xl sm:text-3xl font-bold">Deploy Smart Lab Technologies</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            We provide full IoT kits supplies, server dashboards hosting setups, physical wiring diagrams, and certified Capacity Building (CBP) teacher trainings.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/schools-partnership" className="px-6 py-3 bg-brand text-white rounded-xl text-sm font-bold shadow-md hover:opacity-90 transition-opacity">
              Request IoT Partnership Proposal
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

export default IoT;
