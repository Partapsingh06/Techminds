import React from 'react';
import { Package, Shield, Cpu, Zap, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

function RoboticsKits() {
  const kits = [
    {
      name: 'TechMinds Junior Play Kit',
      gradeRange: 'Grades 1–3',
      price: 'Contact for Quote',
      description: 'Colorful interlocking blocks with gears, axles, and pulleys. Battery-powered motor module included. Perfect for spatial thinking development.',
      features: ['150+ Building Blocks', 'DC Motor Module', 'Gear & Pulley Sets', 'Activity Workbook', 'Storage Box'],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=600&q=80',
      tag: 'Beginner'
    },
    {
      name: 'TechMinds Block Coding Platform',
      gradeRange: 'Grades 4–5',
      price: 'Contact for Quote',
      description: 'Tablet-based block coding environment with physical LED matrix and buzzer actuators. Visual drag-and-drop programming with instant hardware feedback.',
      features: ['Coding Tablet License', 'LED Matrix Board', 'Buzzer & Speaker', 'USB Programming Cable', 'Digital Curriculum Access'],
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
      tag: 'Intermediate'
    },
    {
      name: 'TechMinds Explorer IoT Kit',
      gradeRange: 'Grades 6–7',
      price: 'Contact for Quote',
      description: 'Arduino-based microcontroller with breadboard, sensor pack (temperature, light, ultrasonic, motion), and relay module for smart home prototyping.',
      features: ['Arduino Uno Board', '10-Sensor Pack', 'Breadboard & Jumper Wires', 'Relay Module', 'Project Manual'],
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80',
      tag: 'Advanced'
    },
    {
      name: 'TechMinds Rover V2 Autonomous Car',
      gradeRange: 'Grades 8–9',
      price: 'Contact for Quote',
      description: 'Python-programmable 4WD chassis with ultrasonic sensors, line-following IR array, and Bluetooth control module. Full autonomous navigation capable.',
      features: ['4WD Chassis Platform', 'Ultrasonic Range Finder', 'IR Line Follower Array', 'Bluetooth HC-05', 'Raspberry Pi Compatible'],
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&w=600&q=80',
      tag: 'Expert'
    },
    {
      name: 'TechMinds Scout Drone Quad',
      gradeRange: 'Grades 10–12',
      price: 'Contact for Quote',
      description: 'Educational quadcopter frame with brushless motors, flight controller, and camera mount. Programmable via Python DroneKit for autonomous flight paths.',
      features: ['Carbon Fiber Frame', 'Brushless Motors x4', 'Flight Controller Board', 'FPV Camera Mount', 'Python DroneKit License'],
      image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80',
      tag: 'Research'
    }
  ];

  const tagColors = {
    'Beginner': 'bg-emerald-500/10 text-emerald-500',
    'Intermediate': 'bg-blue-500/10 text-blue-500',
    'Advanced': 'bg-amber-500/10 text-amber-500',
    'Expert': 'bg-purple-500/10 text-purple-500',
    'Research': 'bg-pink-500/10 text-pink-500'
  };

  return (
    <div className="py-12 space-y-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Robotics Kits Catalogue</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base">
          Custom-engineered, child-safe, and curriculum-aligned hardware kits designed for progressive STEM learning from Grade 1 through Grade 12.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-brand-light to-brand mx-auto rounded-full mt-4"></div>
      </section>

      {/* Kit Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {kits.map((kit, idx) => (
          <div key={idx} className="glass-panel rounded-3xl border dark:border-darkbg-border overflow-hidden grid grid-cols-1 lg:grid-cols-12 hover:shadow-lg transition-shadow">
            {/* Image */}
            <div className={`lg:col-span-4 relative min-h-[240px] bg-slate-200 dark:bg-slate-800 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <img src={kit.image} alt={kit.name} className="w-full h-full object-cover" />
              <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${tagColors[kit.tag]}`}>
                {kit.tag}
              </span>
            </div>

            {/* Details */}
            <div className={`lg:col-span-8 p-8 sm:p-10 flex flex-col justify-center space-y-5 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl sm:text-2xl font-bold">{kit.name}</h3>
                <span className="px-3 py-1 bg-brand/10 text-brand text-xs font-bold rounded-full">{kit.gradeRange}</span>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{kit.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {kit.features.map((feat, i) => (
                  <div key={i} className="flex items-center space-x-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <Check size={14} className="text-brand flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-4 pt-2">
                <span className="text-sm font-bold text-brand">{kit.price}</span>
                <Link to="/contact" className="text-xs font-bold text-brand hover:underline flex items-center space-x-1">
                  <span>Request Bulk Quote</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Quality Promise */}
      <section className="py-16 bg-slate-100 dark:bg-slate-900/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: <Shield size={32} className="text-emerald-500" />, title: 'Child-Safe Materials', desc: 'All components are RoHS compliant and tested for safe handling by students ages 6+.' },
            { icon: <Zap size={32} className="text-amber-500" />, title: 'Durable & Reusable', desc: 'Kits are designed for 5+ years of classroom use with modular replacement parts.' },
            { icon: <Package size={32} className="text-brand" />, title: 'Bulk School Pricing', desc: 'Volume discounts for institutions ordering 10+ kits. Free shipping on orders above 25 units.' }
          ].map((item, idx) => (
            <div key={idx} className="glass-panel p-8 rounded-2xl border dark:border-darkbg-border space-y-4">
              <div className="w-14 h-14 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center mx-auto">
                {item.icon}
              </div>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default RoboticsKits;
