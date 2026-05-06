import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, MessageCircle, Video } from 'lucide-react';
import FadingVideo from './FadingVideo';
import BlurText from './BlurText';

export default function IntroLanding({ onEnterAI }) {
  const scrollToContact = () => {
    document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' });
  };

  const socials = [
    { name: 'Facebook', icon: Facebook, link: 'https://www.facebook.com/bhnnnn0803?locale=vi_VN' },
    { name: 'Instagram', icon: Instagram, link: 'https://www.instagram.com/_baobaohan_' },
    { name: 'Threads', icon: MessageCircle, link: 'https://www.threads.com/@_baobaohan_?igshid=NTc4MTIwNjQ2YQ==' },
    { name: 'TikTok', icon: Video, link: 'https://www.tiktok.com/@bhdepgaii?_r=1&_t=ZS-968vs6AMTA4' },
  ];

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden">
      {/* --- SECTION 1: HERO --- */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <FadingVideo
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 z-10"></div>
        </div>

        {/* Navbar */}
        <nav className="absolute top-0 left-0 w-full px-6 py-6 flex justify-between items-center z-50">
          <div className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center">
            <span className="font-serif italic text-xl text-white">a</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase text-white/80 font-medium font-sans">
            <span className="hover:text-white cursor-pointer transition-colors">Our Story</span>
            <span className="hover:text-white cursor-pointer transition-colors">Memories</span>
            <span className="hover:text-white cursor-pointer transition-colors">The Future</span>
            <span onClick={scrollToContact} className="hover:text-white cursor-pointer transition-colors">Contact</span>
          </div>
          <div className="md:hidden"></div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-20 w-full max-w-5xl mx-auto text-center px-4">
          <BlurText 
            text="Venture Past Our Sky Across the Universe"
            className="font-serif italic text-6xl md:text-8xl leading-none mb-6 text-white drop-shadow-2xl"
          />
          
          <motion.p
            className="text-white/70 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto font-sans leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            A digital universe curated specifically for the one I love. Connect with me or dive deep into the AI experience.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <button 
              onClick={onEnterAI}
              className="px-10 py-4 rounded-full liquid-glass-strong text-white font-medium uppercase tracking-widest text-sm hover:bg-white/10 transition-all border border-white/20"
            >
              Khám phá AI
            </button>
            <button 
              onClick={scrollToContact}
              className="px-10 py-4 rounded-full liquid-glass text-white font-medium uppercase tracking-widest text-sm hover:bg-white/10 transition-all border border-white/20"
            >
              Connect
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 2: SOCIALS & CONTACT --- */}
      <section id="contact-section" className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-4">
        <div className="absolute inset-0 z-0">
          <FadingVideo
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 z-10"></div>
        </div>

        <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center">
          <motion.h2 
            className="font-serif italic text-5xl mb-16 text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Reach Out To Me
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {socials.map((social, idx) => (
              <motion.a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass rounded-2xl p-8 flex flex-col items-center justify-center gap-4 group transition-all duration-300 hover:-translate-y-2 hover:bg-white/5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
              >
                <div className="p-4 rounded-full bg-white/5 group-hover:bg-white/20 transition-colors text-white">
                  <social.icon size={32} strokeWidth={1.5} />
                </div>
                <span className="font-sans font-medium tracking-wide text-white/90">{social.name}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Footer Text */}
        <motion.div 
          className="absolute bottom-10 w-full text-center px-4 z-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <p className="font-serif italic text-xl text-white/80 tracking-wide">
            Trang web này được làm bởi tình yêu của Minh Nhật cho Bảo Hân ❤️
          </p>
        </motion.div>
      </section>
    </div>
  );
}
