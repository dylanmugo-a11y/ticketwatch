interface TearLineProps {
  className?: string;
  color?: 'default' | 'coral' | 'teal';
}

export default function TearLine({ className = '', color = 'default' }: TearLineProps) {
  const colorClass = color === 'coral' ? 'tear-line-coral' : color === 'teal' ? 'tear-line-teal' : '';
  return <hr className={`tear-line ${colorClass} ${className}`} />;
}
