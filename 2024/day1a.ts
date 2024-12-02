const data = await Bun.file("./inputs/day1").text();
const lines = data.split('\n');

const leftList: number[] = [];
const rightList: number[] = [];

for (const line of lines) {
    const [leftItem, rightItem] = line.split('  ');
    leftList.push(+leftItem);
    rightList.push(+rightItem);
}

leftList.sort();
rightList.sort();

let total = 0;

for (let i = 0; i < leftList.length; i++) {
    const distance = Math.abs(leftList[i] - rightList[i]);
    total += distance;
}

console.log("Total", total)
