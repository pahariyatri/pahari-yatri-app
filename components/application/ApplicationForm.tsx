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

// Apple/Nike-inspired minimal steps
const STEPS = [
  { 
    title: "Identity", 
    icon: <Mountain className="h-5 w-5" />, 
    description: "Begin",
    microcopy: "Who are you becoming?"
  },
  { 
    title: "Calling", 
    icon: <Heart className="h-5 w-5" />, 
    description: "Feel",
    microcopy: "What pulls you higher?"
  },
  { 
    title: "Path", 
    icon: <Map className="h-5 w-5" />, 
    description: "Map",
    microcopy: "Where have your steps led?"
  },
  { 
    title: "Summit", 
    icon: <Star className="h-5 w-5" />, 
    description: "Rise",
    microcopy: "Are you ready to ascend?"
  }
];


// Define the form data type
type FormData = {
  fullName: string;
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
    fullName: '',
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
        return !!formData.fullName && !!formData.email && !!formData.phone;
      case 2: // Your Calling
        return !!formData.calling && !!formData.season && !!formData.companionship;
      case 3: // Your Path
        return formData.energy > 0 ;
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
    <div className="overflow-hidden relative max-w-md mx-auto">
      <motion.div 
        className="rounded-xl bg-card text-card-foreground shadow-soft-lg border-2 border-primary/10 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Inspirational Quote - Only on larger screens */}
        <div className="absolute top-3 right-3 max-w-[180px] p-2 italic text-xs text-muted-foreground/70 hidden md:block bg-background/50 backdrop-blur-sm rounded-lg shadow-soft-sm">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {quote}
          </motion.p>
        </div>

        {/* Premium Header with Mountain Journey Progress */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 border-b border-border/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-primary to-secondary p-2.5 rounded-full shadow-brand-sm">
                {STEPS[currentStep - 1].icon}
              </div>
              <div>
                <h3 className="text-h3 font-brandSerif font-semibold text-primary">
                  {STEPS[currentStep - 1].title}
                </h3>
              </div>
            </div>
            <span className="text-sm font-medium text-muted-foreground bg-background/50 px-3 py-1 rounded-full shadow-soft-sm">
              {currentStep}/{TOTAL_STEPS}
            </span>
          </div>
          
          {/* Himalayan Journey Progress Path */}
          <div className="relative mt-6 mb-6">
            {/* Mountain Silhouette Background */}
            <div className="absolute top-0 left-0 w-full h-16 overflow-hidden opacity-20 pointer-events-none">
              <svg viewBox="0 0 1440 320" className="absolute top-0 left-0 w-full">
                <path 
                  fill="currentColor" 
                  className="text-primary"
                  d="M0,192L60,176C120,160,240,128,360,128C480,128,600,160,720,186.7C840,213,960,235,1080,229.3C1200,224,1320,192,1380,176L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
                ></path>
              </svg>
            </div>
            
            {/* Step Markers with Himalayan Theme */}
            <div className="flex justify-between relative z-10">
              {STEPS.map((step, index) => (
                <motion.div 
                  key={index} 
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <motion.div 
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-soft",
                      index + 1 < currentStep ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground" : 
                      index + 1 === currentStep ? "bg-primary text-primary-foreground ring-2 ring-primary/30 shadow-brand" : 
                      "bg-background text-muted-foreground border border-border"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {index + 1 < currentStep ? <Check className="h-5 w-5" /> : index + 1}
                  </motion.div>
                  
                  {/* Mountain peak for completed steps */}
                  {index + 1 <= currentStep && (
                    <motion.div 
                      className="absolute -top-3"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + (index * 0.1), duration: 0.4 }}
                    >
                      <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0L24 16H0L12 0Z" className={index + 1 < currentStep ? "fill-primary" : "fill-primary/60"} />
                      </svg>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* Himalayan Range Progress Path */}
            <div className="absolute top-5 left-0 w-full h-2 bg-background rounded-full z-0 shadow-inner overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary/40 via-primary to-secondary rounded-full shadow-brand-sm relative"
                initial={{ width: `${((currentStep - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
                animate={{ width: `${((currentStep - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {/* Snow caps effect */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30"></div>
              </motion.div>
            </div>
          </div>
          
          {/* Enhanced Microcopy */}
          <motion.div 
            className="text-center text-sm italic text-foreground/80 font-medium mt-4 bg-background/30 py-2 px-4 rounded-lg backdrop-blur-sm"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: showMicrocopy ? 1 : 0, y: showMicrocopy ? 0 : 5 }}
            transition={{ duration: 0.4 }}
          >
            {STEPS[currentStep - 1].microcopy}
          </motion.div>
        </div>

        {/* Form Content with Premium Styling */}
        <div className="p-6 min-h-[350px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Premium Navigation Buttons */}
        <div className="p-6 flex justify-between items-center border-t border-border/10 bg-gradient-to-r from-primary/5 to-secondary/5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: currentStep === 1 ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="outline"
              size="lg"
              rounded="full"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={cn(
                currentStep === 1 ? "opacity-0 pointer-events-none" : "opacity-100",
                "flex items-center gap-1"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant={currentStep === TOTAL_STEPS ? "default" : "outline"}
              size="lg"
              rounded="full"
              onClick={handleNext}
              disabled={!canProceed()}
              className={cn(
                !canProceed() ? "opacity-70" : "opacity-100",
                "relative overflow-hidden",
                "flex items-center justify-center gap-2 px-6"
              )}
            >
              {currentStep === TOTAL_STEPS ? (
                <>
                  Begin Your Journey
                  <Sparkles className="ml-1 h-5 w-5" />
                </>
              ) : (
                <>
                  {currentStep === 1 ? "Continue" : 
                   currentStep === 2 ? "Next Step" : 
                   currentStep === 3 ? "Review Application" : "Continue"}
                  <ChevronRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}