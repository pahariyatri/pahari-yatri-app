import SectionContainer from '@/components/common/SectionContainer'
import YatriPassForm from '@/components/application/YatriPassForm'
import { genPageMetadata } from '@/app/seo'

export async function generateMetadata() {
  return genPageMetadata({
    title: 'Yatri Pass',
    description:
      'The Yatri Pass is not purchased. It is earned through intention. Request your invitation to join our curated community of Himalayan seekers.',
  })
}

const WHAT_YOU_RECEIVE = [
  {
    label: 'Priority access',
    detail: 'First to know when a new Chapter (journey) opens. Seats are few. Waiting lists are real.',
  },
  {
    label: 'The inner circle',
    detail:
      'A private space where Yatris share stories, reflections, and prepare together before each trek.',
  },
  {
    label: 'Curated pairing',
    detail:
      'We read your application and match you to a Chapter that fits your spirit — not just your schedule.',
  },
  {
    label: 'The Yatri Letters',
    detail:
      'Seasonal dispatches from the trail. Stories from the mountains, written for those who understand.',
  },
]

export default function YatriPassPage() {
  return (
    <SectionContainer>
      {/* Hero */}
      <div className="text-center mb-20 max-w-3xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-6">
          By Invitation Only
        </p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-brandSerif text-foreground mb-8 leading-tight tracking-tight">
          The Yatri Pass
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed mb-6">
          You don&apos;t buy a Yatri Pass. You answer a calling.
        </p>
        <p className="text-base text-muted-foreground/80 leading-relaxed max-w-2xl mx-auto">
          Pahari Yatri is not a trekking company. It is a movement — slow, intentional,
          and deeply rooted in the mountains. The Yatri Pass exists for those who wish to
          walk with us season after season, not as tourists, but as seekers.
        </p>
      </div>

      {/* What it means */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-4xl mx-auto">
        {WHAT_YOU_RECEIVE.map((item) => (
          <div
            key={item.label}
            className="border border-border/40 rounded-2xl p-8 hover:border-primary/30 transition-colors duration-300"
          >
            <h3 className="text-lg font-semibold font-brandSerif text-foreground mb-3">
              {item.label}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <div className="w-12 h-px bg-primary/30 mx-auto mb-10" />
        <h2 className="text-3xl sm:text-4xl font-bold font-brandSerif text-foreground mb-4">
          Request your invitation
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          We read every request. We accept seekers, not customers. There is no wrong answer —
          only honest ones.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-lg mx-auto mb-24">
        <YatriPassForm />
      </div>

      {/* Footer note */}
      <div className="text-center max-w-xl mx-auto">
        <p className="text-sm text-muted-foreground/50 italic font-brandSerif">
          &ldquo;The mountains are not a backdrop. They are the teacher. We are only the guides.&rdquo;
        </p>
      </div>
    </SectionContainer>
  )
}
