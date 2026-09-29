import { TOKEN_DECIMALS } from '@/constants/token-decimals';

/** Plot raw token units as whole tokens. Sparkline values are JS numbers. */
export const transferredAmountToChartValue = (raw: string): number => {
  if (!/^\d+$/.test(raw)) {
    throw new Error('transferred amount is not an integer');
  }

  const value = BigInt(raw);
  const scale = BigInt(10) ** BigInt(TOKEN_DECIMALS);
  const whole = value / scale;

  if (whole > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new Error('transferred amount is too large to plot');
  }

  const fraction = value % scale;

  return Number(whole) + Number(fraction) / Number(scale);
};
