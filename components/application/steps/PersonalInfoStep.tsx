'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  updateFormData: (field: string, value: any) => void;
};

export default function PersonalInfoStep({ formData, updateFormData }: Props) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div
        variants={item}
        className="text-center mb-6"
      >
        <h2 className="text-h2 font-brandSerif font-semibold mb-2 text-primary">Begin Your Journey</h2>
        <p className="text-muted-foreground">Tell us a bit about yourself</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div 
          variants={item}
          className="space-y-2"
        >
          <Label htmlFor="firstName" variant="premium" size="lg">First Name</Label>
          <Input
            id="firstName"
            placeholder="Your first name"
            value={formData.firstName}
            onChange={(e) => updateFormData('firstName', e.target.value)}
            variant="premium"
            size="lg"
            className={cn(
              "transition-all duration-300",
              formData.firstName ? "border-primary shadow-brand-sm" : ""
            )}
            required
          />
        </motion.div>

        <motion.div 
          variants={item}
          className="space-y-2"
        >
          <Label htmlFor="lastName" variant="premium" size="lg">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Your last name"
            value={formData.lastName}
            onChange={(e) => updateFormData('lastName', e.target.value)}
            variant="premium"
            size="lg"
            className={cn(
              "transition-all duration-300",
              formData.lastName ? "border-primary shadow-brand-sm" : ""
            )}
            required
          />
        </motion.div>
      </div>

      <motion.div 
        variants={item}
        className="space-y-2"
      >
        <Label htmlFor="email" variant="premium" size="lg">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          variant="premium"
          size="lg"
          className={cn(
            "transition-all duration-300",
            formData.email ? "border-primary shadow-brand-sm" : ""
          )}
          required
        />
      </motion.div>

      <motion.div 
        variants={item}
        className="space-y-2"
      >
        <Label htmlFor="phone" variant="premium" size="lg">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="Your phone number"
          value={formData.phone}
          onChange={(e) => updateFormData('phone', e.target.value)}
          variant="premium"
          size="lg"
          className={cn(
            "transition-all duration-300",
            formData.phone ? "border-primary shadow-brand-sm" : ""
          )}
          required
        />
      </motion.div>
    </motion.div>
  );
}