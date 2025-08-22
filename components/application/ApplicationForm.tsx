'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Check, Mountain, Heart, Map, Star, Sparkles } from 'lucide-react';

// Form Steps
import PersonalInfoStep from './steps/PersonalInfoStep';
import IntentionStep from './steps/IntentionStep';
import JourneyStep from './steps/JourneyStep';
import FinalStep from './steps/FinalStep';
import ThankYouStep from './steps/ThankYouStep';

const TOTAL_STEPS = 4;

// Define the step titles, icons, and inspirational microcopy (simplified for mobile)
const STEPS = [
  { 
    title: "Identity", 
    icon: <Mountain className="h-5 w-5" />, 
    description: "Begin",
    microcopy: "Who will climb this mountain?"
  },
  { 
    title: "Calling", 
    icon: <Heart className="h-5 w-5" />, 
    description: "Feel",
    microcopy: "What do the mountains whisper to you?"
  },
  { 
    title: "Path", 
    icon: <Map className="h-5 w-5" />, 
    description: "Map",
    microcopy: "What terrain have you conquered?"
  },
  { 
    title: "Summit", 
    icon: <Star className="h-5 w-5" />, 
    description: "Prepare",
    microcopy: "Ready to transform?"
  }
];

// Define the form data type
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  calling: string;
  season: string;
  companionship: string;
  energy: number; // Changed to number for slider
  pastExperiences: string;
  expectations: string;
};

// Inspirational mountain quotes (reduced for simplicity)
const MOUNTAIN_QUOTES = [
  "The mountains are calling and I must go.",
  "The best view comes after the hardest climb.",
  "The silence of the mountains is more musical than any song."
];

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quote, setQuote] = useState('');
  
  // Set a random quote when the component mounts
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * MOUNTAIN_QUOTES.length);
    setQuote(MOUNTAIN_QUOTES[randomIndex]);
  }, []);
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    calling: '',
    season: '',
    companionship: '',
    energy: 3, // Default value for slider (1-5 scale)
    pastExperiences: '',
    expectations: ''
  });
  
  // Animation states
  const [showMicrocopy, setShowMicrocopy] = useState(true);

  // Update form data
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Check if the current step can proceed
  const canProceed = () => {
    switch (currentStep) {
      case 1: // Your Identity
        return !!formData.firstName && !!formData.lastName && !!formData.email && !!formData.phone;
      case 2: // Your Calling
        return !!formData.calling && !!formData.season && !!formData.companionship;
      case 3: // Your Path
        return formData.energy > 0 && !!formData.pastExperiences && !!formData.expectations;
      case 4: // Your Summit
        // Always allow proceeding from the final review step to submit
        return true;
      default:
        return false;
    }
  };

  // Handle next step with animation sequence
  const handleNext = () => {
    // Hide microcopy with animation first
    setShowMicrocopy(false);
    
    // Short delay before changing step
    setTimeout(() => {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(prev => prev + 1);
        // Show microcopy after step change with slight delay
        setTimeout(() => setShowMicrocopy(true), 300);
      } else if (currentStep === TOTAL_STEPS) {
        // Submit the form when on the final step
        setIsSubmitted(true);
        // You could also add form submission logic here
        console.log('Form submitted:', formData);
      }
    }, 200);
  };

  // Handle previous step with animation sequence
  const handlePrevious = () => {
    // Hide microcopy with animation first
    setShowMicrocopy(false);
    
    // Short delay before changing step
    setTimeout(() => {
      if (currentStep > 1) {
        setCurrentStep(prev => prev - 1);
        // Show microcopy after step change with slight delay
        setTimeout(() => setShowMicrocopy(true), 300);
      }
    }, 200);
  };

  // Render the current step content
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <IntentionStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <JourneyStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <FinalStep formData={formData} onSubmit={() => setIsSubmitted(true)} />;
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return <ThankYouStep formData={formData} />;
  }

  return (
    <div className="border rounded-lg bg-card text-card-foreground shadow-sm border-border/50 overflow-hidden relative max-w-md mx-auto">
      {/* Inspirational Quote - Only on larger screens */}
      <div className="absolute top-0 right-0 max-w-[150px] p-2 italic text-xs text-muted-foreground/70 hidden md:block">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {quote}
        </motion.p>
      </div>

      {/* Mobile-friendly Mountain Journey Progress */}
      <div className="bg-muted/30 p-4 border-b border-border/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="bg-primary/20 p-2 rounded-full">
              {STEPS[currentStep - 1].icon}
            </div>
            <div>
              <h3 className="text-base font-medium text-primary">{STEPS[currentStep - 1].title}</h3>
            </div>
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {currentStep}/{TOTAL_STEPS}
          </span>
        </div>
        
        {/* Simplified Progress Path */}
        <div className="relative mt-4 mb-4">
          {/* Step Markers - Simplified for mobile */}
          <div className="flex justify-between relative z-10">
            {STEPS.map((step, index) => (
              <motion.div 
                key={index} 
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <motion.div 
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                    index + 1 < currentStep ? "bg-primary text-primary-foreground" : 
                    index + 1 === currentStep ? "bg-primary/80 text-primary-foreground ring-1 ring-primary/30" : 
                    "bg-muted text-muted-foreground"
                  )}
                  whileTap={{ scale: 0.95 }}
                >
                  {index + 1 < currentStep ? <Check className="h-4 w-4" /> : index + 1}
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          {/* Progress Path */}
          <div className="absolute top-4 left-0 w-full h-0.5 bg-muted/50 z-0">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: `${((currentStep - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
              animate={{ width: `${((currentStep - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
        
        {/* Simplified Microcopy */}
        <motion.div 
          className="text-center text-xs italic text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: showMicrocopy ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {STEPS[currentStep - 1].microcopy}
        </motion.div>
      </div>

      {/* Form Content - Mobile Optimized */}
      <div className="p-4 min-h-[350px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons - Mobile Optimized */}
      <div className="p-4 flex justify-between items-center border-t border-border/20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: currentStep === 1 ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={cn(
              currentStep === 1 ? "opacity-0 pointer-events-none" : "opacity-100",
              "flex items-center"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sm:inline hidden">Back</span>
          </Button>
        </motion.div>

        <motion.div whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className={cn(
              !canProceed() ? "opacity-70" : "opacity-100",
              "relative overflow-hidden",
              currentStep === TOTAL_STEPS ? "bg-primary hover:bg-primary/90" : "",
              "flex items-center justify-center gap-1"
            )}
          >
            {currentStep === TOTAL_STEPS ? (
              <>
                Begin Journey
                <Sparkles className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                {currentStep === 1 ? "Next" : 
                 currentStep === 2 ? "Next" : 
                 currentStep === 3 ? "Review" : "Continue"}
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}