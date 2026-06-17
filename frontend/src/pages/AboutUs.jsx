import React from 'react';
import { ShieldCheck, Target, Heart, Users, Award, BookOpen } from 'lucide-react';

function AboutUs() {
  const values = [
    { title: 'Innovation First', icon: <Target size={24} className="text-cyan-400" />, desc: 'We continuously upgrade our curriculum to reflect the latest in Generative AI, Robotics firmware, and Cloud IoT.' },
    { title: 'Hands-on Learning', icon: <ShieldCheck size={24} className="text-emerald-400" />, desc: 'No passive video lessons. Students construct physical mechanisms, solder safe circuit nodes, and verify code actions.' },
    { title: 'Inclusive Education', icon: <Heart size={24} className="text-pink-400" />, desc: 'We engineer affordable kits and curriculum options to ensure schools of various budgeting levels can participate.' },
    { title: 'Global Benchmarks', icon: <Award size={24} className="text-purple-400" />, desc: 'Aligned with STEM standards internationally, empowering students to compete in science exhibitions and Olympiads.' }
  ];

  return (
    <div className="py-12 space-y-20">
      
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">About TechMinds</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base">
          Our history, mission, and the core philosophies guiding our curriculum development teams.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-brand-light to-brand mx-auto rounded-full mt-4"></div>
      </section>

      {/* 2. Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Bridging the Gap Between Textbooks and Real-World Technology</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
            TechMinds was founded with a singular focus: to convert classrooms from passive learning halls into vibrant design studios. We believe that when children build robots, code virtual environments, or program drones, they learn standard math and physics naturally through empirical trial and error.
          </p>
          <div className="border-l-4 border-brand pl-4 py-2 italic text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-r-lg text-sm">
            "To cultivate a generation of problem solvers who do not just use digital applications, but understand the circuitry and software pathways underneath them."
          </div>
        </div>

        <div className="glass-panel p-8 sm:p-10 rounded-3xl border dark:border-darkbg-border grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-brand">100+</h3>
            <p className="text-sm font-semibold uppercase text-slate-500">Colleges & Schools</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Integrated inside major institutions across the country.</p>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-brand">50,000+</h3>
            <p className="text-sm font-semibold uppercase text-slate-500">Student Projects</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">From automated smart trash cans to quadcopter search grids.</p>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-brand">100%</h3>
            <p className="text-sm font-semibold uppercase text-slate-500">Affiliated Standards</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Perfect alignment with K-12 board computer curriculums.</p>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-brand">24/7</h3>
            <p className="text-sm font-semibold uppercase text-slate-500">Teacher Mentoring</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Dedicated operational and technical hotline for staff.</p>
          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="py-16 bg-slate-100 dark:bg-slate-900/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Our Operating Guidelines</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">The core pillars driving how we support our school networks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border dark:border-darkbg-border flex flex-col items-start space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                  {val.icon}
                </div>
                <h3 className="font-bold text-lg">{val.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Leadership */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">STEM Advisors & Educators</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">The developers behind our curriculum structures and hardware kits.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Dr. Vivek Anand', role: 'Chief STEM Officer', bio: 'Former IIT faculty member with 15+ years in educational kit designs and mechanical engineering studies.', initials: 'VA' },
            { name: 'Priya Sen', role: 'Curriculum Director', bio: 'Author of multiple board-affiliated CS textbooks. Expert in child learning loops and block-based programming.', initials: 'PS' },
            { name: 'Amit Verma', role: 'Lead Firmware Engineer', bio: 'Specialist in custom shield configurations, robotics automation, and low-cost board prototyping.', initials: 'AV' }
          ].map((member, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border dark:border-darkbg-border text-center space-y-4">
              <div className="w-20 h-20 bg-brand/10 border border-brand/20 text-brand text-2xl font-extrabold rounded-full flex items-center justify-center mx-auto">
                {member.initials}
              </div>
              <div>
                <h4 className="font-bold text-lg">{member.name}</h4>
                <p className="text-xs text-slate-500 font-semibold">{member.role}</p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default AboutUs;
