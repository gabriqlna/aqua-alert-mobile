interface WaterIconProps {
  className?: string;
  status: 'available' | 'unavailable' | 'maintenance';
}

export default function WaterIcon({ className = "w-6 h-6", status }: WaterIconProps) {
  const getColor = () => {
    switch (status) {
      case 'available':
        return '#A5D6A7'; // Verde
      case 'unavailable':
        return '#EF9A9A'; // Vermelho
      case 'maintenance':
        return '#FFCC80'; // Laranja
      default:
        return '#9E9E9E'; // Cinza
    }
  };

  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill={getColor()} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L13.09 8.26L16 7L14.5 13.75L21 13L15.45 16.25L18 22L12 18L6 22L8.55 16.25L3 13L9.5 13.75L8 7L10.91 8.26L12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="14" r="3" fill={getColor()} opacity="0.7" />
    </svg>
  );
}