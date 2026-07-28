'use client';

import Header from '@/components/Header';
import SidebarCatalog from '@/components/SidebarCatalog';
import WorkspaceCanvas from '@/components/WorkspaceCanvas';
import SetupSummary from '@/components/SetupSummary';
import DurationSelector from '@/components/DurationSelector';

export default function Home() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Top Header */}
      <Header />

      {/* Main Content: Sidebar + Canvas + Summary */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar — Product Catalog */}
        <SidebarCatalog />

        {/* Center — Workspace Canvas + Duration Selector */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <WorkspaceCanvas />
          <DurationSelector />
        </div>

        {/* Right Sidebar — Setup Summary */}
        <SetupSummary />
      </div>
    </div>
  );
}
