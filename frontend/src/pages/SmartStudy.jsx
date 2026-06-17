import React from 'react';
import { BookOpen, Check, Layers, GraduationCap, Target, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

function SmartStudy() {
  const boardAlignments = [
    { board: 'CBSE', subjects: ['Computer Science', 'Information Practices', 'Artificial Intelligence'], grades: '6-12' },
    { board: 'ICSE', subjects: ['Computer Applications', 'Computer Science', 'Electronics'], grades: '6-12' },
    { board: 'IB / Cambridge', subjects: ['Design Technology', 'Computer Science', 'Digital Society'], grades: '6-12' },
    { board: 'State Boards', subjects: ['Information Technology', 'Computer Education'], grades: '6-10' },
  ];

  const features = [
    { title: 'Board-Mapped Lesson Plans', desc: 'Every TechMinds lesson plan directly maps to chapter numbers and learning outcomes defined by CBSE, ICSE, and IB syllabi.', icon: <BookOpen size={24} className="text-brand" /> },
    { title: 'Digital + Physical Integration', desc: 'Students alternate between screen-based coding exercises and physical robotics assembly sessions within the same period.', icon: <Layers size={24} className="text-emerald-400" /> },
    { title: 'Assessment Rubrics Included', desc: 'Pre-built marking schemes, project evaluation rubrics, and portfolio templates for quarterly and annual assessments.', icon: <Target size={24} className="text-amber-400" /> },
    { title: 'Student Progress Dashboards', desc: 'Digital tracking of individual student skill progression across modules, exportable as PDF reports for parent-teacher meetings.', icon: <Sparkles size={24} className="text-purple-400" /> },
  ];

  return (
    <div className="py-12 space-y-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Smart Study Curriculum</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base">
          A fully structured, board-aligned STEM curriculum framework designed to integrate seamlessly into your school's existing academic calendar.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-brand-light to-brand mx-auto rounded-full mt-4"></div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feat, idx) => (
          <div key={idx} className="glass-panel p-8 rounded-2xl border dark:border-darkbg-border hover-lift flex items-start space-x-5">
            <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
              {feat.icon}
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold">{feat.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Board Alignment Table */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Board Alignment Matrix</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">Our curriculum maps to established board frameworks.</p>
        </div>

        <div className="overflow-x-auto rounded-2xl border dark:border-darkbg-border shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4 font-extrabold">Education Board</th>
                <th className="px-6 py-4 font-extrabold">Aligned Subjects</th>
                <th className="px-6 py-4 font-extrabold">Grades</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-darkbg-border">
              {boardAlignments.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-bold">{row.board}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{row.subjects.join(', ')}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-brand/10 text-brand text-xs font-bold rounded-full">{row.grades}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Curriculum Flow */}
      <section className="py-16 bg-slate-100 dark:bg-slate-900/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Academic Year Integration Flow</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">How TechMinds weaves into your school calendar from onboarding to annual exhibitions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Needs Analysis', desc: 'On-site survey of existing infrastructure, teacher skills, and board requirements.', color: 'from-cyan-500 to-blue-500' },
              { step: '02', title: 'Curriculum Mapping', desc: 'Custom syllabus alignment documents prepared and validated by your academic coordinator.', color: 'from-blue-500 to-indigo-500' },
              { step: '03', title: 'Teacher Training', desc: '3-day intensive Capacity Building Program for all participating staff members.', color: 'from-indigo-500 to-purple-500' },
              { step: '04', title: 'Go-Live & Monitor', desc: 'Weekly sessions begin. Monthly progress dashboards shared with management.', color: 'from-purple-500 to-pink-500' }
            ].map((item, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border dark:border-darkbg-border text-center space-y-4 relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`}></div>
                <span className="text-3xl font-extrabold text-slate-200 dark:text-slate-700">{item.step}</span>
                <h3 className="font-bold text-base">{item.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold">Integrate Smart Study into Your School Today</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">Our academic consultants will create a customized curriculum proposal for your institution within 5 business days.</p>
        <Link to="/contact" className="inline-flex items-center space-x-2 px-8 h-14 bg-gradient-to-r from-brand to-brand-dark text-white rounded-xl font-bold shadow-lg hover:shadow-brand/25 hover:translate-y-[-2px] transition-all">
          <span>Request Curriculum Proposal</span>
        </Link>
      </section>
    </div>
  );
}

export default SmartStudy;
