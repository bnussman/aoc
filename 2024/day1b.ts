const data = await Bun.file("./inputs/day1").text();
const lines = data.split('\n');

const leftList: number[] = [];
const rightList: number[] = [];


for (const line of lines) {
    const [leftItem, rightItem] = line.split('  ');
    leftList.push(+leftItem);
    rightList.push(+rightItem);
}

console.log("left", leftList)
console.log("right", rightList)

const occourArray: number[] = [];

for (let i = 0; i < leftList.length; i++) {
    const numberOfOccourancesInRightList = rightList.filter(value => value === leftList[i]).length;
    occourArray[i] = numberOfOccourancesInRightList;
}

console.table(occourArray)

let similarityScore = 0;

for (let i = 0; i < leftList.length; i++) {
    const score = leftList[i] * occourArray[i];
    similarityScore += score;
}

console.log("Similarity Score", similarityScore);