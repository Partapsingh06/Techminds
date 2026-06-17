import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, Send } from 'lucide-react';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', schoolName: '',
    interestType: 'General Inquiry',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', schoolName: '', interestType: 'General Inquiry', subject: '', message: '' });
      } else {
        const data = await res.json();
        alert(data.message || 'Submission failed');
      }
    } catch (err) { alert('Error connecting to server.'); }
    setLoading(false);
  };

  return (
    <div className="py-12 space-y-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Contact Us</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base">
          Reach out to our STEM education advisors for partnership inquiries, kit quotations, or any general questions.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-brand-light to-brand mx-auto rounded-full mt-4"></div>
      </section>

      {/* Contact Info + Form Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left - Contact Details */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass-panel p-8 rounded-3xl border dark:border-darkbg-border space-y-6">
            <h2 className="text-xl font-bold">Get In Touch</h2>
            
            <div className="space-y-5">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Registered Office</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">TechMinds STEM Hub, Block 4-B, Sector 62, Noida, Uttar Pradesh, India – 201301</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Phone</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">+91 98765 43210</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">+91 11 4567 8900</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Email</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">info@techminds.com</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">partnerships@techminds.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 flex-shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Business Hours</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Monday – Saturday: 9:00 AM – 6:00 PM IST</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Embed Simulation */}
          <div className="rounded-3xl overflow-hidden border dark:border-darkbg-border h-56 bg-slate-200 dark:bg-slate-800 relative flex items-center justify-center">
            <div className="text-center space-y-2 p-4">
              <MapPin size={32} className="mx-auto text-brand animate-bounce" />
              <p className="text-xs font-bold text-slate-600 dark:text-slate-400">Sector 62, Noida, UP, India</p>
              <p className="text-[10px] text-slate-500">Interactive map will load with Google Maps API key</p>
            </div>
          </div>
        </div>

        {/* Right - Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border dark:border-darkbg-border shadow-lg">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <CheckCircle2 size={56} className="mx-auto text-emerald-500" />
                <h3 className="text-2xl font-bold">Message Sent!</h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto">Thank you for contacting TechMinds. Our advisory team will respond within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="mt-4 px-6 py-2 bg-brand text-white rounded-lg text-sm font-semibold">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-xl font-bold mb-2">Send Us a Message</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-500">Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" className="w-full h-11 px-4 border dark:border-darkbg-border dark:bg-darkbg rounded-lg text-sm focus:outline-none focus:border-brand" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-500">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@email.com" className="w-full h-11 px-4 border dark:border-darkbg-border dark:bg-darkbg rounded-lg text-sm focus:outline-none focus:border-brand" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-500">Phone</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="w-full h-11 px-4 border dark:border-darkbg-border dark:bg-darkbg rounded-lg text-sm focus:outline-none focus:border-brand" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-500">School / Organization</label>
                    <input type="text" name="schoolName" value={formData.schoolName} onChange={handleChange} placeholder="Institution name" className="w-full h-11 px-4 border dark:border-darkbg-border dark:bg-darkbg rounded-lg text-sm focus:outline-none focus:border-brand" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-500">Inquiry Type</label>
                    <select name="interestType" value={formData.interestType} onChange={handleChange} className="w-full h-11 px-4 border dark:border-darkbg-border dark:bg-darkbg rounded-lg text-sm focus:outline-none focus:border-brand">
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="School Partnership">School Partnership</option>
                      <option value="STEM Laboratory Setup">STEM Lab Setup</option>
                      <option value="Teacher Training Cohorts">Teacher Training</option>
                      <option value="Robotics Kits Supplies">Robotics Kits</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-500">Subject</label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Brief subject" className="w-full h-11 px-4 border dark:border-darkbg-border dark:bg-darkbg rounded-lg text-sm focus:outline-none focus:border-brand" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-500">Message *</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder="Describe your requirements in detail..." className="w-full p-4 border dark:border-darkbg-border dark:bg-darkbg rounded-lg text-sm focus:outline-none focus:border-brand" />
                </div>

                <button type="submit" disabled={loading} className="w-full h-12 bg-gradient-to-r from-brand to-brand-dark text-white font-bold rounded-lg text-sm flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all disabled:opacity-50">
                  <Send size={16} />
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
