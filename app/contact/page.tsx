import SectionContainer from "@/components/common/SectionContainer";
import PageTitle from "@/components/common/TitleCover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import SocialLinks from "@/components/common/SocialLinks";
import ContactInfoItem from "@/components/common/ContactInfoItem";
import { cn } from "@/lib/utils";

export default function Contact() {
  return (
    <SectionContainer>
      <div className="text-center mb-16 animate-fade-in">
        <p className="text-base font-semibold uppercase tracking-widest text-primary mb-4 animate-pulse bg-clip-text">

          Get In Touch
        </p>
        <PageTitle>
          Contact & Apply
        </PageTitle>
        <p className="mx-auto mt-6 max-w-3xl text-xl text-muted-foreground leading-relaxed animate-fade-in-up">
          Ready to begin your Himalayan transformation? We&apos;re here to guide you on your journey.

        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-6 md:mt-12 px-4 md:px-0 mb-20">
        {/* Contact Form */}
        <Card className="border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fade-in-up [animation-delay:200ms]">
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input id="firstName" placeholder="Your first name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input id="lastName" placeholder="Your last name" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" placeholder="your.email@example.com" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+91 98765 43210" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="experience">Trekking Experience</Label>
              <Select>
                <SelectTrigger id="experience" className="w-full">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner (First time trekker)</SelectItem>
                  <SelectItem value="intermediate">Intermediate (2-5 treks completed)</SelectItem>
                  <SelectItem value="advanced">Advanced (5+ treks, high altitude experience)</SelectItem>
                  <SelectItem value="expert">Expert (Technical climbing, mountaineering)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="interests">Areas of Interest</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="spiritual" />
                  <Label htmlFor="spiritual" className="text-sm font-normal cursor-pointer">Spiritual Journeys</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="adventure" />
                  <Label htmlFor="adventure" className="text-sm font-normal cursor-pointer">Adventure Treks</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="cultural" />
                  <Label htmlFor="cultural" className="text-sm font-normal cursor-pointer">Cultural Immersion</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="photography" />
                  <Label htmlFor="photography" className="text-sm font-normal cursor-pointer">Photography</Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Why do you want to join Pahari Yatri? *</Label>
              <Textarea 
                id="message" 
                placeholder="Tell us about your spiritual journey, what you're seeking, and how you hope to grow through this experience..."
                rows={4}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className={cn(
                "w-full py-3 transition-all duration-300",
                "hover:translate-y-[-2px] hover:shadow-md",
                "relative overflow-hidden",
                "after:absolute after:inset-0 after:bg-primary-foreground/20 after:opacity-0",
                "after:hover:opacity-100 after:transition-opacity after:duration-500"
              )}
            >
              Submit Application
            </Button>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fade-in-up [animation-delay:400ms]">
          <CardHeader>
            <CardTitle className="text-primary font-brandSerif">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <ContactInfoItem 
                iconType="email"
                title="Email"
                content="info@pahariyatri.com"
              />

              <ContactInfoItem 
                iconType="phone"
                title="Phone"
                content="+91 98765 43210"
              />

              <ContactInfoItem 
                iconType="location"
                title="Address"
                content="Himalayan Base Camp, Manali, Himachal Pradesh, India"
              />
            </div>
            
            <div className="pt-4">
              <h3 className="text-sm font-semibold text-primary mb-3">Connect With Us</h3>
              <SocialLinks 
                facebook="#" 
                instagram="#" 
                twitter="#" 
                youtube="#" 
              />
            </div>
            
            <div className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-3">Location</h3>
                <div className="w-full h-48 md:h-64 rounded-lg overflow-hidden border border-border/50 shadow-inner">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13462.46344017888!2d77.17068023955077!3d32.23950199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39048708163fd03f%3A0x8129a80ebe5076cd!2sManali%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1653896252963!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                  </iframe>
                </div>
              </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <div className="space-y-8 animate-fade-in-up [animation-delay:600ms]">

          <Card className="border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-primary font-brandSerif">Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We typically respond to applications within 24-48 hours. For urgent inquiries, please call us directly.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-primary font-brandSerif">What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 animate-pulse-slow">
                  <span className="text-primary-foreground text-sm font-bold">1</span>
                </div>
                <p className="text-sm text-muted-foreground">Submit your application</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 animate-pulse-slow [animation-delay:200ms]">
                  <span className="text-primary-foreground text-sm font-bold">2</span>
                </div>
                <p className="text-sm text-muted-foreground">We&apos;ll review and schedule a call</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 animate-pulse-slow [animation-delay:400ms]">
                  <span className="text-primary-foreground text-sm font-bold">3</span>
                </div>
                <p className="text-sm text-muted-foreground">Personalized trek recommendations</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 animate-pulse-slow [animation-delay:600ms]">
                  <span className="text-primary-foreground text-sm font-bold">4</span>
                </div>
                <p className="text-sm text-muted-foreground">Begin your transformation journey</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionContainer>
  );
}
