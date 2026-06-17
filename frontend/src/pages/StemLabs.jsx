import React from 'react';
import { Monitor, Wifi, Microscope, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function StemLabs() {
  const labTypes = [
    {
      title: 'Robotics & Mechatronics Lab',
      icon: <Wrench size={28} className="text-cyan-400" />,
      desc: 'Fully equipped workbenches with soldering stations, oscilloscopes, component racks, and modular robot assembly kits. Designed for 20-30 students per batch.',
      specs: ['20 Workstations', 'Soldering Safety Hoods', 'Component Wall Racks', 'Charging Docks for Robots'],
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Coding & AI Innovation Lab',
      icon: <Monitor size={28} className="text-indigo-400" />,
      desc: 'Chromebook-ready coding stations with pre-installed IDEs, block-coding environments, and AI model training sandboxes. Includes interactive projector wall.',
      specs: ['30 Coding Terminals', 'Interactive Smart Board', 'AI/ML Sandbox Server', 'Version Control Setup'],
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'IoT & Electronics Workshop',
      icon: <Wifi size={28} className="text-emerald-400" />,
      desc: 'Breadboarding stations with sensor arrays, microcontroller flashing rigs, and real-time data visualization dashboards mounted on the wall.',
      specs: ['Sensor Kit Arrays', 'Arduino & Raspberry Pi Stations', 'Live Data Dashboard', 'Component Testing Multimeters'],
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Science & Research Hub',
      icon: <Microscope size={28} className="text-purple-400" />,
      desc: 'Advanced STEM exploration area with digital microscopes, 3D printers, and drone flight testing zones. Ideal for science fair project development.',
      specs: ['3D Printer Bay', 'Digital Microscope Array', 'Drone Flight Cage', 'Project Exhibition Wall'],
      image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="py-12 space-y-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">STEM Lab Setup</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base">
          Transform empty classrooms into world-class STEM innovation centers. TechMinds handles everything from civil remodeling to hardware procurement and teacher onboarding.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-brand-light to-brand mx-auto rounded-full mt-4"></div>
      </section>

      {/* Lab Types */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {labTypes.map((lab, idx) => (
          <div key={idx} className={`glass-panel rounded-3xl border dark:border-darkbg-border overflow-hidden grid grid-cols-1 lg:grid-cols-2 ${idx % 2 === 1 ? 'lg:direction-rtl' : ''}`}>
            {/* Image */}
            <div className={`relative min-h-[280px] bg-slate-200 dark:bg-slate-800 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <img src={lab.image} alt={lab.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className={`p-8 sm:p-10 flex flex-col justify-center space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  {lab.icon}
                </div>
                <h3 className="text-2xl font-bold">{lab.title}</h3>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{lab.desc}</p>

              <div className="grid grid-cols-2 gap-3">
                {lab.specs.map((spec, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300">
                    <ShieldCheck size={14} className="text-emerald-500 flex-shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Process */}
      <section className="py-16 bg-slate-100 dark:bg-slate-900/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Lab Deployment Process</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">From empty room to operational STEM lab in under 4 weeks.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { step: '1', title: 'Site Survey', desc: 'Our engineers visit, measure, and audit the allocated room.' },
              { step: '2', title: 'Design Blueprint', desc: 'Custom layout with workstation placement, power routing, and ventilation.' },
              { step: '3', title: 'Civil Work', desc: 'Electrical wiring, furniture installation, safety fixtures.' },
              { step: '4', title: 'Hardware Deploy', desc: 'Kits, computers, sensors, and peripherals installed and tested.' },
              { step: '5', title: 'Staff Training', desc: 'Comprehensive 3-day teacher certification workshop.' }
            ].map((item, idx) => (
              <div key={idx} className="glass-panel p-5 rounded-2xl border dark:border-darkbg-border text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-brand text-white font-extrabold flex items-center justify-center mx-auto text-sm">
                  {item.step}
                </div>
                <h4 className="font-bold text-sm">{item.title}</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold">Ready to Build Your STEM Lab?</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">Book a free site survey with our lab engineering team.</p>
        <Link to="/contact" className="inline-flex items-center space-x-2 px-8 h-14 bg-gradient-to-r from-brand to-brand-dark text-white rounded-xl font-bold shadow-lg hover:shadow-brand/25 hover:translate-y-[-2px] transition-all">
          <span>Schedule Site Survey</span>
          <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}

export default StemLabs;
