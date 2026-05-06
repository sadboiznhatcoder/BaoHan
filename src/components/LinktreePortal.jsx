import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   SVG ICONS — Crisp inline vectors, zero external deps
   ═══════════════════════════════════════════════════════════════ */
const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
    className="w-5 h-5 shrink-0">
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
    className="w-5 h-5 shrink-0">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
    className="w-5 h-5 shrink-0">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
    className="w-5 h-5 shrink-0">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
    className="w-5 h-5 shrink-0">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 4l-10 7L2 4" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   LINK DATA
   ═══════════════════════════════════════════════════════════════ */
const LINKS = [
  {
    id: 'chatbot',
    label: 'BaoHanGay',
    Icon: ChatIcon,
    action: 'unlock',    // special: triggers onUnlock
    featured: true,
  },
  {
    id: 'phone',
    label: 'Gọi cho tôi: 0707 08 09 40',
    Icon: PhoneIcon,
    href: 'tel:0707080940',
  },
  {
    id: 'instagram',
    label: 'Instagram: @_baobaohan_',
    Icon: InstagramIcon,
    href: 'https://www.instagram.com/_baobaohan_/',
  },
  {
    id: 'facebook',
    label: 'Facebook: Trần Bảo Hân',
    Icon: FacebookIcon,
    href: 'https://www.facebook.com/bhnnnn0803?locale=vi_VN',
  },
  {
    id: 'email',
    label: 'Liên hệ tôi',
    Icon: EmailIcon,
    href: 'mailto:',
  },
];

/* ═══════════════════════════════════════════════════════════════
   SPRING PRESETS — 120fps+ perceived smoothness
   ═══════════════════════════════════════════════════════════════ */
const SPRING_ENTER   = { type: 'spring', stiffness: 260, damping: 26, mass: 0.7 };
const SPRING_SOFT    = { type: 'spring', stiffness: 180, damping: 22, mass: 0.6 };

/* ═══════════════════════════════════════════════════════════════
   GAY TOOLTIP — Easter-egg floating tooltip
   ═══════════════════════════════════════════════════════════════ */
let tooltipIdCounter = 0;

function GayTooltip({ x, y, id }) {
  return (
    <motion.div
      key={id}
      className="fixed pointer-events-none select-none z-[9999]"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.3, y: 0 }}
      animate={{ opacity: 1, scale: 1, y: -10 }}
      exit={{ opacity: 0, scale: 0.6, y: -60 }}
      transition={{
        enter: { ...SPRING_SOFT, duration: 0.3 },
        exit:  { duration: 0.8, ease: 'easeOut' },
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
        style={{
          background: 'rgba(255, 255, 255, 0.55)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          boxShadow:
            '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
          transform: 'translate(-50%, -100%)',
        }}
      >
        <span
          className="text-sm font-bold tracking-wider"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: '#334155',
          }}
        >
          GAY
        </span>
        <span className="text-base leading-none" role="img" aria-label="kiss">
          👨‍❤️‍💋‍👨
        </span>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GLASS LINK BUTTON
   ═══════════════════════════════════════════════════════════════ */
