import { motion } from 'motion/react';

import poolDeck from '../assets/venue/chacara-07.jpg.jpeg';
import poolGarden from '../assets/venue/chacara-03.jpg.jpeg';
import gardenPond from '../assets/venue/chacara-02.jpg.jpeg';
import poolTable from '../assets/venue/chacara-01.jpg.jpeg';
import garden from '../assets/venue/chacara-08.jpg.jpeg';
import parking from '../assets/venue/chacara-06.jpg.jpeg';
import { VIEWPORT, groupReveal, staggerGroup, staggerItem } from '../components/motion';
import { SectionKicker } from '../components/ui';

const PHOTOS = [
  {
    src: poolDeck,
    alt: 'Piscina e deck da chácara, com espreguiçadeiras e área coberta ao fundo.',
    position: '38% center',
    angle: '0deg',
  },
  {
    src: poolGarden,
    alt: 'Vista geral da piscina e do jardim da chácara.',
    position: '25% center',
    angle: '0.45deg',
  },
  {
    src: gardenPond,
    alt: 'Lago cercado pelo jardim e pela área verde da chácara.',
    position: '40% center',
    angle: '-0.55deg',
  },
  {
    src: poolTable,
    alt: 'Área coberta de lazer com mesa de sinuca.',
    position: '72% center',
    angle: '0.4deg',
  },
  {
    src: garden,
    alt: 'Jardim arborizado com gramado e paisagismo.',
    position: '65% center',
    angle: '-0.45deg',
  },
  {
    src: parking,
    alt: 'Acesso interno e estacionamento da chácara.',
    position: '55% center',
    angle: '0.35deg',
  },
] as const;

export function VenueGallery() {
  return (
    <motion.section
      id="venue-gallery"
      variants={groupReveal}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      style={{
        background: 'var(--warm-cream)',
        padding: '56px var(--space-5) 52px',
        overflow: 'hidden',
      }}
    >
      <SectionKicker role="heading" aria-level={2}>
        A CHÁCARA
      </SectionKicker>

      <h2
        style={{
          maxWidth: '360px',
          marginTop: 'var(--space-3)',
          font: 'var(--text-display-md)',
          color: 'var(--ink)',
        }}
      >
        UM POUQUINHO DO LUGAR ✦
      </h2>

      <motion.ul
        className="venue-gallery__track focus-ring"
        aria-label="Fotos da chácara. Deslize horizontalmente para ver todas."
        tabIndex={0}
        variants={staggerGroup(0.07, 0.12)}
        style={{
          display: 'flex',
          gap: 'var(--space-4)',
          margin: 'var(--space-6) calc(var(--space-5) * -1) 0',
          padding: '8px var(--space-5) 16px',
          overflowX: 'auto',
          overflowY: 'hidden',
          overscrollBehaviorInline: 'contain',
          scrollPaddingInline: 'var(--space-5)',
          scrollSnapType: 'x mandatory',
          scrollbarColor: 'var(--ink-40) transparent',
          scrollbarWidth: 'thin',
          listStyle: 'none',
        }}
      >
        {PHOTOS.map((photo) => (
          <motion.li
            key={photo.src}
            variants={staggerItem}
            style={{
              flex: '0 0 min(84vw, 361px)',
              scrollSnapAlign: 'start',
            }}
          >
            <figure
              style={{
                aspectRatio: '4 / 5',
                margin: 0,
                overflow: 'hidden',
                background: 'var(--surface-card)',
                border: 'var(--border-w) solid var(--ink)',
                borderRadius: 'var(--radius-sharp)',
                boxShadow: 'var(--shadow-hard)',
                transform: `rotate(${photo.angle})`,
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                  objectFit: 'cover',
                  objectPosition: photo.position,
                }}
              />
            </figure>
          </motion.li>
        ))}
      </motion.ul>

      <style>{`
        .venue-gallery__track::-webkit-scrollbar {
          height: 4px;
        }

        .venue-gallery__track::-webkit-scrollbar-track {
          background: transparent;
        }

        .venue-gallery__track::-webkit-scrollbar-thumb {
          background: var(--ink-40);
          border-radius: var(--radius-pill);
        }
      `}</style>
    </motion.section>
  );
}
