interface TicketBarcodeProps {
  className?: string;
  slim?: boolean;
  label?: string;
}

export default function TicketBarcode({ className = '', slim = false, label }: TicketBarcodeProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={slim ? 'barcode-slim' : 'barcode'} />
      {label && <span className="ticket-serial">{label}</span>}
    </div>
  );
}
