# Pahari Yatri Application Form Components

## Form Structure Components

### ApplicationForm

The main container component that manages the multi-step form process.

**Key Features:**
- Step management and navigation
- Progress visualization with mountain journey
- Inspirational quotes display
- Mobile-optimized layout and animations

### Step Components

#### PersonalInfoStep

Collects basic contact information from the user.

**Key Features:**
- Simplified input fields for first name, last name, email, and phone
- Framer Motion animations for field transitions
- Responsive grid layout that adapts to screen size
- Mobile-optimized spacing and typography

#### IntentionStep

Gathers user's motivations and preferences through interactive card selections.

**Key Features:**
- Card-based selection UI for motivation and timing
- Visual feedback with checkmarks and animations
- Touch-friendly design optimized for mobile
- Responsive grid layout for different screen sizes

#### JourneyStep

Collects information about the user's fitness level and expectations.

**Key Features:**
- Interactive slider for fitness level with dynamic descriptions
- Text areas for past experiences and expectations
- Simplified animations for mobile performance
- Responsive layout with optimized spacing

#### FinalStep

Provides a summary of all entered information for review before submission.

**Key Features:**
- Concise display of user-provided information
- Simplified animations for mobile performance
- Clear call-to-action for submission
- Mobile-optimized layout and typography

#### ThankYouStep

Confirms successful submission with a celebratory animation.

**Key Features:**
- Simplified confetti animation for mobile
- Mountain silhouette background
- Clear confirmation message
- Next step options with simplified button styling

## UI Components

### IntentionCard

Interactive card component used for selection-based inputs.

**Key Features:**
- Touch-friendly design
- Visual feedback for selection state
- Framer Motion animations for hover and tap interactions
- Responsive sizing for different screen sizes

### Slider

Custom slider component for the fitness level selection.

**Key Features:**
- Touch-optimized interaction
- Dynamic text feedback based on selection
- Visual indicators for different levels
- Mobile-friendly sizing and touch targets

### AnimatedInput

Enhanced input field with animation effects.

**Key Features:**
- Framer Motion animations for focus and blur states
- Simplified animations for mobile performance
- Consistent styling with the overall form design
- Responsive sizing and spacing

### MountainJourneyProgress

Visual representation of form progress as a mountain journey.

**Key Features:**
- Simplified visualization for mobile screens
- Step markers with current step indication
- Reduced content for better mobile performance
- Responsive design that adapts to screen width

### NavigationButtons

Consistent navigation controls for moving between form steps.

**Key Features:**
- Emotional call-to-action text
- Simplified animations for mobile performance
- Touch-friendly sizing and spacing
- Responsive layout that adapts to screen width

## Animation Patterns

### Page Transitions

Consistent transitions between form steps.

**Implementation:**
- Simplified Framer Motion animations for mobile
- Reduced transition durations (300-500ms)
- Optimized for performance on mobile devices

### Micro-interactions

Subtle animations that respond to user interactions.

**Implementation:**
- Touch-friendly hover alternatives for mobile
- Simplified animation variants
- Performance-focused implementation

### Celebration Animation

Special animation sequence for form completion.

**Implementation:**
- Reduced number of confetti pieces for mobile
- Simplified animation properties
- Optimized for performance on mobile devices

## Mobile Optimization Techniques

### Layout Adjustments

- Single column layouts on mobile
- Reduced padding and margins
- Optimized vertical spacing for scrolling
- Touch-friendly sizing for interactive elements

### Content Simplification

- Shorter titles and descriptions
- Concise placeholder text and labels
- Essential information only
- Progressive disclosure of additional details

### Performance Considerations

- Simplified animations
- Reduced animation complexity
- Shorter transition durations
- Optimized rendering for mobile devices

This documentation provides an overview of the key components used in the Pahari Yatri application form, with a focus on their mobile-first implementation and optimization techniques.