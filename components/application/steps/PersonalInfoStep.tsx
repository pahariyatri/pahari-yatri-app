'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  formData: {
    fullName: string;
    email: string;
    phone: string;
  };
  updateFormData: (field: string, value: any) => void;
};

export default function PersonalInfoStep({ formData, updateFormData }: Props) {
  // Detect mobile for optimized animations
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.1,
        delayChildren: isMobile ? 0.1 : 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: isMobile ? 0.3 : 0.4 } },
  };

  return (
    <motion.div
      className="space-y-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* First + Last Name */}
      <motion.div variants={item} className="space-y-2">
        <Label htmlFor="fullName" className="text-base font-medium text-foreground">
          Your Name
        </Label>
        <Input
          id="fullName"
          placeholder="Pahari Yatri"
          value={formData.fullName}
          onChange={(e) => updateFormData('fullName', e.target.value)}
          className={cn(
            'h-12 sm:h-14 text-base rounded-xl border transition-all duration-300',
            formData.fullName ? 'border-primary shadow-sm shadow-primary/10' : 'border-input'
          )}
          required
        />
      </motion.div>


      {/* Email */}
      <motion.div variants={item} className="space-y-2">
        <Label htmlFor="email" className="text-base font-medium text-foreground">
          Your Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="hi@pahariyatri.com"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          className={cn(
            'h-12 sm:h-14 text-base rounded-xl border transition-all duration-300',
            formData.email ? 'border-primary shadow-sm shadow-primary/10' : 'border-input'
          )}
          required
        />
      </motion.div>

      {/* Phone */}
      <motion.div variants={item} className="space-y-2">
        <Label htmlFor="phone" className="text-base font-medium text-foreground">
          WhatsApp number (preferred for updates)
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+91 62808-88188"
          value={formData.phone}
          onChange={(e) => updateFormData('phone', e.target.value)}
          className={cn(
            'h-12 sm:h-14 text-base rounded-xl border transition-all duration-300',
            formData.phone ? 'border-primary shadow-sm shadow-primary/10' : 'border-input'
          )}
          required
        />
      </motion.div>
    </motion.div>
  );
}
