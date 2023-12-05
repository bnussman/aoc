const input = await Bun.file(`${import.meta.dir}/inputs/day4`).text();

const lines = input.split('\n');

let total = 0;

for (let i = 0; i < lines.length; i++) {
  const cardNumber = Number(lines[i].split(":")[0].split("Card")[1].trim());

  const winningCardsString = lines[i].split(":")[1].split('|')[0];

  const myNumbersString = lines[i].split('|')[1];

  const winningCards = winningCardsString.split(" ").filter(item => item !== "").map(Number);
  const myNumbers = myNumbersString.split(" ").filter(item => item !== "").map(Number);

  const myWinningCards: number[] = [];

  for (const number of myNumbers) {
    if (winningCards.includes(number)) {
      myWinningCards.push(number);
    }
  }

  const points = getPoints(myWinningCards.length);

  total += points;

  console.log(cardNumber, winningCards, myNumbers, myWinningCards, points)
}

console.log("Total", total)

function getPoints(length: number): number {
  if (length === 0) {
    return 0;
  }

  if (length === 1) {
    return 1;
  }

  return getPoints(length - 1) * 2
}
