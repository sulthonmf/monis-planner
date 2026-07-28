'use client';

import { Settings, HelpCircle, Upload } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100">
      {/* Logo */}
      <div className="flex items-center gap-2">
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

      {/* Title */}
      <div className="hidden md:flex items-center gap-3">
        <h1 className="text-xl font-bold text-gray-900">Build Your Workspace</h1>
        <span className="text-sm text-gray-400">Design it. Love it. Rent it.</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
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
