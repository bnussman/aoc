const input = await Bun.file("./inputs/day4").text();

const lines = input.trim().split("\n");

const data: string[][] = [];
const EXPECTED = ["XMAS", "SAMX"];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  data[i] = line.split('');
}

console.table(data);

const words: string[] = [];

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    const x = data[i][j] + data[i][j + 1] + data[i][j + 2] + data[i][j + 3];
    words.push(x);

    if (data[i + 3]) {
      const y = data[i][j] + data[i + 1][j] + data[i + 2][j] + data[i + 3][j];
      const diag1 = data[i][j] + data[i + 1][j + 1] + data[i + 2][j + 2] + data[i + 3][j + 3];
      const diag2 = data[i][j] + data[i + 1][j - 1] + data[i + 2][j - 2] + data[i + 3][j - 3];

      words.push(y);
      words.push(diag1);
      words.push(diag2);
    }
  }
}

let total = 0;

for (const word of words) {
  if (EXPECTED.includes(word)) {
    total++;
  }
}

console.log('total', total)
