const input = await Bun.file(`${import.meta.dir}/inputs/day2a`).text();

const lines = input.split('\n');

interface CubeGroup {
  red: number;
  blue: number;
  green: number;
}

const validGameIds: number[] = [];

for (const line of lines) {
  const gameId = line.split('Game ')[1].split(':')[0];

  const gameSubsets = line.substring(line.indexOf(':') + 2, line.length).split('; ');

  const gameCubeGroups = gameSubsets.map(getGameCubes);

  console.log(gameCubeGroups);

  const hasInvalidGroup = gameCubeGroups.some(group => group.red > 12 || group.green > 13 || group.blue > 14);

  if (!hasInvalidGroup) {
    validGameIds.push(+gameId);
  }
}

console.log("Valid Game IDs", validGameIds, validGameIds.reduce((acc, value) => acc + value, 0));

function getGameCubes(bag: string) {
  const items = bag.split(', ');

  console.log(bag)

  const cubes = {
    red: 0,
    blue: 0,
    green: 0
  };

  for (const item of items) {
   const [count, color] = item.split(' ');
   cubes[color as keyof typeof cubes] += Number(count);
  }

  return cubes;
}

function getTotalCubesInGame(groups: CubeGroup[]) {
  const cubes = {
    red: 0,
    blue: 0,
    green: 0
  };

  for (const group of groups) {
    cubes.red += group.red;
    cubes.blue += group.blue;
    cubes.green += group.green;
  }

  return cubes;
}
