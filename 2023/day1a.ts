const input = await Bun.file(`${import.meta.dir}/inputs/day1a`).text();

const calibrationValues = input.split('\n');

const ans = calibrationValues.reduce((acc, calibrationValue) => {
  let stringOfNumber = '';

  for (const letter of calibrationValue) {
    if (!isNaN(+letter)) {
     stringOfNumber += letter; 
    }
  }

  if (stringOfNumber.length === 1) {
    stringOfNumber += stringOfNumber;
  }

  stringOfNumber = stringOfNumber[0] + stringOfNumber[stringOfNumber.length - 1]

  console.log(stringOfNumber)

  return acc + Number(stringOfNumber);
}, 0);

console.log(ans)