import { Plus } from 'lucide-react';
import AlertIcon from './icons/AlertIcon';

interface FloatingActionButtonProps {
  onQuickReport: () => void;
}

export default function FloatingActionButton({ onQuickReport }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onQuickReport}
      className="fixed bottom-20 right-6 w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
    >
      <Plus className="w-6 h-6" />
    </button>
  );
}
