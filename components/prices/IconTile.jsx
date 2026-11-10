import styles from '../../styles/preturi.module.css';
import { CATEGORY_ICONS } from './categoryIcons';

/** Decorative icon of a price category, in a rounded green tile. */
const IconTile = ({ categoryId, className = '' }) => {
  const Icon = CATEGORY_ICONS[categoryId];
  return (
    <span className={`${styles.iconTile} ${className}`} aria-hidden="true">
      {Icon ? <Icon /> : null}
    </span>
  );
};

export default IconTile;
