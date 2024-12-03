const memory = await Bun.file("./inputs/day3").text();

const matches = memory.matchAll(/mul\(([0-9]+)\,([0-9]+)\)/gi)
const dos = memory.matchAll(/do\(\)/gi).toArray()
const donts = memory.matchAll(/don\'t\(\)/gi).toArray()

let total = 0;
let enabled = true;

for (const match of matches) {
    const mostRecentDo =  dos.findLast(item => item.index < match.index);
    const mostRecentDont =  donts.findLast(item => item.index < match.index);

    if (mostRecentDo && mostRecentDont && mostRecentDont.index > mostRecentDo.index) {
        enabled = false;
    } else if (mostRecentDo && mostRecentDont && mostRecentDo.index > mostRecentDont.index) {
        enabled = true;
    } else if (mostRecentDo) {
        enabled = true;
    } else if (mostRecentDont) {
        enabled = false;
    } else {
        enabled = true;
    }

    console.log("Most Recent Do", mostRecentDo?.index)
    console.log("Most Recent Dont", mostRecentDont?.index)

    if (enabled) {
        total += +match[1] * +match[2]
    } else {
        console.info("Detected don't so will disable for this iteration:", match[0]);
    }
}

console.log(total)

