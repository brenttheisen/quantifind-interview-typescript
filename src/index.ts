const letterMatrix = [
  ["b", "h", "r", "o"],
  ["s", "f", "v", "i"],
  ["d", "h", "e", "d"],
  ["t", "n", "t", "n"],
];

const knownWords = ["die"];
const maxWordLength = knownWords.reduce(
  (length, word) => (word.length > length ? word.length : length),
  0,
);

function isWord(sequence: string): boolean | undefined {
  const suspectedWord = knownWords.find((knownWord) =>
    knownWord.startsWith(sequence),
  );
  if (suspectedWord) {
    return suspectedWord == sequence ? true : undefined;
  }

  return false;
}

function findWord(
  rowIndex: number,
  columnIndex: number,
  sequence: string | null = null,
): string | undefined {
  const newSequence = sequence || letterMatrix[rowIndex][columnIndex];
  if (isWord(newSequence)) {
    return newSequence;
  }
  if (newSequence.length == maxWordLength) {
    return;
  }
  const indicesToTry = [rowIndex - 1, rowIndex, rowIndex + 1]
    .flatMap((ri) => {
      return [columnIndex - 1, columnIndex, columnIndex + 1].map((ci) => [
        ri,
        ci,
      ]);
    })
    .filter(
      ([ri, ci]) =>
        ri >= 0 &&
        ri <= 4 &&
        ci >= 0 &&
        ci <= 4 &&
        (ri != rowIndex || ci != columnIndex),
    );
  console.log(`Sequence: ${sequence}, Indices: ${indicesToTry.join("|")}`);

  for (const [ri, ci] of indicesToTry) {
    const word = findWord(ri, ci, newSequence);
    if (word) {
      return word;
    }
  }
}

letterMatrix
  .flatMap((row: string[], rowIndex: number) => {
    return row.reduce((words: string[], _: string, columnIndex: number) => {
      const word = findWord(rowIndex, columnIndex);
      return word ? [...words, word] : words;
    }, []);
  }, [])
  .forEach(console.log);

/*
const lettersWithIndices: [string, number, number][] = letterMatrix.flatMap(
  (row, rowIndex) => {
    return row.map(
      (character: string, columnIndex: number): [string, number, number] => {
        return [character, rowIndex, columnIndex];
      },
    );
  },
);

const words = lettersWithIndices.reduce(
  (words: string[], tuple: [string, number, number]) => {
    const [character, rowIndex, columnIndex] = tuple;
    return words;
  },
  [],
);
*/
