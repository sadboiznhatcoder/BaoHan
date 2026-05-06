import React from 'react';
import { motion } from 'framer-motion';

export default function BlurText({ text, className }) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const child = {
    hidden: { 
      filter: 'blur(10px)', 
      opacity: 0, 
      y: 50 
    },
    visible: {
      filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
      opacity: [0, 0.5, 1],
      y: [50, -5, 0],
      transition: {
        duration: 0.7,
        times: [0, 0.5, 1],
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={child}
          style={{ marginRight: '0.28em', display: 'inline-block', willChange: 'filter, opacity, transform' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
