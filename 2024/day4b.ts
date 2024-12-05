const input = await Bun.file("./inputs/day4").text();

const lines = input.trim().split("\n");

const data: string[][] = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  data[i] = line.split('');
}

console.table(data);

let total = 0;

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    if (data[i + 2]) {
      const diag1 = data[i][j] + data[i + 1][j + 1] + data[i + 2][j + 2];
      const diag2 = data[i][j + 2] + data[i + 1][j + 1] + data[i + 2][j];

      if ((diag1 === "MAS" || diag1 === "SAM") && (diag2 === "MAS" || diag2 === "SAM")) {
        total++;
      }
    }
  }
}

console.log('total', total)
