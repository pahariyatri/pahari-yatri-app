import SectionContainer from '@/components/common/SectionContainer'
import PageTitle from '@/components/common/TitleCover'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SocialLinks from '@/components/common/SocialLinks'
import ContactInfoItem from '@/components/common/ContactInfoItem'
import ContactForm from './contact-form'
import { genPageMetadata } from '@/app/seo'
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '@/keystatic.config'

export async function generateMetadata() {
  return genPageMetadata({
    title: 'Contact & Apply',
    description:
      'Ready to begin your Himalayan transformation? Reach out to Pahari Yatri — we read every message and respond within 24 hours.',
  })
}

const reader = createReader(process.cwd(), keystaticConfig)

export default async function Contact() {
  const contact = await reader.singletons.contact.read()

  return (
    <SectionContainer>
      <div className="text-center mb-16">
        <p className="text-base font-semibold uppercase tracking-widest text-primary mb-4">
          Get In Touch
        </p>
        <PageTitle>Contact & Apply</PageTitle>
        <p className="mx-auto mt-6 max-w-3xl text-xl text-muted-foreground leading-relaxed">
          Ready to begin your Himalayan transformation? We&apos;re here to guide you on your journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-6 md:mt-12 px-4 md:px-0 mb-20">
        {/* Wired contact form */}
        <ContactForm />

        {/* Contact Information */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-primary font-brandSerif">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <ContactInfoItem
                iconType="email"
                title="Email"
                content={contact?.email || 'info@pahariyatri.com'}
              />
              <ContactInfoItem
                iconType="phone"
                title="Phone"
                content={contact?.mobile || '+91 98765 43210'}
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
                facebook={contact?.facebook || '#'}
                instagram={contact?.instagram || '#'}
                twitter="#"
                youtube={contact?.youtube || '#'}
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
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What happens next */}
        <div className="space-y-8 md:col-span-2 lg:col-span-1">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-primary font-brandSerif">What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                'Submit your message or application',
                'We review and reach out within 24 hours',
                'A conversation about your trek — tailored to you',
                'Begin your transformation journey',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-foreground text-xs font-bold">{i + 1}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{step}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionContainer>
  )
}
