import React, { useState, useEffect } from 'react';
import { Image, Filter } from 'lucide-react';

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const categories = ['All', 'STEM Labs', 'Events', 'Robotics Kits', 'General'];

  useEffect(() => {
    fetchImages();
  }, [selectedCategory]);

  const fetchImages = () => {
    setLoading(true);
    const queryParam = selectedCategory !== 'All' ? `?category=${encodeURIComponent(selectedCategory)}` : '';
    fetch(`/api/gallery${queryParam}`)
      .then(res => res.json())
      .then(data => { setImages(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  };

  return (
    <div className="py-12 space-y-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Photo Gallery</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base">
          Moments from our STEM labs, school events, robotics competitions, and teacher training workshops.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-brand-light to-brand mx-auto rounded-full mt-4"></div>
      </section>

      {/* Filter Tabs */}
      <section className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto px-4">
        <Filter size={16} className="text-slate-500 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${selectedCategory === cat ? 'bg-brand text-white shadow-md' : 'bg-white dark:bg-darkbg border dark:border-darkbg-border hover:bg-slate-200 dark:hover:bg-slate-800'}`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <div key={n} className="aspect-square rounded-2xl animate-shimmer"></div>
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-16 glass-panel border dark:border-darkbg-border rounded-3xl max-w-md mx-auto space-y-3">
            <Image size={48} className="mx-auto text-slate-400" />
            <h3 className="font-bold text-lg">No images in this category</h3>
            <p className="text-xs text-slate-500">Images will appear here once uploaded from the admin panel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img) => (
              <div
                key={img._id || img.id}
                className="group relative aspect-square bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                onClick={() => setLightbox(img)}
              >
                <img
                  src={img.image}
                  alt={img.title || 'Gallery Image'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-white text-sm font-bold">{img.title || 'TechMinds Activity'}</p>
                  <p className="text-white/70 text-[10px] uppercase tracking-wider font-semibold">{img.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-10 right-0 text-white text-sm font-bold hover:text-brand transition-colors"
            >
              ✕ Close
            </button>
            <img
              src={lightbox.image}
              alt={lightbox.title || 'Gallery Image'}
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
            />
            <div className="mt-3 text-center">
              <p className="text-white font-bold">{lightbox.title}</p>
              <p className="text-white/60 text-xs uppercase tracking-wider">{lightbox.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
