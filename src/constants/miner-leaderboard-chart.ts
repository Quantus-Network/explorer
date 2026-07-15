export const MINER_LEADERBOARD_CHART_TOP_N = 10;

/** How many top miners appear in the legend (bar still shows all top N + Others). */
export const MINER_LEADERBOARD_CHART_LEGEND_N = 5;

/** Orange → near-black ramp matching the v5 block distribution design. */
export const MINER_DISTRIBUTION_COLORS = [
  '#FF6B35',
  '#E8820A',
  '#D4720A',
  '#BA6210',
  '#A05218',
  '#8A4420',
  '#6B3018',
  '#4A2010',
  '#321408',
  '#1A0A02'
] as const;

export const MINER_DISTRIBUTION_OTHERS_COLOR = '#1A0800';
