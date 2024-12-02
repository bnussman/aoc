async function day1()  {
   const file = await Bun.file("./inputs/day2").text();

   const lines = file.split('\n');

   let count = 0;

   for (const report of lines) {
       const levels = report.split(' ').map(Number);

       if (getIsReportSafe(levels)) {
           count++;
       }
   }

   console.log("Part 1 - Total Safe:", count)
}

function getIsReportSafe(levels: number[]): boolean {
    let direction: 'increasing' | 'decreasing' = 'increasing';

    for (let i = 1; i < levels.length; i++) {
        const difference = levels[i] - levels[i - 1];

        const newDirection = difference > 0 ? 'increasing' : 'decreasing';

        if (i > 1 && newDirection !== direction) {
            // unsafe because levels are not all increasing or decreasing
            return false;
        }

        direction = newDirection;

        const absoluteDifference = Math.abs(difference)

        if (absoluteDifference < 1 || absoluteDifference > 3) {
            // unsafe because two adjacent levels differ less than one or more than three
            return false;
        }
    }

    return true;
}

function getVariationsOfLevels(levels: number[]) {
    const arrs: number[][] = []

    for (let i = 0; i < levels.length; i++) {
        const newArr = [...levels];
        newArr.splice(i,1)
        arrs.push(newArr)
    }

    return arrs;
}

async function day2() {
   const file = await Bun.file("./inputs/day2").text();

   const lines = file.split('\n');

   let count = 0;

   for (const report of lines) {
       const levels = report.split(' ').map(Number);

       // Is there a faster way than trying all variations of a report?
       const variations = getVariationsOfLevels(levels);

       if (getIsReportSafe(levels) || variations.some(getIsReportSafe)) {
           count++;
       }
   }

   console.log("Part 2 - Total Safe:", count)
}


day1()
day2()