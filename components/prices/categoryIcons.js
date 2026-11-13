import {
  FaChild,
  FaGripLines,
  FaLayerGroup,
  FaScissors,
  FaShieldHalved,
  FaStethoscope,
  FaTeeth,
  FaTooth,
  FaWandMagicSparkles
} from 'react-icons/fa6';

// One decorative icon per price group, by group id (utils/tarife/grupuri.js).
export const CATEGORY_ICONS = Object.freeze({
  implantologie: FaTooth,
  consultatii: FaStethoscope,
  'igienizare-estetica': FaWandMagicSparkles,
  'carii-endodontie': FaShieldHalved,
  'coroane-fatete': FaTeeth,
  'chirurgie-parodontologie': FaScissors,
  'proteze-gutiere': FaLayerGroup,
  ortodontie: FaGripLines,
  'stomatologie-copii': FaChild
});
