/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
import plugin from 'tailwindcss/plugin';

import { borders } from './borders';
import { fonts } from './fonts';
import { paddings } from './spacing';

const customPlugin = plugin(function ({
  addUtilities,
  addVariant,
  addComponents
}) {
  addUtilities(fonts);
  addUtilities(borders);
  addUtilities(paddings);
});

export default customPlugin;
