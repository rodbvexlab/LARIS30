import { motion } from 'motion/react';

import { SectionKicker } from '../components/ui';
import { FloatingDisco, staggerGroup, stickerPop } from '../components/motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

import heart from '../assets/stickers/heart.jpg';
import smileyYellow from '../assets/stickers/smiley-yellow.jpg';
import smileyPink from '../assets/stickers/smiley-pink.jpg';
import larisDisco from '../assets/laris/laris-disco.jpg';
import sparkle from '../assets/decorative/sparkle.svg';

/**
 * The Mood — section 5 of 13.
 *
 * Visual reference:
 *   reference/design-system/templates/invitation-experience/TheMood.dc.html
 *
 * No longer a photo gallery: the section is a sticker composition on Deep Ink,
 * built from the project's own visual references. Varied sizes and tilts keep
 * it reading as a scattered sheet of stickers rather than a grid of tiles.
 *
 * Two shape strategies, forced by the source files (all JPEG, none with an
 * alpha channel):
 *  - `disc` — the heart and smiley artworks sit on white/off-white. Clipped to
 *    a circle, that background becomes the sticker's own die-cut edge, which
 *    is exactly how the two smileys are already drawn.
 *  - `blend` — the Larissa cutout sits on pure black. `mix-blend-mode: lighten`
 *    drops that black out against the ink field so she floats free, with no
 *    visible plate behind her.
 *
 * The stickers pop in on scroll and then hold. Exactly two of the twelve keep
 * a very slow ambient drift — enough to stop the wall reading as a flat
 * print, far short of everything floating at once. The old photo marquee is
 * gone for good; this is a pinned sheet, not a conveyor.
 */

interface MoodSticker {
  id: string;
  src: string;
  /** Rendered height in px; disc stickers are square. */
  size: number;
  rotate: number;
  shape: 'disc' | 'free';
  /** Drops a pure-black source background against the ink field. */
  blend?: boolean;
  /** Only two stickers carry this — see the ambient note above. */
  ambient?: boolean;
}

const ROW_A: readonly MoodSticker[] = [
  { id: 'a1', src: heart, size: 132, rotate: -6, shape: 'disc' },
  { id: 'a2', src: sparkle, size: 48, rotate: 0, shape: 'free' },
  { id: 'a3', src: larisDisco, size: 190, rotate: 3, shape: 'free', blend: true, ambient: true },
  { id: 'a4', src: smileyYellow, size: 116, rotate: 9, shape: 'disc' },
  { id: 'a5', src: sparkle, size: 36, rotate: 0, shape: 'free' },
  { id: 'a6', src: smileyPink, size: 144, rotate: -4, shape: 'disc' },
];

const ROW_B: readonly MoodSticker[] = [
  { id: 'b1', src: smileyPink, size: 120, rotate: 7, shape: 'disc' },
  { id: 'b2', src: sparkle, size: 42, rotate: 0, shape: 'free' },
  { id: 'b3', src: smileyYellow, size: 152, rotate: -8, shape: 'disc', ambient: true },
  { id: 'b4', src: heart, size: 108, rotate: 5, shape: 'disc' },
  { id: 'b5', src: sparkle, size: 54, rotate: 0, shape: 'free' },
  { id: 'b6', src: smileyPink, size: 96, rotate: -10, shape: 'disc' },
];

function Sticker({ sticker }: { sticker: MoodSticker }) {
  const isDisc = sticker.shape === 'disc';
  const reduced = usePrefersReducedMotion();
  const drifts = sticker.ambient && !reduced;

  return (
    // Outer element owns the tilt, the pop and the blend. The blend has to be
    // here and nowhere deeper: `rotate` opens a stacking context, and a blend
    // applied inside it would be isolated from the section's ink backdrop.
    <motion.div
      variants={stickerPop}
      style={{
        flexShrink: 0,
        rotate: sticker.rotate,
        ...(sticker.blend ? { mixBlendMode: 'lighten' as const } : null),
      }}
    >
      {/* Inner element carries the ambient drift, so it never fights the
          scale/rotate the variant and the tilt already own. */}
      <motion.div
        animate={drifts ? { y: [-4, 4] } : undefined}
        transition={
          drifts
            ? { duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
            : undefined
        }
        style={{
          height: `${sticker.size}px`,
          ...(isDisc
            ? { width: `${sticker.size}px`, borderRadius: '50%', overflow: 'hidden' }
            : null),
        }}
      >
        <img
          src={sticker.src}
          alt=""
          loading="lazy"
          decoding="async"
          style={{
            height: '100%',
            width: isDisc ? '100%' : 'auto',
            display: 'block',
            objectFit: isDisc ? 'cover' : 'contain',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

function MoodRow({ stickers, marginTop }: { stickers: readonly MoodSticker[]; marginTop?: string }) {
  return (
    // Decorative throughout: every sticker carries an empty alt, so the row
    // adds nothing to the accessibility tree.
    <div style={{ marginTop }} aria-hidden="true">
      <motion.div
        variants={staggerGroup(0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        style={{
          display: 'flex',
          gap: 'var(--space-4)',
          width: 'max-content',
          alignItems: 'center',
          padding: '0 var(--space-4)',
        }}
      >
        {stickers.map((sticker) => (
          <Sticker key={sticker.id} sticker={sticker} />
        ))}
      </motion.div>
    </div>
  );
}

export function Mood() {
  return (
    // overflow:hidden is load-bearing: the tracks run far wider than the
    // viewport and must never add to the page's horizontal scroll width.
    <section style={{ background: 'var(--ink)', padding: '56px 0', overflow: 'hidden' }}>
      <div
        style={{ padding: '0 var(--space-5)', textAlign: 'center', marginBottom: 'var(--space-5)' }}
      >
        <SectionKicker align="center" tone="inverse" role="heading" aria-level={2}>
          The Mood
        </SectionKicker>
      </div>

      <MoodRow stickers={ROW_A} />
      <MoodRow stickers={ROW_B} marginTop="var(--space-5)" />

      {/* Disco journey, touchpoint 2 of 3. Sized up from 44px: at that size it
          read as a grey dot lost in the ink, and the drift alone did not
          rescue it. */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '28px' }}>
        <FloatingDisco size={56} duration={5.5} delay={0.4} />
      </div>
    </section>
  );
}
