export const createBigramPl = (plInput: string): string[] => {
  let bigramPl: string[] = [];
  const cleanedPlInput = plInput.replace(/J/g, "I")
  for (let i = 0; i < cleanedPlInput.length;) {
    const curr = cleanedPlInput[i]
    bigramPl.push(curr);
    if (i + 1 == cleanedPlInput.length || curr == cleanedPlInput[i + 1]) {
      bigramPl.push("X");
      ++i;
    } else {
      bigramPl.push(cleanedPlInput[i + 1]);
      i += 2;
    }
  }
  return bigramPl
}