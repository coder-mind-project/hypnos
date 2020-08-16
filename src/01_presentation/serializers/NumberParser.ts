export const getNumber = (numberCandidate: unknown): number | undefined => {
  return Number(numberCandidate) || undefined;
};

export default { getNumber };
