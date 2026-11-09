const letterMatrix = [
  ["b", "h", "r", "o"],
  ["s", "f", "v", "i"],
  ["d", "h", "e", "d"],
  ["t", "n", "t", "n"],
];

const ROW_LENGTH = letterMatrix.length;
const COLUMN_LENGTH = letterMatrix[0].length;

const knownWords = ["die", "dent", "dive", "vet", "ten", "blah"];
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
  sequence: string | undefined = undefined,
): string | undefined {
  console.log(`RowIndex: ${rowIndex}, ColumnIndex: ${columnIndex}`);
  const currentCharacter = letterMatrix[rowIndex][columnIndex];
  const newSequence = sequence ? sequence + currentCharacter : currentCharacter;
  if (isWord(newSequence)) {
    return newSequence;
  }
  if (newSequence.length >= maxWordLength) {
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
        ri < ROW_LENGTH &&
        ci >= 0 &&
        ci < COLUMN_LENGTH &&
        (ri != rowIndex || ci != columnIndex),
    );
  console.log(
    `RowIndex: ${rowIndex}, ColumnIndex: ${columnIndex}, Sequence: ${newSequence}, Indices: ${indicesToTry.join("|")}`,
  );

  for (const [ri, ci] of indicesToTry) {
    const word = findWord(ri, ci, newSequence);
    if (word) {
      return word;
    }
  }
}

const words = letterMatrix.flatMap((row: string[], rowIndex: number) => {
  return row.reduce((words: string[], _: string, columnIndex: number) => {
    const word = findWord(rowIndex, columnIndex);
    return word ? [...words, word] : words;
  }, []);
}, []);

console.log(`Words = ${words.join(", ")}`);
