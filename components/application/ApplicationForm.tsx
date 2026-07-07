'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mountain, ArrowLeft, ArrowRight, Check, Compass, Calendar, Users, Flame, PenTool, CheckCircle2, MapPin } from 'lucide-react';
import { TURNS, recapText, type Turn, type FormData, CALLING, SEASON, COMPANIONSHIP, LEVELS, JOIN_TYPE, DESTINATIONS } from './conversation';
import ThankYouStep from './steps/ThankYouStep';

export type { FormData };

const INITIAL_DATA: FormData = {
  joinType: '',
  fullName: '',
  email: '',
  phone: '',
  calling: '',
  destination: '',
  season: '',
  companionship: '',
  energy: 0,
  pastExperiences: '',
  expectations: '',
};

interface ApplicationFormProps {
  onSubmit: (formData: FormData) => Promise<any>;
}

export default function ApplicationForm({ onSubmit }: ApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [turnIndex, setTurnIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // Poetic entry animation on first load
  useEffect(() => {
    const t = setTimeout(() => {
      setShowIntro(false);
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  // Filter active turns dynamically based on joinType selection
  const getActiveTurns = (): Turn[] => {
    return TURNS.filter(turn => {
      if (turn.field === 'joinType' || turn.field === 'calling') return true;
      if (['destination', 'season', 'companionship', 'energy'].includes(turn.field)) {
        return formData.joinType === 'travel';
      }
      return true;
    });
  };

  const activeTurns = getActiveTurns();
  const RECAP_INDEX = activeTurns.length;
  const currentTurn: Turn | null = turnIndex < activeTurns.length ? activeTurns[turnIndex] : null;

  // Dynamic progress steps indicator
  const getDynamicSteps = () => {
    if (formData.joinType === 'community') {
      return [
        { label: 'Fold', field: 'joinType', icon: Mountain },
        { label: 'Intention', field: 'calling', icon: Compass },
        { label: 'Reflection', field: 'expectations', icon: PenTool },
        { label: 'Connection', field: 'fullName', icon: CheckCircle2 }
      ];
    }
    return [
      { label: 'Fold', field: 'joinType', icon: Mountain },
      { label: 'Intention', field: 'calling', icon: Compass },
      { label: 'Trail', field: 'destination', icon: MapPin },
      { label: 'Season', field: 'season', icon: Calendar },
      { label: 'Walk Style', field: 'companionship', icon: Users },
      { label: 'Readiness', field: 'energy', icon: Flame },
      { label: 'Reflection', field: 'expectations', icon: PenTool },
      { label: 'Connection', field: 'fullName', icon: CheckCircle2 }
    ];
  };

  const getReflection = (field: string) => {
    if (field === 'destination' && formData.calling) {
      const reflections: Record<string, string> = {
        silence: "Silence has a way of finding you up there.",
        adventure: "Good — the trail rewards that kind of appetite.",
        spiritual: "The mountains have long been a place people go to listen.",
        nature: "There's a lot of it waiting, undisturbed.",
        culture: "The villages along the way have stories worth slowing down for.",
        creative: "The light up there changes everything you point a lens at.",
      };
      return reflections[formData.calling];
    }
    if (field === 'season' && formData.destination) {
      return "Each trail has its own character in different seasons.";
    }
    if (field === 'companionship' && formData.season) {
      const reflections: Record<string, string> = {
        spring: "Spring in the hills means rhododendrons and thawing trails.",
        summer: "Summer opens up the high passes — good timing.",
        monsoon: "Monsoon treks are for people who don't mind the mountains showing off a little.",
        autumn: "Autumn skies up there are stupidly clear.",
        winter: "Winter is quiet, cold, and not for everyone. Respect.",
      };
      return reflections[formData.season];
    }
    if (field === 'energy' && formData.companionship) {
      const reflections: Record<string, string> = {
        solo: "Solo suits the mountains well — nobody to keep pace with but yourself.",
        friends: "Good company changes everything about a trail.",
        "guided-small": "Small groups move well together. You'll like this.",
        "guided-medium": "There's something good about a full group around a fire at night.",
      };
      return reflections[formData.companionship];
    }
    return "";
  };

  const getLiveManifesto = () => {
    if (formData.joinType === 'community') {
      let text = "I wish to join the Pahari Yatri community";
      if (formData.calling) {
        const callingChoice = CALLING.find(c => c.value === formData.calling);
        text += `, seeking ${callingChoice?.label?.toLowerCase() || formData.calling}`;
      }
      if (formData.expectations) {
        text += `. I hope to ${formData.expectations.trim().replace(/\.$/, "")}`;
      }
      return text + ".";
    }

    let text = "I feel the calling of the Himalayas";
    
    if (formData.calling) {
      const callingChoice = CALLING.find(c => c.value === formData.calling);
      text = `I seek ${callingChoice?.label?.toLowerCase() || formData.calling} in the mountains`;
    }

    if (formData.destination) {
      const destChoice = DESTINATIONS.find(c => c.value === formData.destination);
      text += ` on the ${destChoice?.label || formData.destination}`;
    }
    
    if (formData.season) {
      const seasonChoice = SEASON.find(c => c.value === formData.season);
      text += `, drawn by the beauty of ${seasonChoice?.label || formData.season}`;
    }
    
    if (formData.companionship) {
      const compChoice = COMPANIONSHIP.find(c => c.value === formData.companionship);
      text += `, walking ${compChoice?.label?.toLowerCase() || formData.companionship}`;
    }
    
    if (formData.energy) {
      const readiness = LEVELS[formData.energy - 1]?.toLowerCase() || 'casual';
      const article = ['a', 'e', 'i', 'o', 'u'].includes(readiness.charAt(0)) ? 'an' : 'a';
      text += ` with legs prepared for ${article} ${readiness} journey`;
    }
    
    if (formData.expectations) {
      text += `. I hope to ${formData.expectations.trim().replace(/\.$/, "")}`;
    }
    
    return text + ".";
  };

  const guideText = (idx: number): string => {
    if (idx === RECAP_INDEX) return recapText(formData);
    return activeTurns[idx].guideText(formData);
  };

  const advance = () => setTurnIndex((i) => i + 1);

  const handleFieldSubmit = () => {
    if (!currentTurn) return;
    const value = inputValue.trim();
    if (!value && !currentTurn.optional) return;

    setFormData((prev) => ({ ...prev, [currentTurn.field]: value } as FormData));
    setInputValue('');
    advance();
  };

  const handleChoice = (value: string) => {
    if (!currentTurn) return;
    const numericFields: (keyof FormData)[] = ['energy'];
    const stored = numericFields.includes(currentTurn.field) ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [currentTurn.field]: stored } as FormData));
    advance();
  };

  const handleBack = () => {
    if (turnIndex === 0) return;
    setTurnIndex((i) => i - 1);
    setSubmitError(false);
  };

  const handleFinalSubmit = async () => {
    setSubmitting(true);
    setSubmitError(false);
    try {
      await onSubmit(formData);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Submission failed', err);
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  // Cinematic entry animation screen
  if (showIntro) {
    return (
      <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-background px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-6 max-w-md"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.06, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex justify-center"
          >
            <Mountain className="h-12 w-12 text-primary" />
          </motion.div>
          
          <h1 className="text-xl sm:text-2xl font-brandSerif italic text-foreground/90 leading-relaxed">
            "Let the mountains teach you who you are."
          </h1>
          
          <div className="w-12 h-[1px] bg-primary/20 mx-auto" />
          
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
            Entering the Yatri Sanctuary
          </p>
        </motion.div>
      </div>
    );
  }

  if (isSubmitted) return <ThankYouStep formData={formData} />;

  const isRecap = turnIndex === RECAP_INDEX;
  const dynamicSteps = getDynamicSteps();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col rounded-3xl border border-primary/10 bg-background/60 backdrop-blur-md shadow-xl overflow-hidden min-h-[85vh] sm:min-h-0">
      
      {/* Immersive Progress Trail */}
      <div className="relative flex justify-between items-center px-4 sm:px-8 py-5 border-b border-border/40 bg-muted/10">
        <div className="absolute top-8 left-8 right-8 h-0.5 bg-border/40 z-0 hidden sm:block" />
        <div 
          className="absolute top-8 left-8 h-0.5 bg-primary/70 z-0 transition-all duration-500 hidden sm:block" 
          style={{ width: `${Math.min(100, (turnIndex / (RECAP_INDEX - 1)) * 88)}%` }}
        />
        {dynamicSteps.map((step, idx) => {
          const Icon = step.icon;
          // Determine if completed or current
          let isCurrent = false;
          let isCompleted = false;
          
          // Map step fields to dynamic steps indices
          if (formData.joinType === 'community') {
            const fieldIndex = activeTurns.findIndex(t => t.field === step.field);
            if (fieldIndex !== -1) {
              isCurrent = turnIndex === fieldIndex;
              isCompleted = turnIndex > fieldIndex;
            } else if (step.field === 'fullName') {
              isCurrent = turnIndex >= 3 && turnIndex < RECAP_INDEX;
              isCompleted = turnIndex === RECAP_INDEX;
            }
          } else {
            const fieldIndex = activeTurns.findIndex(t => t.field === step.field);
            if (fieldIndex !== -1) {
              isCurrent = turnIndex === fieldIndex;
              isCompleted = turnIndex > fieldIndex;
            } else if (step.field === 'fullName') {
              // connection step is indices 7, 8, 9
              isCurrent = turnIndex >= 7 && turnIndex < RECAP_INDEX;
              isCompleted = turnIndex === RECAP_INDEX;
            }
          }
          
          return (
            <div key={step.label} className="flex flex-col items-center flex-1 relative z-10">
              <div className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300",
                isCompleted ? "bg-primary text-primary-foreground" : 
                isCurrent ? "bg-primary/20 text-primary border border-primary/40 ring-4 ring-primary/10" : 
                "bg-muted text-muted-foreground border border-border/60"
              )}>
                {isCompleted ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
              </div>
              <span className={cn(
                "text-[10px] mt-1.5 font-medium transition-colors duration-300 hidden md:block",
                isCurrent || isCompleted ? "text-foreground font-semibold" : "text-muted-foreground"
              )}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Main Form Prompt Area */}
      <div className="flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={turnIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="p-6 sm:p-10 flex flex-col justify-center min-h-[20rem]"
          >
            {/* Ambient transition reflection */}
            {turnIndex > 0 && turnIndex < RECAP_INDEX && currentTurn && getReflection(currentTurn.field) && (
              <span className="text-sm font-brandSerif italic text-primary/80 mb-2 block leading-relaxed">
                "{getReflection(currentTurn.field)}"
              </span>
            )}
            
            <h2 className="text-xl sm:text-2xl font-brandSerif font-medium text-foreground mb-6 leading-relaxed">
              {guideText(turnIndex)}
            </h2>
            
            {/* Input Options Grid */}
            <div className="mt-2">
              {isRecap ? (
                /* Recap & Submit Layout */
                <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-muted/40 border border-border/80 space-y-4">
                    <div className="flex items-center gap-2 text-primary font-brandSerif italic text-sm">
                      <Mountain className="h-4.5 w-4.5" />
                      <span>The Details of Your Application</span>
                    </div>
                    <div className="space-y-2 text-sm leading-relaxed text-foreground/80">
                      <p><strong>Intent:</strong> {JOIN_TYPE.find(c => c.value === formData.joinType)?.label || formData.joinType}</p>
                      <p><strong>Drawn by:</strong> {CALLING.find(c => c.value === formData.calling)?.label || formData.calling}</p>
                      {formData.joinType === 'travel' && (
                        <>
                          <p><strong>Preferred Trail:</strong> {DESTINATIONS.find(c => c.value === formData.destination)?.label || formData.destination}</p>
                          <p><strong>Season:</strong> {SEASON.find(c => c.value === formData.season)?.label || formData.season}</p>
                          <p><strong>Companionship:</strong> {COMPANIONSHIP.find(c => c.value === formData.companionship)?.label || formData.companionship}</p>
                          <p><strong>Readiness:</strong> {LEVELS[formData.energy - 1] || '—'}</p>
                        </>
                      )}
                      {formData.expectations && <p><strong>Reflections:</strong> "{formData.expectations}"</p>}
                      <p><strong>Yatri Name:</strong> {formData.fullName}</p>
                      <p><strong>Email Address:</strong> {formData.email}</p>
                      <p><strong>WhatsApp Number:</strong> {formData.phone}</p>
                    </div>
                  </div>

                  {submitError && (
                    <div className="p-4 rounded-xl bg-destructive/10 text-destructive text-sm leading-relaxed border border-destructive/20">
                      Something interrupted the journey on our end. Please try again.
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-4 pt-2">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                    <Button
                      size="lg"
                      onClick={handleFinalSubmit}
                      disabled={submitting}
                      className="group flex-1 sm:flex-none sm:px-10 gap-2 h-12 rounded-full font-medium shadow-brand-md"
                    >
                      {submitting ? 'Sending...' : 'Submit Application'}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </div>
                </div>
              ) : currentTurn?.kind === 'choice' ? (
                /* Custom Selection Cards Grid */
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {currentTurn.choices!.map((c) => (
                      <motion.button
                        key={c.value}
                        type="button"
                        whileHover={{ scale: 1.015, y: -1 }}
                        whileTap={{ scale: 0.985 }}
                        onClick={() => handleChoice(c.value)}
                        className={cn(
                          "flex items-start gap-4 p-4 rounded-2xl border text-left transition-all duration-200",
                          "bg-card/30 border-border/80 hover:border-primary/30 hover:bg-muted/30 focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                        )}
                      >
                        <span className="text-2xl p-2 rounded-xl bg-muted/60 shrink-0" role="img" aria-label={c.label}>
                          {c.icon}
                        </span>
                        <div className="space-y-0.5">
                          <p className="font-semibold text-sm sm:text-base text-foreground/90">{c.label}</p>
                          {c.description && (
                            <p className="text-xs text-muted-foreground leading-relaxed">{c.description}</p>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {turnIndex > 0 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors pt-1"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Back
                    </button>
                  )}
                </div>
              ) : (
                /* Text and Area Inputs Layout */
                <div className="space-y-4">
                  {currentTurn?.kind === 'textarea' ? (
                    <Textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={currentTurn.placeholder}
                      className="min-h-[110px] rounded-2xl border-border/80 bg-background/30 focus-visible:ring-primary/10 focus-visible:border-primary/40 text-base"
                      autoFocus
                    />
                  ) : (
                    <input
                      type={currentTurn?.kind === 'text' ? 'text' : currentTurn?.kind}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleFieldSubmit()}
                      placeholder={currentTurn?.placeholder}
                      className="h-13 w-full rounded-2xl border border-border/80 bg-background/30 px-4 text-base focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                      autoFocus
                    />
                  )}
                  <div className="flex items-center justify-between pt-2">
                    {turnIndex > 0 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Back
                      </button>
                    ) : (
                      <span />
                    )}

                    <div className="flex items-center gap-3">
                      {currentTurn?.optional && (
                        <button
                          type="button"
                          onClick={handleFieldSubmit}
                          className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                        >
                          Skip this one
                        </button>
                      )}
                      <Button
                        onClick={handleFieldSubmit}
                        disabled={!inputValue.trim() && !currentTurn?.optional}
                        className="gap-1.5 px-6 rounded-full"
                      >
                        Continue
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dynamic Journey Manifesto Journal Note */}
      {turnIndex > 0 && (
        <div className="px-6 sm:px-10 py-5 bg-muted/20 border-t border-border/40 rounded-b-3xl">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
            Your Journey Manifesto
          </p>
          <p className="text-sm sm:text-base font-brandSerif italic text-foreground/85 leading-relaxed">
            "{getLiveManifesto()}"
          </p>
        </div>
      )}
    </div>
  );
}
