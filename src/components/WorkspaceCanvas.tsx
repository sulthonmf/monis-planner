'use client';

import Image from 'next/image';
import { Share2, Camera, Plus, Minus, RotateCcw, Users, Move, GripHorizontal, PanelLeftOpen, PanelRightOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { backgrounds, getProductById } from '@/data/products';
import { useState } from 'react';

export default function WorkspaceCanvas() {
  const {
    selectedDeskId,
    selectedChairId,
    selectedAccessories,
    selectedBackgroundId,
    isLeftPanelOpen,
    isRightPanelOpen,
    toggleLeftPanel,
    toggleRightPanel,
    setBackground,
  } = useWorkspaceStore();


  const [zoom, setZoom] = useState(1);

  const currentBg = backgrounds.find((b) => b.id === selectedBackgroundId) || backgrounds[0];
  const desk = selectedDeskId ? getProductById(selectedDeskId) : null;
  const chair = selectedChairId ? getProductById(selectedChairId) : null;

  // Monitors
  const hasMonitorSingle = !!selectedAccessories['monitor-single'];
  const hasMonitorDual = !!selectedAccessories['monitor-dual'];
  const hasMonitorUltrawide = !!selectedAccessories['monitor-ultrawide'];

  // Tech & Accessories
  const hasPcGaming = !!selectedAccessories['pc-gaming'];
  const hasLamp = !!selectedAccessories['lamp'];
  const hasLightbar = !!selectedAccessories['lightbar'];
  const hasPlant = !!selectedAccessories['plant'];
  const hasBonsai = !!selectedAccessories['bonsai-plant'];
  const hasKeyboard = !!selectedAccessories['keyboard'];
  const hasMouse = !!selectedAccessories['mouse'];
  const hasLaptopStand = !!selectedAccessories['laptop-stand'];
  const hasHeadset = !!selectedAccessories['headset'];

  const isCanvasEmpty =
    !selectedDeskId &&
    !selectedChairId &&
    Object.keys(selectedAccessories).length === 0;

  return (
    <div className="flex-1 relative bg-gray-900 overflow-hidden select-none">
      {/* Background Selector */}
      <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-md rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-xl border border-white/50 max-w-[92vw] overflow-x-auto scrollbar-none">
        <span className="text-[11px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap">Theme</span>
        {backgrounds.map((bg) => (
          <button
            key={bg.id}
            onClick={() => setBackground(bg.id)}
            className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 transition-all flex-shrink-0 ${
              selectedBackgroundId === bg.id
                ? 'border-emerald-500 scale-110 shadow-md ring-2 ring-emerald-400'
                : 'border-white/60 hover:border-emerald-300'
            }`}
          >
            <Image
              src={bg.thumbnail}
              alt={bg.name}
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
        <button className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0">
          <Users size={14} className="text-gray-600 sm:w-4 sm:h-4" />
        </button>
      </div>

      {/* Drag & Drop Hint */}
      <div className="absolute top-4 left-4 z-30 hidden lg:flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-xl px-3.5 py-2 shadow-md border border-white/50 text-xs font-semibold text-gray-800">
        <Move size={15} className="text-emerald-600 animate-bounce" />
        <span>Click & drag any item anywhere to arrange your room</span>
      </div>

      {/* Share/Screenshot */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 flex flex-col gap-1.5 sm:gap-2">
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-white/90 backdrop-blur-md rounded-lg shadow-sm border border-white/50 text-xs sm:text-sm font-medium text-gray-700 hover:bg-white transition-colors">
          <Share2 size={13} className="sm:w-3.5 sm:h-3.5" />
          <span className="hidden sm:inline">Share</span>
        </button>
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-white/90 backdrop-blur-md rounded-lg shadow-sm border border-white/50 text-xs sm:text-sm font-medium text-gray-700 hover:bg-white transition-colors">
          <Camera size={13} className="sm:w-3.5 sm:h-3.5" />
          <span className="hidden sm:inline">Photo</span>
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-30 flex flex-col gap-1">
        <button
          onClick={() => setZoom(Math.min(zoom + 0.1, 1.5))}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/90 backdrop-blur-md shadow-sm border border-white/50 flex items-center justify-center hover:bg-white transition-colors"
        >
          <Plus size={15} className="text-gray-700" />
        </button>
        <button
          onClick={() => setZoom(Math.max(zoom - 0.1, 0.6))}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/90 backdrop-blur-md shadow-sm border border-white/50 flex items-center justify-center hover:bg-white transition-colors"
        >
          <Minus size={15} className="text-gray-700" />
        </button>
        <button
          onClick={() => setZoom(1)}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/90 backdrop-blur-md shadow-sm border border-white/50 flex items-center justify-center hover:bg-white transition-colors"
        >
          <RotateCcw size={13} className="text-gray-700" />
        </button>
      </div>

      {/* Floating Unhide Buttons for Left & Right Panels */}
      <AnimatePresence>
        {!isLeftPanelOpen && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={toggleLeftPanel}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 bg-white/95 backdrop-blur-md hover:bg-white text-gray-800 shadow-xl border border-gray-200/80 rounded-xl px-2.5 py-2 sm:px-3.5 sm:py-2.5 flex items-center gap-1.5 sm:gap-2 transition-transform hover:scale-105 group"
            title="Open Catalog Panel"
          >
            <PanelLeftOpen size={16} className="text-emerald-600 group-hover:scale-110 transition-transform sm:w-4.5 sm:h-4.5" />
            <span className="text-[11px] sm:text-xs font-bold">Catalog</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isRightPanelOpen && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={toggleRightPanel}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 bg-white/95 backdrop-blur-md hover:bg-white text-gray-800 shadow-xl border border-gray-200/80 rounded-xl px-2.5 py-2 sm:px-3.5 sm:py-2.5 flex items-center gap-1.5 sm:gap-2 transition-transform hover:scale-105 group"
            title="Open Summary Panel"
          >
            <span className="text-[11px] sm:text-xs font-bold">Summary</span>
            <PanelRightOpen size={16} className="text-emerald-600 group-hover:scale-110 transition-transform sm:w-4.5 sm:h-4.5" />
          </motion.button>
        )}
      </AnimatePresence>



      {/* === CANVAS SCENE === */}
      <div
        className="w-full h-full relative transition-transform duration-300"
        style={{ transform: `scale(${zoom})` }}
      >
        {/* Background Image */}
        <Image
          src={currentBg.imagePath}
          alt={currentBg.name}
          fill
          className="object-cover pointer-events-none"
          priority
        />

        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        {/* === FREE-FORM ROOM CANVAS ITEMS === */}
        <div className="absolute inset-0">
          {/* Empty State Guide Banner */}
          {isCanvasEmpty && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none text-center">
              <div className="bg-black/60 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl shadow-2xl text-white">
                <p className="text-base font-semibold">Build Your Workspace Room</p>
                <p className="text-xs text-gray-300 mt-1">Select a Desk, Chair, or Accessories from the left catalog!</p>
              </div>
            </div>
          )}
          {/* Desk Item */}
          <AnimatePresence mode="wait">
            {desk && (
              <motion.div
                key={desk.id}
                drag
                dragMomentum={false}
                dragElastic={0}
                whileDrag={{ scale: 1.02, zIndex: 50 }}
                whileHover={{ scale: 1.01 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="absolute bottom-[12%] left-1/2 -translate-x-1/2 w-[620px] h-[320px] z-10 cursor-grab active:cursor-grabbing group"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                  <GripHorizontal size={10} /> Drag Desk
                </div>
                <Image
                  src={desk.image}
                  alt={desk.name}
                  fill
                  className="object-contain drop-shadow-2xl pointer-events-none"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chair Item */}
          <AnimatePresence mode="wait">
            {chair && (
              <motion.div
                key={chair.id}
                drag
                dragMomentum={false}
                dragElastic={0}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute bottom-[6%] left-[42%] w-[210px] h-[290px] z-20 cursor-grab active:cursor-grabbing group"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                  <GripHorizontal size={10} /> Drag Chair
                </div>
                <Image
                  src={chair.image}
                  alt={chair.name}
                  fill
                  className="object-contain drop-shadow-xl pointer-events-none"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Single Monitor Item */}
          <AnimatePresence>
            {hasMonitorSingle && (
              <motion.div
                drag
                dragMomentum={false}
                dragElastic={0}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute bottom-[40%] left-[38%] w-[220px] h-[180px] z-30 cursor-grab active:cursor-grabbing group"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1 z-40">
                  <GripHorizontal size={10} /> Single Monitor
                </div>
                <Image
                  src="/assets/accessories/monitor-24.svg"
                  alt="Single Monitor"
                  fill
                  className="object-contain drop-shadow-lg pointer-events-none"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dual Monitors Item */}
          <AnimatePresence>
            {hasMonitorDual && (
              <motion.div
                drag
                dragMomentum={false}
                dragElastic={0}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute bottom-[40%] left-[32%] w-[360px] h-[190px] z-30 cursor-grab active:cursor-grabbing group"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1 z-40">
                  <GripHorizontal size={10} /> Dual Monitors
                </div>
                <Image
                  src="/assets/accessories/monitor-dual.svg"
                  alt="Dual Monitors"
                  fill
                  className="object-contain drop-shadow-lg pointer-events-none"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 34" Ultrawide Curved Monitor Item */}
          <AnimatePresence>
            {hasMonitorUltrawide && (
              <motion.div
                drag
                dragMomentum={false}
                dragElastic={0}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute bottom-[40%] left-[33%] w-[350px] h-[190px] z-30 cursor-grab active:cursor-grabbing group"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1 z-40">
                  <GripHorizontal size={10} /> Ultrawide Monitor
                </div>
                <Image
                  src="/assets/accessories/monitor-ultrawide.svg"
                  alt="34 Ultrawide Curved Monitor"
                  fill
                  className="object-contain drop-shadow-lg pointer-events-none"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cyber RGB Lightbar Item */}
          <AnimatePresence>
            {hasLightbar && (
              <motion.div
                drag
                dragMomentum={false}
                dragElastic={0}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute bottom-[52%] left-[38%] w-[220px] h-[100px] z-35 cursor-grab active:cursor-grabbing group"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                  <GripHorizontal size={10} /> Lightbar
                </div>
                <Image
                  src="/assets/accessories/lightbar.svg"
                  alt="Cyber RGB Lightbar"
                  fill
                  className="object-contain drop-shadow-lg pointer-events-none"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desk Lamp Item */}
          <AnimatePresence>
            {hasLamp && (
              <motion.div
                drag
                dragMomentum={false}
                dragElastic={0}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute bottom-[42%] right-[22%] w-[120px] h-[170px] z-30 cursor-grab active:cursor-grabbing group"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                  <GripHorizontal size={10} /> Lamp
                </div>
                <Image
                  src="/assets/accessories/lamp.svg"
                  alt="Desk Lamp"
                  fill
                  className="object-contain drop-shadow-lg pointer-events-none"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Potted Monstera Plant Item */}
          <AnimatePresence>
            {hasPlant && (
              <motion.div
                drag
                dragMomentum={false}
                dragElastic={0}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute bottom-[42%] left-[18%] w-[130px] h-[170px] z-30 cursor-grab active:cursor-grabbing group"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                  <GripHorizontal size={10} /> Monstera Plant
                </div>
                <Image
                  src="/assets/accessories/plant.svg"
                  alt="Monstera Plant"
                  fill
                  className="object-contain drop-shadow-lg pointer-events-none"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Zen Bonsai Tree Item */}
          <AnimatePresence>
            {hasBonsai && (
              <motion.div
                drag
                dragMomentum={false}
                dragElastic={0}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute bottom-[42%] left-[26%] w-[120px] h-[130px] z-30 cursor-grab active:cursor-grabbing group"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                  <GripHorizontal size={10} /> Bonsai Tree
                </div>
                <Image
                  src="/assets/accessories/bonsai-plant.svg"
                  alt="Zen Bonsai Tree"
                  fill
                  className="object-contain drop-shadow-lg pointer-events-none"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Keyboard Item */}
          <AnimatePresence>
            {hasKeyboard && (
              <motion.div
                drag
                dragMomentum={false}
                dragElastic={0}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-[23%] left-[38%] w-[160px] h-[60px] z-30 cursor-grab active:cursor-grabbing group"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                  <GripHorizontal size={10} /> Keyboard
                </div>
                <Image
                  src="/assets/accessories/keyboard.svg"
                  alt="Keyboard"
                  fill
                  className="object-contain drop-shadow-md pointer-events-none"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mouse Item */}
          <AnimatePresence>
            {hasMouse && (
              <motion.div
                drag
                dragMomentum={false}
                dragElastic={0}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-[23%] right-[36%] w-[50px] h-[60px] z-30 cursor-grab active:cursor-grabbing group"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                  <GripHorizontal size={10} /> Mouse
                </div>
                <Image
                  src="/assets/accessories/mouse.svg"
                  alt="Mouse"
                  fill
                  className="object-contain drop-shadow-md pointer-events-none"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Laptop Stand Item */}
          <AnimatePresence>
            {hasLaptopStand && (
              <motion.div
                drag
                dragMomentum={false}
                dragElastic={0}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-[42%] right-[28%] w-[110px] h-[130px] z-30 cursor-grab active:cursor-grabbing group"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                  <GripHorizontal size={10} /> Laptop Stand
                </div>
                <Image
                  src="/assets/accessories/laptop-stand.svg"
                  alt="Laptop Stand"
                  fill
                  className="object-contain drop-shadow-md pointer-events-none"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Headset Item */}
          <AnimatePresence>
            {hasHeadset && (
              <motion.div
                drag
                dragMomentum={false}
                dragElastic={0}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-[32%] right-[16%] w-[90px] h-[90px] z-30 cursor-grab active:cursor-grabbing group"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                  <GripHorizontal size={10} /> Headset
                </div>
                <Image
                  src="/assets/accessories/headset.svg"
                  alt="Headset"
                  fill
                  className="object-contain drop-shadow-md pointer-events-none"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* PC Gaming Rig Item */}
          <AnimatePresence>
            {hasPcGaming && (
              <motion.div
                drag
                dragMomentum={false}
                dragElastic={0}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute bottom-[38%] right-[10%] w-[130px] h-[190px] z-30 cursor-grab active:cursor-grabbing group"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1 z-40 whitespace-nowrap">
                  <GripHorizontal size={10} /> Gaming PC
                </div>
                <Image
                  src="/assets/accessories/pc-gaming.svg"
                  alt="Gaming PC Tower"
                  fill
                  className="object-contain drop-shadow-xl pointer-events-none"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
