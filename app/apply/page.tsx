'use client';

import { useState } from 'react';
import ApplicationForm, { FormData } from '@/components/application/ApplicationForm';
import { getLeadTags } from '@/components/application/conversation';

export default function Apply() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const tags = getLeadTags(data);
      await fetch('/api/discord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'apply', ...data, tags }),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-background px-4 py-10">
      {/* The page had no <h1> at all — 26 visible words of form chrome, which reads
          as a soft 404 to a crawler. sr-only so the form's own visual design is
          untouched. Whether this page should be indexed at all is a separate,
          open decision (see CONTENT_PRIORITY_MATRIX.md, bucket F). */}
      <h1 className="sr-only">Apply to walk with Pahari Yatri</h1>
      <ApplicationForm onSubmit={handleSubmit} />
    </div>
  );
}
