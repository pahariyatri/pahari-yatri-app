'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Footprints, Compass, Mountain, Flag } from 'lucide-react';

// Form Steps
import PersonalInfoStep from './steps/PersonalInfoStep';
import IntentionStep from './steps/IntentionStep';
import JourneyStep from './steps/JourneyStep';
import FinalStep from './steps/FinalStep';
import ThankYouStep from './steps/ThankYouStep';

const TOTAL_STEPS = 4;

// Each step is a quiet chapter of the journey — an icon guide, a kicker, an
// emotional prompt, and one line of guidance. No badges, no dashboards.
const STEPS = [
  { icon: Footprints, kicker: 'First steps', prompt: 'Who is walking?', note: 'Just so we know who to write back to.' },
  { icon: Compass, kicker: 'The calling', prompt: 'What pulls you to the mountains?', note: 'Tap what feels true. There are no wrong answers.' },
  { icon: Mountain, kicker: 'The path', prompt: 'How ready are your legs?', note: 'This simply helps us walk at your pace.' },
  { icon: Flag, kicker: 'The summit', prompt: 'One last look before we set out.', note: 'Read it over. Then we begin.' },
];

export type FormData = {
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

interface ApplicationFormProps {
  onSubmit: (formData: FormData) => Promise<any>;
}

export default function ApplicationForm({ onSubmit }: ApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    calling: '',
    season: '',
    companionship: '',
    energy: 3,
    pastExperiences: '',
    expectations: '',
  });

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!formData.fullName && !!formData.email && !!formData.phone;
      case 2: return !!formData.calling && !!formData.season && !!formData.companionship;
      case 3: return formData.energy > 0;
      case 4: return true;
      default: return false;
    }
  };

  const handleFinalSubmit = async () => {
    try {
      await onSubmit(formData);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Submission failed', err);
      alert('Something interrupted the journey. Please try again.');
    }
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      handleFinalSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <PersonalInfoStep formData={formData} updateFormData={updateFormData} />;
      case 2: return <IntentionStep formData={formData} updateFormData={updateFormData} />;
      case 3: return <JourneyStep formData={formData} updateFormData={updateFormData} />;
      case 4: return <FinalStep formData={formData} onSubmit={handleFinalSubmit} />;
      default: return null;
    }
  };

  if (isSubmitted) return <ThankYouStep formData={formData} />;

  const step = STEPS[currentStep - 1];
  const StepIcon = step.icon;
  const isLast = currentStep === TOTAL_STEPS;

  return (
    <div className="relative mx-auto w-full max-w-xl">
      {/* Slim progress — four quiet segments, no snow-caps or dashboards */}
      <div className="flex items-center gap-2" aria-hidden>
        {STEPS.map((_, i) => (
          <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-border/50">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={false}
              animate={{ width: i < currentStep ? '100%' : '0%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          </div>
        ))}
      </div>

      {/* Step heading — icon guide + editorial prompt, compact on mobile */}
      <div className="mt-6 mb-6 sm:mt-8 sm:mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`head-${currentStep}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <StepIcon className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-primary/80 mb-2">
              {step.kicker} · {currentStep} of {TOTAL_STEPS}
            </p>
            <h2 className="font-brandSerif text-xl sm:text-2xl md:text-3xl font-medium leading-tight text-foreground">
              {step.prompt}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{step.note}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* The single question in view — nothing competing around it */}
      <div className="pb-28 sm:pb-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`step-${currentStep}`}
            custom={direction}
            initial={{ opacity: 0, x: direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -24 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation — sticky at thumb reach on mobile, inline on desktop */}
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-30 border-t border-border/40 bg-background/95 px-4 pt-4 backdrop-blur-md',
          'pb-[max(1rem,env(safe-area-inset-bottom))]',
          'sm:static sm:mt-4 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none'
        )}
      >
        <div className="mx-auto flex w-full max-w-xl items-center justify-between gap-4">
          <button
            type="button"
            onClick={handlePrevious}
            className={cn(
              'flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground',
              currentStep === 1 && 'pointer-events-none opacity-0'
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <Button
            size="lg"
            rounded="full"
            onClick={handleNext}
            disabled={!canProceed()}
            className="group flex-1 gap-2 px-8 sm:flex-none disabled:opacity-40"
          >
            {isLast ? 'Begin the journey' : 'Continue'}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
