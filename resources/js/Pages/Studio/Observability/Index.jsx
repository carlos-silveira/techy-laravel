import React from 'react';
import { Head } from '@inertiajs/react';
import StudioLayout from '@/Layouts/StudioLayout';
import Observability from '@/Components/Observability';

export default function ObservabilityIndex() {
  return (
    <StudioLayout>
      <Head title="Observability — Studio" />

      <div className="p-8 md:p-16 max-w-7xl mx-auto space-y-8">
        <Observability />
      </div>
    </StudioLayout>
  );
}
