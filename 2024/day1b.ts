const data = await Bun.file("./inputs/day1").text();
const lines = data.split('\n');

const leftList: number[] = [];

const occourMap = new Map<number, number>();

for (const line of lines) {
    const [leftItem, rightItem] = line.split('  ');
    leftList.push(+leftItem);
    
    if (occourMap.has(+rightItem)) {
       occourMap.set(+rightItem, occourMap.get(+rightItem)! + 1) 
    } else {
        occourMap.set(+rightItem, 1);
    }
}

let similarityScore = 0;

for (let i = 0; i < leftList.length; i++) {
    similarityScore += leftList[i] * (occourMap.get(leftList[i]) ?? 0);
}

console.log("Similarity Score", similarityScore);