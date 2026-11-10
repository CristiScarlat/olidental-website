import {
  FaBullseye,
  FaChild,
  FaGripLines,
  FaHeartPulse,
  FaLayerGroup,
  FaPuzzlePiece,
  FaScissors,
  FaShieldHalved,
  FaStethoscope,
  FaTeeth,
  FaTeethOpen,
  FaTooth,
  FaWandMagicSparkles
} from 'react-icons/fa6';

// One decorative icon per price category, by category id (utils/tarife).
export const CATEGORY_ICONS = Object.freeze({
  consultatii: FaStethoscope,
  'igienizare-albire': FaWandMagicSparkles,
  'carii-restaurari': FaShieldHalved,
  endodontie: FaBullseye,
  parodontologie: FaHeartPulse,
  'chirurgie-orala': FaScissors,
  implantologie: FaTooth,
  'protetica-dinti-naturali': FaTeethOpen,
  'protetica-implanturi': FaPuzzlePiece,
  'arcade-fixe-implanturi': FaTeeth,
  'proteze-gutiere': FaLayerGroup,
  ortodontie: FaGripLines,
  'stomatologie-copii': FaChild
});
