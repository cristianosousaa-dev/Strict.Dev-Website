import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface AnimatedCounterProps {
  value?: number;
  end?: number;
  suffix?: string;
  duration?: number;
  isInView?: boolean;
}

export default function AnimatedCounter({ value, end, suffix = '', duration = 2, isInView }: AnimatedCounterProps) {
  const targetValue = end || value || 0;
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted && !isInView) return;
    
    const shouldStart = hasStarted || isInView;
    if (!shouldStart) return;

    const steps = 60;
    const increment = targetValue / steps;
    const stepDuration = (duration * 1000) / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setCount(Math.min(Math.round(increment * currentStep), targetValue));
      } else {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [targetValue, duration, hasStarted, isInView]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => setHasStarted(true)}
    >
      {count}{suffix}
    </motion.span>
  );
}