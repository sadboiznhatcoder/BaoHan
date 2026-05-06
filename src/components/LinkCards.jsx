import React from 'react';
import { motion } from 'framer-motion';

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
);

const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const CARD1_LINKS = [
  { label: 'Our Playlists', Icon: PlayIcon, href: '#' },
  { label: 'Shared Memories', Icon: HeartIcon, href: '#' },
  { label: 'Love Notes', Icon: MessageIcon, href: '#' },
];

const CARD2_LINKS = [
  { label: 'Instagram: @_baobaohan_', Icon: InstagramIcon, href: 'https://www.instagram.com/_baobaohan_/' },
  { label: 'Facebook: Trần Bảo Hân', Icon: FacebookIcon, href: 'https://www.facebook.com/bhnnnn0803' },
  { label: 'Gọi cho tôi: 0707 08 09 40', Icon: PhoneIcon, href: 'tel:0707080940' },
];

function LinkItem({ label, Icon, href }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 w-full p-3 liquid-glass rounded-xl hover:bg-white/10 transition-colors border border-white/5 no-underline group"
      whileHover={{ x: 5 }}
    >
      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white group-hover:scale-110 transition-transform">
        <Icon />
      </div>
      <span className="text-sm font-medium text-white/90">{label}</span>
    </motion.a>
  );
}

export default function LinkCards() {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Card 1: Portals */}
      <motion.div 
        className="liquid-glass p-5 rounded-[1.25rem] flex-1 flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="mb-4">
          <h3 className="text-lg font-semibold tracking-wide">Love Portals</h3>
          <p className="text-xs text-white/50 uppercase tracking-widest mt-1">Always · Forever · Yours</p>
        </div>
        <div className="space-y-3 flex-1">
          {CARD1_LINKS.map(link => <LinkItem key={link.label} {...link} />)}
        </div>
      </motion.div>

      {/* Card 2: Socials */}
      <motion.div 
        className="liquid-glass p-5 rounded-[1.25rem] flex-1 flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <div className="mb-4">
          <h3 className="text-lg font-semibold tracking-wide">Connect</h3>
          <p className="text-xs text-white/50 uppercase tracking-widest mt-1">Stay in touch</p>
        </div>
        <div className="space-y-3 flex-1">
          {CARD2_LINKS.map(link => <LinkItem key={link.label} {...link} />)}
        </div>
      </motion.div>
    </div>
  );
}
