'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Feather, Check } from 'lucide-react';

type State = 'idle' | 'loading' | 'success' | 'error';

export default function ContributeForm() {
  const [state, setState] = useState<State>('idle');
  const [form, setForm] = useState({
    title: '',
    authorName: '',
    authorEmail: '',
    chapter: '',
    excerpt: '',
    content: '',
  });

  const set =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const canSubmit = form.title && form.authorName && form.content && state !== 'loading';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setState('loading');
    try {
      const res = await fetch('/api/discord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'story', ...form }),
      });
      if (!res.ok) throw new Error('failed');
      setState('success');
    } catch {
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-primary/30 bg-primary/5 p-10 text-center max-w-xl mx-auto"
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Check className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-brandSerif font-medium mb-3">
          Thank you for your story.
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          We read every contribution with care. If it finds its place in the
          library, we&apos;ll be in touch. Your words may become a chapter others
          learn from.
        </p>
      </motion.div>
    );
  }

  const inputCls = 'h-12 rounded-xl border-border';

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5">
      <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Feather className="h-5 w-5" strokeWidth={1.5} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Story title</label>
        <Input
          className={inputCls}
          placeholder="A morning at the roofless shrine"
          value={form.title}
          onChange={set('title')}
          required
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-sm font-medium">Your name</label>
          <Input
            className={inputCls}
            placeholder="Pahari Yatri"
            value={form.authorName}
            onChange={set('authorName')}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Email <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <Input
            className={inputCls}
            type="email"
            placeholder="hi@pahariyatri.com"
            value={form.authorEmail}
            onChange={set('authorEmail')}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Place / trail <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <Input
          className={inputCls}
          placeholder="e.g. Parashar, Mandi"
          value={form.chapter}
          onChange={set('chapter')}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          One-line intro{' '}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <Input
          className={inputCls}
          placeholder="A short line to draw the reader in."
          value={form.excerpt}
          onChange={set('excerpt')}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Your story</label>
        <Textarea
          className="min-h-[180px] rounded-2xl border-border"
          placeholder="Write freely. A trail, a village, a temple bell you still hear. Tell it the way you remember it."
          value={form.content}
          onChange={set('content')}
          required
        />
      </div>

      {state === 'error' && (
        <p className="text-sm text-red-500">
          Something interrupted the send. Please try again in a moment.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={!canSubmit}
        className={cn('w-full rounded-full py-6 text-base', !canSubmit && 'opacity-50')}
      >
        {state === 'loading' ? 'Sending your story…' : 'Offer your story'}
      </Button>
      <p className="text-center text-xs text-muted-foreground/60">
        We read every contribution personally. No account, no noise.
      </p>
    </form>
  );
}
