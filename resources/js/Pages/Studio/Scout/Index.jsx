import React from 'react';
import { Head } from '@inertiajs/react';
import StudioLayout from '@/Layouts/StudioLayout';
import ScoutedQueue from '@/Components/ScoutedQueue';

export default function ScoutIndex() {
  return (
    <StudioLayout>
      <Head title="Scout Queue — Studio" />

      <div className="p-8 md:p-16 max-w-7xl mx-auto space-y-8">
        <ScoutedQueue />
      </div>
    </StudioLayout>
  );
}
