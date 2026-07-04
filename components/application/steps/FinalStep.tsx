'use client';

import { motion } from 'framer-motion';

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  calling: string;
  season: string;
  companionship: string;
  energy: number;
  pastExperiences: string;
  expectations: string;
};

type Props = {
  formData: FormData;
  onSubmit: () => void;
};

const LEVELS = ['—', 'Beginner', 'Moderate', 'Active', 'Experienced', 'Advanced'];

const cap = (s: string) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ') : '—';

/**
 * A calm, compact review — a quiet list, not a dashboard of cards. Fits a
 * phone screen so the final step feels like a last glance, not more form.
 */
export default function FinalStep({ formData }: Props) {
  const rows: [string, string][] = [
    ['Name', formData.fullName || '—'],
    ['Email', formData.email || '—'],
    ['WhatsApp', formData.phone || '—'],
    ['Calling', cap(formData.calling)],
    ['Season', cap(formData.season)],
    ['Company', cap(formData.companionship)],
    ['Readiness', LEVELS[formData.energy] || '—'],
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-border/60 divide-y divide-border/40 overflow-hidden"
    >
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="flex items-center justify-between gap-4 px-4 py-3"
        >
          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
          <span className="text-sm font-medium text-foreground text-right truncate">
            {value}
          </span>
        </div>
      ))}
      {formData.expectations && (
        <div className="px-4 py-3">
          <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">
            A note
          </span>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {formData.expectations}
          </p>
        </div>
      )}
    </motion.div>
  );
}
