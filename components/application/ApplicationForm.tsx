'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, Mountain, Check } from 'lucide-react';
import {
  TURNS, STEP_GROUPS, getStepIndex,
  type FormData,
} from './conversation';
import ThankYouStep from './steps/ThankYouStep';
import { track, trackOnce } from '@/lib/analytics';

export type { FormData };

const EMPTY: FormData = {
  intent:          '',
  preferredRegion: '',
  joinPath:        '',
  fullName:        '',
  phone:           '',
  email:           '',
};

interface Props {
  onSubmit: (data: FormData) => Promise<void>;
}

export default function ApplicationForm({ onSubmit }: Props) {
  const [data, setData]           = useState<FormData>(EMPTY);
  const [idx, setIdx]             = useState(0);
  const [value, setValue]         = useState('');
  const [error, setError]         = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [done, setDone]           = useState(false);
  const [intro, setIntro]         = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setIntro(false), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!intro) setTimeout(() => inputRef.current?.focus(), 80);
  }, [idx, intro]);

  const TOTAL   = TURNS.length;
  const isRecap = idx === TOTAL;
  const turn    = idx < TOTAL ? TURNS[idx] : null;
  const stepIdx = isRecap ? STEP_GROUPS.length - 1 : getStepIndex(idx);

  const advance = () => { setIdx(i => i + 1); setError(null); };

  const submit = (field: keyof FormData, val: string) => {
    // Counted on the first real answer rather than on page load, so people who
    // land on /apply and bounce don't inflate the top of the funnel.
    if (idx === 0) trackOnce('apply_start', 'apply_start', { location: 'other' });
    setData(prev => ({ ...prev, [field]: val }));
    advance();
  };

  const handleText = () => {
    if (!turn) return;
    const v = value.trim();
    if (turn.validate) {
      const err = turn.validate(v);
      if (err) { setError(err); return; }
    } else if (!v && !turn.optional) return;

    submit(turn.field, v);
    setValue('');
  };

  const handleChoice = (val: string) => {
    if (!turn) return;
    submit(turn.field, val);
  };

  const back = () => {
    if (idx === 0) return;
    setIdx(i => i - 1);
    setError(null);
    setSubmitError(false);
  };

  const finalSubmit = async () => {
    setSubmitting(true);
    setSubmitError(false);
    try {
      await onSubmit(data);
      // Only after the submission actually succeeded — this is what GTM maps
      // to the Meta `Lead` event, so a failed attempt must not count.
      track('apply_submit', {
        intent:           data.intent || undefined,
        preferred_region: data.preferredRegion || undefined,
        join_path:        data.joinPath || undefined,
      });
      setDone(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Intro splash ──────────────────────────────────────────────────────── */
  if (intro) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-5 max-w-sm px-8"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Mountain className="h-10 w-10 text-primary mx-auto" />
          </motion.div>
          <p className="font-brandSerif italic text-lg text-foreground/80 leading-relaxed">
            &quot;Let the mountains teach you who you are.&quot;
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">
            Pahari Yatri · Yatri Circle
          </p>
        </motion.div>
      </div>
    );
  }

  if (done) return <ThankYouStep formData={data} />;

  /* ── Progress dots ─────────────────────────────────────────────────────── */
  const progress = (
    <div className="flex items-center gap-2 px-8 pt-7 pb-0">
      {STEP_GROUPS.map((g, i) => {
        const active    = i === stepIdx;
        const completed = i < stepIdx || isRecap;
        return (
          <div key={g.label} className="flex items-center gap-2">
            <div className={cn(
              'h-1.5 rounded-full transition-all duration-500',
              completed ? 'bg-primary w-6' :
              active    ? 'bg-primary/60 w-6' :
                          'bg-border w-3',
            )} />
          </div>
        );
      })}
      <span className="ml-auto text-[10px] uppercase tracking-widest text-muted-foreground/50 font-medium">
        {isRecap ? 'Review' : STEP_GROUPS[stepIdx]?.label}
      </span>
    </div>
  );

  /* ── Recap ─────────────────────────────────────────────────────────────── */
  if (isRecap) {
    return (
      <div className="mx-auto w-full max-w-lg rounded-3xl border border-border/50 bg-background/70 backdrop-blur-md shadow-xl overflow-hidden">
        {progress}
        <div className="px-8 pt-8 pb-10 space-y-6">
          <h2 className="text-xl font-brandSerif font-semibold text-foreground">
            Confirm your details
          </h2>

          <div className="divide-y divide-border/40 text-sm">
            {[
              ['Intent',   data.intent?.replace(/-/g, ' ')],
              ['Region',   data.preferredRegion?.replace(/-/g, ' ')],
              ['Channel',  data.joinPath],
              ['Name',     data.fullName],
              ['WhatsApp', data.phone],
              ['Email',    data.email],
            ].map(([label, val]) => val ? (
              <div key={label} className="flex justify-between py-3 gap-4">
                <span className="text-muted-foreground shrink-0 capitalize">{label}</span>
                <span className="text-foreground text-right capitalize">{val}</span>
              </div>
            ) : null)}
          </div>

          {submitError && (
            <p className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3">
              Something went wrong. Please try again.
            </p>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={back}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button
              onClick={finalSubmit}
              disabled={submitting}
              className={cn(
                'flex items-center gap-2 px-8 h-12 rounded-full text-sm font-semibold transition-all',
                'bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98]',
                submitting && 'opacity-60 cursor-not-allowed',
              )}
            >
              {submitting ? 'Entering…' : 'Enter the Yatri Circle'}
              {!submitting && <ArrowRight className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Main question card ───────────────────────────────────────────────── */
  return (
    <div className="mx-auto w-full max-w-lg rounded-3xl border border-border/50 bg-background/70 backdrop-blur-md shadow-xl overflow-hidden">
      {progress}

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
          className="px-8 pt-8 pb-10 space-y-6"
        >
          {/* First step brand header */}
          {idx === 0 && (
            <div className="space-y-1.5 pb-2 border-b border-border/30">
              <p className="text-[10px] uppercase tracking-[0.25em] text-primary/70 font-semibold">
                Join the Yatri Circle
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                A short form to understand what kind of Yatri you are — so we can send the right content, at the right time.
              </p>
            </div>
          )}

          {/* Question */}
          <h2 className="text-xl sm:text-2xl font-brandSerif font-medium text-foreground leading-snug">
            {turn?.question}
          </h2>

          {/* Choice list */}
          {turn?.kind === 'choice' && (
            <div className="space-y-2">
              {turn.choices!.map((c) => (
                <motion.button
                  key={c.value}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleChoice(c.value)}
                  className={cn(
                    'w-full text-left px-5 py-4 rounded-2xl border transition-all duration-150',
                    'border-border/60 bg-card/20',
                    'hover:border-primary/40 hover:bg-primary/5',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
                  )}
                >
                  <p className="text-sm sm:text-base font-medium text-foreground">
                    {c.label}
                  </p>
                  {c.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {c.description}
                    </p>
                  )}
                </motion.button>
              ))}

              {idx > 0 && (
                <button
                  onClick={back}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors pt-1"
                >
                  <ArrowLeft className="h-3 w-3" /> Back
                </button>
              )}
            </div>
          )}

          {/* Text / email / tel input */}
          {turn?.kind !== 'choice' && (
            <div className="space-y-3">
              <input
                ref={inputRef}
                type={turn?.kind === 'email' ? 'email' : turn?.kind === 'tel' ? 'tel' : 'text'}
                inputMode={turn?.kind === 'tel' ? 'numeric' : undefined}
                autoComplete={
                  turn?.field === 'email'    ? 'email' :
                  turn?.field === 'phone'    ? 'tel' :
                  turn?.field === 'fullName' ? 'name' : 'off'
                }
                value={value}
                onChange={(e) => { setValue(e.target.value); setError(null); }}
                onKeyDown={(e) => e.key === 'Enter' && handleText()}
                placeholder={turn?.placeholder}
                className={cn(
                  'w-full h-14 sm:h-16 rounded-2xl border bg-background/40 px-5',
                  'text-base sm:text-lg font-medium placeholder:font-normal',
                  'focus:outline-none focus:ring-2 transition-all duration-150',
                  error
                    ? 'border-destructive/50 focus:ring-destructive/20 focus:border-destructive/50'
                    : 'border-border/60 focus:ring-primary/20 focus:border-primary/40',
                )}
              />

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-destructive pl-1"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between">
                {idx > 0 ? (
                  <button
                    onClick={back}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back
                  </button>
                ) : <span />}

                <button
                  onClick={handleText}
                  disabled={!value.trim()}
                  className={cn(
                    'flex items-center gap-2 px-7 h-11 rounded-full text-sm font-semibold transition-all',
                    'bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98]',
                    !value.trim() && 'opacity-40 cursor-not-allowed',
                  )}
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
