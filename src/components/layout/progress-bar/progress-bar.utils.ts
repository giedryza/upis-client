const exponentialDecay = (
  // percentage (0.25) by which the original amount will decline each time
  decayFactor: number,
  // amount before the decay occurs
  originalAmount: number,
  // time
  exponent: number
) => originalAmount * (1 - decayFactor) ** exponent;

export const slowingGrowth = (step: number, max: number, exponent: number) =>
  -exponentialDecay(step, max, exponent) + max;
