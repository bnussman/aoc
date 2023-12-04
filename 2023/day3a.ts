const input = await Bun.file(`${import.meta.dir}/inputs/day3`).text();

const lines = input.split('\n');

const symbols = getAllPossbleSymbols()

let sum = 0;

for (let i = 0; i < lines.length; i ++) {
  const lineBefore = i !== 0 ? lines[i - 1] : null;
  const currentLine = lines[i];
  const nextLine = i !== lines.length - 1 ? lines[i + 1] : null;

  const rowData = getRowData(lineBefore, currentLine, nextLine);

  console.log(rowData)

  for (const item of rowData) {
    if (item.hasSymbol) {
      sum += Number(item.value)
    }
  }
}

console.log(sum);

function getRowData(lineBefore: string | null, line: string, lineAfter: string | null) {
  const rowData: { value: string, hasSymbol: boolean }[] = [];
  let currentNumberIndex = 0;

  for (let i = 0; i < line.length; i++) {
    if (isNumber(line[i])) {

      let hasSymbol = false;

      if (lineBefore && doesStringContainSymbol(lineBefore.substring(i - 1, i + 2))) {
        hasSymbol = true; 
      }

      if (i > 0 && doesStringContainSymbol(line[i - 1])) {
        hasSymbol = true; 
      }

      if (line[i + 1] && doesStringContainSymbol(line[i + 1])) {
        hasSymbol = true; 
      }

      if (lineAfter && doesStringContainSymbol(lineAfter.substring(i - 1, i + 2))) {
        hasSymbol = true; 
      }

      rowData[currentNumberIndex] = {
        value: rowData[currentNumberIndex]?.value ? rowData[currentNumberIndex].value + line[i] : line[i],
        hasSymbol: rowData[currentNumberIndex]?.hasSymbol || hasSymbol ? true : false
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
    if (symbols.includes(s[i])) {
      return true;
    }
  }

  return false;
}


function getAllPossbleSymbols() {
  const symbols: string[] = [];
  for (let i = 0; i < lines.length; i ++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (!isNumber(lines[i][j]) && lines[i][j] !== '.') {
        symbols.push(lines[i][j]);
      }
    }
  }

  return symbols;
}
