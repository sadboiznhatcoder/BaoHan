import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, MessageCircle, Video } from 'lucide-react';
import FadingVideo from './FadingVideo';

export default function IntroLanding({ onEnterAI }) {
  const scrollToContact = () => {
    document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden font-['Inter']">
      {/* SECTION 1 */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <FadingVideo src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4" />
        <div className="absolute inset-0 bg-black/40 z-10" />

        <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
          <div className="font-['Instrument_Serif'] text-3xl font-bold italic text-white drop-shadow">
            Bảo Hân
          </div>
          <div className="hidden md:flex gap-8 text-white/80 text-sm font-medium">
            <span className="hover:text-white cursor-pointer transition-colors">Our Story</span>
            <span className="hover:text-white cursor-pointer transition-colors">Memories</span>
            <span className="hover:text-white cursor-pointer transition-colors">The Future</span>
            <span onClick={scrollToContact} className="hover:text-white cursor-pointer transition-colors">Contact</span>
          </div>
          <div className="w-20" /> {/* Spacer */}
        </nav>

        <div className="relative z-20 text-center max-w-5xl px-4 mt-12">
          <motion.h1 
            className="font-['Instrument_Serif'] italic text-6xl md:text-8xl leading-[0.95] tracking-tight text-white mb-8"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5 }}
          >
            Venture Past Our Sky<br />Across the Universe
          </motion.h1>

          <motion.p 
            className="font-['Inter'] text-white/70 max-w-2xl mx-auto text-lg md:text-xl font-light mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            A digital universe curated specifically for the one I love. Connect with me or dive deep into the AI experience.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <button 
              onClick={onEnterAI}
              className="liquid-glass-strong rounded-full px-8 py-3 text-white uppercase tracking-wider font-medium text-sm hover:bg-white/10 transition-colors"
            >
              Khám phá AI
            </button>
            <button 
              onClick={scrollToContact}
              className="rounded-full px-8 py-3 border border-white/30 text-white uppercase tracking-wider font-medium text-sm hover:bg-white/10 transition-colors"
            >
              Connect
            </button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section id="contact-section" className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-4">
        <FadingVideo src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" />
        <div className="absolute inset-0 bg-black/60 z-10" />

        <div className="relative z-20 w-full max-w-5xl flex flex-col items-center">
          <motion.h2 
            className="font-['Instrument_Serif'] italic text-5xl md:text-7xl text-white text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Reach Out To Me
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[
              { icon: Video, name: 'TikTok', link: 'https://www.tiktok.com/@bhdepgaii?_r=1&_t=ZS-968vs6AMTA4' },
              { icon: MessageCircle, name: 'Threads', link: 'https://www.threads.com/@_baobaohan_?igshid=NTc4MTIwNjQ2YQ==' },
              { icon: Facebook, name: 'Facebook', link: 'https://www.facebook.com/bhnnnn0803?locale=vi_VN' },
              { icon: Instagram, name: 'Instagram', link: 'https://www.instagram.com/_baobaohan_' }
            ].map((social, idx) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-glass rounded-2xl p-8 flex flex-col items-center justify-center gap-4 group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,192,203,0.1)] hover:bg-white/5"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <div className="p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                    <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="font-['Inter'] font-medium text-white/90">{social.name}</span>
                </motion.a>
              );
            })}
          </div>
        </div>

        <motion.p 
          className="relative z-20 font-['Instrument_Serif'] text-xl italic text-center mt-20 pb-10 text-white/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Trang web này được làm bởi tình yêu của Minh Nhật cho Bảo Hân ❤️
        </motion.p>
      </section>
    </div>
  );
}
