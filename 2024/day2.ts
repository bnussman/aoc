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

   console.log("Total Safe:", count)
}

function getIsReportSafe(levels: number[]): boolean {
    let direction: 'increasing' | 'decreasing' = 'increasing';

    for (let i = 0; i < levels.length; i++) {
        if (i > 0) {
            const previousLevel = levels[i - 1];
            const difference = levels[i] - previousLevel;

            const newDirection = difference > 0 ? 'increasing' : 'decreasing';

            if (i <= 1) {
                direction = newDirection;
            } else {
                if (newDirection !== direction) {
                    return false;
                }
            }

            const absoluteDifference = Math.abs(difference)

            if (absoluteDifference < 1 || absoluteDifference > 3) {
                return false;
            }
        }
    }

    return true;
}

function getVariationsOfLevels(levels: number[]) {
    const arrs: Array<number[]> = []
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
       const variations = getVariationsOfLevels(levels);

       console.log(variations)

       if (getIsReportSafe(levels) || variations.some(variation => getIsReportSafe(variation))) {
           count++;
       }
   }

   console.log("Total Safe:", count)
}


// day1()
day2()