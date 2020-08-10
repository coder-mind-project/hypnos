export const getNumber = (numberCandidate: any): number | undefined => {
    return Number(numberCandidate) || undefined;
}

export default { getNumber }