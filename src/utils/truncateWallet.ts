export const truncateWallet = (wallet: string) => {
  if (!wallet) return '';

  const firstSix = wallet.substring(0, 6);
  const lastFive = wallet.substring(wallet.length - 5);

  return `(${firstSix}....${lastFive})`;
};
