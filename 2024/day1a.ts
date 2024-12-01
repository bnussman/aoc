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

const distances: number[] = [];

for (let i = 0; i < leftList.length; i++) {
    const distance = Math.abs(leftList[i] - rightList[i]);
    distances.push(distance);
}

const total = distances.reduce((acc, distance) => {
    acc += distance;
    return acc;
}, 0);

console.log("Total", total)