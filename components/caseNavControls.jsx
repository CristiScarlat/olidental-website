import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';
import styles from './styles/styles.module.css';

// Prev/next controls of a treatment page's case gallery. The "1/10" counter
// and the "Atinge imaginea" hint are drawn by CSS from data-* attributes: they
// are gallery chrome, and as DOM text they were the first thing text
// extractors (trafilatura, AI crawlers) read on these pages.
// The buttons switch to the previous/next case (onPrev/onNext change the case
// index), so their accessible names say "Cazul", not "Imaginea": on pages whose
// cases hold several image pairs, the thumbnails above pick the image.
const CaseNavControls = ({ current, total, onPrev, onNext, showTouchHint }) => (
  <>
    <div className={styles.listNavCarouselControlsContainer}>
      <button type="button" aria-label="Cazul anterior" onClick={onPrev}><BiCaretLeft aria-hidden="true" /></button>
      <span className={styles.caseCounter} data-count={`${current}/${total}`}/>
      <button type="button" aria-label="Cazul următor" onClick={onNext}><BiCaretRight aria-hidden="true" /></button>
    </div>
    {showTouchHint && <p className={`text-center fs-6 opacity-50 visible-400 ${styles.touchHint}`} data-hint='Atinge imaginea'/>}
  </>
);

export default CaseNavControls;
