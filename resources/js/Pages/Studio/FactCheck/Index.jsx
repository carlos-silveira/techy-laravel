import React from 'react';
import { Head } from '@inertiajs/react';
import StudioLayout from '@/Layouts/StudioLayout';
import FactCheckDashboard from '@/Components/FactCheckDashboard';

export default function FactCheckIndex() {
  return (
    <StudioLayout>
      <Head title="Fact-Check Engine — Studio" />

      <div className="p-8 md:p-16 max-w-7xl mx-auto space-y-8">
        <FactCheckDashboard />
      </div>
    </StudioLayout>
  );
}
