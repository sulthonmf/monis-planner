'use client';

import { Settings, HelpCircle, Upload, Globe } from 'lucide-react';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { Currency } from '@/types/workspace';

const currencies: { code: Currency; symbol: string }[] = [
  { code: 'IDR', symbol: 'Rp' },
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
];

export default function Header() {
  const { currency, setCurrency } = useWorkspaceStore();

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100 select-none">
      {/* Logo & Left Panel Toggle */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 ml-1">
          <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
            <div className="bg-emerald-600 rounded-sm" />
            <div className="bg-emerald-400 rounded-sm" />
            <div className="bg-emerald-500 rounded-sm" />
            <div className="bg-emerald-600 rounded-sm" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            monis<span className="text-gray-400 font-normal">.rent</span>
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="hidden md:flex items-center gap-3">
        <h1 className="text-xl font-bold text-gray-900">Build Your Workspace</h1>
        <span className="text-sm text-gray-400">Design it. Love it. Rent it.</span>
      </div>

      {/* Actions & Currency Switcher */}
      <div className="flex items-center gap-3">
        {/* Currency Switcher */}
        <div className="flex items-center bg-gray-100/90 p-1 rounded-xl gap-0.5 border border-gray-200/80">
          <Globe size={14} className="text-gray-400 ml-1.5 mr-0.5" />
          {currencies.map((item) => (
            <button
              key={item.code}
              onClick={() => setCurrency(item.code)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                currency === item.code
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {item.code}
            </button>
          ))}
        </div>

        <div className="h-4 w-px bg-gray-200 hidden sm:block" />

        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
          <Settings size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
          <HelpCircle size={20} />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-all">
          <Upload size={16} />
          Save Setup
        </button>
      </div>
    </header>
  );
}


