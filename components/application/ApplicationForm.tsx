'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Check, Mountain, Heart, Map, Star } from 'lucide-react';

// Form Steps
import PersonalInfoStep from './steps/PersonalInfoStep';
import IntentionStep from './steps/IntentionStep';
import JourneyStep from './steps/JourneyStep';
import FinalStep from './steps/FinalStep';
import ThankYouStep from './steps/ThankYouStep';

const TOTAL_STEPS = 4;

// Define the step titles and icons
const STEPS = [
  { title: "Personal Information", icon: <Mountain className="h-5 w-5" />, description: "Tell us who you are" },
  { title: "Your Intention", icon: <Heart className="h-5 w-5" />, description: "Share what calls you to the mountains" },
  { title: "Your Journey", icon: <Map className="h-5 w-5" />, description: "Describe your path so far" },
  { title: "Final Review", icon: <Star className="h-5 w-5" />, description: "Confirm your story" }
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
  energy: string;
  pastExperiences: string;
  expectations: string;
};

// Inspirational mountain quotes
const MOUNTAIN_QUOTES = [
  "The mountains are calling and I must go.",
  "Every mountain top is within reach if you just keep climbing.",
  "The best view comes after the hardest climb.",
  "Mountains teach that not everything in this world can be rationally explained.",
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
    energy: '',
    pastExperiences: '',
    expectations: ''
  });

  // Update form data
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Check if the current step can proceed
  const canProceed = () => {
    switch (currentStep) {
      case 1: // Personal Information
        return !!formData.firstName && !!formData.lastName && !!formData.email && !!formData.phone;
      case 2: // Your Intention
        return !!formData.calling && !!formData.season && !!formData.companionship;
      case 3: // Your Journey
        return !!formData.energy && !!formData.pastExperiences && !!formData.expectations;
      case 4: // Final Review
        // Always allow proceeding from the final review step to submit
        return true;
      default:
        return false;
    }
  };

  // Handle next step
  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === TOTAL_STEPS) {
      // Submit the form when on the final step
      setIsSubmitted(true);
      // You could also add form submission logic here
      console.log('Form submitted:', formData);
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
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
    <div className="border rounded-lg bg-card text-card-foreground shadow-sm border-border/50 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden relative">
      {/* Inspirational Quote */}
      <div className="absolute top-0 right-0 max-w-xs p-4 italic text-sm text-muted-foreground/80 hidden md:block">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {quote}
        </motion.p>
      </div>

      {/* Progress Bar */}
      <div className="bg-muted/30 p-6 border-b border-border/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="bg-primary/20 p-2 rounded-full">
              {STEPS[currentStep - 1].icon}
            </div>
            <div>
              <h3 className="text-base font-medium text-primary">{STEPS[currentStep - 1].title}</h3>
              <p className="text-sm text-muted-foreground">{STEPS[currentStep - 1].description}</p>
            </div>
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            Step {currentStep} of {TOTAL_STEPS}
          </span>
        </div>
        
        <div className="flex justify-between mb-2">
          {STEPS.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                  index + 1 < currentStep ? "bg-primary text-primary-foreground" : 
                  index + 1 === currentStep ? "bg-primary/80 text-primary-foreground ring-2 ring-primary/30" : 
                  "bg-muted text-muted-foreground"
                )}
              >
                {index + 1 < currentStep ? <Check className="h-4 w-4" /> : index + 1}
              </div>
            </div>
          ))}
        </div>
        
        <div className="w-full bg-muted/50 rounded-full h-2.5 overflow-hidden mt-2">
          <motion.div 
            className="h-full bg-primary rounded-full"
            initial={{ width: `${((currentStep - 1) / TOTAL_STEPS) * 100}%` }}
            animate={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 min-h-[400px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            className="flex-1 flex flex-col"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="p-6 pt-4 flex justify-between items-center border-t border-border/20 mt-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: currentStep === 1 ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={cn(
              "transition-all duration-300 hover:translate-x-[-2px]",
              currentStep === 1 ? "opacity-0 pointer-events-none" : "opacity-100",
              "flex items-center gap-2"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
            Back to previous step
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className={cn(
              "transition-all duration-300",
              !canProceed() ? "opacity-70" : "opacity-100",
              "relative overflow-hidden",
              currentStep === TOTAL_STEPS ? "bg-primary hover:bg-primary/90" : "",
              "min-w-[140px] flex items-center justify-center gap-2"
            )}
          >
            {currentStep === TOTAL_STEPS ? (
              <>
                Share My Story
                <Check className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="ml-1 h-4 w-4" />
              </>
            )}
            <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}