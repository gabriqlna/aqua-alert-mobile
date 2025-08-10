interface AlertIconProps {
  className?: string;
  variant?: 'info' | 'warning' | 'error' | 'success';
}

export default function AlertIcon({ className = "w-5 h-5", variant = 'info' }: AlertIconProps) {
  const getColor = () => {
    switch (variant) {
      case 'warning':
        return '#FFCC80'; // Laranja
      case 'error':
        return '#EF9A9A'; // Vermelho
      case 'success':
        return '#A5D6A7'; // Verde
      default:
        return '#64B5F6'; // Azul
    }
  };

  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={getColor()}
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        fill={getColor()}
        fillOpacity="0.1"
      />
      <line x1="12" y1="9" x2="12" y2="13" stroke={getColor()} strokeWidth="2"/>
      <circle cx="12" cy="17" r="1" fill={getColor()}/>
    </svg>
  );
}