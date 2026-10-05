import { useRef, useState } from 'react';
import styles from './styles/beforeAfterSlider.module.css';

const INITIAL_POSITION = 50;

function clampPercent(value) {
  return Math.min(100, Math.max(0, Math.round(value)));
}

// Before/after comparison. The "before" photo is clipped to the left of the
// divider. A transparent native range input covers the picture, so arrow
// keys work and screen readers announce a slider; pointer handlers on the
// frame let a mouse or finger drag the divider from anywhere on the photo
// (iOS only drags a native range by its thumb). Vertical swipes still
// scroll the page (touch-action: pan-y in the CSS).
const BeforeAfterSlider = ({ beforeSrc, afterSrc, alt, width, height, label }) => {
  const [position, setPosition] = useState(INITIAL_POSITION);
  const dragging = useRef(false);

  const moveTo = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (rect.width > 0) {
      setPosition(clampPercent(((event.clientX - rect.left) / rect.width) * 100));
    }
  };

  const startDrag = (event) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    moveTo(event);
  };

  const drag = (event) => {
    if (dragging.current) {
      moveTo(event);
    }
  };

  const stopDrag = () => {
    dragging.current = false;
  };

  return (
    <div
      className={styles.slider}
      style={{ '--position': `${position}%`, aspectRatio: `${width} / ${height}` }}
      onPointerDown={startDrag}
      onPointerMove={drag}
      onPointerUp={stopDrag}
      onPointerCancel={stopDrag}
    >
      <img className={styles.image} src={afterSrc} alt={`${alt}, după tratament`} width={width} height={height} />
      <img
        className={`${styles.image} ${styles.before}`}
        src={beforeSrc}
        alt={`${alt}, înainte de tratament`}
        width={width}
        height={height}
      />
      <input
        className={styles.range}
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(clampPercent(Number(event.target.value)))}
        aria-label={label}
      />
      <span className={styles.divider} aria-hidden="true">
        <span className={styles.handle}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l-6 6 6 6" />
            <path d="M15 6l6 6-6 6" />
          </svg>
        </span>
      </span>
      <span className={`${styles.tag} ${styles.tagBefore}`} aria-hidden="true">Înainte</span>
      <span className={`${styles.tag} ${styles.tagAfter}`} aria-hidden="true">După</span>
    </div>
  );
};

export default BeforeAfterSlider;
