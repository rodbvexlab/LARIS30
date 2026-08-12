import { SectionKicker } from '../components/ui';

/**
 * The Mood — section 5 of 13.
 *
 * Visual reference:
 *   reference/design-system/templates/invitation-experience/TheMood.dc.html
 *
 * Two horizontal bands of varied-proportion cutouts on Deep Ink, closed by the
 * disco journey's second chrome touchpoint. CP4 builds the static composition
 * only: the bands are laid out as marquee tracks but nothing moves yet.
 *
 * CP7 adds MOTION-SPEC G (26s linear loop, the two rows travelling in opposite
 * directions) by rendering each tile set twice inside its track and animating
 * the track by -50%. The track element already exists for exactly that, so the
 * change is an animation property plus a duplicated map — no restructuring.
 */

interface MoodTile {
  id: string;
  /** Real photo, once curation lands (CONTENT_PENDING §13). */
  src?: string;
  /** Required whenever `src` is set; placeholders carry no information. */
  alt?: string;
  surface: string;
  aspectRatio: string;
  /** Flex basis, from the reference's 160/220px rhythm. */
  width: number;
}

/**
 * CONTENT PENDING: no Mood photography has been curated yet, so every tile is
 * a placeholder. These are not loading states — they are flat design-system
 * colour fields holding the exact frame each photo will occupy. Chrome tones
 * carry most of them so the band reads as a contact sheet rather than a
 * rainbow, with brand colour used as punctuation.
 *
 * Dropping in a real photo means adding `src` and `alt` to an entry; the tile
 * geometry does not change. The Hero cutout is deliberately not reused here —
 * repeating it this soon would weaken both appearances.
 */
const ROW_A: readonly MoodTile[] = [
  { id: 'a1', surface: 'var(--pool-blue)', aspectRatio: '4 / 5', width: 160 },
  { id: 'a2', surface: 'var(--chrome-2)', aspectRatio: '3 / 2', width: 220 },
  { id: 'a3', surface: 'var(--coral)', aspectRatio: '4 / 5', width: 160 },
  { id: 'a4', surface: 'var(--chrome-3)', aspectRatio: '3 / 2', width: 220 },
  { id: 'a5', surface: 'var(--soft-pink)', aspectRatio: '4 / 5', width: 160 },
  { id: 'a6', surface: 'var(--chrome-2)', aspectRatio: '3 / 2', width: 220 },
];

const ROW_B: readonly MoodTile[] = [
  { id: 'b1', surface: 'var(--chrome-2)', aspectRatio: '3 / 2', width: 220 },
  { id: 'b2', surface: 'var(--summer-orange)', aspectRatio: '4 / 5', width: 160 },
  { id: 'b3', surface: 'var(--chrome-3)', aspectRatio: '3 / 2', width: 220 },
  { id: 'b4', surface: 'var(--bubblegum)', aspectRatio: '4 / 5', width: 160 },
  { id: 'b5', surface: 'var(--chrome-2)', aspectRatio: '3 / 2', width: 220 },
  { id: 'b6', surface: 'var(--sun-yellow)', aspectRatio: '4 / 5', width: 160 },
];

function MoodRow({ tiles, marginTop }: { tiles: readonly MoodTile[]; marginTop?: string }) {
  return (
    <div style={{ marginTop }}>
      {/* The track is the element CP7 animates. */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          width: 'max-content',
          // The reference leaves align-items at `stretch`, which silently
          // overrides every declared aspect-ratio and flattens all tiles to
          // one height. Centring honours the 4:5 / 3:2 the reference actually
          // declares — the "proporções variadas" the brief asks for — and
          // distributes the leftover ink evenly above and below.
          alignItems: 'center',
        }}
      >
        {tiles.map((tile) => (
          <div
            key={tile.id}
            // Placeholders hold no information, so they stay out of the
            // accessibility tree entirely. A real photo brings its own alt.
            aria-hidden={tile.src ? undefined : true}
            style={{
              flex: `0 0 ${tile.width}px`,
              aspectRatio: tile.aspectRatio,
              overflow: 'hidden',
              borderRadius: 'var(--radius-sharp)',
              background: tile.surface,
            }}
          >
            {tile.src && (
              <img
                src={tile.src}
                alt={tile.alt ?? ''}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Mood() {
  return (
    // overflow:hidden is load-bearing: the tracks are far wider than the
    // viewport and must never add to the page's horizontal scroll width.
    <section style={{ background: 'var(--ink)', padding: '56px 0', overflow: 'hidden' }}>
      <div style={{ padding: '0 var(--space-5)', textAlign: 'center', marginBottom: 'var(--space-5)' }}>
        <SectionKicker align="center" tone="inverse" role="heading" aria-level={2}>
          The Mood
        </SectionKicker>
      </div>

      <MoodRow tiles={ROW_A} />
      <MoodRow tiles={ROW_B} marginTop="12px" />

      {/* Disco journey, touchpoint 2 of 3 — and the visual bridge out of the
          ink band into Rateio. Static in CP4. */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '28px' }}>
        <div className="chrome-sphere" aria-hidden="true" style={{ width: '44px', height: '44px' }} />
      </div>
    </section>
  );
}
