import { useState } from 'react';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Map from '@/pages/Map';
import Report from '@/pages/Report';
import Admin from '@/pages/Admin';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'map':
        return <Map />;
      case 'report':
        return <Report onNavigate={setCurrentView} />;
      case 'admin':
        return <Admin />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Layout currentView={currentView} onNavigate={setCurrentView}>
          {renderCurrentView()}
        </Layout>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
