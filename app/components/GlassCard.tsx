interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'dark';
}

export default function GlassCard({ children, className = '', variant = 'default' }: GlassCardProps) {
  const base = 'rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl';
  const variants = {
    default: 'glass',
    strong: 'glass-strong',
    dark: 'glass-dark',
  };

  return (
    <div className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
