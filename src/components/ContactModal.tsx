import React, { useState } from 'react';
import {
  X,
  Phone,
  MapPin,
  Clock,
  Send,
  Navigation,
  CheckCircle,
  Youtube,
  Instagram,
  Facebook,
} from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMsg = `Hello Computer Galaxy Sirohi!%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Query:* ${message}`;
    window.open(`https://wa.me/918852834882?text=${whatsappMsg}`, '_blank');
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Phone className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold text-base sm:text-lg font-display text-white">
              Contact COMPUTER GALAXY – Sirohi
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {sent ? (
            <div className="text-center py-8 space-y-2">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <p className="font-bold text-slate-900 text-base">Opening WhatsApp to connect with store...</p>
              <p className="text-xs text-slate-500">Our representative at Station Road, Sirohi will assist you.</p>
            </div>
          ) : (
            <>
              {/* Quick Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <a
                  href="tel:08852834882"
                  className="p-4 bg-orange-50/70 border border-orange-200/80 rounded-2xl flex items-center gap-3 hover:bg-orange-100/70 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-orange-700 block">Direct Store Hotline</span>
                    <span className="font-bold text-slate-900 text-sm">088528 34882</span>
                  </div>
                </a>

                <a
                  href="https://maps.google.com/?q=Computer+Galaxy+Sirohi+Rajasthan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3 hover:bg-slate-100 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0">
                    <Navigation className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Google Maps</span>
                    <span className="font-bold text-slate-900 text-xs">Station Road, Sirohi</span>
                  </div>
                </a>
              </div>

              {/* Inquiry Form */}
              <form onSubmit={handleSubmit} className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                <p className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                  Send a Quick Hardware or Custom PC Enquiry:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikram Singh"
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9829012345"
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Requirement / Query</label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about laptop models, RTX graphic cards in stock, PC build quotation, or printer toner refilling..."
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Send via WhatsApp to Computer Galaxy (088528 34882)</span>
                </button>
              </form>

              {/* Social Channels */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Official Channels:</span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.youtube.com/@weblinkitgyan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 hover:text-red-600 flex items-center gap-1 font-semibold"
                  >
                    <Youtube className="w-3.5 h-3.5 text-red-500" />
                    weblinkitgyan
                  </a>
                  <span>·</span>
                  <a
                    href="https://www.instagram.com/weblinkittech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 hover:text-pink-600 flex items-center gap-1 font-semibold"
                  >
                    <Instagram className="w-3.5 h-3.5 text-pink-500" />
                    weblinkittech
                  </a>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
