const input = await Bun.file("./examples/day4").text();

const lines = input.trim().split("\n");

const array: string[][] = [];
const phrase = "XMAS";

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  array[i] = line.split('');
}

console.table(array);

let total = 0;

for (let i = 0; i < array.length; i++) {
  for (let j = 0; j < array[i].length; j++) {
    const values = [
      getX(i, j),
      getY(i, j),
      getDiag1(i, j),
      getDiag2(i, j)
      ].filter(value => value !== null);
    console.log(values)

    total += values.filter(vals => values.includes(phrase)).length
  }
}

console.log('total', total)

function getDiag1(row: number, column: number) {
  if (row + phrase.length > array.length) {
    return null;
  }
  if (column + phrase.length > array[row].length) {
    return null;
  }
  let string = '';
  for (let i = 0; i < phrase.length; i++) {
    string += array[row + i][column + i];
  }

  if (string === phrase) {
    return { start: {row, column}, end: { row: row + phrase.length, column: column + phrase.length }}
  }
  return string;
}

function getDiag2(row: number, column: number) {
  if (row + phrase.length > array.length) {
    return null;
  }
  if (column - (phrase.length -1) < 0) {
    return null;
  }
  let string = '';
  for (let i = 0; i < phrase.length; i++) {
    string += array[row + i][column - i];
  }
  return string;
}

function getX(row: number, column: number) {
  if (column + phrase.length > array[row].length) {
    return null;
  }
  let string = '';
  for (let i = column; i < column + phrase.length; i++) {
    string += array[row][i];
  }
  return string;
}


function getY(row: number, column: number) {
  if (row + phrase.length > array.length) {
    return null;
  }
  let string = '';
  for (let i = row; i < row + phrase.length; i++) {
    string += array[i][column];
  }
  return string;
}
