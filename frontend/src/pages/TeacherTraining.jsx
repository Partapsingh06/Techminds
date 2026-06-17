import React, { useState, useEffect } from 'react';
import { Award, Clock, Users, BookOpen, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function TeacherTraining() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/training')
      .then(res => res.json())
      .then(data => { setTrainings(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const benefits = [
    { title: 'Hands-on Workshop Format', desc: 'No slide-heavy lectures. Teachers build, solder, and code alongside our experts.', icon: <BookOpen size={24} className="text-cyan-400" /> },
    { title: 'Certification Provided', desc: 'All participants receive a TechMinds Certified STEM Educator certificate upon completion.', icon: <Award size={24} className="text-amber-400" /> },
    { title: 'Ongoing Support', desc: 'Post-training WhatsApp support groups and quarterly refresher webinars included.', icon: <Users size={24} className="text-emerald-400" /> },
    { title: 'Flexible Scheduling', desc: 'Workshops can be scheduled during summer breaks, weekends, or after school hours.', icon: <Clock size={24} className="text-purple-400" /> }
  ];

  return (
    <div className="py-12 space-y-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Teacher Training Programs</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base">
          Capacity Building Programs (CBP) that empower your teaching staff to confidently deliver robotics, coding, and AI lessons without external dependency.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-brand-light to-brand mx-auto rounded-full mt-4"></div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((b, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-2xl border dark:border-darkbg-border space-y-4 hover-lift">
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              {b.icon}
            </div>
            <h3 className="font-bold text-base">{b.title}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </section>

      {/* Training Programs from API */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Available Training Cohorts</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">Programs currently accepting school registrations.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2].map(n => (
              <div key={n} className="h-72 rounded-3xl animate-shimmer"></div>
            ))}
          </div>
        ) : trainings.length === 0 ? (
          <div className="text-center py-12 glass-panel rounded-3xl border dark:border-darkbg-border max-w-md mx-auto space-y-3">
            <Award size={48} className="mx-auto text-slate-400" />
            <h3 className="font-bold text-lg">No training programs listed yet</h3>
            <p className="text-xs text-slate-500">Contact us to request a custom training schedule for your school.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {trainings.map((program) => (
              <div key={program._id || program.id} className="glass-panel rounded-3xl border dark:border-darkbg-border overflow-hidden hover:shadow-lg transition-shadow">
                {program.image && (
                  <div className="h-48 bg-slate-200 dark:bg-slate-800 relative">
                    <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-xl">{program.title}</h3>
                    </div>
                  </div>
                )}
                <div className="p-6 sm:p-8 space-y-4">
                  {!program.image && <h3 className="text-xl font-bold">{program.title}</h3>}
                  
                  <div className="flex flex-wrap gap-3 text-xs">
                    {program.duration && (
                      <span className="flex items-center space-x-1 px-3 py-1 bg-brand/10 text-brand rounded-full font-semibold">
                        <Clock size={12} />
                        <span>{program.duration}</span>
                      </span>
                    )}
                    {program.targetAudience && (
                      <span className="flex items-center space-x-1 px-3 py-1 bg-purple-500/10 text-purple-500 rounded-full font-semibold">
                        <Users size={12} />
                        <span>{program.targetAudience}</span>
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{program.description}</p>

                  {program.syllabus && program.syllabus.length > 0 && (
                    <div className="space-y-2 pt-2 border-t dark:border-darkbg-border">
                      <h4 className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider pt-2">Workshop Modules:</h4>
                      <div className="space-y-1.5">
                        {program.syllabus.map((item, i) => (
                          <div key={i} className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300">
                            <Check size={14} className="text-emerald-500 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold">Register Your Teaching Staff</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">We'll coordinate with your academic calendar to schedule the most convenient training windows.</p>
        <Link to="/contact" className="inline-flex items-center space-x-2 px-8 h-14 bg-gradient-to-r from-brand to-brand-dark text-white rounded-xl font-bold shadow-lg hover:shadow-brand/25 hover:translate-y-[-2px] transition-all">
          <span>Register for Training</span>
          <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}

export default TeacherTraining;
