import { useState } from 'react';
import type { ReactNode } from 'react';

import { Badge, Button, Card, Chip, Input, SectionKicker } from './components/ui';

/**
 * CP1 — component specimen.
 *
 * A side-by-side reference for checking the ported primitives against
 * reference/design-system/components/**\/*.card.html. This is scaffolding, not
 * part of the invitation: it gets replaced when the sections land.
 */

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <SectionKicker>{label}</SectionKicker>
      {children}
    </section>
  );
}

export default function App() {
  const [rsvp, setRsvp] = useState<'yes' | 'no' | null>(null);
  const [name, setName] = useState('');

  return (
    <main
      style={{
        maxWidth: '430px',
        margin: '0 auto',
        padding: 'var(--space-6) var(--space-5) var(--space-9)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-8)',
      }}
    >
      <Group label="Button">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <Button variant="primary" size="lg">
            RSVP Now
          </Button>
          <Button variant="secondary">Add to Calendar</Button>
          <Button variant="ghost">See Details</Button>
          <Button variant="primary" size="sm">
            Share
          </Button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <Button variant="primary" disabled>
            Disabled
          </Button>
          <Button variant="ghost" disabled>
            Disabled Ghost
          </Button>
        </div>
      </Group>

      <Group label="Chip">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <Chip selected={rsvp === 'yes'} onClick={() => setRsvp('yes')}>
            Yes, I&apos;ll be there
          </Chip>
          <Chip selected={rsvp === 'no'} onClick={() => setRsvp('no')}>
            Can&apos;t make it
          </Chip>
          <Chip disabled>Disabled</Chip>
        </div>
      </Group>

      <Group label="Badge">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-5)' }}>
          <Badge tone="bubblegum">
            TURNS
            <br />
            30
          </Badge>
          <Badge tone="yellow">
            POOL
            <br />
            PARTY
          </Badge>
          <Badge tone="coral">
            IN FULL
            <br />
            COLOR
          </Badge>
          <Badge tone="blue">
            SAVE THE
            <br />
            DATE
          </Badge>
        </div>
      </Group>

      <Group label="Input">
        <Input
          label="Nome completo"
          name="name"
          placeholder="Seu nome"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="WhatsApp"
          name="whatsapp"
          type="tel"
          placeholder="(11) 90000-0000"
          autoComplete="tel"
          required
          error="Campo obrigatório."
        />
      </Group>

      <Group label="Card">
        <Card kicker="When" title="22 Ago 2026" tone="white">
          Horário em breve.
        </Card>
        <Card kicker="Where" title="Chácara" tone="pink">
          Endereço em breve.
        </Card>
        <Card kicker="Dress Code" title="Come Colorido." tone="cream">
          Summer &amp; colorful vibes.
        </Card>
      </Group>

      <Group label="Section Kicker">
        <SectionKicker align="center">Centered</SectionKicker>
      </Group>
    </main>
  );
}
