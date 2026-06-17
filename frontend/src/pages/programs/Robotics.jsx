import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Settings, Wrench, Award, ChevronRight, CheckCircle2, ShieldCheck, Play } from 'lucide-react';

function Robotics() {
  const syllabus = [
    { level: 'Foundations (Grades 1-3)', title: 'Simple Machines & Gears', details: 'Introduction to structural build principles, force multipliers, gear ratios, and motorized pulleys.' },
    { level: 'Explorers (Grades 4-5)', title: 'Sensory Microcontrollers', details: 'Connecting simple light/sound modules, breadboard basics, and introductory program algorithms.' },
    { level: 'Innovators (Grades 6-7)', title: 'Embedded Circuits & C++', details: 'Arduino hardware assembly, sensor triggers (ultrasonic, infrared), and C++ programming pathways.' },
    { level: 'Engineers (Grades 8-9)', title: 'Autonomous Pathing & Python', details: 'Self-correcting motors, PID path control algorithms, bluetooth relays, and autonomous navigation.' },
    { level: 'Visionaries (Grades 10-12)', title: 'Avionics & Advanced Kinematics', details: 'Aerospace dynamics, robotic arm calibration angles, computer vision feedback, and AI model routing.' }
  ];

  const hardware = [
    { name: 'TechMinds Core Board', type: 'Microcontroller', desc: 'Atmega328p based easy-connect board with built-in motor drivers and sensor ports.' },
    { name: 'Modular Chassis Kit', type: 'Mechanical', desc: 'Laser-cut high durability acrylic sheets with metal gear DC motors and rubber grip wheels.' },
    { name: 'Sensor Array Shield', type: 'Sensors', desc: 'Includes Ultrasonic Distance module, Dual IR line-followers, and digital gyroscopes.' },
    { name: 'Kinematic Grabber Arm', type: 'Actuators', desc: 'Dual-servo structural clamp for payload retrieval and spatial coordinate sorting tasks.' }
  ];

  return (
    <div className="py-12 space-y-16">
      {/* 1. Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-cyan-500/10 rounded-3xl blur-3xl pointer-events-none"></div>
        
        <div className="relative glass-panel p-8 sm:p-12 rounded-3xl border dark:border-darkbg-border flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <Link to="/programs" className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-brand hover:underline">
              &larr; Back to Programs
            </Link>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold">
              <Cpu size={14} />
              <span>Hardware & Mechanics Pathway</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Robotics & Hardware Engineering
            </h1>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
              Bridge the physical and digital worlds. Our Robotics syllabus trains students in structural dynamics, electrical routing, sensor integration, and firmware programming.
            </p>
          </div>
          
          <div className="w-full max-w-[320px] aspect-square bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-inner relative flex items-center justify-center border dark:border-slate-700">
            <img 
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80" 
              alt="Robotics Lab Kit" 
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        </div>
      </section>

      {/* 2. Core Curriculum Timeline */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold">Syllabus & Grade Progression</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            From basic mechanical gears to advanced aerospace avionics, students learn through age-appropriate challenges.
          </p>
        </div>

        <div className="space-y-6 relative before:absolute before:left-4 md:before:left-1/2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {syllabus.map((s, idx) => (
            <div key={idx} className={`relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
              {/* timeline node dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-brand border-4 border-white dark:border-darkbg transform -translate-x-2"></div>
              
              <div className="w-full md:w-[45%] pl-10 md:pl-0">
                <div className="glass-panel p-6 rounded-2xl border dark:border-darkbg-border hover-lift shadow-sm">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand">{s.level}</span>
                  <h3 className="text-lg font-bold mt-1">{s.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{s.details}</p>
                </div>
              </div>
              <div className="hidden md:block w-[45%]"></div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Hardware Highlight Grid */}
      <section className="py-16 bg-slate-100 dark:bg-slate-900/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold">Professional Hardware & Sensor Kits</h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
              Every student gets hands-on experience using modular, rugged components engineered for laboratory environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hardware.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-darkbg-card p-6 rounded-2xl border dark:border-darkbg-border shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="inline-flex px-2 py-0.5 rounded bg-brand/10 text-brand text-[10px] font-bold uppercase tracking-wider">
                    {item.type}
                  </div>
                  <h3 className="font-bold text-base">{item.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
                <div className="flex items-center space-x-1.5 text-xs text-brand font-semibold">
                  <Wrench size={14} />
                  <span>Lab Certified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Onboarding Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border dark:border-darkbg-border bg-gradient-to-tr from-brand/5 to-cyan-500/5 text-center space-y-6">
          <Award size={40} className="mx-auto text-brand animate-pulse-slow" />
          <h2 className="text-2xl sm:text-3xl font-bold">Deploy Robotics Laboratory In Your School</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Our teams handle complete lab installations, deliver high-quality components, certify teaching instructors, and supply cbse/icse aligned lesson frameworks.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/schools-partnership" className="px-6 py-3 bg-brand text-white rounded-xl text-sm font-bold shadow-md hover:opacity-90 transition-opacity">
              Apply For Partnership
            </Link>
            <Link to="/contact" className="px-6 py-3 border dark:border-darkbg-border hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-sm font-semibold transition-colors">
              Request Lab Proposal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Robotics;
