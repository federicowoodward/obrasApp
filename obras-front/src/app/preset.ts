import { definePreset } from '@primeuix/themes';
import Lara from '@primeuix/themes/lara';

const Preset = definePreset(Lara, {
  primitive: {
    red: {
      50:  '#ffe5e5',
      100: '#ffcccc',
      200: '#ff9999',
      300: '#ff6666',
      400: '#ff3333',
      500: '#ff0000',
      600: '#cc0000',
      700: '#990000',
      800: '#660000',
      900: '#330000',
      950: '#110000',
    },
  },

  semantic: {
    primary: {
      50: '#FFF2B8',
      100: '#FFEFA3',
      200: '#FFE87A',
      300: '#FFE052',
      400: '#FFD929',
      500: '#FFD200',
      600: '#C7A400',
      700: '#8F7600',
      800: '#574700',
      900: '#1F1900',
      950: '#030200',
    },
    // opcional (ya que Lara suele mapear danger→red)
    danger: '{red}',
  },
});

export default Preset;
