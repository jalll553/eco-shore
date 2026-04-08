import { useState } from 'react';
import { API_BASE_URL } from '../lib/ecoshore';

function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch(`${API_BASE_URL}/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: 'General Inquiry',
          message: ''
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-ocean-blue/10 via-turquoise/5 to-sky-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-up">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-blue to-turquoise">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Have questions about Ecoshore? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-gradient-to-br from-white via-sky-light to-turquoise/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-xl animate-zoom-in">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Send us a Message</h2>
              
              {status === 'success' && (
                <div className="mb-6 p-4 bg-seafoam/20 text-emerald-700 rounded-lg flex items-center border border-seafoam">
                  <i className="fas fa-check-circle text-xl mr-3"></i>
                  <span>Message sent successfully! We will get back to you shortly.</span>
                </div>
              )}
              {status === 'error' && (
                <div className="mb-6 p-4 bg-coral/20 text-red-700 rounded-lg flex items-center border border-coral">
                  <i className="fas fa-exclamation-circle text-xl mr-3"></i>
                  <span>Oh no! Something went wrong communicating with the server. Please check your data.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input type="text" id="firstName" name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue focus:border-transparent transition-all duration-300" placeholder="John" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input type="text" id="lastName" name="lastName" required value={formData.lastName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue focus:border-transparent transition-all duration-300" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue focus:border-transparent transition-all duration-300" placeholder="john@example.com" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select id="subject" name="subject" value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue focus:border-transparent transition-all duration-300">
                    <option>General Inquiry</option>
                    <option>Feature Request</option>
                    <option>Technical Support</option>
                    <option>Partnership Opportunity</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea id="message" name="message" required value={formData.message} onChange={handleChange} rows="6" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue focus:border-transparent transition-all duration-300" placeholder="Tell us how we can help you..."></textarea>
                </div>
                <button type="submit" disabled={status === 'loading'} className={`w-full bg-gradient-to-r from-ocean-blue to-turquoise text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg ${status === 'loading' ? 'opacity-70 cursor-wait' : ''}`}>
                  <i className={`fas ${status === 'loading' ? 'fa-spinner fa-spin' : 'fa-paper-plane'} mr-2`}></i>
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-ocean-blue/10 to-turquoise/20 rounded-2xl p-8 shadow-xl animate-zoom-in" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-ocean-blue to-turquoise rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 animate-float">
                    <i className="fas fa-envelope text-white text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Email Us</h3>
                    <p className="text-gray-600 mb-4">Send us an email and we'll get back to you within 24 hours.</p>
                    <a href="mailto:hello@ecoshore.com" className="text-ocean-blue font-semibold hover:text-turquoise transition-colors">hello@ecoshore.com</a>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-coral/10 to-pink-100 rounded-2xl p-8 shadow-xl animate-zoom-in" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-coral to-pink-500 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 animate-float" style={{ animationDelay: '0.1s' }}>
                    <i className="fas fa-phone text-white text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Call Us</h3>
                    <p className="text-gray-600 mb-4">Speak directly with our team during business hours.</p>
                    <a href="tel:+15551234567" className="text-coral font-semibold hover:text-pink-500 transition-colors">+1 (555) 123-4567</a>
                    <p className="text-sm text-gray-500 mt-2">Mon-Fri: 9AM-6PM PST</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-soft-yellow/20 to-orange-100 rounded-2xl p-8 shadow-xl animate-zoom-in" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-soft-yellow to-orange-500 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 animate-float" style={{ animationDelay: '0.2s' }}>
                    <i className="fas fa-map-marker-alt text-white text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Visit Us</h3>
                    <p className="text-gray-600 mb-4">Come visit our headquarters by the coast.</p>
                    <address className="text-gray-700 not-italic">
                      123 Ocean Drive<br />
                      Coastal City, CA 90210<br />
                      United States
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-br from-turquoise/5 via-ocean-blue/5 to-sky-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-blue to-turquoise">Questions</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">Quick answers to common questions about Ecoshore</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-xl transition-all duration-300 hover:scale-105 animate-fade-up">
              <h3 className="text-xl font-bold text-gray-800 mb-4">How accurate is the real-time beach data?</h3>
              <p className="text-gray-600 leading-relaxed">Our data is sourced from official weather services, local monitoring stations, and community reports, updated every 15 minutes for maximum accuracy.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl transition-all duration-300 hover:scale-105 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Is Ecoshore available worldwide?</h3>
              <p className="text-gray-600 leading-relaxed">Currently, we cover major coastal areas in North America, with plans to expand to Europe and Australia in 2024. Check our coverage map for specific locations.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl transition-all duration-300 hover:scale-105 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Is there a mobile app available?</h3>
              <p className="text-gray-600 leading-relaxed">Our mobile app is currently in development and will be available for iOS and Android in early 2024. Sign up for our newsletter to be notified when it launches.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
