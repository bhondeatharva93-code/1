import React from 'react';
import { Phone, Sparkles } from 'lucide-react';

interface AnnouncementBarProps {
  onCallClick?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onCallClick }) => {
  return (
    <div className="relative z-50 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 text-white text-xs sm:text-sm font-medium py-2 px-4 shadow-sm select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden text-center mx-auto sm:mx-0">
          <span className="text-base leading-none">🪔</span>
          <span className="font-bold tracking-wide uppercase truncate">
            DIWALI DHAMAKA SALE – BIGGEST OFFERS OF THE YEAR!
          </span>
          <span className="text-base leading-none">🪔</span>
          <span className="hidden md:inline-flex items-center gap-1 text-amber-100 text-xs pl-2 border-l border-amber-400/40">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            Up to 40% Off on Gaming Rigs, Laptops & Components
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-4 shrink-0 text-xs text-amber-100">
          <span className="text-amber-200">Sirohi Store: Station Road</span>
          <span aria-hidden="true">·</span>
          <a
            href="tel:08852834882"
            onClick={onCallClick}
            className="flex items-center gap-1.5 font-semibold text-white hover:text-amber-200 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            088528 34882
          </a>
        </div>
      </div>
    </div>
  );
};
