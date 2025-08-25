'use client';

import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type FormData = {
  calling: string;
  season: string;
  companionship: string;
};

type Props = {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
};

export default function IntentionStep({ formData, updateFormData }: Props) {
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
    hidden: { opacity: 0, y: isMobile ? 5 : 10 },
    show: { opacity: 1, y: 0, transition: { duration: isMobile ? 0.3 : 0.4 } },
  };

  // ✨ Reusable option card with typed props
  type OptionProps = {
    field: keyof FormData;
    value: string;
    label: string;
    icon: string;
    description?: string;
  };

  const Option = ({ field, value, label, icon, description }: OptionProps) => {
    const selected = formData[field] === value;
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          'rounded-xl p-4 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center',
          selected
            ? 'bg-background text-primary-foreground border-2 border-primary shadow-md'
            : 'bg-secondary text-secondary-foreground border border-border hover:bg-muted/70'
        )}
        onClick={() => updateFormData(field, value)}
      >
        <div className={cn("text-2xl", selected && "scale-110")}>{icon}</div>
        <div className="mt-1 text-sm font-semibold">{label}</div>
        {description && <div className="text-xs text-muted-foreground">{description}</div>}
      </motion.div>
    );
  };

  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Q1 */}
      <motion.div variants={item} className="space-y-3">
        <Label className="font-medium">What draws you?</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Option field="calling" value="silence" label="Silence" icon="🧘" />
          <Option field="calling" value="adventure" label="Adventure" icon="🏔️" />
          <Option field="calling" value="spiritual" label="Spiritual" icon="✨" />
          <Option field="calling" value="nature" label="Nature" icon="🌿" />
          <Option field="calling" value="culture" label="Culture" icon="🏮" />
          <Option field="calling" value="creative" label="Creative" icon="📸" />
        </div>
      </motion.div>

      {/* Q2 */}
      <motion.div variants={item} className="space-y-3">
        <Label className="font-medium">When do you journey?</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Option field="season" value="spring" label="Spring" icon="🌸" />
          <Option field="season" value="summer" label="Summer" icon="☀️" />
          <Option field="season" value="monsoon" label="Monsoon" icon="🌧️" />
          <Option field="season" value="autumn" label="Autumn" icon="🍂" />
          <Option field="season" value="winter" label="Winter" icon="❄️" />
        </div>
      </motion.div>

      {/* Q3 */}
      <motion.div variants={item} className="space-y-3">
        <Label className="font-medium">How do you travel?</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Option field="companionship" value="solo" label="Solo" icon="🧭" />
          <Option field="companionship" value="friends" label="Friends" icon="👥" />
          <Option field="companionship" value="guided-small" label="Small Group" icon="🧗‍♀️" />
          <Option field="companionship" value="guided-medium" label="Group" icon="👨‍👩‍👧‍👦" />
        </div>
      </motion.div>
    </motion.div>
  );
}
