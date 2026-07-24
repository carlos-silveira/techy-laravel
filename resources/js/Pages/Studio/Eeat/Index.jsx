import React from 'react';
import { Head } from '@inertiajs/react';
import StudioLayout from '@/Layouts/StudioLayout';
import EeatUpgradeControl from '@/Components/EeatUpgradeControl';

export default function EeatIndex() {
  return (
    <StudioLayout>
      <Head title="E-E-A-T Quality — Studio" />

      <div className="p-8 md:p-16 max-w-7xl mx-auto space-y-8">
        <EeatUpgradeControl />
      </div>
    </StudioLayout>
  );
}
