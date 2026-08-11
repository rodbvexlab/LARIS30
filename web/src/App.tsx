import { Hero } from './sections/Hero';
import { Vibe } from './sections/Vibe';
import { PartyInfo } from './sections/PartyInfo';
import { DressCode } from './sections/DressCode';

/**
 * The experience container mirrors InvitationExperience.dc.html: a single
 * 430px-wide column, centred. The cap only binds above 430px, so every
 * validated mobile viewport renders exactly as before — it keeps the page from
 * sprawling on desktop, which is out of scope for this phase.
 */
export default function App() {
  return (
    <div style={{ maxWidth: '430px', margin: '0 auto', background: 'var(--warm-cream)' }}>
      <Hero />
      <Vibe />
      <PartyInfo />
      <DressCode />
    </div>
  );
}
