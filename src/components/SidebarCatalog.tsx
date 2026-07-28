'use client';

import Image from 'next/image';
import {
  Check,
  Plus,
  Trash2,
  PanelLeftClose,
  LayoutGrid,
  Laptop,
  Monitor,
  Headphones,
  Keyboard,
  Activity,
  Armchair,
  Home,
  Gamepad2,
  LucideIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { categoryTabs, getProductsByCategory, formatPrice } from '@/data/products';
import { CategoryTab, Product } from '@/types/workspace';
import { useState, useRef } from 'react';

const iconMap: Record<string, LucideIcon> = {
  LayoutGrid,
  Laptop,
  Monitor,
  Headphones,
  Keyboard,
  Activity,
  Armchair,
  Home,
  Gamepad2,
};

export default function SidebarCatalog() {
  const [activeTab, setActiveTab] = useState<CategoryTab>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const {
    selectedDeskId,
    selectedChairId,
    selectedAccessories,
    currency,
    setDesk,
    setChair,
    toggleAccessory,
    clearAll,
    toggleLeftPanel,
  } = useWorkspaceStore();


  const currentProducts = getProductsByCategory(activeTab);

  const isSelected = (product: Product) => {
    if (product.category === 'desk') return selectedDeskId === product.id;
    if (product.category === 'chair') return selectedChairId === product.id;
    return !!selectedAccessories[product.id];
  };

  const handleSelect = (product: Product) => {
    if (product.category === 'desk') setDesk(product.id);
    else if (product.category === 'chair') setChair(product.id);
    else toggleAccessory(product.id);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollContainerRef.current && e.deltaY !== 0) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  const activeMeta = categoryTabs.find((c) => c.key === activeTab) || categoryTabs[0];

  return (
    <aside className="w-[320px] min-w-[320px] bg-white border-r border-gray-100 flex flex-col h-full overflow-hidden select-none">
      {/* Header & Hide Button */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700">Catalog</h2>
        </div>
        <button
          onClick={toggleLeftPanel}
          title="Hide catalog panel"
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 transition-colors flex items-center gap-1 text-xs"
        >
          <span className="text-[11px] font-medium text-gray-500">Hide</span>
          <PanelLeftClose size={15} />
        </button>
      </div>

      {/* Horizontal Scrollable Categories Navigation Bar */}
      <div className="border-b border-gray-100 bg-white">
        <div
          ref={scrollContainerRef}
          onWheel={handleWheel}
          className="flex items-center gap-1.5 overflow-x-auto p-2.5 scrollbar-none cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categoryTabs.map((cat) => {
            const IconComp = iconMap[cat.iconName] || LayoutGrid;
            const isActive = activeTab === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent'
                }`}
              >
                <IconComp size={14} className={isActive ? 'text-emerald-400' : 'text-gray-500'} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>


      {/* Product List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {/* Section Title */}
        <div className="mb-2 flex items-center justify-between px-1">
          <div>
            <h3 className="text-sm font-bold text-gray-900">{activeMeta.label}</h3>
            <p className="text-xs text-gray-400">
              {currentProducts.length} product{currentProducts.length === 1 ? '' : 's'} available
            </p>
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {currentProducts.map((product) => {
            const selected = isSelected(product);
            return (
              <motion.button
                key={product.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={() => handleSelect(product)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-xl border-2 transition-all text-left group ${
                  selected
                    ? 'border-emerald-500 bg-emerald-50/50 shadow-xs'
                    : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
                }`}
              >
                {/* Product Thumbnail */}
                <div className="w-14 h-14 rounded-lg bg-gray-50 flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={56}
                    height={56}
                    className="object-contain p-1"
                  />
                  {/* Plus badge for accessories */}
                  {product.category === 'accessory' && !selected && (
                    <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center shadow-xs">
                      <Plus size={10} className="text-white" />
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-semibold text-gray-900 truncate">
                      {product.name}
                    </p>
                    {product.badge && (
                      <span className="text-[10px] font-medium px-1.5 py-0.2 bg-emerald-100 text-emerald-700 rounded-md">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-emerald-600 mt-0.5">
                    {formatPrice(product.price, currency)} / week
                  </p>

                  <p className="text-[11px] text-gray-400 capitalize">
                    {product.category}
                  </p>
                </div>

                {/* Selection Indicator */}
                {selected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-xs"
                  >
                    <Check size={12} className="text-white" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>

        {currentProducts.length === 0 && (
          <div className="py-10 text-center text-gray-400 text-xs">
            No products found in this category.
          </div>
        )}
      </div>

      {/* Clear All Footer */}
      <div className="p-3 border-t border-gray-100 bg-gray-50/30">
        <button
          onClick={clearAll}
          className="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-red-500 transition-colors w-full justify-center py-2 rounded-lg hover:bg-red-50"
        >
          <Trash2 size={14} />
          Clear All Items
        </button>
      </div>
    </aside>
  );
}

