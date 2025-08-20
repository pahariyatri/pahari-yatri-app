'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

// Form Steps
import IntroStep from './steps/IntroStep';
import AboutYouStep from './steps/AboutYouStep';
import YourJourneyStep from './steps/YourJourneyStep';
import PreferencesStep from './steps/PreferencesStep';
import FinalStep from './steps/FinalStep';
import ThankYouStep from './steps/ThankYouStep';

const TOTAL_STEPS = 5;

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Intro / Intent
    name: '',
    email: '',
    phone: '',
    
    // About You
    age: '',
    city: '',
    profession: '',
    
    // Your Journey
    trekExperience: '',
    whyHimalayas: '',
    journeyType: '',
    
    // Preferences
    travelMonth: '',
    groupType: '',
    stayPreference: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateFormData = (stepData: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: // Intro step
        return formData.name && formData.email && formData.phone;
      case 2: // About You step
        return formData.age && formData.city && formData.profession;
      case 3: // Your Journey step
        return formData.trekExperience && formData.whyHimalayas && formData.journeyType;
      case 4: // Preferences step
        return formData.travelMonth && formData.groupType && formData.stayPreference;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS && canProceed()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <IntroStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <AboutYouStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <YourJourneyStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <PreferencesStep formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <FinalStep formData={formData} onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return <ThankYouStep />;
  }

  return (
    <Card className="border-border/50 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-muted/30 p-4 border-b border-border/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-primary">Step {currentStep} of {TOTAL_STEPS}</span>
          <span className="text-sm font-medium text-muted-foreground">
            {currentStep === 1 && 'Your Intent'}
            {currentStep === 2 && 'About You'}
            {currentStep === 3 && 'Your Journey'}
            {currentStep === 4 && 'Preferences'}
            {currentStep === 5 && 'Review'}
          </span>
        </div>
        <div className="w-full bg-muted/50 rounded-full h-2.5 overflow-hidden">
          <motion.div 
            className="h-full bg-primary rounded-full"
            initial={{ width: `${((currentStep - 1) / TOTAL_STEPS) * 100}%` }}
            animate={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Form Content */}
      <CardContent className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="min-h-[400px] flex flex-col"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-border/30">
          {currentStep > 1 ? (
            <Button
              variant="outline"
              onClick={prevStep}
              className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-2px]"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          ) : (
            <div></div> {/* Empty div to maintain flex spacing */}
          )}

          {currentStep < TOTAL_STEPS ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className={cn(
                "flex items-center gap-2 transition-all duration-300",
                "hover:translate-y-[-2px] hover:shadow-md",
                "relative overflow-hidden",
                "after:absolute after:inset-0 after:bg-primary-foreground/20 after:opacity-0",
                "after:hover:opacity-100 after:transition-opacity after:duration-500",
                !canProceed() && "opacity-70 cursor-not-allowed"
              )}
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className={cn(
                "flex items-center gap-2 transition-all duration-300",
                "hover:translate-y-[-2px] hover:shadow-md",
                "relative overflow-hidden bg-gold hover:bg-gold/90 text-himalayan-green",
                "after:absolute after:inset-0 after:bg-white/20 after:opacity-0",
                "after:hover:opacity-100 after:transition-opacity after:duration-500"
              )}
            >
              <span>Send My Application</span>
              <Check className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}