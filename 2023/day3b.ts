const input = await Bun.file(`${import.meta.dir}/examples/day3`).text();

const lines = input.split('\n');

let sum = 0;

type NumberWithInfo = { value: string, starIndexes: Array<{ x: number, y: number }> }

let numbersWithStars: NumberWithInfo[] = [];

for (let i = 0; i < lines.length; i ++) {
  const lineBefore = i !== 0 ? lines[i - 1] : null;
  const currentLine = lines[i];
  const nextLine = i !== lines.length - 1 ? lines[i + 1] : null;

  const rowData = getRowData(lineBefore, currentLine, nextLine, i);

  numbersWithStars = [...numbersWithStars, ...rowData.filter(row => row.starIndexes.length > 0)];
}

console.log(numbersWithStars);


for (const val1 of numbersWithStars) {
  console.log(val1)
}














function getRowData(lineBefore: string | null, line: string, lineAfter: string | null, lineIndex: number) {
  const rowData: NumberWithInfo[] = [];
  let currentNumberIndex = 0;

  for (let i = 0; i < line.length; i++) {
    if (isNumber(line[i])) {

      let hasSymbol = false;

      let starIndex: number | null = null;

      if (lineBefore && doesStringContainSymbol(lineBefore.substring(i - 1, i + 2))) {
        starIndex = i + getStarIndex(lineBefore.substring(i - 1, i + 2)) - 1;
        hasSymbol = true; 
      }

      if (i > 0 && doesStringContainSymbol(line[i - 1])) {
        starIndex = i - 1;
        hasSymbol = true; 
      }

      if (line[i + 1] && doesStringContainSymbol(line[i + 1])) {
        starIndex = i + 1;
        hasSymbol = true; 
       }

      if (lineAfter && doesStringContainSymbol(lineAfter.substring(i - 1, i + 2))) {
        starIndex = i + getStarIndex(lineAfter.substring(i - 1, i + 2)) - 1;
        hasSymbol = true; 
      }

      const starIndexes = rowData[currentNumberIndex]?.starIndexes ?? [];
    
      if (starIndex !== null && !starIndexes.some(s => s.x === lineIndex && s.y === starIndex)) {
        starIndexes.push({ x: lineIndex, y: starIndex });
      }

      rowData[currentNumberIndex] = {
        value: rowData[currentNumberIndex]?.value ? rowData[currentNumberIndex].value + line[i] : line[i],
        starIndexes
      };
    } else if (currentNumberIndex < rowData.length) {
      currentNumberIndex++;
    }
  }

  return rowData;
}

function isNumber(s: string): boolean {
   return !isNaN(Number(s));
}

function doesStringContainSymbol(s: string) {
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "*") {
      return true;
    }
  }

  return false;
}


function getStarIndex(s: string) {
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "*") {
      return i;
    }
  }

  throw new Error("no star");
}
