// src/design/StyleBackdrop.tsx — decorative page backdrop each style can paint (blobs, aurora
// mesh, grids, scanlines) plus the SVG displacement filter that gives Liquid Glass its lensing.
// Purely presentational: hidden from assistive tech and ignores pointer events.
export function StyleBackdrop() {
  return (
    <>
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <filter id="forge-liquid" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="55" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div className="style-backdrop" aria-hidden="true"><i /><i /><i /></div>
    </>
  );
}
