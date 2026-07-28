'use client';

import Header from '@/components/Header';
import SidebarCatalog from '@/components/SidebarCatalog';
import WorkspaceCanvas from '@/components/WorkspaceCanvas';
import SetupSummary from '@/components/SetupSummary';
import DurationSelector from '@/components/DurationSelector';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { isLeftPanelOpen, isRightPanelOpen } = useWorkspaceStore();

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-100 font-sans">
      {/* Top Header */}
      <Header />

      {/* Main Content: Sidebar + Canvas + Summary */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar — Product Catalog */}
        <AnimatePresence initial={false}>
          {isLeftPanelOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="h-full flex-shrink-0 overflow-hidden z-20"
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

        {/* Right Sidebar — Setup Summary */}
        <AnimatePresence initial={false}>
          {isRightPanelOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="h-full flex-shrink-0 overflow-hidden z-20"
            >
              <SetupSummary />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

