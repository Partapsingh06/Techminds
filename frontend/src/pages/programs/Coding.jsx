import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Terminal, Brain, ArrowRight, CheckCircle2, Award, ShieldAlert } from 'lucide-react';

function Coding() {
  const syllabus = [
    { level: 'Foundations (Grades 1-3)', title: 'Intro to Logic & Sequencing', details: 'Using simplified grid games and early block coding scripts. Focuses on sequencing instructions and algorithmic patterns.' },
    { level: 'Explorers (Grades 4-5)', title: 'Scratch Animations & Loops', details: 'Setting up logical loops, simple variables, coordinate plane coordinates, and building interactive stories and games.' },
    { level: 'Innovators (Grades 6-7)', title: 'Intro to Text Programming', details: 'Introduction to text coding syntax using Python, learning variables, input handlers, functions, and string formatting.' },
    { level: 'Engineers (Grades 8-9)', title: 'Data Structures & Algorithms', details: 'Working with arrays/lists, dictionaries, searching algorithms, basic logic trees, and graphical game architectures in Python.' },
    { level: 'Visionaries (Grades 10-12)', title: 'Web App & Full-Stack Principles', details: 'Coding responsive layouts using HTML5/CSS3, programming interactive controls in Javascript, and building basic API relays.' }
  ];

  const benefits = [
    { title: 'Computational Logic', desc: 'Teaches children to decompose complex problems into logical instruction arrays.' },
    { title: 'Creative Game Architecture', desc: 'Allows students to express visual art, math coordinates, and music tracks through code structures.' },
    { title: 'Interactive Debugging', desc: 'Fosters resilience as students isolate syntax errors and troubleshoot loop execution blocks.' }
  ];

  return (
    <div className="py-12 space-y-16">
      {/* 1. Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-indigo-500/10 rounded-3xl blur-3xl pointer-events-none"></div>
        
        <div className="relative glass-panel p-8 sm:p-12 rounded-3xl border dark:border-darkbg-border flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <Link to="/programs" className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-brand hover:underline">
              &larr; Back to Programs
            </Link>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold">
              <Code size={14} />
              <span>Algorithmic Thinking Pathway</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Coding & Software Logic
            </h1>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
              Establish a strong baseline in logical problem solving. Students advance from visual blocks layout up to writing syntax-clean Python, HTML, and Javascript scripts.
            </p>
          </div>
          
          <div className="w-full max-w-[320px] aspect-square bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-inner relative flex items-center justify-center border dark:border-slate-700">
            <img 
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80" 
              alt="Coding Lab Setup" 
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        </div>
      </section>

      {/* 2. Visual Coding Interface Simulation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">How We Teach Algorithmic Flow</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Writing plain code can sometimes feel dry or complex. We make code alive. Students build game logic visual cards, drag-and-drop functional behaviors, and instantly see execution results in real-time simulators.
          </p>

          <div className="space-y-4">
            {benefits.map((b, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <CheckCircle2 className="text-emerald-500 mt-1 flex-shrink-0" size={18} />
                <div>
                  <h4 className="font-bold text-sm sm:text-base">{b.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Block Mockup */}
        <div className="glass-panel p-6 rounded-2xl border dark:border-darkbg-border bg-slate-950 text-emerald-400 font-mono text-xs sm:text-sm shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-slate-500">
            <div className="flex space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
            </div>
            <span>autonomous_rover.py</span>
          </div>

          <div className="space-y-1">
            <p className="text-pink-400">import <span className="text-white">time</span></p>
            <p className="text-pink-400">from <span className="text-white">techminds_robot</span> import <span className="text-white">RoverV2</span></p>
            <p>&nbsp;</p>
            <p className="text-slate-500"># Initialize autonomous vehicle</p>
            <p>car = RoverV2(port=<span className="text-amber-300">"COM3"</span>)</p>
            <p>&nbsp;</p>
            <p className="text-pink-400">while <span className="text-cyan-300">True</span>:</p>
            <p className="pl-4">distance = car.read_ultrasonic_sensor()</p>
            <p>&nbsp;</p>
            <p className="pl-4 text-pink-400">if <span className="text-white">distance &lt; 20</span>:</p>
            <p className="pl-8 text-slate-500"># Obstacle detected, backup and turn</p>
            <p className="pl-8">car.set_speeds(left=<span className="text-amber-300">-50</span>, right=<span className="text-amber-300">-50</span>)</p>
            <p className="pl-8">time.sleep(<span className="text-amber-300">0.5</span>)</p>
            <p className="pl-8">car.turn_right(angle=<span className="text-amber-300">90</span>)</p>
            <p className="pl-4 text-pink-400">else:</p>
            <p className="pl-8">car.set_speeds(left=<span className="text-amber-300">80</span>, right=<span className="text-amber-300">80</span>)</p>
          </div>
        </div>
      </section>

      {/* 3. Syllabus timeline */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold">Grade-wise Syllabus Path</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            From drag-and-drop scripting concepts up to programming real full-stack web applications.
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
              <Terminal className="text-slate-400 flex-shrink-0 hidden sm:block" size={24} />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Onboarding CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border dark:border-darkbg-border bg-gradient-to-tr from-brand/5 to-indigo-500/5 text-center space-y-6">
          <Award size={40} className="mx-auto text-brand" />
          <h2 className="text-2xl sm:text-3xl font-bold">Bring Professional Coding Curriculums to Your Lab</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Our custom learning management access portals, lesson sheets, and board-certified assessments empower schools to offer elite computer science curriculum paths out-of-the-box.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/schools-partnership" className="px-6 py-3 bg-brand text-white rounded-xl text-sm font-bold shadow-md hover:opacity-90 transition-opacity">
              Request Academic Integration Details
            </Link>
            <Link to="/contact" className="px-6 py-3 border dark:border-darkbg-border hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-sm font-semibold transition-colors">
              Contact Curriculum Specialist
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Coding;
