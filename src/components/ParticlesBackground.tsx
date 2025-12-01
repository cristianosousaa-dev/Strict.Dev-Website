import { useEffect, useRef } from 'react';
import { Theme, Mode } from '../App';
import { isLowEndDevice, isSlowNetwork } from '../utils/webVitals';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
}

interface ParticlesBackgroundProps {
  theme: Theme;
  mode: Mode;
}

const themeColors = {
  white: {
    light: ['rgba(44, 95, 93, 0.3)', 'rgba(58, 115, 113, 0.3)', 'rgba(74, 135, 133, 0.3)'],
    dark: ['rgba(74, 135, 133, 0.4)', 'rgba(90, 155, 152, 0.4)', 'rgba(106, 175, 172, 0.4)']
  },
  lavender: {
    light: ['rgba(59, 130, 246, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(99, 102, 241, 0.3)'],
    dark: ['rgba(59, 130, 246, 0.4)', 'rgba(139, 92, 246, 0.4)', 'rgba(99, 102, 241, 0.4)']
  },
  mint: {
    light: ['rgba(52, 211, 153, 0.3)', 'rgba(16, 185, 129, 0.3)', 'rgba(110, 231, 183, 0.3)'],
    dark: ['rgba(52, 211, 153, 0.4)', 'rgba(16, 185, 129, 0.4)', 'rgba(110, 231, 183, 0.4)']
  },
  peach: {
    light: ['rgba(251, 146, 60, 0.3)', 'rgba(249, 115, 22, 0.3)', 'rgba(253, 186, 116, 0.3)'],
    dark: ['rgba(251, 146, 60, 0.4)', 'rgba(249, 115, 22, 0.4)', 'rgba(253, 186, 116, 0.4)']
  },
  sky: {
    light: ['rgba(56, 189, 248, 0.3)', 'rgba(14, 165, 233, 0.3)', 'rgba(125, 211, 252, 0.3)'],
    dark: ['rgba(56, 189, 248, 0.4)', 'rgba(14, 165, 233, 0.4)', 'rgba(125, 211, 252, 0.4)']
  },
  rose: {
    light: ['rgba(244, 114, 182, 0.3)', 'rgba(236, 72, 153, 0.3)', 'rgba(251, 113, 133, 0.3)'],
    dark: ['rgba(244, 114, 182, 0.4)', 'rgba(236, 72, 153, 0.4)', 'rgba(251, 113, 133, 0.4)']
  }
};

export default function ParticlesBackground({ theme, mode }: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // OTIMIZAÇÃO: Early return ANTES do useEffect (não renderiza em mobile)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  useEffect(() => {
    // OTIMIZAÇÃO: Early return dentro do useEffect também
    if (isMobile) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Performance: Reduzir/desativar em dispositivos low-end
    const isLowEnd = isLowEndDevice();
    const isSlow = isSlowNetwork();
    
    // Desativar completamente em condições adversas
    if (isSlow || (isMobile && window.innerWidth < 480) || (isLowEnd && isMobile)) {
      return;
    }

    // Configurar canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    // Ajustar quantidade baseado em capacidade do dispositivo
    const particleCount = isLowEnd ? 20 : isMobile ? 30 : 50;

    // Criar partículas pequenas e suaves
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1, // Pequenas: 1-3px
        speedX: (Math.random() - 0.5) * 0.5, // Movimento lento
        speedY: (Math.random() - 0.5) * 0.5
      });
    }

    const colors = themeColors[theme][mode];
    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Atualizar posição
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Desenhar partícula suave
        const color = colors[index % colors.length];
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Desenhar linhas de conexão suaves
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = 0.15 * (1 - distance / 150);
            ctx.strokeStyle = colors[0].replace(/[\d.]+\)$/g, `${opacity})`);
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme, mode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: 10,
        opacity: 0.8
      }}
    />
  );
}