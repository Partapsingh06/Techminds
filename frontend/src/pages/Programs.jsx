import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Check, Layers, User, Calendar, Tag, ArrowRight } from 'lucide-react';

// Map course categories to their dedicated detail pages
const categoryRoutes = {
  'Robotics': '/programs/robotics',
  'Coding': '/programs/coding',
  'AI': '/programs/ai',
  'IoT': '/programs/iot',
  'AR/VR': '/programs/ar-vr',
  'Drone': '/programs/drones',
  'STEM': '/programs/robotics'
};

function Programs() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading courses:', err);
        setLoading(false);
      });
  }, []);

  const gradeBands = ['All', '1-3', '4-5', '6-7', '8-9', '10-12'];

  const filteredCourses = selectedFilter === 'All' 
    ? courses 
    : courses.filter(c => c.grade === selectedFilter);

  return (
    <div className="py-12 space-y-16">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">STEM & Robotics Programs</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base">
          Explore our progressive grade-wise curriculum, engineered to build advanced computational and engineering skills.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-brand-light to-brand mx-auto rounded-full mt-4"></div>
      </section>

      {/* Filter Options */}
      <section className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto px-4">
        <span className="text-sm font-extrabold text-slate-500 mr-2 uppercase tracking-wider">Filter Grade:</span>
        {gradeBands.map((band) => (
          <button
            key={band}
            onClick={() => setSelectedFilter(band)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${selectedFilter === band ? 'bg-brand text-white shadow-md' : 'bg-white dark:bg-darkbg hover:bg-slate-200 dark:hover:bg-slate-800'}`}
          >
            {band === 'All' ? 'Show All' : `Grades ${band}`}
          </button>
        ))}
      </section>

      {/* Courses Display Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="h-64 rounded-3xl animate-shimmer"></div>
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16 glass-panel border dark:border-darkbg-border rounded-3xl max-w-md mx-auto space-y-3">
            <Cpu size={48} className="mx-auto text-slate-400" />
            <h3 className="font-bold text-lg">No programs available</h3>
            <p className="text-xs text-slate-500">There are no courses matching the selected grade filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCourses.map((course) => (
              <div key={course._id || course.id} className="glass-panel rounded-3xl border dark:border-darkbg-border overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-sm hover:shadow-md transition-all hover:scale-[1.01] duration-250">
                
                {/* Image Section */}
                <div className="md:col-span-5 relative h-48 md:h-full min-h-[200px] bg-slate-200 dark:bg-slate-800">
                  {course.image ? (
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <Cpu size={40} className="animate-pulse-slow" />
                    </div>
                  )}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand text-white text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                    Grade {course.grade}
                  </span>
                </div>

                {/* Details Section */}
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <span className="text-[10px] tracking-wider uppercase font-bold text-brand bg-brand/10 px-2 py-0.5 rounded">
                      {course.category || 'STEM'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold leading-tight">{course.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Syllabus / Curriculum points */}
                  {course.curriculum && course.curriculum.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">Module Syllabus Preview:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {course.curriculum.slice(0, 4).map((cur, idx) => (
                          <div key={idx} className="flex items-center space-x-1.5">
                            <Check size={14} className="text-emerald-500 flex-shrink-0" />
                            <span className="truncate">{cur}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Kits details */}
                  {course.kits && course.kits.length > 0 && (
                    <div className="pt-4 border-t dark:border-slate-850 flex items-center space-x-2 text-xs font-semibold text-slate-500">
                      <Layers size={14} className="text-brand" />
                      <span>Associated Kits: {course.kits.join(', ')}</span>
                    </div>
                  )}

                  {/* Learn More button */}
                  <Link
                    to={categoryRoutes[course.category] || '/programs/robotics'}
                    className="mt-2 inline-flex items-center space-x-1.5 px-5 py-2.5 bg-gradient-to-r from-brand to-brand-dark text-white rounded-xl text-xs font-bold shadow-md hover:opacity-90 transition-opacity group w-fit"
                  >
                    <span>Learn More</span>
                    <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                  </Link>

                </div>

              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

export default Programs;
