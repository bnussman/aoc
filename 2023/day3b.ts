const input = await Bun.file(`${import.meta.dir}/inputs/day3`).text();

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

const uniqueStars: NumberWithInfo["starIndexes"] = [];

for (const number of numbersWithStars) {
  for (const star of number.starIndexes) {
    if (!uniqueStars.some(s => s.x === star.x && s.y === star.y)) {
      uniqueStars.push(star)
    }
  }
}

console.log(uniqueStars);

for (const star of uniqueStars) {
  const numbersThatMatchStar: number[] = [];

  for (const number of numbersWithStars) {
    if (number.starIndexes.some(s => s.x === star.x && s.y === star.y)) {
      numbersThatMatchStar.push(Number(number.value));
    }
  }

  if (numbersThatMatchStar.length === 2) {
    console.log("Found gear ratio", numbersThatMatchStar);

    sum += numbersThatMatchStar[0] * numbersThatMatchStar[1]
  }
}

console.log(sum)











function getRowData(lineBefore: string | null, line: string, lineAfter: string | null, lineIndex: number) {
  const rowData: NumberWithInfo[] = [];
  let currentNumberIndex = 0;

  for (let i = 0; i < line.length; i++) {
    if (isNumber(line[i])) {

      let hasSymbol = false;

      let starIndex: number | null = null;

      const starIndexes = rowData[currentNumberIndex]?.starIndexes ?? [];

      let starLineIndex = lineIndex;

      if (lineBefore && doesStringContainSymbol(lineBefore.substring(i - 1, i + 2))) {
        starIndex = i + getStarIndex(lineBefore.substring(i - 1, i + 2)) - 1;
        starLineIndex--;
        hasSymbol = true; 
        console.log(`Line ${lineIndex} - has a * on line before (${starLineIndex}) at ${starIndex}`)


        if (starIndex !== null && !starIndexes.some(s => s.x === starLineIndex && s.y === starIndex)) {
          starIndexes.push({ x: starLineIndex, y: starIndex });
        }
      }

      if (i > 0 && doesStringContainSymbol(line[i - 1])) {
        starIndex = i - 1;
        hasSymbol = true; 


        if (starIndex !== null && !starIndexes.some(s => s.x === starLineIndex && s.y === starIndex)) {
          starIndexes.push({ x: starLineIndex, y: starIndex });
        }
      }

      if (line[i + 1] && doesStringContainSymbol(line[i + 1])) {
        starIndex = i + 1;
        hasSymbol = true; 


        if (starIndex !== null && !starIndexes.some(s => s.x === starLineIndex && s.y === starIndex)) {
          starIndexes.push({ x: starLineIndex, y: starIndex });
        }
       }

      if (lineAfter && doesStringContainSymbol(lineAfter.substring(i - 1, i + 2))) {
        starIndex = i + getStarIndex(lineAfter.substring(i - 1, i + 2)) - 1;
        starLineIndex++;
        hasSymbol = true; 


        if (starIndex !== null && !starIndexes.some(s => s.x === starLineIndex && s.y === starIndex)) {
          starIndexes.push({ x: starLineIndex, y: starIndex });
        }
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
