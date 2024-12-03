const memory = await Bun.file("./inputs/day3").text();

// I'm so sorry......
const matches = memory.matchAll(/mul\(([0-9]+)\,([0-9]+)\)/gi)

console.log("Memory", memory)

let total = 0;

for (const match of matches) {
    total += +match[1] * +match[2]
}

console.log(total)

