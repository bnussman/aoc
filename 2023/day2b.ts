const input = await Bun.file(`${import.meta.dir}/inputs/day2a`).text();

const lines = input.split('\n');

interface CubeGroup {
  red: number | null;
  blue: number | null;
  green: number | null;
}

let sum = 0;

for (const line of lines) {
  const gameId = line.split('Game ')[1].split(':')[0];

  const gameSubsets = line.substring(line.indexOf(':') + 2, line.length).split('; ');

  const gameCubeGroups = gameSubsets.map(getGameCubes);

  const minOfEachColor = { red: gameCubeGroups[0].red, blue: gameCubeGroups[0].blue, green: gameCubeGroups[0].green };

  for (const group of gameCubeGroups) {
    if (group.red !== null) {
      minOfEachColor.red = minOfEachColor.red === null ? group.red : Math.max(minOfEachColor.red, group.red);
    }
    if (group.blue !== null) {
      minOfEachColor.blue = minOfEachColor.blue === null ? group.blue : Math.max(minOfEachColor.blue, group.blue);
    }
    if (group.green !== null) {
      minOfEachColor.green = minOfEachColor.green === null ? group.green : Math.max(minOfEachColor.green, group.green);
    }
  }

  if (!minOfEachColor.blue || !minOfEachColor.green || !minOfEachColor.red) {
    throw new Error("oh no");
  }

  const power = minOfEachColor.red * minOfEachColor.blue * minOfEachColor.green;

  sum += power;

  console.log(minOfEachColor, power)
}

console.log(sum);

function getGameCubes(bag: string) {
  const items = bag.split(', ');

  const cubes: CubeGroup  = {
    red: null,
    blue: null,
    green: null
  };

  for (const item of items) {
   const [count, color] = item.split(' ');
   if (cubes[color as keyof typeof cubes] === null) {
      cubes[color as keyof typeof cubes] = Number(count);
   } else {
     cubes[color as keyof typeof cubes]! += Number(count);
   }
  }

  return cubes;
}