function GlassLinkButton({ label, Icon, href, action, featured, index, onUnlock }) {
  const isButton = action === 'unlock';

  const content = (
    <>
      <div
        className="flex items-center justify-center w-9 h-9 rounded-full shrink-0"
        style={{
          background: featured
            ? 'linear-gradient(135deg, rgba(168, 130, 255, 0.3), rgba(100, 200, 255, 0.3))'
            : 'rgba(255, 255, 255, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
        }}
      >
        <Icon />
      </div>
      <span className="text-sm sm:text-[15px] font-medium leading-snug">
        {label}
      </span>
    </>
  );

  const sharedStyles = {
    background: featured
      ? 'rgba(255, 255, 255, 0.45)'
      : 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: featured
      ? '1.5px solid rgba(255, 255, 255, 0.6)'
      : '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: featured
      ? '0 8px 32px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(255,255,255,0.2) inset'
      : '0 4px 20px rgba(0, 0, 0, 0.04)',
    color: '#1e293b',
    willChange: 'transform, opacity',
    WebkitTapHighlightColor: 'transparent',
  };

  const motionProps = {
    initial: { opacity: 0, y: 32, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { ...SPRING_ENTER, delay: 0.35 + index * 0.09 },
    whileHover: { scale: 1.03, y: -2 },
    whileTap: { scale: 0.97 },
  };

  if (isButton) {
    return (
      <motion.button
        onClick={onUnlock}
        className="flex items-center gap-3.5 w-full px-5 py-3.5 rounded-2xl cursor-pointer text-left"
        style={sharedStyles}
        {...motionProps}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.a
      href={href}
      target={href.startsWith('tel') || href.startsWith('mailto') ? '_self' : '_blank'}
      rel="noopener noreferrer"
      className="flex items-center gap-3.5 w-full px-5 py-3.5 rounded-2xl cursor-pointer no-underline"
      style={sharedStyles}
      {...motionProps}
    >
      {content}
    </motion.a>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOLOGRAPHIC AURORA BACKGROUND — Ultra-Premium Animated Mesh
   Multi-layered: base gradient + 6 organic blobs + shimmer +
   prismatic overlay + noise texture
   ═══════════════════════════════════════════════════════════════ */
function HolographicAurora() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Layer 0 — Deep holographic base gradient with slow colour shift */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              135deg,
              hsl(210, 80%, 90%) 0%,
              hsl(240, 60%, 92%) 10%,
              hsl(175, 55%, 88%) 22%,
              hsl(270, 50%, 91%) 35%,
              hsl(330, 50%, 90%) 48%,
              hsl(195, 60%, 87%) 60%,
              hsl(155, 50%, 88%) 72%,
              hsl(260, 55%, 90%) 85%,
              hsl(210, 80%, 90%) 100%
            )`,
          backgroundSize: '400% 400%',
          animation: 'aurora-shift 25s ease-in-out infinite',
        }}
      />

      {/* Blob 1 — Baby blue — large, slow drift */}
      <div
        className="absolute rounded-full"
        style={{
          width: '65vmax',
          height: '65vmax',
          background: 'radial-gradient(circle, rgba(147,197,253,0.7) 0%, rgba(147,197,253,0.2) 35%, transparent 65%)',
          top: '-28%',
          left: '-18%',
          filter: 'blur(80px)',
          animation: 'aurora-blob-1 18s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Blob 2 — Mint green — organic figure drift */}
      <div
        className="absolute rounded-full"
        style={{
          width: '58vmax',
          height: '58vmax',
          background: 'radial-gradient(circle, rgba(167,243,208,0.65) 0%, rgba(167,243,208,0.15) 35%, transparent 65%)',
          bottom: '-22%',
          right: '-14%',
          filter: 'blur(90px)',
          animation: 'aurora-blob-2 22s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Blob 3 — Soft lavender — figure-eight */}
      <div
        className="absolute rounded-full"
        style={{
          width: '52vmax',
          height: '52vmax',
          background: 'radial-gradient(circle, rgba(196,181,253,0.6) 0%, rgba(196,181,253,0.12) 35%, transparent 65%)',
          top: '22%',
          left: '22%',
          filter: 'blur(100px)',
          animation: 'aurora-blob-3 26s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Blob 4 — Soft peach/rose — gentle sway */}
      <div
        className="absolute rounded-full"
        style={{
          width: '48vmax',
          height: '48vmax',
          background: 'radial-gradient(circle, rgba(253,186,210,0.5) 0%, rgba(253,186,210,0.12) 35%, transparent 65%)',
          top: '3%',
          right: '8%',
          filter: 'blur(75px)',
          animation: 'aurora-blob-4 20s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Blob 5 — Ethereal cyan — circular drift */}
      <div
        className="absolute rounded-full"
        style={{
          width: '44vmax',
          height: '44vmax',
          background: 'radial-gradient(circle, rgba(165,243,252,0.45) 0%, rgba(165,243,252,0.08) 40%, transparent 65%)',
          bottom: '8%',
          left: '8%',
          filter: 'blur(85px)',
          animation: 'aurora-blob-5 24s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Blob 6 — Warm lilac — adds depth in centre */}
      <div
        className="absolute rounded-full"
        style={{
          width: '38vmax',
          height: '38vmax',
          background: 'radial-gradient(circle, rgba(221,204,255,0.4) 0%, rgba(221,204,255,0.08) 40%, transparent 65%)',
          top: '40%',
          left: '45%',
          filter: 'blur(90px)',
          animation: 'aurora-blob-6 28s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Holographic shimmer overlay — diagonal sweep */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            repeating-linear-gradient(
              120deg,
              transparent 0%,
              rgba(255, 255, 255, 0.04) 1.5%,
              transparent 3%
            )`,
          backgroundSize: '200% 200%',
          animation: 'aurora-shimmer 10s linear infinite',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Prismatic colour wash — slow counter-rotating mesh */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            conic-gradient(
              from 0deg at 50% 50%,
              rgba(147,197,253,0.12) 0deg,
              rgba(196,181,253,0.10) 60deg,
              rgba(167,243,208,0.08) 120deg,
              rgba(253,186,210,0.10) 180deg,
              rgba(165,243,252,0.08) 240deg,
              rgba(221,204,255,0.10) 300deg,
              rgba(147,197,253,0.12) 360deg
            )`,
          animation: 'aurora-prismatic 30s linear infinite',
          mixBlendMode: 'soft-light',
          opacity: 0.6,
        }}
      />

      {/* Subtle noise texture for organic depth */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.022,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function LinktreePortal({ onUnlock }) {
  const [tooltips, setTooltips] = useState([]);
  const timeoutsRef = useRef([]);

  /* ── Easter-egg: spawn "GAY" tooltip at click position ── */
  const handleGlobalClick = useCallback((e) => {
    // don't spawn on interactive elements
    const tag = e.target.tagName;
    if (tag === 'A' || tag === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
      return;
    }

    const id = ++tooltipIdCounter;
    const tooltip = { id, x: e.clientX, y: e.clientY };

    setTooltips((prev) => [...prev, tooltip]);

    const timeout = setTimeout(() => {
      setTooltips((prev) => prev.filter((t) => t.id !== id));
    }, 1500);

    timeoutsRef.current.push(timeout);
  }, []);

  return (
    <motion.div
      className="relative w-full h-full flex flex-col items-center overflow-y-auto overflow-x-hidden"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 24px)',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        zIndex: 50,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={handleGlobalClick}
    >


      {/* ── Main Content Card ── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-md px-6 pt-14 sm:pt-20 pb-12">

        {/* ── Avatar ── */}
        <motion.div
          className="relative mb-5"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...SPRING_ENTER, delay: 0.1 }}
        >
          {/* white glow ring */}
          <div
            className="absolute -inset-2 rounded-full"
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              filter: 'blur(12px)',
            }}
          />
          {/* avatar circle */}
          <div
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.4))',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '2.5px solid rgba(255, 255, 255, 0.7)',
              boxShadow: '0 8px 40px rgba(0, 0, 0, 0.08), inset 0 2px 4px rgba(255,255,255,0.8)',
            }}
          >
            <span className="text-5xl sm:text-6xl select-none" role="img" aria-label="avatar">
              🌸
            </span>
          </div>
        </motion.div>

        {/* ── Name ── */}
        <motion.h1
          className="text-center mb-1 tracking-wide"
          style={{
            fontFamily: "'Playfair Display', 'Georgia', serif",
            fontSize: 'clamp(1.5rem, 5vw, 2rem)',
            fontWeight: 700,
            color: '#1e293b',
            letterSpacing: '0.04em',
            willChange: 'transform, opacity',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING_SOFT, delay: 0.22 }}
        >
          TRẦN BẢO HÂN
        </motion.h1>

        {/* ── Tagline ── */}
        <motion.p
          className="text-sm sm:text-[15px] font-medium mb-9 text-center"
          style={{ color: '#64748b', fontFamily: "'Inter', sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          Connect with me&ensp;|&ensp;Bao Han's World
        </motion.p>

        {/* ── Link Buttons ── */}
        <div className="w-full flex flex-col gap-3">
          {LINKS.map((link, i) => (
            <GlassLinkButton
              key={link.id}
              {...link}
              index={i}
              onUnlock={onUnlock}
            />
          ))}
        </div>

        {/* ── Footer ── */}
        <motion.p
          className="mt-10 text-xs text-center font-medium"
          style={{ color: '#94a3b8' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          crafted with 💜 by Nhật
        </motion.p>
      </div>

      {/* ── Easter-egg Tooltips Layer ── */}
      <AnimatePresence>
        {tooltips.map((t) => (
          <GayTooltip key={t.id} x={t.x} y={t.y} id={t.id} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
