import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedHeadingProps {
  text: string;
  isActive: boolean;
  className?: string;
}

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({ text, isActive, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const shouldAnimate = isActive && inView;

  const words = text.split(/(\s+|\n)/);

  return (
    <span ref={ref} className="inline-block overflow-hidden">
      {words.map((word, index) => {
        if (word === '\n') return <br key={index} />;

        return (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{
              duration: 0.5,
              delay: shouldAnimate ? 0.5 + index * 0.15 : 0,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className={`inline-block ${className}`}
          >
            {word === ' ' ? '\u00A0' : word}
          </motion.span>
        );
      })}
    </span>
  );
};


export default AnimatedHeading;
