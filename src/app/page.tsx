'use client';

import Header from '@/components/Header';
import SidebarCatalog from '@/components/SidebarCatalog';
import WorkspaceCanvas from '@/components/WorkspaceCanvas';
import SetupSummary from '@/components/SetupSummary';
import DurationSelector from '@/components/DurationSelector';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Monitor, RotateCcw } from 'lucide-react';

export default function Home() {
  const { isLeftPanelOpen, isRightPanelOpen, toggleLeftPanel, toggleRightPanel, setRightPanelOpen, setLeftPanelOpen } =
    useWorkspaceStore();
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [dismissMobileWarning, setDismissMobileWarning] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      setIsMobileScreen(mobile);

      // On initial load or resize to mobile, auto-close sidebars so canvas gets 100% view
      if (mobile) {
        setLeftPanelOpen(false);
        setRightPanelOpen(false);
      } else if (width >= 768 && width < 1024) {
        // Automatically collapse right summary panel on tablet screens (768px - 1024px)
        setRightPanelOpen(false);
        setLeftPanelOpen(true);
      } else {
        setLeftPanelOpen(true);
        setRightPanelOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setRightPanelOpen, setLeftPanelOpen]);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-100 font-sans">
      {/* Phone Screen Unsupported Warning Modal */}
      {isMobileScreen && !dismissMobileWarning && (
        <div className="fixed inset-0 z-50 bg-gray-900/90 backdrop-blur-lg flex items-center justify-center p-5 text-center select-none">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-gray-100 flex flex-col items-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-sm">
              <Monitor size={28} className="sm:w-8 sm:h-8" />
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              Tablet or Desktop Recommended
            </h2>

            <p className="text-xs text-gray-500 leading-relaxed mb-5">
              Monis 3D Room Builder is optimized for screen resolutions of <span className="font-semibold text-gray-800">768px width (Tablet or Desktop)</span> for arranging 3D furniture drag-and-drop.
            </p>

            <div className="w-full space-y-2.5">
              <div className="p-2.5 bg-gray-50 rounded-xl text-[11px] text-gray-600 font-medium flex items-center justify-center gap-2 border border-gray-200/60">
                <RotateCcw size={14} className="text-emerald-600" />
                <span>Try rotating phone to Landscape mode</span>
              </div>

              <button
                onClick={() => setDismissMobileWarning(true)}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-xs transition-all shadow-md shadow-emerald-600/20"
              >
                Proceed to Workspace Anyway
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header */}
      <Header />

      {/* Main Content: Sidebar + Canvas + Summary */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Backdrop Overlay for Left Panel */}
        <AnimatePresence>
          {isMobileScreen && isLeftPanelOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleLeftPanel}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs z-30 md:hidden"
            />
          )}
        </AnimatePresence>

        {/* Left Sidebar — Product Catalog */}
        <AnimatePresence initial={false}>
          {isLeftPanelOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0, x: isMobileScreen ? -300 : 0 }}
              animate={{ width: isMobileScreen ? '85vw' : 320, opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: isMobileScreen ? -300 : 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className={
                isMobileScreen
                  ? 'fixed inset-y-0 left-0 z-40 w-[85vw] max-w-[320px] bg-white shadow-2xl h-full'
                  : 'h-full flex-shrink-0 overflow-hidden z-20'
              }
            >
              <SidebarCatalog />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Center — Workspace Canvas + Duration Selector */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <WorkspaceCanvas />
          <DurationSelector />
        </div>

        {/* Mobile Backdrop Overlay for Right Panel */}
        <AnimatePresence>
          {isMobileScreen && isRightPanelOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleRightPanel}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs z-30 md:hidden"
            />
          )}
        </AnimatePresence>

        {/* Right Sidebar — Setup Summary */}
        <AnimatePresence initial={false}>
          {isRightPanelOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0, x: isMobileScreen ? 300 : 0 }}
              animate={{ width: isMobileScreen ? '85vw' : 280, opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: isMobileScreen ? 300 : 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className={
                isMobileScreen
                  ? 'fixed inset-y-0 right-0 z-40 w-[85vw] max-w-[280px] bg-white shadow-2xl h-full'
                  : 'h-full flex-shrink-0 overflow-hidden z-20'
              }
            >
              <SetupSummary />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}



