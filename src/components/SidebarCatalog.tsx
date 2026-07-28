'use client';

import Image from 'next/image';
import { Check, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { getProductsByCategory, formatPrice } from '@/data/products';
import { CategoryTab, Product } from '@/types/workspace';
import { useState } from 'react';

export default function SidebarCatalog() {
  const [activeTab, setActiveTab] = useState<CategoryTab>('desk');
  const {
    selectedDeskId,
    selectedChairId,
    selectedAccessories,
    setDesk,
    setChair,
    toggleAccessory,
    clearAll,
  } = useWorkspaceStore();

  const tabs: { key: CategoryTab; label: string }[] = [
    { key: 'desk', label: 'Desk' },
    { key: 'chair', label: 'Chair' },
    { key: 'accessory', label: 'Accessories' },
  ];

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

  return (
    <aside className="w-[280px] min-w-[280px] bg-white border-r border-gray-100 flex flex-col h-full overflow-hidden">
      {/* Category Tabs */}
      <div className="flex border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === tab.key
                ? 'text-gray-900'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <motion.div
                layoutId="catalog-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"
              />
            )}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {/* Section Header */}
        <div className="mb-2">
          <h3 className="text-sm font-semibold text-gray-900 capitalize">
            {activeTab === 'accessory' ? 'Accessories' : activeTab}
          </h3>
          <p className="text-xs text-gray-400">
            {activeTab === 'desk'
              ? 'Choose your desk'
              : activeTab === 'chair'
              ? 'Choose your chair'
              : 'Add accessories'}
          </p>
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
                    ? 'border-emerald-500 bg-emerald-50/50'
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
                  {/* Add icon for accessories */}
                  {product.category === 'accessory' && !selected && (
                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Plus size={12} className="text-white" />
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatPrice(product.price)} / week
                  </p>
                </div>

                {/* Selection Indicator */}
                {selected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0"
                  >
                    <Check size={12} className="text-white" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Clear All */}
      <div className="p-3 border-t border-gray-100">
        <button
          onClick={clearAll}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors w-full justify-center py-2"
        >
          <Trash2 size={14} />
          Clear All
        </button>
      </div>
    </aside>
  );
}
