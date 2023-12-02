const input = await Bun.file(`${import.meta.dir}/inputs/day1b`).text();

const calibrationValues = input.split('\n');

function isNumber(s: string) {
  return !isNaN(s);
}

const numberToNumbrMap = {
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9,
};

const numberStrings = Object.keys(numberToNumbrMap) as unknown as Array<keyof typeof numberToNumbrMap>;

function getFirstNumberInString(input: string): string {
  for (let i = 0; i < input.length; i++) {
    if (isNumber(input[i])) {
      return input[i];
    }

    for (const numberString of numberStrings) {
      if (input.substring(i, input.length).startsWith(numberString)) {
        return String(numberToNumbrMap[numberString]);
      }
    }
  }
  throw new Error('no number found');
  return 'idk';
}

function getLastNumberInString(input: string): string {
  for (let i = input.length; i >= 0; i--) {
    if (isNumber(input[i])) {
      return input[i];
    }

    for (const numberString of numberStrings) {
      if (input.substring(i, input.length).startsWith(numberString)) {
        return String(numberToNumbrMap[numberString]);
      }
    }
  }
  throw new Error('no number found');
  return 'idk';
}

let sum = 0;
for (const calibrationValue of calibrationValues) {
  const firstNumber = getFirstNumberInString(calibrationValue);
  const lastNumber = getLastNumberInString(calibrationValue);
  console.log(calibrationValue, firstNumber, lastNumber)
  sum += Number(firstNumber + lastNumber);
}

console.log(sum)
