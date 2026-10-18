import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';
import styles from './styles/styles.module.css';

// Prev/next controls of a treatment page's case gallery. The "1/10" counter
// and the "Atinge imaginea" hint are drawn by CSS from data-* attributes: they
// are gallery chrome, and as DOM text they were the first thing text
// extractors (trafilatura, AI crawlers) read on these pages.
const CaseNavControls = ({ current, total, onPrev, onNext, showTouchHint }) => (
  <>
    <div className={styles.listNavCarouselControlsContainer}>
      <button onClick={onPrev}><BiCaretLeft /></button>
      <span className={styles.caseCounter} data-count={`${current}/${total}`}/>
      <button onClick={onNext}><BiCaretRight /></button>
    </div>
    {showTouchHint && <p className={`text-center fs-6 opacity-50 visible-400 ${styles.touchHint}`} data-hint='Atinge imaginea'/>}
  </>
);

export default CaseNavControls;
