'use client';

import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { durationOptions, formatPrice, getProductById } from '@/data/products';
import { useState } from 'react';

export default function DurationSelector() {
  const { duration, setDuration, selectedDeskId, selectedChairId, selectedAccessories, currency } =
    useWorkspaceStore();

  const [showCustom, setShowCustom] = useState(false);
  const [customWeeks, setCustomWeeks] = useState('');

  // Calculate base weekly price for display
  const desk = selectedDeskId ? getProductById(selectedDeskId) : null;
  const chair = selectedChairId ? getProductById(selectedChairId) : null;
  const accessoriesPrice = Object.entries(selectedAccessories).reduce((sum, [id, qty]) => {
    const p = getProductById(id);
    return sum + (p?.price || 0) * qty;
  }, 0);
  const baseWeeklyPrice = (desk?.price || 0) + (chair?.price || 0) + accessoriesPrice;

  const handleCustomSubmit = () => {
    const weeks = parseInt(customWeeks);
    if (weeks >= 1 && weeks <= 52) {
      setDuration(weeks);
      setShowCustom(false);
    }
  };

  // Get discount for a specific duration
  const getDiscount = (weeks: number) => {
    const option = durationOptions.find((d) => d.weeks === weeks);
    return option?.discount || 0;
  };

  return (
    <div className="bg-white border-t border-gray-100 px-6 py-3">
      <div className="flex items-center gap-4">
        {/* Label */}
        <div className="flex-shrink-0">
          <p className="text-sm font-semibold text-gray-900">
            How long do you want to rent?
          </p>
          <p className="text-xs text-gray-400">
            The longer you rent, the more you save!
          </p>
        </div>

        {/* Duration Options */}
        <div className="flex items-center gap-2 flex-1">
          {durationOptions.map((option) => {
            const isActive = duration === option.weeks;
            const discountedPrice = Math.round(
              baseWeeklyPrice * (1 - option.discount / 100)
            );
            return (
              <button
                key={option.weeks}
                onClick={() => setDuration(option.weeks)}
                className={`relative flex-1 py-2.5 px-3 rounded-xl text-center transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-100'
                }`}
              >
                {/* Discount Badge */}
                {option.discount > 0 && (
                  <span
                    className={`absolute -top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white text-emerald-600'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {option.discount}% OFF
                  </span>
                )}
                <p className="text-sm font-semibold">{option.label}</p>
                <p
                  className={`text-[11px] mt-0.5 ${
                    isActive ? 'text-emerald-100' : 'text-gray-400'
                  }`}
                >
                  {formatPrice(discountedPrice, currency)} / week

                </p>
              </button>
            );
          })}

          {/* Custom Duration */}
          <div className="relative flex-shrink-0">
            {showCustom ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1"
              >
                <input
                  type="number"
                  min={1}
                  max={52}
                  value={customWeeks}
                  onChange={(e) => setCustomWeeks(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
                  placeholder="Weeks"
                  className="w-20 py-2 px-2 border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:border-emerald-500"
                  autoFocus
                />
                <button
                  onClick={handleCustomSubmit}
                  className="py-2 px-3 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                >
                  Set
                </button>
              </motion.div>
            ) : (
              <button
                onClick={() => setShowCustom(true)}
                className={`py-2.5 px-4 rounded-xl text-center transition-all ${
                  !durationOptions.find((d) => d.weeks === duration)
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-100'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  <span className="text-sm font-medium">Custom</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-0.5">Pick your duration</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
