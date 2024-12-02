import fs from 'fs';
import readline from 'readline';

const lineReader = readline.createInterface({
    input: fs.createReadStream("./inputs/day1"),
    crlfDelay: Infinity
});

const leftList: number[] = [];
const rightList: number[] = [];

for await (const line of lineReader) {
    const [leftItem, rightItem] = line.split('  ');
    leftList.push(+leftItem);
    rightList.push(+rightItem);
}

leftList.sort();
rightList.sort();

let total = 0;

for (let i = 0; i < leftList.length; i++) {
    total += Math.abs(leftList[i] - rightList[i]);
}

console.log("Total", total)
