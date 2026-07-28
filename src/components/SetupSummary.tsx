'use client';

import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { getProductById, formatPrice, durationOptions } from '@/data/products';

export default function SetupSummary() {
  const {
    selectedDeskId,
    selectedChairId,
    selectedAccessories,
    duration,
    setDesk,
    setChair,
    removeAccessory,
  } = useWorkspaceStore();

  const desk = selectedDeskId ? getProductById(selectedDeskId) : null;
  const chair = selectedChairId ? getProductById(selectedChairId) : null;

  // Build accessory items list
  const accessoryItems = Object.entries(selectedAccessories)
    .map(([id, qty]) => ({
      product: getProductById(id),
      quantity: qty,
    }))
    .filter((item) => item.product);

  // Calculate pricing
  const deskPrice = desk ? desk.price : 0;
  const chairPrice = chair ? chair.price : 0;
  const accessoriesPrice = accessoryItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );
  const subtotal = deskPrice + chairPrice + accessoriesPrice;

  // Duration discount
  const currentDuration = durationOptions.find((d) => d.weeks === duration);
  const discountPercent = currentDuration?.discount || 0;
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const total = subtotal - discountAmount;

  const totalAccessoryCount = Object.values(selectedAccessories).reduce(
    (sum, qty) => sum + qty,
    0
  );

  return (
    <aside className="w-[280px] min-w-[280px] bg-white border-l border-gray-100 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">Your Setup</h2>
        <p className="text-xs text-gray-400">Weekly Rental</p>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Desk */}
        <AnimatePresence>
          {desk && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-lg bg-gray-50 overflow-hidden flex-shrink-0 relative">
                <Image
                  src={desk.image}
                  alt={desk.name}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {desk.name}
                </p>
                <p className="text-xs text-emerald-600 font-medium">
                  {formatPrice(desk.price)} / week
                </p>
              </div>
              <button
                onClick={() => setDesk('')}
                className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
              >
                <Trash2 size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chair */}
        <AnimatePresence>
          {chair && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-lg bg-gray-50 overflow-hidden flex-shrink-0 relative">
                <Image
                  src={chair.image}
                  alt={chair.name}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {chair.name}
                </p>
                <p className="text-xs text-emerald-600 font-medium">
                  {formatPrice(chair.price)} / week
                </p>
              </div>
              <button
                onClick={() => setChair('')}
                className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
              >
                <Trash2 size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Accessories Section */}
        {accessoryItems.length > 0 && (
          <>
            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Accessories ({totalAccessoryCount})
              </p>
            </div>

            {accessoryItems.map(({ product, quantity }) => {
              if (!product) return null;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-50 overflow-hidden flex-shrink-0 relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {quantity > 1 ? `${quantity}x ` : ''}
                      {product.name}
                    </p>
                    <p className="text-xs text-emerald-600 font-medium">
                      {formatPrice(product.price * quantity)} / week
                    </p>
                  </div>
                  <button
                    onClick={() => removeAccessory(product.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </motion.div>
              );
            })}
          </>
        )}
      </div>

      {/* Price Summary */}
      <div className="p-4 border-t border-gray-100 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="text-gray-700 font-medium">{formatPrice(subtotal)}</span>
        </div>

        {discountPercent > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Discount ({discountPercent}%)</span>
            <span className="text-emerald-600 font-medium">
              - {formatPrice(discountAmount)}
            </span>
          </div>
        )}

        <div className="pt-2 border-t border-gray-100">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-gray-400">Total / week</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatPrice(total)}</p>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full mt-3 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 group">
          Checkout
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </aside>
  );
}
