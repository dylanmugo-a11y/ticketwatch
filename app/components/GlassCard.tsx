'use client';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'dark' | 'coral' | 'teal' | 'yellow' | 'pink';
  hover?: boolean;
  ticket?: boolean;
  ticketStub?: React.ReactNode;
}

export default function GlassCard({
  children,
  className = '',
  variant = 'default',
  hover = true,
  ticket = false,
  ticketStub,
}: GlassCardProps) {
  const base = 'rounded-2xl transition-all duration-300';
  const hoverClass = hover ? 'hover:shadow-lg hover:scale-[1.01]' : '';
  const variants: Record<string, string> = {
    default: 'glass',
    strong: 'glass-strong',
    dark: 'glass-dark',
    coral: 'glass-coral',
    teal: 'glass-teal',
    yellow: 'glass-yellow',
    pink: 'glass-pink',
  };

  const ticketClasses = ticket ? 'ticket-shape ticket-shimmer' : '';

  if (ticket && ticketStub) {
    return (
      <div className={`${base} ${hoverClass} ${variants[variant]} ${ticketClasses} ${className}`}>
        <div className="flex">
          <div className="flex-1">{children}</div>
          <div className="ticket-stub">{ticketStub}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${base} ${hoverClass} ${variants[variant]} ${ticketClasses} ${className}`}>
      {children}
    </div>
  );
}
