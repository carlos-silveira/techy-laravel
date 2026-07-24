import React from 'react';
import { Head } from '@inertiajs/react';
import StudioLayout from '@/Layouts/StudioLayout';
import AgentControl from '@/Components/AgentControl';

export default function AgentIndex() {
  return (
    <StudioLayout>
      <Head title="Agent Terminal — Studio" />

      <div className="p-8 md:p-16 max-w-7xl mx-auto space-y-8">
        <AgentControl />
      </div>
    </StudioLayout>
  );
}
